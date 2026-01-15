'use client';

import { useState } from 'react';
import {
  useAccount,
  useConnect,
  useDisconnect,
  useReadContract,
  useWriteContract,
  useChainId,
} from 'wagmi';
import { injected } from '@wagmi/connectors';
import { toast, Toaster } from 'sonner';

// ==============================
// CONFIG
// ==============================
const CONTRACT_ADDRESS = process.env
  .NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;

if (!CONTRACT_ADDRESS) {
  throw new Error('Contract address not found in env');
}

// ==============================
// ABI
// ==============================
const SIMPLE_STORAGE_ABI = [
  {
    inputs: [],
    name: 'getValue',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: '_value', type: 'uint256' }],
    name: 'setValue',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

// ==============================
// UTILS
// ==============================
const shortenAddress = (addr?: string) =>
  addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : '';

type TxStatus = 'idle' | 'pending' | 'success' | 'error';

export default function Page() {
  const chainId = useChainId();

  const { address, isConnected } = useAccount();
  const { connect, isPending: isConnecting } = useConnect();
  const { disconnect } = useDisconnect();

  const [inputValue, setInputValue] = useState('');
  const [txStatus, setTxStatus] = useState<TxStatus>('idle');

  const isWrongNetwork = chainId !== 43113; // Avalanche Fuji

  // ==============================
  // READ CONTRACT
  // ==============================
  const {
    data: value,
    isLoading: isReading,
    refetch,
  } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: SIMPLE_STORAGE_ABI,
    functionName: 'getValue',
    query: {
      enabled: isConnected && !isWrongNetwork,
    },
  });

  // ==============================
  // WRITE CONTRACT (SAFE MODE)
  // ==============================
  const { writeContract, isPending: isWriting } = useWriteContract();

  const handleSetValue = () => {
    if (!inputValue || isNaN(Number(inputValue))) {
      toast.error('Invalid input value');
      return;
    }

    toast.loading('Transaction submitted...', { id: 'tx' });
    setTxStatus('pending');

    writeContract(
      {
        address: CONTRACT_ADDRESS,
        abi: SIMPLE_STORAGE_ABI,
        functionName: 'setValue',
        args: [BigInt(inputValue)],
      },
      {
        onSuccess: () => {
          toast.success('Transaction sent ✅', { id: 'tx' });
          setTxStatus('success');
          setInputValue('');
          refetch();
        },
        onError: (error) => {
          const message = error?.message || '';
          setTxStatus('error');

          if (message.includes('User rejected')) {
            toast.error('Transaction rejected by user ❌', { id: 'tx' });
          } else if (message.includes('revert')) {
            toast.error('Transaction reverted ❌', { id: 'tx' });
          } else {
            toast.error('Transaction failed ❌', { id: 'tx' });
          }
        },
      }
    );
  };

  return (
    <div className="h-screen flex items-center justify-center 
      bg-gradient-to-br from-blue-950 via-blue-900 to-sky-900 text-white">
        <div className='space-y-5 '>      
          <div className="relative w-[370px] h-[480px]">
          <div className=" 
            absolute inset-0
          bg-blue-400/80
            rounded-2xl
            rotate-[-5deg]
            z-0
          "></div>
          <Toaster richColors position="top-right" />
          <div className="absolute inset-0
            z-10
            rounded-2xl
            bg-indigo-900/40 backdrop-blur-xl
            shadow-2xl
            px-8 py-10 space-y-4
            transition-transform hover:scale-[1.01]">
              {/* NETWORK BADGE */}
              <div className="flex justify-center absolute -top-5 left-1/2 -translate-x-1/2
                bg-indigo-900/40 backdrop-blur-xl
                py-2 px-5 rounded-lg text-xl font-bold">
                <span
                  className={`text-xs px-3 py-1 border
                    ${isWrongNetwork
                      ? 'text-red-400 border-red-500/40 bg-red-500/10'
                      : 'text-green-400 border-green-500/40 bg-green-500/10'}
                  `}
                >
                  {isWrongNetwork ? 'Wrong Network' : 'Avalanche Fuji'}
                </span>
              </div>
              {/* APP HEADER */}
              <div className="text-center space-y-1 pt-2">
                <h2 className="text-lg font-semibold tracking-wide">
                  Simple Storage dApp
                </h2>
                <p className="text-sm text-white/60">
                  Interact with smart contract on Avalanche Fuji
                </p>
              </div>

              {/* WALLET */}
              {!isConnected ? (
                <button
                  onClick={() => connect({ connector: injected() })}
                  disabled={isConnecting}
                  className="w-full py-3 rounded-xl font-semibold
                    bg-gradient-to-r from-indigo-500 to-purple-600
                    hover:opacity-90 transition disabled:opacity-50"
                >
                  {isConnecting ? 'Connecting...' : 'Connect Wallet'}
                </button>
              ) : (
                <div className="text-sm bg-black/40 p-4 rounded-xl border border-white/10 flex justify-between items-center">
                  <div className="space-y-1">
                    <p>
                      <span className="text-white/60">Address:</span>{' '}
                      <span className="font-mono text-green-400">
                        {shortenAddress(address)}
                      </span>
                    </p>
                    <p className="text-white/60">Chain ID: {chainId}</p>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(address!);
                        toast.success('Address copied');
                      }}
                      className="text-xs text-blue-400 hover:underline"
                    >
                      Copy address
                    </button>
                  </div>

                  <button
                    onClick={() => disconnect()}
                    className="px-4 py-2 rounded-lg text-sm
                      text-red-400 border border-red-500/40
                      bg-red-500/10 hover:bg-red-500/20"
                  >
                    Disconnect
                  </button>
                </div>
              )}

              {/* READ */}
              <div className="bg-black/40 p-4 rounded-xl border border-white/10 text-center">
                <p className="text-white/60 text-sm">Contract Value</p>
                {isReading ? (
                  <span className="animate-pulse">Loading...</span>
                ) : (
                  <span className="text-lg font-semibold">
                    {value?.toString()}
                  </span>
                )}
              </div>

              {/* TX STATUS */}
              {txStatus === 'pending' && (
                <p className="text-xs text-yellow-400 text-center">
                  ⏳ Transaction pending...
                </p>
              )}
              {txStatus === 'success' && (
                <p className="text-xs text-green-400 text-center">
                  ✅ Transaction sent
                </p>
              )}
              {txStatus === 'error' && (
                <p className="text-xs text-red-400 text-center">
                  ❌ Transaction failed
                </p>
              )}

              {/* WRITE */}
              <div className="space-y-3">
                <input
                  type="number"
                  value={inputValue}
                  disabled={isWriting}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="New value"
                  className="w-full p-3 rounded-xl bg-black/40
                    border border-white/10
                    focus:outline-none focus:ring-2 focus:ring-indigo-500
                    disabled:opacity-50"
                />

                <button
                  onClick={handleSetValue}
                  disabled={isWriting || isWrongNetwork}
                  className="w-full py-3 rounded-xl font-semibold
                    bg-blue-600 hover:bg-blue-500 transition
                    disabled:opacity-50"
                >
                  {isWriting ? 'Updating...' : 'Set Value'}
                </button>
              </div>

              <p className="text-xs text-center text-white/40">
                Smart contract is the single source of truth
              </p>
            </div>
          </div>
          <p className='text-gray-300 mt-5 text-center'>Aisyah Rahmawati - 231011401956</p>
        </div>
      </div>
  );
}

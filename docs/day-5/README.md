# 📘 Day 5 – Integrasi & Deployment Full Stack dApp (Avalanche)

> Avalanche Indonesia Short Course – **Day 5**

Hari kelima merupakan **puncak dari short course ini**.
Peserta akan **mengintegrasikan seluruh layer** yang telah dibangun dari Day 1 hingga Day 4, lalu melakukan **deployment** sehingga dApp dapat diakses secara publik dan berjalan **end-to-end**.

### 🧠 Prinsip Arsitektur

- **Smart Contract** → Source of Truth (on-chain state & logic)
- **Backend** → UX layer, API, aggregation (read-only)
- **Frontend** → User interaction & wallet connection

---

## 🎯 Tujuan Pembelajaran

Pada akhir sesi Day 5, peserta mampu:

- Memahami **arsitektur full stack dApp secara end-to-end**
- Mengintegrasikan:

  - Smart Contract (Day 2)
  - Frontend dApp (Day 3)
  - Backend API (Day 4)

- Mengelola **environment & konfigurasi production**
- Melakukan **deployment smart contract, backend, dan frontend**
- Memahami **best practice deployment Web3**
- Melakukan **final demo full stack dApp**

---

## 🧩 Studi Kasus

### Avalanche Simple Full Stack dApp – Final Integration

Arsitektur final:

```text
User
 ↓
Frontend (Next.js / HTML)
 ↓ REST API
Backend (NestJS + viem)
 ↓ read
Blockchain (Avalanche Fuji / Mainnet)
```

📌 User **tetap menandatangani transaksi via wallet**
📌 Backend **tidak menyimpan private key** dan **tidak mengirim transaksi**
📌 Smart contract tetap menjadi **pusat kebenaran**

---

## ⏱️ Struktur Sesi (± 3 Jam)

| Sesi    | Durasi | Aktivitas                                 |
| ------- | ------ | ----------------------------------------- |
| Theory  | 1 Jam  | Arsitektur & Deployment Strategy          |
| Demo    | 1 Jam  | Integrasi Layer + Deployment Step-by-Step |
| Praktik | 1 Jam  | Deploy & Finalisasi Full Stack dApp       |

---

# 1️⃣ Theory (± 1 Jam)

## 1.1 Review Arsitektur Full Stack dApp

| Layer          | Teknologi                | Tanggung Jawab                   |
| -------------- | ------------------------ | -------------------------------- |
| Smart Contract | Solidity, Hardhat        | Logic & state on-chain           |
| Frontend       | Next.js / HTML + JS      | UI & wallet interaction          |
| Backend        | NestJS, viem             | API, aggregation, UX improvement |
| Blockchain     | Avalanche Fuji / Mainnet | Source of truth                  |

📌 Setiap layer **terpisah**, tetapi **saling terhubung**.

---

## 1.2 Flow Interaksi User

### Read Flow

```text
Frontend → Backend API → Blockchain
```

- Frontend **tidak langsung ke RPC**
- Backend membaca data blockchain secara efisien

---

### Write Flow (Transaction)

```text
Frontend → Wallet (Core) → Blockchain
```

- User tetap signer
- Backend **tidak berada di jalur transaksi**

---

## 1.3 Environment & Configuration

### Kenapa Environment Penting?

- Local, testnet, dan mainnet memiliki:

  - RPC berbeda
  - Contract address berbeda
  - API endpoint berbeda

📌 **Konfigurasi tidak boleh di-hardcode**

---

### Contoh Environment Variable

#### Frontend (`.env`)

```env
NEXT_PUBLIC_BACKEND_URL=https://api.example.com
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...
```

#### Backend (`.env`)

```env
RPC_URL=https://api.avax-test.network/ext/bc/C/rpc
CONTRACT_ADDRESS=0x...
```

---

## 1.4 Deployment Strategy (Overview)

| Layer          | Contoh Platform (Opsional) |
| -------------- | -------------------------- |
| Smart Contract | Avalanche Fuji / Mainnet   |
| Backend API    | VPS / Railway / Fly.io     |
| Frontend       | Vercel / Netlify           |

📌 Fokus utama: **konsep deployment**, bukan platform.

---

## 1.5 Production Best Practice

### Smart Contract

- Contract address bersifat **immutable**
- Jangan redeploy tanpa alasan
- Simpan ABI & address dengan rapi

---

### Backend

- Read-only blockchain access
- Handle RPC error & timeout
- Rate limit & caching (konseptual)

---

### Frontend

- Handle loading & error state
- Jangan expose private key
- Validasi network (Fuji vs Mainnet)

---

# 2️⃣ Demo (± 1 Jam)

## 2.1 Integrasi Frontend ↔ Backend

Frontend akan:

- Mengakses API backend:

  ```text
  GET /blockchain/value
  GET /blockchain/events
  ```

- Menampilkan data blockchain melalui backend

📌 Frontend **tidak perlu mengetahui RPC endpoint**

---

## 2.2 Integrasi Frontend ↔ Smart Contract

Frontend tetap bertanggung jawab untuk:

- Connect wallet (Core Wallet)
- Mengirim transaksi ke smart contract
- Menunggu confirmation dari blockchain

📌 Backend **tidak terlibat dalam write**

---

## 2.3 Deploy Smart Contract

```bash
npx hardhat run scripts/deploy.ts --network fuji
```

Output:

- Contract address
- Update konfigurasi frontend & backend

---

## 2.4 Deploy Backend (NestJS)

```bash
npm run build
npm run start:prod
```

Pastikan:

- API dapat diakses publik
- RPC & contract address benar

---

## 2.5 Deploy Frontend

```bash
npm run build
npm run start
```

Atau deploy ke platform frontend hosting.

---

## 2.6 Final Demo (Live)

Final demo mencakup:

- User membuka frontend
- Connect wallet
- Read data (via backend)
- Update data (via transaction)
- Backend menampilkan data terbaru

🔥 **Full stack dApp berjalan end-to-end**

---

# 3️⃣ Praktik / Homework (± 1 Jam)

## 🎯 Objective

Menyelesaikan **integrasi & deployment full stack dApp**.

---

### 🟢 Task 1 – Integrasi Frontend & Backend (Wajib)

- Frontend consume API backend
- Data blockchain tampil di UI

---

### 🟢 Task 2 – Integrasi Transaction (Wajib)

- User update state via wallet
- State berubah di blockchain
- Data terbaru terbaca kembali

---

### 🟢 Task 3 – Environment Config (Wajib)

- Pisahkan config local & production
- Gunakan `.env`

---

### 🟡 Task 4 – Deployment (Opsional)

- Deploy backend
- Deploy frontend
- Gunakan Fuji Testnet

---

### 🔵 Task 5 – Final Polish (Opsional)

- Loading state
- Error handling
- UI improvement sederhana

---

## 🧪 Checklist Akhir

- [ ] Smart contract terdeploy
- [ ] Backend API live
- [ ] Frontend dapat diakses
- [ ] Wallet connect berhasil
- [ ] Read & write blockchain sukses
- [ ] Full flow berjalan end-to-end

---

## ✅ Output Akhir Short Course

Setelah menyelesaikan Day 5, peserta:

- Memiliki **Full Stack Web3 dApp**
- Memahami:

  - Arsitektur dApp secara utuh
  - On-chain vs off-chain responsibility
  - Integrasi frontend, backend, dan blockchain
  - Deployment Web3 secara praktis

- Siap melanjutkan ke topik lanjutan:

  - Scaling
  - Indexing
  - Production-grade Web3 app

---

## 🎓 Penutup

🎉 **Selamat!**

Kamu telah menyelesaikan:

- Blockchain Fundamentals
- Smart Contract Development
- Frontend Web3
- Backend Web3
- Full Stack Integration & Deployment

🚀 **You are officially Full Stack Web3 Ready (Fundamental Level)**

---

## 📚 Referensi

- Avalanche Docs – [https://docs.avax.network](https://docs.avax.network)
- Hardhat – [https://hardhat.org](https://hardhat.org)
- viem – [https://viem.sh](https://viem.sh)
- NestJS – [https://docs.nestjs.com](https://docs.nestjs.com)
- Core Wallet – [https://core.app](https://core.app)

---

🔥 **Course selesai.**
Sekarang saatnya kamu **build, ship, dan iterate dApp Web3-mu sendiri** 🚀

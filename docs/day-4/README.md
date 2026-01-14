# 📘 Day 4 – Backend API dengan NestJS (Avalanche)

> Avalanche Indonesia Short Course – **Day 4**

Hari keempat difokuskan pada **Backend Layer** dalam arsitektur dApp.
Peserta akan mempelajari bagaimana **NestJS** digunakan untuk **meningkatkan UX**, melakukan **off-chain processing**, serta **membaca data blockchain secara efisien** menggunakan **viem**.

📌 Backend **tidak menggantikan smart contract**
📌 Backend **bukan source of truth**
📌 Smart contract **tetap pusat kebenaran**

---

## 🎯 Tujuan Pembelajaran

Pada akhir sesi Day 4, peserta mampu:

- Memahami **peran backend dalam arsitektur dApp**
- Memahami **mental model backend Web3**
- Menggunakan **NestJS** sebagai backend framework
- Menggunakan **viem di backend** (read-only)
- Menghubungkan backend dengan smart contract
- Mendesain **API Web2-like** di atas data blockchain
- Mengelola **event, caching, dan indexing sederhana**
- Membedakan **on-chain vs off-chain responsibility**

---

## 🧩 Studi Kasus

### Avalanche Simple Full Stack dApp – Backend Layer

Backend pada Day 4 berfungsi sebagai:

- Aggregator data blockchain
- API untuk frontend
- Layer performa & UX

📌 **Smart contract tetap source of truth**
📌 Backend hanya membaca & mengolah data

---

## ⏱️ Struktur Sesi (± 3 Jam)

| Sesi    | Durasi | Aktivitas                      |
| ------- | ------ | ------------------------------ |
| Theory  | 1 Jam  | Backend Web3 & Architecture    |
| Demo    | 1 Jam  | NestJS + viem + Smart Contract |
| Praktik | 1 Jam  | API Blockchain Mandiri         |

---

# 1️⃣ Theory

## 1.1 Kenapa dApp Butuh Backend?

Walaupun dApp bersifat terdesentralisasi, backend tetap dibutuhkan untuk:

- UX lebih cepat
- Query data kompleks
- Aggregation & formatting
- Caching data blockchain
- Integrasi dengan sistem Web2

📌 **Backend = UX enabler, bukan authority**

---

## 1.2 Mental Model Backend Web3 (WAJIB)

```text
Blockchain (Source of Truth)
   ↑ read
Backend (NestJS + viem)
   ↑ API
Frontend (Next.js)
   ↑ UI
User
```

❌ Backend **tidak mengirim transaksi user**
❌ Backend **tidak menyimpan private key user**

---

### 🔑 Golden Rule Backend Web3

Jika backend mati:

- Smart contract **harus tetap bisa digunakan**
- User **masih bisa berinteraksi via block explorer**

---

## 1.3 Backend Web2 vs Web3

| Backend Web2        | Backend Web3              |
| ------------------- | ------------------------- |
| Owns data           | Reads blockchain data     |
| Mutable database    | Immutable blockchain      |
| Server signs action | User signs transaction    |
| Auth via session    | Auth via wallet signature |

---

## 1.4 On-chain vs Off-chain Responsibility

| On-chain (Smart Contract) | Off-chain (Backend)    |
| ------------------------- | ---------------------- |
| Logic bisnis inti         | Query & aggregation    |
| State kritikal            | Caching                |
| Validasi keamanan         | Formatting data        |
| Trustless                 | Trusted infrastructure |

📌 **Jangan memindahkan logic penting ke backend.**

---

## 1.5 Backend Web3 Anti-Pattern

❌ Menyimpan private key user
❌ Menjalankan transaksi atas nama user
❌ Mengubah data blockchain
❌ Menjadi single source of truth

📌 Catatan:
Backend _boleh_ mengirim transaksi **hanya untuk automation system**
(cron / keeper / bot) dan **tidak menggantikan user intent**
_(tidak dibahas di short course ini)_

---

## 1.6 Kenapa NestJS?

NestJS dipilih karena:

- Struktur modular & scalable
- TypeScript-first
- Cocok untuk backend production
- Familiar untuk developer Web2

---

## 1.7 Web3 Library di Backend: viem

🔗 [https://viem.sh/](https://viem.sh/)

**viem** digunakan di backend untuk:

- Membuat **public client**
- Read smart contract (call)
- Fetch event & block data
- Query blockchain secara efisien

📌 Di backend **hanya gunakan read operation**

---

# 2️⃣ Demo (1 Jam)

## 2.1 Setup Backend Project

```bash
cd apps/backend
npm install
npm run start:dev
```

Akses API:

```text
http://localhost:4000
```

---

## 2.2 Struktur Backend

```text
apps/backend/
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   └── blockchain/
│       ├── blockchain.module.ts
│       ├── blockchain.service.ts
│       └── blockchain.controller.ts
```

---

## 2.3 Setup viem Public Client

Backend akan:

- Terhubung ke Avalanche Fuji RPC
- Membuat `publicClient`
- Digunakan oleh service

📌 Tidak memerlukan wallet atau private key.

---

## 2.4 Load Smart Contract

Menggunakan data dari Day 2:

- Contract address
- ABI JSON

Backend akan:

- Load ABI
- Konfigurasi contract
- Siap melakukan read-only call

---

## 2.5 API: Read Contract State

Contoh endpoint:

```http
GET /blockchain/value
```

Contoh response:

```json
{
  "value": 42,
  "blockNumber": 123456,
  "updatedAt": "2026-01-10T08:00:00Z"
}
```

📌 Frontend tidak perlu call blockchain langsung.

---

## 2.6 API: Fetch Event History

Demo:

- Fetch event `ValueUpdated`
- Gunakan block range
- Return list event untuk activity log UI

📌 Best practice:

- Jangan fetch dari block 0 setiap request
- Gunakan pagination / block range

---

## 2.7 Error Handling & RPC Failure

Dibahas:

- RPC timeout
- Network error
- Graceful fallback & error response

---

# 3️⃣ Praktik / Homework (1 Jam)

## 🎯 Objective

Membangun **backend API sederhana yang membaca data blockchain**.

---

### 🟢 Task 1 – Setup Blockchain Module (Wajib)

- Buat module `blockchain`
- Setup viem public client
- Konfigurasi Avalanche Fuji RPC

---

### 🟢 Task 2 – Read Smart Contract (Wajib)

- Buat endpoint `getValue()`
- Return JSON response

---

### 🟢 Task 3 – Event Query (Wajib)

- Endpoint event `ValueUpdated`
- Return blockNumber & value

---

### 🟡 Task 4 – API Design (Opsional)

- Pagination sederhana
- Response format konsisten
- Error handling rapi

---

### 🔵 Task 5 – Integration Test (Opsional)

- Test API via browser / Postman
- Pastikan response sesuai

---

## 🧪 Checklist

- [ ] Backend NestJS berjalan
- [ ] viem terhubung ke Fuji RPC
- [ ] API bisa read contract
- [ ] Event bisa di-fetch
- [ ] Frontend bisa consume API

---

## ✅ Output Day 4

Pada akhir Day 4, peserta:

- Memiliki backend API aktif
- Bisa membaca data blockchain via REST API
- Memahami:

  - Backend Web3 ≠ Backend Web2
  - On-chain vs off-chain responsibility
  - Peran backend dalam UX dApp
  - viem sebagai bridge ke blockchain

---

## 🚀 Preview Day 5

Di Day 5, kita akan:

- Integrasi frontend + backend + smart contract
- Deployment (Frontend, Backend, Contract)
- Environment & config production
- Best practice full stack dApp
- Final demo: **Full Stack Web3 dApp Live**

---

## 📚 Referensi

- viem: [https://viem.sh/](https://viem.sh/)
- NestJS Docs: [https://docs.nestjs.com/](https://docs.nestjs.com/)
- Avalanche Academy: [https://build.avax.network/academy](https://build.avax.network/academy)

---

🔥 **Backend siap.**
Besok kita satukan semuanya menjadi **Full Stack Web3 dApp** 🚀

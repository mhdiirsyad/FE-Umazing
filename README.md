# FE-Umazing - Frontend E-commerce/Marketplace

Aplikasi frontend untuk platform e-commerce/marketplace, dikembangkan menggunakan Vue 3, TypeScript, dan Vite. Aplikasi ini mencakup fungsionalitas untuk pengguna publik (guest), anggota terdaftar (member), dan panel administrasi (admin).

---

## Fitur Utama

Aplikasi ini memiliki fitur lengkap yang terbagi untuk tiga peran pengguna:

### 1. Fitur Publik (Guest)
* Melihat daftar semua produk.
* Pencarian dan filter produk berdasarkan kategori.
* Melihat detail produk.
* Halaman **Login** dan **Register**.

### 2. Fitur Anggota (Member)
* **Keranjang Belanja:** Menambahkan produk ke keranjang, memperbarui kuantitas, dan menghapus item.
* **Checkout:** Proses pembuatan pesanan dengan detail alamat pengiriman.
* **Manajemen Pesanan:** Melihat riwayat pesanan dan detail setiap pesanan.
* Melihat produk dan detail produk.

### 3. Fitur Administrator (Admin)
* **Dashboard Statistik:** Menampilkan ringkasan data seperti total pesanan sukses, total produk terjual, total pendapatan, dan daftar produk terlaris.
* **Manajemen Kategori:** Operasi **CRUD** (Create, Read, Update, Delete) untuk kategori produk.
* **Manajemen Produk:** Operasi **CRUD** untuk produk, termasuk upload gambar produk, pengaturan harga, stok, dan status.
* **Manajemen Pesanan:** Melihat daftar semua pesanan dan memperbarui status pesanan (misalnya: `pending`, `paid`, `shipped`, `success`, `canceled`).

---

## Teknologi yang Digunakan

| Kategori | Teknologi | Deskripsi |
| :--- | :--- | :--- |
| **Framework** | Vue 3 | Framework JavaScript progresif untuk membangun antarmuka pengguna. |
| **Bahasa** | TypeScript | Superset dari JavaScript yang menambahkan tip data statis. |
| **Build Tool** | Vite | Alat build cepat untuk pengembangan web modern. |
| **State Management** | Pinia | Perpustakaan state management yang intuitif untuk Vue. |
| **Routing** | Vue Router 4 | Sistem routing resmi untuk Vue.js. |
| **Styling** | Tailwind CSS & Flowbite | Kerangka CSS utility-first dan koleksi komponen UI berdasarkan Tailwind. |
| **HTTP Client** | Axios | Klien HTTP berbasis Promise untuk membuat permintaan ke API. |

---

## Prasyarat Instalasi

Pastikan Anda telah menginstal perangkat lunak berikut di mesin Anda:

* **Node.js** (Versi direkomendasikan: lihat `package.json` atau gunakan versi terbaru)
* **npm** atau **Yarn** atau **pnpm** (digunakan untuk mengelola dependensi)
* **Akses ke Backend API** (Diperlukan untuk semua fungsionalitas. Pastikan URL API dikonfigurasi).

## Instalasi dan Penggunaan

Ikuti langkah-langkah di bawah ini untuk mengatur dan menjalankan proyek:

### 1. Klon Repositori

```bash
git clone <https://github.com/mhdiirsyad/FE-Umazing>
cd fe-umazing

### 2. install dependencies
npm install

### 3. configuration
env Configuration
VITE_BACKEND_URL=<URL_BACKEND>

### 4. run 
npm run dev


# Deskripsi Proyek
Ini adalah aplikasi backoffice menggunakan stack angular yang mendemonstrasikan user-login, menampilkan list data, pembuatan form input, mengimplementasikan pengambilan data dengan pagination, pencarian, dan penyortiran menggunakan file data dummy yang disimpan di local storage lalu diolah semua proses create, read, update, delete, filtering, serta pagination dari sisi frontend.

## Fitur

- **Login**: Login ke aplikasi menggunakan dummy.json lalu data akan di simpan di state menggunakan behavior subject dan local-storage
- **List**: Menampilkan data dalam bentuk table list.
- **Form**: Membuat form data input menggunakan formGroup.
- **Filter Pencarian**: Mencari berdasarkan atribut karyawan (misalnya, username, nama depan, nama belakang).
- **Filter Penyortiran**: Menyortir berdasarkan atribut karyawan (misalnya, abjad atau numerik).
- **Filter Pagination**: Mengambil data dalam halaman dengan pengaturan `rowsPerPage` yang dapat disesuaikan.

## Prasyarat

Pastikan Anda memiliki hal-hal berikut yang terinstal sebelum menjalankan proyek:

- **Angular CLI**: Versi 19.2.8 atau lebih tinggi
- **Node.js**: Versi 22.14.0 atau lebih tinggi.
- **npm**: Node package manager (versi 10.9.2).

## Instalasi

### 1. Clone the repository

Clone this repository to your local machine by running:

```bash
git clone https://github.com/rizqifadila/fe-backoffice-krustycrab.git
```

### 2. Clone the repository
```bash
cd fe-backoffice-krustycrab
```

### 3. Install dependencies
```bash
npm install
```

### 4. Menjalankan Project
```bash
ng serve
```
atau
```bash
npm run start
```


## 🔐 Dummy User Login

Untuk keperluan pengujian aplikasi, tersedia beberapa akun dummy yang dapat digunakan untuk login. Berikut detailnya:

| Username | Password     | Position | Photo                          |
|----------|--------------|----------|--------------------------------|
| `frets`  | `123456`     | Staff    | `assets/images/user.png`       |
| `rizqi`  | `P@ssw0rd!!` | Manager  | `assets/images/user.png`       |
| `edi`    | `P@ssw0rd`   | Staff    | `assets/images/user.png`       |

### 📥 Cara Login

1. Jalankan aplikasi.
2. Arahkan ke halaman login (`/auth/login`).
3. Masukkan salah satu kombinasi **username** dan **password** dari tabel di atas.
4. Klik tombol **Login**.

> ✅ *Catatan: Semua user menggunakan foto profil default yang sama (`assets/images/user.png`).*



# Panduan Instalasi

Ikuti langkah-langkah di bawah ini untuk menginstal ImphnenOS sebagai sistem operasi utama di komputermu.

## 1. Persiapan Bootable USB
1. Unduh file ISO terbaru dari halaman [Download](/download).
2. Siapkan USB flashdisk dengan kapasitas minimal 4 GB.
3. *Flash* file ISO ke USB menggunakan balenaEtcher, Rufus (jika di Windows), atau perintah `dd` (di Linux).

## 2. Boot ke Live USB
1. Restart komputer dan masuk ke menu BIOS/UEFI.
2. Pastikan **Secure Boot** dinonaktifkan sementara.
3. Ubah prioritas boot agar USB flashdisk berada di urutan pertama.
4. Simpan pengaturan dan restart. Komputer akan boot ke tampilan awal ImphnenOS Live.

## 3. Proses Instalasi
Setelah berhasil boot ke Live Environment:
1. Buka aplikasi **Imphnen Installer** (Calamares) dari menu utama.
2. **Bahasa**: Pilih bahasa instalasi.
3. **Zona Waktu**: Pilih lokasi dan zona waktu kamu.
4. **Keyboard**: Pilih *layout* keyboard (default: English US).
5. **Partisi Disk**:
   - Pilih *Erase disk* jika ingin menjadikan ImphnenOS sebagai satu-satunya OS.
   - Atau *Manual partitioning* jika kamu tahu apa yang kamu lakukan (misalnya untuk BTRFS custom subvolumes).
6. **Pembuatan User**: Masukkan nama lengkap, username, nama komputer, dan password.
7. Klik **Install** dan tunggu proses selesai.

## 4. Selesai
Setelah instalasi selesai, centang opsi *Restart now*, lalu klik **Done**. Cabut USB flashdisk saat komputer mulai restart. Selamat datang di ImphnenOS!

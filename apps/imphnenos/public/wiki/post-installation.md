# Setelah Instalasi

Selamat! Kamu sekarang berhasil memasang ImphnenOS. Berikut adalah beberapa hal yang bisa kamu lakukan pertama kali setelah *boot* ke sistem baru kamu.

## 1. Update Sistem Pertama Kali
Karena ImphnenOS merupakan distro *rolling release* berbasis Arch Linux, sangat disarankan untuk melakukan *update* seluruh paket setelah instalasi segar.

Buka terminal (tekan `Super + Enter` pada Mango WM) lalu jalankan:
```bash
sudo pacman -Syu
```

## 2. Setting Mirror Tercepat (Opsional)
Untuk mempercepat proses unduhan dari *repository*, kamu dapat memilah *mirrors* tercepat di lokasimu:
```bash
sudo reflector --latest 5 --sort rate --save /etc/pacman.d/mirrorlist
```

## 3. Menghubungkan Akun GitHub / Git
ImphnenOS menyediakan skrip bawaan untuk mensetup identitas Git dan SSH keys dengan cepat:
```bash
imphnen-git-setup
```
Ikuti instruksi interaktif yang muncul di terminal untuk *setup* akun Git.

## 4. Install GPU Drivers Tambahan
Jika kamu menggunakan GPU NVIDIA, driver *open source* (Nouveau) mungkin sudah aktif. Untuk *proprietary driver* (untuk gaming atau CUDA rendering):
```bash
sudo pacman -S nvidia nvidia-utils
```
> [!NOTE]
> Kernel ImphnenOS sudah mendukung sebagian besar hardware modern secara *out of the box*.

# Masalah Umum (Common Issues)

Berikut adalah beberapa masalah yang sering dialami pengguna saat pertama kali menggunakan ekosistem berbasis Arch Linux, beserta solusinya.

## 1. Pacman "Failed to commit transaction (conflicting files)"
Masalah ini terjadi ketika paket pacman mencoba menginstal file yang ternyata sudah ada di sistem (bukan di-*track* oleh pacman).

**Solusi Aman:**
Cari tahu paket mana yang memiliki *file* tersebut dan *rename* file lokal yang bentrok, lalu jalankan `pacman -Syu` kembali.

**Solusi Paksa (Hati-hati):**
```bash
sudo pacman -Syu --overwrite "*"
```

## 2. Invalid or Corrupted Package (PGP Signature)
Terkadang *keyring* pada pacman kedaluwarsa, yang menyebabkan verifikasi tanda tangan digital (*signature*) gagal saat mencoba *update* atau menginstal paket.

**Solusi:** Update *keyring* ImphnenOS dan Arch Linux.
```bash
sudo pacman -Sy archlinux-keyring
sudo pacman -Syu
```

## 3. Resolusi Layar Tidak Sesuai
Ini bisa terjadi apabila kamu tidak menginstal *driver* GPU yang tepat, atau ada ketidaksesuaian dengan X11/Mango WM.

**Solusi Sementara:**
Gunakan `xrandr` untuk mendeteksi *output* dan memaksa resolusi, misalnya:
```bash
xrandr --output HDMI-1 --mode 1920x1080
```
> [!TIP]
> Untuk membuat perubahan layar menjadi permanen, simpan perintah `xrandr` tersebut di dalam `~/.config/mango/autostart.sh` atau script inisialisasi X11-mu.

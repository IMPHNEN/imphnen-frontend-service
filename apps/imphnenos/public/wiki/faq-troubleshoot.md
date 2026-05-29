# FAQ Teknis (Troubleshooting)

**T: Bagaimana cara mengembalikan konfigurasi default Mango WM jika saya merusaknya?**
J: Kami menyediakan skrip utilitas. Cukup jalankan perintah berikut di terminal:
```bash
imphnen-reset-wm
```
Ini akan mem-backup konfigurasimu yang rusak ke folder `.bak` dan mengembalikan versi *default* ImphnenOS.

**T: Kenapa suara/audio tidak keluar setelah instalasi?**
J: ImphnenOS menggunakan `PipeWire`. Coba pastikan servisnya berjalan, lalu cek melalui `pavucontrol` (PulseAudio Volume Control) yang sudah terinstall:
1. Buka terminal dan ketik `pavucontrol`
2. Pastikan di tab *Configuration* perangkat audio kamu tidak berstatus "Off".

**T: Apakah ImphnenOS mendukung Wayland?**
J: Saat ini Mango WM dibangun khusus di atas subsistem **X11**. Kami sedang bereksperimen dengan komposer berbasis Wayland untuk rilis masa depan, namun untuk sekarang stabilitas penuh ada pada X11.

**T: Mengapa koneksi Wi-Fi sering putus (*drop*)?**
J: Ini adalah *hardware-specific*. Pastikan *NetworkManager* berjalan dengan baik. Jika kamu menggunakan adaptor chipset Realtek, kamu mungkin perlu menginstal *driver* khusus dari AUR:
```bash
yay -S rtl8821ce-dkms-git
```
*(Ganti nama paket sesuai modul kartu jaringanmu)*

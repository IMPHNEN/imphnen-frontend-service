# Kustomisasi Window Manager

ImphnenOS secara eksklusif ditenagai oleh **Mango WM**, sebuah Tiling Window Manager super ringan yang dikonfigurasi melalui sebuah file *plain text*. Kamu memiliki kontrol 100% atas tampilan dan tata letak *environment* komputermu.

## File Konfigurasi

Semua konfigurasi Mango WM terletak pada satu file:
`~/.config/mango/config.conf`

Kamu bisa mengeditnya menggunakan Nano, Neovim, atau VS Code:
```bash
nano ~/.config/mango/config.conf
```

## Shortcut Dasar (Keybindings)

Secara default, tombol `Super` (Windows/Command) bertindak sebagai tombol modifier (MOD) utama.
- `Super + Enter`: Membuka Terminal (Alacritty)
- `Super + D`: Membuka App Launcher (Rofi)
- `Super + Shift + Q`: Menutup jendela (Kill window)
- `Super + Angka (1-9)`: Pindah ke Workspace 1-9
- `Super + Shift + Angka`: Memindahkan jendela aktif ke Workspace tersebut

Kamu bisa mengubah *keybindings* tersebut di dalam file konfigurasinya.

## Kustomisasi Tampilan (Theming)

ImphnenOS menggunakan tema warna "Imphnen-Dark" sebagai identitasnya. Jika kamu ingin mengubah palet warnanya:

1. Ubah variabel warna pada bagian `[Colors]` di `config.conf`.
2. Ubah konfigurasi warna Alacritty di `~/.config/alacritty/alacritty.toml`.
3. Gunakan *tool* seperti `lxappearance` untuk mengganti *icon pack* dan tema GTK (aplikasi grafis).

> [!NOTE]
> Setelah melakukan perubahan pada file konfigurasi Mango WM, pastikan untuk me-restart *window manager* dengan menekan `Super + Shift + R` agar perubahan teraplikasikan seketika tanpa harus *logout*.

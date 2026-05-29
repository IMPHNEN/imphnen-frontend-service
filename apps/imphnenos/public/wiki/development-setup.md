# Setup Development Environment

ImphnenOS hadir dengan perkakas esensial yang sudah siap digunakan untuk ngoding. Namun, beberapa preferensi mungkin berbeda untuk tiap-tiap orang.

## Pre-installed Tools
Kami sudah memasangkan dan men-tuning *tools* berikut:
- **Git** (dengan *credential helper* dan aliases)
- **Node.js** (LTS terbaru via `nvm`)
- **Docker** & **Docker Compose**
- **Python 3** (dengan `pip` dan `virtualenv`)
- **Neovim** (dengan konfigurasi LSP dan syntax highlighting dasar)

## Menjalankan Docker Tanpa Sudo
Secara default kamu mungkin perlu memanggil `sudo docker`. Jika ingin menjalankannya sebagai user biasa:
```bash
sudo usermod -aG docker $USER
```
*Logout* dan *login* kembali agar *group* tersebut teraplikasikan.

## Node Version Manager (NVM)
ImphnenOS secara bawaan menyediakan `nvm`. Kamu dapat berganti versi Node.js secara dinamis:
```bash
nvm install 20
nvm use 20
```

## IDE & Editor
Selain Neovim, kami menyediakan instalasi praktis untuk berbagai IDE:
- **Visual Studio Code (OSS)**: Sudah diinstal secara default.
- **IntelliJ / WebStorm**: Bisa kamu instal lewat AUR (`yay -S webstorm`).

Silakan modifikasi `~/.zshrc` untuk menyesuaikan alias terminal pengembanganmu!

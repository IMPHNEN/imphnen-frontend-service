# Manajemen Paket

ImphnenOS sangat mewarisi ekosistem Arch Linux, yang berarti paket dikelola menggunakan `pacman` dan dibantu oleh AUR helper yaitu `yay`.

## Menggunakan Pacman

`pacman` adalah package manager utama yang cepat dan *reliable*.

### Menginstal Paket
```bash
sudo pacman -S nama_paket
```

### Mengupdate Seluruh Sistem
```bash
sudo pacman -Syu
```

### Mencari Paket
```bash
pacman -Ss kata_kunci
```

### Menghapus Paket (beserta dependencies yang tidak terpakai)
```bash
sudo pacman -Rs nama_paket
```

---

## Arch User Repository (AUR)

Selain *repository* resmi, kamu memiliki akses ke ratusan ribu *software* yang dipelihara oleh komunitas melalui AUR. ImphnenOS menyertakan `yay` sebagai AUR Helper.

> [!TIP]
> Penggunaan `yay` sangat mirip dengan `pacman`. Bedanya, kamu **tidak boleh** menggunakan `sudo` saat memanggil `yay`. Ia akan meminta akses *root* jika diperlukan.

### Menginstal dari AUR
```bash
yay -S nama_paket_aur
```

### Mengupdate Seluruh Sistem + Paket AUR
```bash
yay -Syu
```

# Dual Boot dengan Windows

ImphnenOS mendukung dual boot secara berdampingan dengan Windows 10/11. Mengingat ImphnenOS berbasis Arch Linux dan menggunakan `grub`, prosesnya relatif serupa dengan distro populer lainnya.

## 1. Siapkan Partisi di Windows
Sebelum boot ke USB installer ImphnenOS:
1. Buka Windows dan cari *Disk Management*.
2. Klik kanan pada partisi utama (misalnya drive C:) dan pilih *Shrink Volume*.
3. Sisakan ruang yang tidak teralokasi (*Unallocated Space*) minimal **30 GB**.
4. Disable **Fast Startup** pada Windows Power Settings agar partisi Windows dapat di-*mount* dengan aman nantinya.

## 2. Boot ke Installer
Boot USB flashdisk seperti biasa. Pastikan **Secure Boot** sudah dinonaktifkan di pengaturan UEFI.

## 3. Instalasi ImphnenOS
Saat membuka installer Calamares:
1. Di bagian partisi disk, pilih opsi **Install Alongside** jika opsi ini tersedia, ATAU
2. Pilih **Manual Partitioning**:
   - Buat partisi `root` (`/`) dengan format ext4 atau btrfs pada ruang kosong (unallocated space) yang sudah disiapkan.
   - Gunakan partisi EFI (*EFI System Partition*) yang sudah ada dari Windows tanpa mem-formatnya. Mount sebagai `/boot/efi`.
3. Lanjutkan instalasi seperti biasa.

> [!WARNING]
> Sangat penting untuk **TIDAK** memformat partisi EFI bawaan Windows jika kamu melakukan *manual partitioning*.

Setelah instalasi selesai, GRUB akan mendeteksi partisi Windows dan secara otomatis menampilkannya sebagai opsi saat komputer baru dinyalakan.

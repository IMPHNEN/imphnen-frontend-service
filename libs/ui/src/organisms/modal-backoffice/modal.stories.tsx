import type { Meta, StoryObj } from '@storybook/react';
import { ModalBackoffice } from './modal-backoffice';
import { InputForm } from '../../molecules';
import { Button } from '../../atoms';

const meta: Meta<typeof ModalBackoffice> = {
  title: 'Organisms/Modal Backoffice',
  component: ModalBackoffice,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ModalBackoffice>;

export default meta;
type Story = StoryObj<typeof ModalBackoffice>;

export const Default: Story = {
  args: {
    // isOpen: true,
    // onClose: () => console.log('Modal closed'),
    // title: 'Sample Modal',
    children: (
      <>
        <h2 className="text-p1 font-semibold text-primary-500 mb-3">
          Modal Title
        </h2>
        <p className="text-p3 text-neutral-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas repellat
          rerum doloremque dolorem fugit architecto eos blanditiis ratione
          facere? Esse dolores inventore deleniti. Dicta voluptatem dolore vel
          quia amet dolorem?
        </p>
        <div className="flex flex-col gap-4"></div>
      </>
    ),
  },
};

export const TambahItemGacha: Story = {
  args: {
    children: (
      <div className="flex flex-col gap-8">
        <div>
          <h2 className="text-p1 font-semibold text-primary-500 mb-3">
            Tambah Item Gacha
          </h2>
          <p className="text-p3 text-neutral-400">
            Lengkapi detail di bawah ini untuk menambahkan item gacha
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <InputForm
            label="Nama Hadiah"
            type="text"
            placeholder="Masukkan Nama Hadiah"
            size="lg"
            className="w-full"
          />
          <InputForm
            label="Chance Rate"
            type="text"
            placeholder="Masukkan Chance Rate"
            size="lg"
            className="w-full"
          />
          <InputForm
            label="Foto Barang"
            type="text"
            placeholder=".jpg, .jpeg, atau .png"
            size="lg"
            className="w-full"
          />
        </div>
        <Button variant="primary" size="lg" className="w-full">
          Tambahkan Item
        </Button>
      </div>
    ),
  },
};

export const TambahItem: Story = {
  args: {
    children: (
      <div className="flex flex-col gap-8 text-center">
        <div>
          <h2 className="text-p1 font-semibold text-primary-500 mb-3">
            Tambah Item
          </h2>
          <p className="text-p3 text-neutral-400">
            Apakah kamu yakin ingin
            <br /> menambahkan item ini?
          </p>
        </div>
        <div className="flex gap-4">
          <Button variant="bordered" size="lg" className="w-full">
            Batal
          </Button>
          <Button variant="primary" size="lg" className="w-full">
            Tambahkan
          </Button>
        </div>
      </div>
    ),
  },
};

export const EditItemGacha: Story = {
  args: {
    children: (
      <div className="flex flex-col gap-8">
        <div>
          <h2 className="text-p1 font-semibold text-primary-500 mb-3">
            Edit Item Gacha
          </h2>
          <p className="text-p3 text-neutral-400">
            Silakan mengubah detail dari item yang diperlukan
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <InputForm
            label="Nama Hadiah"
            type="text"
            placeholder="Masukkan Nama Hadiah"
            size="lg"
            className="w-full"
          />
          <InputForm
            label="Chance Rate"
            type="text"
            placeholder="Masukkan Chance Rate"
            size="lg"
            className="w-full"
          />
          <InputForm
            label="Foto Barang"
            type="text"
            placeholder=".jpg, .jpeg, atau .png"
            size="lg"
            className="w-full"
          />
        </div>
        <Button variant="primary" size="lg" className="w-full">
          Perbarui Item
        </Button>
      </div>
    ),
  },
};

export const UpdateItem: Story = {
  args: {
    children: (
      <div className="flex flex-col gap-8 text-center">
        <div>
          <h2 className="text-p1 font-semibold text-primary-500 mb-3">
            Update Item
          </h2>
          <p className="text-p3 text-neutral-400">
            Apakah kamu yakin dengan
            <br /> perubahan yang dilakukan?
          </p>
        </div>
        <div className="flex gap-4">
          <Button variant="bordered" size="lg" className="w-full">
            Batal
          </Button>
          <Button variant="primary" size="lg" className="w-full">
            Update
          </Button>
        </div>
      </div>
    ),
  },
};

export const DeleteItem: Story = {
  args: {
    children: (
      <div className="flex flex-col gap-8 text-center">
        <img
          src="/chibi-delete.webp"
          alt="Delete item?"
          width={148}
          className="self-center"
        />
        <div>
          <h2 className="text-p1 font-semibold text-danger-500 mb-3">
            Delete Item
          </h2>
          <p className="text-p3 text-neutral-400">
            Apakah kamu yakin untuk menghapus item ini?
          </p>
        </div>
        <div className="flex gap-4">
          <Button variant="secondary" size="lg" className="w-full">
            Batal Hapus
          </Button>
          <Button variant="danger" size="lg" className="w-full">
            Hapus Item
          </Button>
        </div>
      </div>
    ),
  },
};

export const EditDataAkun: Story = {
  args: {
    children: (
      <div className="flex flex-col gap-8">
        <h2 className="text-p1 font-semibold text-primary-500 mb-3">
          Edit Data Akun
        </h2>

        <div className="flex flex-col gap-4">
          <InputForm
            label="Nama Lengkap"
            type="text"
            placeholder="Masukkan Nama Lengkap"
            value="Ahmad Wiyana"
            size="lg"
            className="w-full"
          />
          <InputForm
            label="Email"
            type="text"
            placeholder="Masukkan Email"
            value="fullname23@gmail.com"
            size="lg"
            className="w-full"
          />
          <InputForm
            label="Nomor Telepon"
            type="text"
            placeholder="Masukkan Nomor Telepon"
            value="081904423804"
            size="lg"
            className="w-full"
          />
          <InputForm
            label="Alamat"
            type="text"
            placeholder="Masukkan Alamat"
            value="Jl. Pantai Cibaduyut Indah"
            size="lg"
            className="w-full"
          />
        </div>
        <Button variant="primary" size="lg" className="w-full">
          Perbarui Data
        </Button>
      </div>
    ),
  },
};

export const UpdateDataAkun: Story = {
  args: {
    children: (
      <div className="flex flex-col gap-8 text-center">
        <div>
          <h2 className="text-p1 font-semibold text-primary-500 mb-3">
            Update Data
          </h2>
          <p className="text-p3 text-neutral-400">
            Apakah kamu yakin dengan
            <br /> perubahan yang dilakukan?
          </p>
        </div>
        <div className="flex gap-4">
          <Button variant="bordered" size="lg" className="w-full">
            Batal
          </Button>
          <Button variant="primary" size="lg" className="w-full">
            Update
          </Button>
        </div>
      </div>
    ),
  },
};

export const ValidasiTransaksi: Story = {
  args: {
    children: (
      <div className="flex flex-col gap-8">
        <h2 className="text-p1 font-semibold text-primary-500 ">
          Validasi Transaksi
        </h2>

        <InputForm
          label="Nomor Transaksi"
          type="text"
          placeholder="Masukkan Nomor Transaksi"
          value="2502133Y9AFVBO"
          size="lg"
          className="w-full"
        />
        <div className="flex gap-4">
          <Button
            variant="bordered"
            size="lg"
            className="w-full border-danger-500 text-danger-500 hover:border-danger-700 hover:text-danger-700"
          >
            Tidak Valid
          </Button>
          <Button variant="primary" size="lg" className="w-full">
            Valid
          </Button>
        </div>
      </div>
    ),
  },
};

export const ProsesDelivery: Story = {
  args: {
    children: (
      <div className="flex flex-col gap-8">
        <div>
          <h2 className="text-p1 font-semibold text-primary-500 mb-3">
            Delivery Process
          </h2>

          <p className="text-p3 text-neutral-400">
            Lakukan pengiriman hadiah gacha untuk pengguna di bawah ini, jika
            sudah ubah status menjadi “Delivered”.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <InputForm
            label="Nama Lengkap"
            type="text"
            placeholder="Masukkan Nama Lengkap"
            value="Ahmad Wiyana"
            size="lg"
            className="w-full"
          />
          <InputForm
            label="Item yang didapatkan"
            type="text"
            placeholder="Masukkan Nama Item"
            value="Lanyard + ID Card"
            size="lg"
            className="w-full"
          />
          <InputForm
            label="Alamat Pengiriman"
            type="text"
            placeholder="Masukkan Alamat Pengiriman"
            value="Jl. Pantai Cibaduyut Indah"
            size="lg"
            className="w-full"
          />
          <InputForm
            label="Status"
            type="text"
            placeholder="Isi Status Pengiriman"
            value="Lanyard + ID Card"
            size="lg"
            className="w-full"
          />
        </div>
        <Button variant="primary" size="lg" className="w-full">
          Tambahkan Item
        </Button>
      </div>
    ),
  },
};

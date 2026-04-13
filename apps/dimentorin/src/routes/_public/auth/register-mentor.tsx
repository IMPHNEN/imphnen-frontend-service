import { createFileRoute } from '@tanstack/react-router'
import { FC, ReactElement, useState } from 'react'
import { ControlledInputField, RegisterResetBanner } from '@imphnen-frontend-service/ui/organisms'
import { Button } from '@imphnen-frontend-service/ui/atoms'
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { InputField, RegisterMentorStep, SelectField } from '@imphnen-frontend-service/ui/molecules'

export const Route = createFileRoute('/_public/auth/register-mentor')({
  component: RegisterMentorPage,
})

function RegisterMentorPage(): ReactElement {
  const [ step, setStep ] = useState(1)

  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-[60px] px-[80px]">
      <div className="bg-white xl:min-w-[1130px] min-h-[712px] p-10 rounded-2xl shadow-md flex gap-6">
        <RegisterResetBanner />
        <div className="xl:border-2 xl:border-primary-500/50 xl:w-[726px] rounded-lg py-[32px] px-[48px] flex justify-center">
          <div className="xl:w-[714px]">
            <Button
              className='xl:hidden gap-3'
              variant='secondary'
            >
              <ArrowLeftOutlined />
              Login
            </Button>
            <RegisterMentorStep step={step} />
            <h3 className="mt-5 text-3xl font-semibold text-primary-500">
              Register
            </h3>
            <h5 className="text-primary-500 font-medium">
              Welcome to the team, Mentor - powered by IMPHNEN
            </h5>
            <form>
              <div className={`${step !== 1 ? 'hidden' : ''}`}>
                <div className='mt-7 mb-2'>
                  <InputField
                    label="Nama Lengkap"
                    size="lg"
                    className="w-full"
                    placeholder="Nama Lengkap"
                    name={'fullname'}
                  />
                </div>
                <SelectField
                  label="Jenis Kelamin"
                  defaultValue=""
                  size="lg"
                  error=""
                >
                  <option value="" disabled hidden>
                    Pilih Jenis Kelamin
                  </option>
                  <option value="laki-laki">Laki - Laki</option>
                  <option value="perempuan">Perempuan</option>
                </SelectField>
                <div className='my-2'>
                  <InputField
                    label="No Telp/Whatsapp Only"
                    size="lg"
                    className="w-full"
                    placeholder="Nama Lengkap"
                    name={'fullname'}
                  />
                </div>
                <SelectField
                  label="Domisili"
                  defaultValue=""
                  size="lg"
                  error=""
                >
                  <option value="" disabled hidden>
                    Pilih Domisili
                  </option>
                  <option value="aceh">Aceh</option>
                  <option value="jawa-selatan">Jawa Selatan</option>
                </SelectField>
                <div className='mt-2'>
                  <SelectField
                    label="Pendidikan Terakhir"
                    defaultValue=""
                    size="lg"
                    error=""
                  >
                    <option value="" disabled hidden>
                      Apa pendidikan terakhir senpai
                    </option>
                    <option value="SMA">SMA</option>
                    <option value="S1">S1</option>
                    <option value="S2">S2</option>
                    <option value="S3">S3</option>
                  </SelectField>
                </div>
              </div>
              <div className={`${step !== 2 ? 'hidden' : ''}`}>
                <div className='mt-7 mb-2 gap-2 flex flex-col'>
                  <InputField
                    label="Perusahaan Saat Ini"
                    size="lg"
                    className="w-full"
                    placeholder="Masukkan Perusahaan tempat kerja, Senpai~! ✨ (Pastikan tidak typo, ya~ 😆)"
                    name={'fullname'}
                  />
                  <InputField
                    label="Masukan jabatan senpai di perusahaan"
                    size="lg"
                    className="w-full"
                    placeholder="Masukan jabatan senpai di perusahaan"
                    name={'fullname'}
                  />
                  <SelectField
                    label="Topik Keahlian Yang Ingin Diajarkan"
                    defaultValue=""
                    size="lg"
                    error=""
                  >
                    <option value="" disabled hidden>
                      Apa yang ingin anda ajarkan senpaii
                    </option>
                    <option value="Frontend Developer">Frontend Developer</option>
                    <option value="Backend Developer">Backend Developer</option>
                    <option value="Other">Other</option>
                  </SelectField>
                  <InputField
                    label={`Jika Mengisi \u201COther\u201D, Tulis Topik yang Kamu Kuasai`}
                    size="lg"
                    className="w-full"
                    placeholder="Tolong isi jika tidak ada di pilihan senpai"
                    name={'fullname'}
                  />
                  <InputField
                    label="Skill Utama yang Kamu Miliki (boleh lebih dari satu)"
                    size="lg"
                    className="w-full"
                    placeholder="Isi Skill nya dong senpai"
                    name={'fullname'}
                  />
                </div>
              </div>
              <div className={`${step !== 3 ? 'hidden' : ''}`}>
                <div className='mt-7 mb-2 gap-2 flex flex-col'>
                  <SelectField
                    label="Durasi Sesi Mentoring"
                    defaultValue=""
                    size="lg"
                    error=""
                  >
                    <option value="" disabled hidden>
                      Placeholder
                    </option>
                  </SelectField>
                  <SelectField
                    label="Format Pengajaran yang Anda Sediakan"
                    defaultValue=""
                    size="lg"
                    error=""
                  >
                    <option value="" disabled hidden>
                      Placeholder
                    </option>
                  </SelectField>
                  <InputField
                    type="file"
                    label="Unggah Curiculum Vitae"
                    size="lg"
                    className="w-full"
                  />
                  <InputField
                    label="Unggah Portofolio"
                    size="lg"
                    className="w-full"
                    placeholder="Google Drive, Behance, GitHub, Notion, dan lainnya"
                  />
                  <InputField
                    type='number'
                    label="Honorarium yang Diharapkan per Sesi (Online) Durasi rata-rata sesi: 2,5\u20133 jam"
                    size="lg"
                    className="w-full"
                    placeholder="Isi Nominalnya dong senpaiii!!!"
                  />
                  <h6 className='text-xs'>Silahkan isi dalam angka (Contoh:500.000)</h6>
                </div>
              </div>
              <div className={`${step !== 4 ? 'hidden' : ''}`}>
                <div className='mt-7 mb-2 gap-2 flex flex-col'>
                  <InputField
                    type='email'
                    label="Email"
                    size="lg"
                    className="w-full"
                    placeholder="isi emailnya dong senpai!!!"
                  />
                  <InputField
                    type='password'
                    label="Buat Password"
                    size="lg"
                    className="w-full"
                    placeholder="Buat Password"
                  />
                  <InputField
                    type='password'
                    label="Buat Password"
                    size="lg"
                    className="w-full"
                    placeholder="Buat Password"
                  />
                </div>
              </div>
              <div className='flex justify-end mt-4 gap-2'>
                <Button
                  variant='secondary'
                  onClick={() => setStep(step - 1)}
                  type='button'
                  className={`${step === 1 ? 'hidden' : ''}`}
                >
                  <ArrowLeftOutlined />
                  Kembali
                </Button>
                <Button
                  variant='primary'
                  onClick={() => setStep(step + 1)}
                  type='button'
                  className={`${step === 4 ? 'hidden' : ''}`}
                >
                  Lanjutkan
                  <ArrowRightOutlined />
                </Button>
                <Button
                  variant='primary'
                  onClick={() => setStep(step + 1)}
                  type='button'
                  className={`${step === 4 ? '' : 'hidden'}`}
                >
                  Selesaikan
                  <ArrowRightOutlined />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

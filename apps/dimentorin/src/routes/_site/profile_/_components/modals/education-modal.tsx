import { FC, useEffect, useMemo, useState } from 'react';
import { ModalButton } from '../buttons/modal-button';

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  period: string;
}

interface EducationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialValue: Education[];
  onSave: (value: Education[]) => Promise<void>;
  isLoading?: boolean;
  showNotification?: (type: 'success' | 'error', title: string, message?: string) => void;
}

interface EducationFormData {
  institution: string;
  degree: string;
  field: string;
  startMonth: string;
  startYear: string;
  endMonth: string;
  endYear: string;
  isCurrentRole: boolean;
  description: string;
}

const MONTH_OPTIONS = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];

function buildYearOptions(): string[] {
  const currentYear = new Date().getFullYear();
  const years: string[] = [];
  for (let year = currentYear; year >= currentYear - 70; year -= 1) {
    years.push(String(year));
  }
  return years;
}

const YEAR_OPTIONS = buildYearOptions();

function parsePeriod(period: string) {
  const [startPart = '', endPart = ''] = period.split(' - ');
  const [startMonth = '', startYear = ''] = startPart.split(' ');
  const [endMonth = '', endYear = ''] = endPart.split(' ');

  return {
    startMonth,
    startYear,
    endMonth,
    endYear,
  };
}

function toInitialFormData(source?: Education): EducationFormData {
  if (!source) {
    return {
      institution: '',
      degree: '',
      field: '',
      startMonth: '',
      startYear: '',
      endMonth: '',
      endYear: '',
      isCurrentRole: false,
      description: '',
    };
  }

  const parsed = parsePeriod(source.period || '');

  return {
    institution: source.institution || '',
    degree: source.degree || '',
    field: source.field || '',
    startMonth: parsed.startMonth,
    startYear: parsed.startYear,
    endMonth: parsed.endMonth,
    endYear: parsed.endYear,
    isCurrentRole: false,
    description: '',
  };
}

function normalizeEducationFromForm(form: EducationFormData, existingId?: string): Education {
  const endValue = form.isCurrentRole ? 'Sekarang' : [form.endMonth, form.endYear].filter(Boolean).join(' ');
  const period = `${[form.startMonth, form.startYear].filter(Boolean).join(' ')} - ${endValue}`.trim();

  return {
    id: existingId || Date.now().toString(),
    institution: form.institution.trim(),
    degree: form.degree.trim(),
    field: form.field.trim(),
    period,
  };
}

export const EducationModal: FC<EducationModalProps> = ({
  isOpen,
  onClose,
  initialValue,
  onSave,
  isLoading = false,
  showNotification,
}) => {
  const firstEducation = useMemo(() => initialValue[0], [initialValue]);
  const [formData, setFormData] = useState<EducationFormData>(toInitialFormData(firstEducation));
  const [isSuccessState, setIsSuccessState] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setFormData(toInitialFormData(firstEducation));
    setIsSuccessState(false);
  }, [isOpen, firstEducation]);

  const handleCancel = () => {
    setFormData(toInitialFormData(firstEducation));
    setIsSuccessState(false);
    onClose();
  };

  const handleChange = (field: keyof EducationFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    const hasMissingRequired = !formData.institution.trim() || !formData.degree.trim() || !formData.field.trim()
      || !formData.startMonth || !formData.startYear || (!formData.isCurrentRole && (!formData.endMonth || !formData.endYear));

    if (hasMissingRequired) {
      showNotification?.('error', 'Data Tidak Lengkap', 'Mohon lengkapi semua data pendidikan wajib.');
      return;
    }

    try {
      const nextEducation = normalizeEducationFromForm(formData, firstEducation?.id);
      const updated = firstEducation
        ? [nextEducation, ...initialValue.slice(1)]
        : [nextEducation, ...initialValue];

      await onSave(updated);
      setIsSuccessState(true);
    } catch (error) {
      console.error('Save failed:', error);
      showNotification?.('error', 'Gagal Menyimpan', 'Terjadi kesalahan saat menyimpan pendidikan.');
    }
  };

  const finishSuccess = () => {
    setIsSuccessState(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      <button
        className="absolute inset-0 bg-black/20"
        onClick={handleCancel}
        aria-label="Close modal"
        type="button"
      />

      <div className="relative max-h-[90vh] w-full max-w-[520px] overflow-y-auto rounded-2xl bg-[#F1F1F1] p-5 sm:p-6">
        <div className="rounded-[6px] bg-[#DFECF7] px-4 py-2">
          <h2 className="text-xl font-semibold leading-7 text-[#4B4B4B]">Education</h2>
        </div>

        {isSuccessState ? (
          <div className="pt-10 text-center">
            <div className="mx-auto flex h-23 w-23 items-center justify-center rounded-full bg-[#B7F0B1]">
              <div className="flex h-15 w-15 items-center justify-center rounded-full bg-[#2DB84D]">
                <svg viewBox="0 0 24 24" className="h-8 w-8 text-white" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
            </div>
            <p className="mt-5 text-lg font-medium leading-7 text-[#2DB84D]">Pendidikan berhasil ditambahkan</p>
            <ModalButton
              variant="primary"
              onClick={finishSuccess}
              className="mt-8 h-12 w-full text-base"
            >
              Selesai
            </ModalButton>
          </div>
        ) : (
          <div className="space-y-4 pt-8">
            <h3 className="text-base font-semibold text-[#4B4B4B]">Informasi Pendidikan</h3>

            <label className="flex items-center gap-2 text-sm text-[#757575]">
              <input
                type="checkbox"
                checked={formData.isCurrentRole}
                onChange={(e) => handleChange('isCurrentRole', e.target.checked)}
                className="h-4 w-4 rounded border border-[#BDBDBD]"
              />
              Ini adalah role saya saat ini
            </label>

            <div>
              <label className="mb-2 block text-base font-medium leading-6 text-[#4B4B4B]">Universitas/Sekolah</label>
              <input
                value={formData.institution}
                onChange={(e) => handleChange('institution', e.target.value)}
                placeholder="Mis: Universitas Galatama"
                className="h-12 w-full rounded-[6px] border border-[#C8C8C8] bg-[#F1F1F1] px-4 text-base text-[#4B4B4B] placeholder:text-[#B8B8B8] focus:border-[#23A1EB] focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-base font-medium leading-6 text-[#4B4B4B]">Gelar</label>
              <input
                value={formData.degree}
                onChange={(e) => handleChange('degree', e.target.value)}
                placeholder="Mis: Sarjana"
                className="h-12 w-full rounded-[6px] border border-[#C8C8C8] bg-[#F1F1F1] px-4 text-base text-[#4B4B4B] placeholder:text-[#B8B8B8] focus:border-[#23A1EB] focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-base font-medium leading-6 text-[#4B4B4B]">Jurusan</label>
              <input
                value={formData.field}
                onChange={(e) => handleChange('field', e.target.value)}
                placeholder="Mis: Teknik Informatika"
                className="h-12 w-full rounded-[6px] border border-[#C8C8C8] bg-[#F1F1F1] px-4 text-base text-[#4B4B4B] placeholder:text-[#B8B8B8] focus:border-[#23A1EB] focus:outline-none"
              />
            </div>

            <h3 className="pt-2 text-base font-semibold text-[#4B4B4B]">Periode Pendidikan</h3>

            <div>
              <p className="mb-2 text-base font-medium leading-6 text-[#4B4B4B]">Tanggal Mulai</p>
              <div className="grid grid-cols-2 gap-3">
                <select
                  value={formData.startMonth}
                  onChange={(e) => handleChange('startMonth', e.target.value)}
                  className="h-12 rounded-[6px] border border-[#C8C8C8] bg-[#F1F1F1] px-4 text-base text-[#4B4B4B]"
                >
                  <option value="">Bulan</option>
                  {MONTH_OPTIONS.map((month) => (
                    <option key={month} value={month}>{month}</option>
                  ))}
                </select>
                <select
                  value={formData.startYear}
                  onChange={(e) => handleChange('startYear', e.target.value)}
                  className="h-12 rounded-[6px] border border-[#C8C8C8] bg-[#F1F1F1] px-4 text-base text-[#4B4B4B]"
                >
                  <option value="">Tahun</option>
                  {YEAR_OPTIONS.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>

            {!formData.isCurrentRole && (
              <div>
                <p className="mb-2 text-base font-medium leading-6 text-[#4B4B4B]">Tanggal Berakhir</p>
                <div className="grid grid-cols-2 gap-3">
                  <select
                    value={formData.endMonth}
                    onChange={(e) => handleChange('endMonth', e.target.value)}
                    className="h-12 rounded-[6px] border border-[#C8C8C8] bg-[#F1F1F1] px-4 text-base text-[#4B4B4B]"
                  >
                    <option value="">Bulan</option>
                    {MONTH_OPTIONS.map((month) => (
                      <option key={month} value={month}>{month}</option>
                    ))}
                  </select>
                  <select
                    value={formData.endYear}
                    onChange={(e) => handleChange('endYear', e.target.value)}
                    className="h-12 rounded-[6px] border border-[#C8C8C8] bg-[#F1F1F1] px-4 text-base text-[#4B4B4B]"
                  >
                    <option value="">Tahun</option>
                    {YEAR_OPTIONS.map((year) => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            <div>
              <label className="mb-2 block text-base font-medium leading-6 text-[#4B4B4B]">Deskripsi</label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                rows={5}
                placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                className="w-full resize-none rounded-[6px] border border-[#C8C8C8] bg-[#F1F1F1] px-4 py-3 text-sm leading-6 text-[#4B4B4B] placeholder:text-[#B8B8B8] focus:border-[#23A1EB] focus:outline-none"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <ModalButton
                variant="secondary"
                onClick={handleCancel}
                className="w-27.5"
                disabled={isLoading}
              >
                Batal
              </ModalButton>
              <ModalButton
                variant="primary"
                onClick={handleSave}
                className="w-27.5"
                disabled={isLoading}
                loading={isLoading}
              >
                {isLoading ? 'Menyimpan...' : 'Simpan'}
              </ModalButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

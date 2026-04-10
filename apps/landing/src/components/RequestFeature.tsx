import { useState } from 'react';

export default function RequestFeature() {
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState('');
  const maxDescriptionLength = 10000;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center rounded-lg bg-white text-gray-900 px-6 py-3 text-sm font-medium hover:bg-gray-100 transition-colors"
      >
        Request Fitur
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />
          <div className="relative bg-white rounded-xl p-6 w-full max-w-[600px] mx-4 shadow-xl">
            <h2 className="text-2xl font-bold mb-6">Request Fitur</h2>
            <form className="grid items-start gap-8">
              <div className="grid gap-4">
                <label htmlFor="namaFitur" className="font-medium text-sm">
                  Nama Fitur *
                </label>
                <input
                  id="namaFitur"
                  placeholder="Masukkan nama fitur yang diinginkan"
                  className="h-11 rounded-lg border border-input bg-background px-3 text-sm"
                />
              </div>

              <div className="grid gap-4">
                <div className="flex justify-between items-center">
                  <label htmlFor="deskripsiFitur" className="font-medium text-sm">
                    Deskripsi Fitur *
                  </label>
                  <span className="text-sm text-gray-500">
                    {description.length}/{maxDescriptionLength}
                  </span>
                </div>
                <textarea
                  id="deskripsiFitur"
                  placeholder="Jelaskan fitur yang Anda inginkan secara detail"
                  maxLength={maxDescriptionLength}
                  rows={6}
                  className="min-h-[150px] rounded-lg border border-input bg-background px-3 py-2 text-sm"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <p className="text-sm text-gray-500 -mt-2">
                  Jelaskan manfaat dan cara kerja fitur yang Anda inginkan
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  Kirim Permintaan
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center rounded-lg border border-input bg-background px-6 py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

import { FC, ReactElement } from 'react';

export const Components: FC = (): ReactElement => {
  return (
    <main className="w-full px-[48px] py-[40px] flex flex-col gap-8">
      {/* Dashboard Header */}
      <div className="bg-white rounded-md shadow p-4">
        <h1 className="text-xl font-medium">Dashboard</h1>
      </div>

      {/* Summary Section */}
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-medium">Summary</h2>
        <div className="grid grid-cols-2 gap-4">
          {/* Summary Cards */}
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="bg-white rounded-md shadow p-4 flex items-center"
            >
              <div className="mr-4 text-primary-500">
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 4L4 8L12 12L20 8L12 4Z" fill="currentColor" />
                  <path d="M4 12L12 16L20 12" fill="currentColor" />
                  <path d="M4 16L12 20L20 16" fill="currentColor" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold">1000</h3>
                <p className="text-sm text-gray-500">Total Participants</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gacha Items Section */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium">Gacha Items</h2>
          <button className="bg-primary-500 text-white px-4 py-2 rounded-md flex items-center gap-2">
            <span>Tambah Item</span>
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4V20M4 12H20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Gacha Items List */}
        <div className="flex flex-col gap-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="bg-white rounded-md shadow p-4 flex justify-between items-center"
            >
              <div className="flex items-center gap-4">
                <img
                  src="/gacha/lanyard-id-card.png"
                  alt="Lanyard IMPHNEN"
                  className="w-20 h-20 object-contain"
                />
                <div>
                  <h3 className="font-medium">Lanyard IMPHNEN</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>Prize {item}</span>
                    <span>•</span>
                    <span>Chance Rate: (1%)</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="text-gray-500 hover:text-primary-500">
                  Edit
                </button>
                <button className="text-gray-500 hover:text-red-500">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right side illustration */}
      <div className="fixed right-8 bottom-8 pointer-events-none z-0">
        <div className="grid grid-cols-3 gap-2">
          <img
            src="/gacha/lanyard-id-card.png"
            alt="Lanyard"
            className="w-24 h-24 object-contain"
          />
          <img
            src="/gacha/pin.png"
            alt="Pin"
            className="w-24 h-24 object-contain"
          />
          <img
            src="/gacha/sticker.png"
            alt="Sticker"
            className="w-24 h-24 object-contain"
          />
          <img
            src="/gacha/certificate.png"
            alt="Certificate"
            className="w-24 h-24 object-contain"
          />
          <img
            src="/gacha/gelang-karet.png"
            alt="Gelang Karet"
            className="w-24 h-24 object-contain"
          />
        </div>
      </div>
    </main>
  );
};

export default Components;

import { ArrowDownOutlined } from '@ant-design/icons';
import { Button } from '@imphnen-frontend-service/ui/atoms';
import { FC, ReactElement } from 'react';

export const Components: FC = (): ReactElement => {
  return (
    <main className="w-full px-[48px] py-[40px] flex flex-col gap-8">
      {/* Dashboard Header */}
      <header className="bg-white py-4 px-8 rounded-md shadow p-4">
        <h1 className="text-p2 font-semibold">Dashboard</h1>
      </header>

      <div className="flex justify-between gap-[40px] p-8 bg-white rounded-md">
        <div className="w-full flex flex-col gap-[40px]">
          {/* Summary Section */}
          <section>
            <h2 className="text-p2 font-medium text-primary-500 mb-8">
              Summary
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {/* Summary Cards */}
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="bg-white rounded-md shadow py-3 px-6 flex items-center"
                >
                  <div className="mr-4 text-primary-500 bg-primary-100 p-[8px] rounded border border-neutral-100">
                    <ArrowDownOutlined className="text-[20px]" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-p1 font-semibold">1000</h3>
                    <p className="text-label1 text-neutral-500">
                      Total Participants
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Gacha Items Section */}
          <section className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h2 className="text-p2 font-medium text-primary-500">
                Gacha Items
              </h2>
              <Button variant="primary"></Button>
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
          </section>
        </div>

        {/* Right-side illustration */}
        <img src="gacha.png" alt="" width={436} className="rounded-md" />
      </div>
    </main>
  );
};

export default Components;

import { ArrowDownOutlined, PlusOutlined } from '@ant-design/icons';
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
                  className="bg-white rounded-lg shadow-sm py-4 px-6 flex items-center border border-neutral-100"
                >
                  <div className="mr-4 text-primary-500 bg-primary-100 p-[8px] rounded-md">
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
          <section className="flex flex-col gap-8">
            <div className="flex justify-between items-center">
              <h2 className="text-p2 font-medium text-primary-500">
                Gacha Items
              </h2>
              <Button variant="primary" size="sm" className="items-end gap-3">
                <span>Tambah Item</span>
                <PlusOutlined className="text-[16px]" />
              </Button>
            </div>

            {/* Gacha Items List */}
            <div className="flex flex-col gap-4 max-h-140 overflow-auto">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="bg-white max-h-[80px] overflow-clip rounded-lg shadow-sm flex justify-between border border-neutral-100"
                >
                  <div className="flex flex-col py-4 px-6 gap-4">
                    <div>
                      <h3 className="text-p3 text-primary-500 font-medium">
                        Lanyard IMPHNEN
                      </h3>
                      <div className="flex items-center gap-2 text-label2 text-gray-500 mt-1">
                        <span>Prize {item}</span>
                        <span>Chance Rate: (0.1%)</span>
                      </div>
                    </div>
                    <div className="flex justify-start gap-2">
                      <Button
                        variant="text"
                        size="sm"
                        className="text-[10px] text-neutral-500 p-0 font-normal hover:bg-transparent hover:text-primary-500"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="text"
                        size="sm"
                        className="text-[10px] text-neutral-500 p-0 font-normal hover:bg-transparent hover:text-red-500"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>

                  {/* Lebih baik gunakan gambar yang sudah di-clip dengan size height: 78px daripada hard-code object-position dan margin */}
                  <img
                    src="gacha-clip.png"
                    alt="Lanyard IMPHNEN"
                    className="h-full"
                  />
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right-side illustration */}
        <img
          src="gacha.png"
          alt=""
          className="rounded-lg min-w-[436px] h-auto object-cover"
        />
      </div>
    </main>
  );
};

export default Components;

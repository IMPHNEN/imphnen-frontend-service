import { StarFilled } from "@ant-design/icons";
import { For } from "@imphnen-frontend-service/utils";
import { FC } from "react";

const SENPAI_STATISTIC = [
  { name: 'Total Sessions', count: 8 },
  { name: 'Mentee Impact', count: 1000 },
  { name: 'Response Time', count: '30 Minute' }
]

export const StatisticsSection: FC = () => {
  return (
    <div className="md:mb-10">
      <h2 className="text-xs font-semibold mb-3 md:text-[15px] xl:text-[19px]">Senpai Statistics</h2>
      <div className="grid gap-4 xl:flex">
        <For data={SENPAI_STATISTIC}>
          {(item, index) => (
            <div key={index} className="px-2.5 py-2 border border-primary-50 rounded-md shadow flex items-center gap-x-2.5">
              <div
                className="bg-gradient-to-tr from-primary-500 to-primary-200 rounded-sm text-white size-7 flex justify-center items-center xl:size-[29.4px]"
              >
                <StarFilled className="text-sm" />
              </div>
              <div>
                <p className="text-[10px] text-neutral-600 font-medium md:text-xs xl:font-semibold">{item.count}</p>
                <p className="text-[8px] text-neutral-800 md:text-[10px]">{item.name}</p>
              </div>
            </div>
          )}
        </For>
      </div>
    </div>
  )
};
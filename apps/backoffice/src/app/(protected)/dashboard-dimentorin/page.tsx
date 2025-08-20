import { Button } from "@imphnen-frontend-service/ui/atoms";
import { BackofficeWrapper } from "@imphnen-frontend-service/ui/organisms";
import { For } from "@imphnen-frontend-service/utils";
import { ReactElement } from "react";
import { UserGrowthChart } from "./_components/chart/user-growth";
import { SessionStatusChart } from "./_components/chart/session-status";

const Overview = () => {
  return (
    <div className="bg-white px-6 py-4 rounded-md shadow">
      <h3 className="text-primary-500 text-p2 font-semibold mb-2.5">0</h3>
      <p className="text-neutral-400 text-p3">Total Users</p>
    </div>
  )
}

export default function Components(): ReactElement {
  return (
    <BackofficeWrapper title="Dimentorin.dev">
      <h1 className="text-p1 font-semibold text-neutral-700 mb-5">Overview</h1>

      <div className="space-y-14">
        <div>
          <Button type="button" size="sm" variant="bordered" className="bg-white text-md text-neutral-900 mb-5 border-primary-200">
            Overview
          </Button>

          <div className="grid grid-cols-5 gap-5">
            <For data={Array.from({ length: 5 })}>
              {(_, index) => <Overview key={index} />}
            </For>
          </div>
        </div>

        <div>
          <Button type="button" size="sm" variant="bordered" className="bg-white text-md text-neutral-900 mb-5 border-primary-200">
            Trends & Analytics
          </Button>

          <div className="grid grid-cols-7 gap-x-5">
            <div className="bg-white px-6 py-4 rounded-lg col-span-5">
              <div className="flex items-center justify-between mb-7">
                <h2 className="font-semibold text-p3 text-neutral-700">User Growth</h2>
                <div></div>
              </div>
              <UserGrowthChart />
            </div>
            <div className="bg-white px-6 py-4 rounded-lg col-span-2">
              <h2 className="font-semibold text-p3 text-neutral-700 mb-7">Session Status</h2>
              <SessionStatusChart />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-5">
          <div className="bg-white px-7 py-4 rounded-lg">
            <h2 className="font-semibold text-p3 text-neutral-700 mb-5">Top 5 Mentors</h2>

            <div>
              <table className="w-full">
                <thead>
                  <tr className="text-label1 bg-primary-50 text-left rounded-full">
                    <th className="font-medium py-4 px-5 w-[10%] rounded-l-lg">No.</th>
                    <th className="font-medium py-4 px-5 w-3/5">Nama Lengkap</th>
                    <th className="font-medium py-4 px-5 rounded-r-lg">Avg Rating</th>
                  </tr>
                </thead>

                <tbody>
                  <For data={Array.from({ length: 5 })}>
                    {(_, index) => (
                      <tr key={index} className="shadow rounded-lg">
                        <td className="py-4 px-5">{index + 1}</td>
                        <td className="py-4 px-5">Mursid Al-Catraz</td>
                        <td className="py-4 px-5">4.9</td>
                      </tr>
                    )}
                  </For>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white px-6 py-4 rounded-lg">
            <h2 className="font-semibold text-p3 text-neutral-700 mb-5">Top Booked Mentoring Topics</h2>

            <div>
              <table className="w-full">
                <thead>
                  <tr className="text-label1 bg-primary-50 text-left font-medium">
                    <th className="font-medium py-4 px-5 w-[10%] rounded-l-lg">No.</th>
                    <th className="font-medium py-4 px-5 w-3/5">Nama Lengkap</th>
                    <th className="font-medium py-4 px-5 rounded-r-lg">Total Sesi</th>
                  </tr>
                </thead>

                <tbody>
                  <For data={Array.from({ length: 5 })}>
                    {(_, index) => (
                      <tr key={index} className="shadow rounded-lg">
                        <td className="py-4 px-5">{index + 1}</td>
                        <td className="py-4 px-5">Mursid Al-Catraz</td>
                        <td className="py-4 px-5">1000</td>
                      </tr>
                    )}
                  </For>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </BackofficeWrapper>
  )
}
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

type ChartProps = {
  name: string
  activeUser: number
  activeSession: number
}

const chartData: ChartProps[] = [
  { name: "2014", activeUser: 0, activeSession: 0 },
  { name: "2015", activeUser: 15, activeSession: 25 },
  { name: "2016", activeUser: 30, activeSession: 40 },
  { name: "2017", activeUser: 45, activeSession: 55 },
  { name: "2018", activeUser: 60, activeSession: 70 },
  { name: "2019", activeUser: 75, activeSession: 85 },
  { name: "2020", activeUser: 90, activeSession: 95 },
  { name: "2021", activeUser: 85, activeSession: 80 },
  { name: "2022", activeUser: 95, activeSession: 90 },
  { name: "2023", activeUser: 100, activeSession: 100 },
]

export const UserGrowthChart = () => {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart data={chartData} width={500} height={320} margin={{ left: -32 }}>
        <CartesianGrid />
        <XAxis dataKey="name" />
        <YAxis tickCount={10} />
        <Tooltip />
        <Legend />
        <Line dataKey="activeUser" stroke="#23A1EB" />
        <Line dataKey="activeSession" stroke="#0877C1" />
      </LineChart>
    </ResponsiveContainer>
  )
}
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { PieLabelProps } from "recharts/types/polar/Pie"

type ChartProps = {
  name: string
  value: number
  color: string
}

const chartData: ChartProps[] = [
  { name: "Active", value: 49, color: "#23A1EB" },
  { name: "Done", value: 24, color: "#81CBF8" },
  { name: "Canceled", value: 27, color: "#BCE1FB" },
]

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: PieLabelProps) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${((percent ?? 1) * 100).toFixed(0)}%`}
    </text>
  );
};

export const SessionStatusChart = () => {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <PieChart width={500} height={320}>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={40}
          outerRadius={100}
          labelLine={false}
          label={renderCustomizedLabel}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  )
}

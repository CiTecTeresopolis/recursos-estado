import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface ResourceData {
  Recurso: string;
  Valor: number;
}

interface TopResourcesChartProps {
  data: ResourceData[];
}

const COLORS = [
  "#3b82f6",
  "#3b82f6",
  "#3b82f6",
  "#3b82f6",
  "#3b82f6",
  "#60a5fa",
  "#60a5fa",
  "#60a5fa",
  "#93c5fd",
  "#93c5fd",
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const value = payload[0].value;
    return (
      <div className="bg-white rounded-lg p-3 shadow-lg border border-gray-100">
        <p className="text-sm font-semibold text-gray-900">
          R$ {value.toLocaleString("pt-BR")}
        </p>
      </div>
    );
  }
  return null;
};

export default function TopResourcesChart({ data }: TopResourcesChartProps) {
  return (
    <div
      className="relative group overflow-hidden bg-white text-gray-900 rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-500 animate-fade-in"
      style={{ animationDelay: "300ms" }}
    >
      <div className="relative z-10">
        <h3 className="text-lg font-semibold font-poppins mb-1 text-gray-900">
          Top 10 Recursos Transferidos
        </h3>
        <p className="text-xs text-gray-500 mb-6">
          Principais recursos transferidos para o estado
        </p>

        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data} layout="vertical">
            <CartesianGrid
              strokeDasharray="0"
              stroke="#f3f4f6"
              horizontal={false}
              opacity={1}
            />
            <XAxis
              type="number"
              tick={{ fill: "#6b7280", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={value => `${(value / 1_000_000).toFixed(0)}M`}
            />
            <YAxis
              dataKey="Recurso"
              type="category"
              width={170}
              tick={{ fill: "#6b7280", fontSize: 11, fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={false} />
            <Bar dataKey="Valor" radius={[0, 8, 8, 0]} isAnimationActive={true}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

import { formatNumber } from "@/util/FormatarDinheiro";
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

interface StructureData {
  Estrutura: string;
  Valor: number;
}

interface StructureChartProps {
  data: StructureData[];
}

const COLORS = ["#3b82f6", "#60a5fa", "#93c5fd", "#bfdbfe", "#dbeafe"];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const value = payload[0].value;
    return (
      <div className="bg-white rounded-lg p-3 shadow-lg border border-gray-100">
        <p className="text-sm font-semibold text-gray-900">
          R$ {formatNumber(value)}
        </p>
      </div>
    );
  }
  return null;
};

export default function StructureChart({ data }: StructureChartProps) {
  return (
    <div
      className="relative group overflow-hidden bg-white text-gray-900 rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-500 animate-fade-in"
      style={{ animationDelay: "200ms" }}
    >
      <div className="relative z-10">
        <h3 className="text-lg font-semibold font-poppins mb-1 text-gray-900">
          Recursos por Modalidade
        </h3>
        <p className="text-xs text-gray-500 mb-6">
          Distribuição por Modalidade
        </p>

        <ResponsiveContainer width="100%" height={280}>
          <BarChart
            data={data}
            margin={{ top: 10, right: 20, left: 0, bottom: 50 }}
          >
            <CartesianGrid
              strokeDasharray="0"
              stroke="#f3f4f6"
              vertical={false}
              opacity={1}
            />
            <XAxis
              dataKey="Estrutura"
              angle={-45}
              textAnchor="end"
              height={80}
              tick={{ fill: "#6b7280", fontSize: 12, fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#6b7280", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={value => `${(value / 1_000_000).toFixed(0)}M`}
            />
            <Tooltip content={<CustomTooltip />} cursor={false} />
            <Bar dataKey="Valor" radius={[8, 8, 0, 0]} isAnimationActive={true}>
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

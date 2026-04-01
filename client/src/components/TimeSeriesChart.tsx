import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface TimeSeriesData {
  Mes: string;
  Valor: number;
}

interface TimeSeriesChartProps {
  data: TimeSeriesData[];
}

const MONTH_NAMES: Record<string, string> = {
  "01": "Jan",
  "02": "Fev",
  "03": "Mar",
  "04": "Abr",
  "05": "Mai",
  "06": "Jun",
  "07": "Jul",
  "08": "Ago",
  "09": "Set",
  "10": "Out",
  "11": "Nov",
  "12": "Dez",
};

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

export default function TimeSeriesChart({ data }: TimeSeriesChartProps) {
  const formattedData = data.map(item => ({
    ...item,
    MesLabel: MONTH_NAMES[item.Mes] || item.Mes,
  }));

  return (
    <div
      className="relative group overflow-hidden bg-white text-gray-900 rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-500 animate-fade-in"
      style={{ animationDelay: "100ms" }}
    >
      <div className="relative z-10">
        <h3 className="text-lg font-semibold font-poppins mb-1 text-gray-900">
          Evolução Mensal
        </h3>
        <p className="text-xs text-gray-500 mb-6">
          Tendência de liberação ao longo do ano
        </p>

        <ResponsiveContainer width="100%" height={280}>
          <AreaChart
            data={formattedData}
            margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorValor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#219ebc" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#219ebc" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="0"
              stroke="#f3f4f6"
              vertical={false}
              opacity={1}
            />
            <XAxis
              dataKey="MesLabel"
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
            <Area
              type="monotone"
              dataKey="Valor"
              stroke="#219ebc"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorValor)"
              isAnimationActive={true}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

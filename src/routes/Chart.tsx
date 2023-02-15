import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atom";

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}
interface ChartProps {
  coinId: string;
}
function Chart({ coinId }: ChartProps) {
  const isDark = useRecoilValue(isDarkAtom);
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );

  const series = [
    {
      data: data?.map((price) => ({
        x: new Date(price.time_open),
        y: [price.open, price.high, price.low, price.close],
      })),
    },
  ];

  return (
    <div>
      {isLoading ? (
        "Loading Chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={series as unknown as number[]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              type: "candlestick",
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            plotOptions: {
              candlestick: {
                wick: {
                  useFillColor: true,
                },
              },
            },

            grid: { show: false },
            xaxis: {
              type: "datetime",
            },
            yaxis: {
              tooltip: {
                enabled: true,
              },
            },
            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(2)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;

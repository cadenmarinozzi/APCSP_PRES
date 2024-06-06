import { Chart } from "react-chartjs-2";
import { countryColors } from "../../modules/constants";

export default function IncomeChart({ dataReader: { countries } }) {
  return (
    <Chart
      title="Average Daily Income vs Literacy by country"
      type="polarArea"
      options={{
        scales: {
          r: {
            ticks: {
              z: 2,
              callback: (value, index, values) => {
                // Logarithmic scale
                const fixedValue = Math.round(Math.pow(2, value));

                return `$${fixedValue.toLocaleString()}`;
              },
            },
            title: {
              display: true,
              text: "Average Daily Income",
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: "Average Daily Income vs Literacy by country",
          },
          tooltip: {
            enabled: true,
            mode: "point",
            position: "nearest",
            callbacks: {
              title: (context) => {
                const country = Object.keys(countries)[context[0].dataIndex];
                const value = Math.round(context[0].label);

                return `${country}: Literacy: ${value}%`;
              },
              label: (context) => {
                const fixedvalue = Math.round(Math.pow(2, context.raw.r));

                return `Average Daily Income: $${fixedvalue.toLocaleString()}`;
              },
            },
          },
        },
      }}
      data={{
        labels: Object.values(countries).map((country) => country.literacy),
        datasets: [
          {
            label: "Average Daily Income",
            data: Object.values(countries).map((country) => {
              const income = parseFloat(country.income);

              // Make it a logarithmic scale
              return {
                r: Math.log2(income),
              };
            }),
            backgroundColor: Object.values(countries).map(
              (country, i) => countryColors[i]
            ),
            fill: false,
          },
        ],
      }}
    />
  );
}

import { Chart } from "react-chartjs-2";
import { countryColors } from "../../modules/constants";

export default function GDPChart({ dataReader: { countries } }) {
  return (
    <Chart
      title="GDP Per Capita vs Literacy by country"
      type="bubble"
      options={{
        plugins: {
          title: {
            display: true,
            text: "GDP Per Capita vs Literacy by country",
          },
          legend: {
            display: false,
          },
          tooltip: {
            enabled: true,
            mode: "point",
            position: "nearest",
            callbacks: {
              title: (context) => {
                const country = Object.keys(countries)[context[0].dataIndex];
                const fixedValue = Math.round(context[0].label);

                return `${country}: Literacy: ${fixedValue.toLocaleString()}%`;
              },
              label: (item) => {
                const fixedValue = Math.round(item.raw.r);

                return `GDP Per Capita: $${fixedValue.toLocaleString()}`;
              },
            },
          },
        },
        scales: {
          x: {
            ticks: {
              callback: (value, index, values) => `${value.toLocaleString()}%`,
            },
            max: 110,
            title: {
              display: true,
              text: "Literacy",
            },
          },
          y: {
            ticks: {
              callback: (value, index, values) => `$${value.toLocaleString()}`,
            },
            max: 70000,
            title: {
              display: true,
              text: "GDP Per Capita",
            },
          },
        },
      }}
      data={{
        labels: Object.values(countries).map((country) => country.literacy),
        datasets: [
          {
            label: "GDP Per Capita",
            data: Object.values(countries).map((country) => {
              const gdp = parseFloat(country.gdp);

              // Radius of the bubble
              const r = Math.round(Math.sqrt(gdp) / 4);

              return {
                x: country.literacy,
                y: gdp,
                r,
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

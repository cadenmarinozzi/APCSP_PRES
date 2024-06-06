import "chart.js/auto";
import { Chart } from "react-chartjs-2";
import "./App.scss";

const rawData = `Country
GDP
INCOME
LITERACY
Burkina Faso
1130
1.67
13
Ethiopia
741
2.38
27.9
India
2330
2.82
53.3
Egypt
6740
5.36
54.5
Iran
10000
10.2
71.6
Myanmar
888
1.52
86.6
China
2880
2.59
84.4
Singapore
47700
56.5
90.8
Belarus
6520
9.2
98.9
Slovenia
22300
25
99.3`;

const countryColors = [
  "rgba(255, 99, 132, 0.8)",
  "rgba(75, 192, 192, 0.8)",
  "rgba(255, 205, 86, 0.8)",
  "rgba(201, 100, 207, 0.8)",
  "rgba(54, 162, 235, 0.8)",
  "rgba(153, 102, 255, 0.8)",
  "rgba(255, 159, 64, 0.8)",
  "rgba(255, 99, 132, 0.8)",
  "rgba(75, 192, 192, 0.8)",
  "rgba(86, 205, 86, 0.8)",
];

function IncomeChart({ dataReader: { countries } }) {
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

function GDPChart({ dataReader: { countries } }) {
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

class DataReader {
  constructor(data) {
    this.lines = data.split("\n");
    this.readerPosition = 0;
  }

  readLabels(n) {
    const labels = [];

    for (let i = 0; i < n; i++) {
      labels.push(this.lines[this.readerPosition++]);
    }

    this.labels = labels;
  }

  readCountries() {
    const countries = {};

    while (this.readerPosition < this.lines.length) {
      const countryData = {};

      const country = this.lines[this.readerPosition++];
      const gdp = this.lines[this.readerPosition++];
      const income = this.lines[this.readerPosition++];
      const literacy = this.lines[this.readerPosition++];

      countryData.gdp = gdp;
      countryData.income = income;
      countryData.literacy = literacy;

      countries[country] = countryData;
    }

    this.countries = countries;
  }
}

export default function App() {
  const dataReader = new DataReader(rawData);

  dataReader.readLabels(4);
  dataReader.readCountries();

  return (
    <div className="charts">
      <GDPChart dataReader={dataReader} />
      <IncomeChart dataReader={dataReader} />
    </div>
  );
}

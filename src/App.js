import "chart.js/auto";
import "./App.scss";
import GDPChart from "./Components/charts/GDPChart";
import IncomeChart from "./Components/charts/IncomeChart";
import DataReader from "./modules/dataReader";

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

export default function App() {
  const dataReader = new DataReader(rawData);

  dataReader.readLabels(4);
  dataReader.readCountries();

  return (
    <>
      <div className="content">
        <h1>How does education effect wealth in different countries?</h1>
        <span>By Caden Marinozzi, Sebastion Gillmore, and Sebastion Kauh</span>
        <div className="divider" />
      </div>
      <div className="charts">
        <GDPChart dataReader={dataReader} />
        <IncomeChart dataReader={dataReader} />
      </div>
    </>
  );
}

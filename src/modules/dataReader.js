export default class DataReader {
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

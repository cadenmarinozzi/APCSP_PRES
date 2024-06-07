export default class DataReader {
  constructor(data) {
    this.lines = data.split("\n");
    this.readerPosition = 0;
  }

  readLabel() {
    this.labels.push(this.lines[this.readerPosition++]);
  }

  readLabels(n) {
    this.labels = [];

    for (let i = 0; i < n; i++) {
      this.readLabel();
    }
  }

  readCountry() {
    const countryData = {};

    const country = this.lines[this.readerPosition++];
    const gdp = this.lines[this.readerPosition++];
    const income = this.lines[this.readerPosition++];
    const literacy = this.lines[this.readerPosition++];

    countryData.gdp = gdp;
    countryData.income = income;
    countryData.literacy = literacy;

    this.countries[country] = countryData;
  }

  readCountries() {
    this.countries = {};

    while (this.readerPosition < this.lines.length) {
      this.readCountry();
    }
  }
}

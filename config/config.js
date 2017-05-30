import DevConfigs from './devConfigs'

class Config {
  config;
  constructor() {
    this.config = DevConfigs;
  }
  getApiUrl() {
    return this.config.API_URL;
  }
}

export default config = new Config();

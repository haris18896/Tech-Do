import JwtService from './jwtServices';

interface JwtOverrideConfig {
  [key: string]: any;
}

class JwtHelper {
  jwt: JwtService;

  constructor(jwtOverrideConfig: JwtOverrideConfig = {}) {
    this.jwt = new JwtService(jwtOverrideConfig);
  }
}

const jwt = new JwtHelper({}).jwt;

export default jwt;

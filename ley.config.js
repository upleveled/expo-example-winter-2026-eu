import { postgresJsConfig, setEnvironmentVariables } from './util/config.ts';

// Adds all environment variables inside
// .env file to `process.env`
setEnvironmentVariables();

export default postgresJsConfig;

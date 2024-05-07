import { registerAs } from "@nestjs/config";


export default registerAs('postgresConfig', () => ({
    host:process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    database:process.env.DB_NAME,
    user:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD

}));

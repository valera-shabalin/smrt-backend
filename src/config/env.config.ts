export const ENV_CONFIG = () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        synchronize: JSON.parse(process.env.DATABASE_SYNCHRONIZE.toLowerCase()),
    },
    authSecret: process.env.AUTH_SECRET,
    authExpiresIn: process.env.AUTH_EXPIRES_IN,
});

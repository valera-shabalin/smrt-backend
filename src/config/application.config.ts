import { ConfigModuleOptions } from '@nestjs/config';
import { ENV_CONFIG } from '@config/env.config';

export const APPLICATION_CONFIG: ConfigModuleOptions = {
    envFilePath: '.development.env',
    isGlobal: true,
    load: [ENV_CONFIG],
};

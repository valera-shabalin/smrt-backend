import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

export const TYPE_ORM_CONFIG: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => {
        const database = configService.get<any>('database');

        return {
            ...database,
            // dropSchema: true,
            entities: [__dirname + '/../**/*.entity.js'],
        };
    },
    inject: [ConfigService],
};

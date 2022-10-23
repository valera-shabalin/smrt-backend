import { NestFactory } from '@nestjs/core';
import { setupSwagger } from 'src/shared/utils/swagger/setup-swagger';
import { AppModule } from './app.module';

(async () => {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api');

    setupSwagger(app);

    await app.listen(3000);
})();

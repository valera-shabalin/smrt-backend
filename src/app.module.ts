import { APPLICATION_CONFIG } from '@config/application.config';
import { TYPE_ORM_CONFIG } from '@config/type-orm.config';
import { CoursesModule } from '@modules/courses/courses.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { TagsModule } from './modules/tags/tags.module';
import { ThemesModule } from './modules/themes/themes.module';
import { UsersModule } from './modules/users/users.module';
import { SharedModule } from './shared/shared.module';

@Module({
    imports: [
        TagsModule,
        ThemesModule,
        SharedModule,
        ConfigModule.forRoot(APPLICATION_CONFIG),
        TypeOrmModule.forRootAsync(TYPE_ORM_CONFIG),

        AuthModule,
        UsersModule,
        ThemesModule,
        CoursesModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}

import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { DeleteResult } from 'typeorm';
import { ThemeDTO } from './dto';
import { ThemeEntity } from './entities/theme.entity';
import { ThemesService } from './themes.service';

@ApiTags('Themes controller')
@Controller('themes')
export class ThemesController {
    constructor(private readonly themesService: ThemesService) {}

    @Get()
    public async getThemes(@Paginate() query: PaginateQuery): Promise<Paginated<ThemeEntity>> {
        return this.themesService.getThemes(query);
    }

    @Get(':id')
    public async getThemeById(@Param('id') themeId: string): Promise<ThemeEntity> {
        return this.themesService.getThemeById(themeId);
    }

    @ApiBody({ type: ThemeDTO })
    @Post()
    public async createTheme(@Body() themeDto: ThemeDTO): Promise<ThemeEntity> {
        return this.themesService.createTheme(themeDto);
    }

    @ApiBody({ type: ThemeDTO })
    @Put(':id')
    public async updateTheme(
        @Param('id') themeId: string,
        @Body() themeDto: ThemeDTO,
    ): Promise<ThemeEntity> {
        return this.themesService.updateTheme(themeId, themeDto);
    }

    @Delete(':id')
    public async deleteTheme(@Param('id') themeId: string): Promise<DeleteResult> {
        return this.themesService.deleteTheme(themeId);
    }
}

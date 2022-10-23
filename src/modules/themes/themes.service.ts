import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterOperator, paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { DeleteResult, Repository } from 'typeorm';
import { ThemeDTO } from './dto/theme.dto';
import { ThemeEntity } from './entities';

@Injectable()
export class ThemesService {
    constructor(
        @InjectRepository(ThemeEntity)
        private readonly repository: Repository<ThemeEntity>,
    ) {}

    public async getThemes(query: PaginateQuery): Promise<Paginated<ThemeEntity>> {
        return paginate(query, this.repository, {
            sortableColumns: ['id'],
            nullSort: 'last',
            searchableColumns: ['title'],
            defaultSortBy: [['id', 'DESC']],
            filterableColumns: {
                title: [FilterOperator.ILIKE],
            },
        });
    }

    public async getThemeById(themeId: string): Promise<ThemeEntity> {
        return await this.repository.findOneBy({ id: themeId });
    }

    public async createTheme(themeDto: ThemeDTO): Promise<ThemeEntity> {
        const theme = this.repository.create(themeDto);

        return await this.repository.save(theme);
    }

    public async updateTheme(themeId: string, themeDto: ThemeDTO): Promise<ThemeEntity> {
        await this.repository.update(themeId, themeDto);

        return await this.repository.findOneBy({ id: themeId });
    }

    public async deleteTheme(themeId: string): Promise<DeleteResult> {
        return await this.repository.softDelete(themeId);
    }
}

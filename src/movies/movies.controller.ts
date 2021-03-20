import { Controller, Get, Param, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Pagination } from 'nestjs-typeorm-paginate';
import { IndexedMovieEntity } from './entities/indexedMovie.entity';
import { MovieEntity } from './entities/movie.entity';

@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}
  public static DEFAULT_LIMIT = 50;

  @Get()
  public index(
    @Query('page') page: number = 1,
  ): Promise<Pagination<IndexedMovieEntity>> {
    return this.moviesService.findAll(MoviesController.DEFAULT_LIMIT, page);
  }

  @Get('/year/:year')
  public indexByYear(
    @Query('page') page: number = 1,
    @Param('year') year: number,
  ): Promise<Pagination<IndexedMovieEntity>> {
    return this.moviesService.findAllByYear(
      MoviesController.DEFAULT_LIMIT,
      page,
      year,
    );
  }

  @Get('/genre/:genre')
  public indexByGenre(
    @Query('page') page: number = 1,
    @Param('genre') genre: string,
  ): Promise<Pagination<IndexedMovieEntity>> {
    return this.moviesService.findAllByGenre(
      MoviesController.DEFAULT_LIMIT,
      page,
      genre,
    );
  }

  @Get('/:id')
  public show(@Param('id') id: number): Promise<MovieEntity> {
    return this.moviesService.findOne(id);
  }
}

import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {MovieEntity} from "./entities/movie.entity";
import {Repository} from "typeorm";
import {paginate, Pagination} from "nestjs-typeorm-paginate";
import {IndexedMovieEntity} from "./entities/indexedMovie.entity";
import {RatingEntity} from "./entities/rating.entity";

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(MovieEntity)
    private moviesRepository: Repository<MovieEntity>,
    @InjectRepository(IndexedMovieEntity)
    private indexedMoviesRepository: Repository<IndexedMovieEntity>,
    @InjectRepository(RatingEntity, 'ratingsConnection')
    private ratingsRepository: Repository<RatingEntity>
  ){}

  findAll(limit: number, page: number): Promise<Pagination<IndexedMovieEntity>> {
    return paginate(this.indexedMoviesRepository, {limit, page});
  }

  findAllByYear(limit: number, page: number, year: number): Promise<Pagination<IndexedMovieEntity>> {
    const queryBuilder = this.indexedMoviesRepository.createQueryBuilder("m");
    queryBuilder.where("strftime('%Y', m.releaseDate) = :year", {year}).orderBy("m.releaseDate", "DESC");
    return paginate(queryBuilder, {limit, page});
  }

  findAllByGenre(limit: number, page: number, genre: string): Promise<Pagination<IndexedMovieEntity>> {
    const queryBuilder = this.indexedMoviesRepository.createQueryBuilder("m");
    queryBuilder.where(`m.genres like '%${genre}%'`);
    return paginate(queryBuilder, {limit, page});
  }

  async findOne(id: number): Promise<MovieEntity> {
    const movie = await this.moviesRepository.findOne(id);
    if(movie === undefined) {
      throw new NotFoundException(`Movie with id: ${id} not found`);
    }
    movie.averageRating = await this.getAverageMovieRating(id);
    return movie;
  }

  async getAverageMovieRating(movieId: number): Promise<number> {
    const builder = this.ratingsRepository.createQueryBuilder('r');
    const ratings = await builder.where("r.movieId = :movieId", {movieId}).getMany();
    return this.calculateAverageRating(ratings);
  }

  private calculateAverageRating(ratings: RatingEntity[]): number {
    return ratings.reduce((acc, rating) => acc + rating.rating, 0) / ratings.length;
  }
}

import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {MovieEntity} from "./entities/movie.entity";
import {IndexedMovieEntity} from "./entities/indexedMovie.entity";
import {RatingEntity} from "./entities/rating.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([MovieEntity, IndexedMovieEntity]),
    TypeOrmModule.forFeature([RatingEntity], 'ratingsConnection')
  ],
  controllers: [MoviesController],
  providers: [MoviesService]
})
export class MoviesModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from './movies/entities/movie.entity';
import { IndexedMovieEntity } from './movies/entities/indexedMovie.entity';
import { RatingEntity } from './movies/entities/rating.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './db/movies.db',
      entities: [MovieEntity, IndexedMovieEntity],
      synchronize: false,
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './db/ratings.db',
      name: 'ratingsConnection',
      entities: [RatingEntity],
      synchronize: false,
    }),
    MoviesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

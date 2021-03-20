import { AfterLoad, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity({ name: 'movies' })
export class IndexedMovieEntity {
  @Exclude()
  @PrimaryGeneratedColumn()
  movieId: number;

  @Column()
  imdbId: string;

  @Column()
  title: string;

  @Column()
  releaseDate: string;

  @Column()
  budget: string;

  @AfterLoad()
  updateBudget() {
    this.budget = '$' + parseInt(this.budget, 10).toFixed(2);
  }
}

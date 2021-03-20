import { AfterLoad, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'movies' })
export class MovieEntity {
  @PrimaryGeneratedColumn()
  movieId: number;

  @Column()
  imdbId: string;

  @Column()
  title: string;

  @Column()
  overview: string;

  @Column()
  productionCompanies: string;

  @Column()
  releaseDate: string;

  @Column()
  budget: string;

  @Column()
  revenue: number;

  @Column()
  runtime: number;

  @Column()
  language: string;

  @Column()
  genres: string;

  @Column()
  status: string;

  averageRating?: number;

  @AfterLoad()
  updateBudget() {
    this.budget = '$' + parseInt(this.budget).toFixed(2);
  }
}

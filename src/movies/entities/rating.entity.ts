import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {MovieEntity} from "./movie.entity";

@Entity({name: "ratings"})
export class RatingEntity {
  @PrimaryGeneratedColumn()
  ratingId: number;

  @Column()
  userId: number;

  @Column()
  movieId: number;

  @Column()
  rating: number;

  @Column()
  timestamp: number;
}

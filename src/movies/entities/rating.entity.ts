import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'ratings' })
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

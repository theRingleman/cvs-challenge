import { MovieEntity } from '../entities/movie.entity';

export const movieEntityMock: MovieEntity = {
  averageRating: 3.4018691588785046,
  budget: '$0.00',
  genres: '[{"id": 18, "name": "Drama"}, {"id": 80, "name": "Crime"}]',
  imdbId: 'tt0094675',
  language: null,
  movieId: 2,
  overview:
    "Taisto Kasurinen is a Finnish coal miner whose father has just committed suicide and who is framed for a crime he did not commit. In jail, he starts to dream about leaving the country and starting a new life. He escapes from prison but things don't go as planned...",
  productionCompanies:
    '[{"name": "Villealfa Filmproduction Oy", "id": 2303}, {"name": "Finnish Film Foundation", "id": 2396}]',
  releaseDate: '1988-10-21',
  revenue: 0,
  runtime: 69,
  status: 'Released',
  title: 'Ariel',
  updateBudget: () => {}
};

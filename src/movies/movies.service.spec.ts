import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import {getRepositoryToken} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {MovieEntity} from "./entities/movie.entity";
import {movieEntityMock} from "./__mocks__/movieEntity.mock";
import {RatingEntity} from "./entities/rating.entity";
import {ratingsEntitiesMock} from "./__mocks__/ratingsEntities.mock";
import {IndexedMovieEntity} from "./entities/indexedMovie.entity";
import {NotFoundException} from "@nestjs/common";

describe('MoviesService', () => {
  let service: MoviesService;
  let moviesRepository: Repository<MovieEntity>;
  let ratingsRepository: Repository<RatingEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: getRepositoryToken(MovieEntity),
          useClass: Repository
        },
        {
          provide: getRepositoryToken(IndexedMovieEntity),
          useClass: Repository
        },
        {
          provide: getRepositoryToken(RatingEntity, "ratingsConnection"),
          useClass: Repository
        }
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    moviesRepository = module.get(getRepositoryToken(MovieEntity));
    ratingsRepository = module.get(getRepositoryToken(RatingEntity, "ratingsConnection"));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a single movie when one is found', async () => {
      const findOneMock = jest.spyOn(moviesRepository, 'findOne').mockResolvedValueOnce(movieEntityMock);
      jest.spyOn(ratingsRepository, 'createQueryBuilder').mockReturnValueOnce({where: () => ({getMany: () => ratingsEntitiesMock})} as any)

      const movie = await service.findOne(2);

      expect(movie).toBe(movieEntityMock);
      expect(findOneMock).toHaveBeenCalled();
    });

    it('should throw a not found error when a movie is not found', async () => {
      jest.spyOn(moviesRepository, 'findOne').mockResolvedValueOnce(undefined);

      await expect(service.findOne(2)).rejects.toBeInstanceOf(NotFoundException);
    });
  });
});

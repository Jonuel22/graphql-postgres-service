import { Test, TestingModule } from '@nestjs/testing';
import { ItemsService } from './items.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './item.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';

describe('ItemsService', () => {
  let service: ItemsService;
  let repository: Repository<Item>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemsService,
        {
          provide: getRepositoryToken(Item), // Mock del repositorio
          useClass: Repository,
        },
        {
          provide: EventEmitter2, // Mock del EventEmitter2
          useValue: {
            emit: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ItemsService>(ItemsService);
    repository = module.get<Repository<Item>>(getRepositoryToken(Item));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Añade más pruebas aquí
});

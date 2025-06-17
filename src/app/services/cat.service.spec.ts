import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CatService } from './cat.service';

describe('CatService', () => {
  let service: CatService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CatService]
    });
    service = TestBed.inject(CatService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all breeds', () => {
    const mockBreeds = { 
      razas: [
        { 
          id: 'abys', 
          name: 'Abisinio',
          temperament: 'Active, Energetic, Independent, Intelligent, Gentle',
          origin: 'Egypt',
          description: 'The Abyssinian is easy to care for, and a joy to have in your home.',
          life_span: '14 - 15',
          adaptability: 5,
          affection_level: 5,
          child_friendly: 3,
          grooming: 1,
          intelligence: 5,
          health_issues: 2,
          social_needs: 5,
          stranger_friendly: 5,
          dog_friendly: 4,
          energy_level: 5
        },
        { 
          id: 'siam', 
          name: 'Siames',
          temperament: 'Active, Agile, Clever, Sociable, Loving, Energetic',
          origin: 'Thailand',
          description: 'The Siamese cat is one of the first distinctly recognized breeds of Asian cat.',
          life_span: '12 - 15',
          adaptability: 5,
          affection_level: 5,
          child_friendly: 4,
          grooming: 1,
          intelligence: 5,
          health_issues: 3,
          social_needs: 5,
          stranger_friendly: 5,
          dog_friendly: 5,
          energy_level: 5
        }
      ] 
    };

    service.getBreeds().subscribe(breeds => {
      expect(breeds).toEqual(mockBreeds);
      expect(breeds.razas.length).toBe(2);
    });

    const req = httpTestingController.expectOne('http://localhost:4201/api/breeds');
    expect(req.request.method).toBe('GET');
    req.flush(mockBreeds);
  });
});

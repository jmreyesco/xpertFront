import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreedDetailComponent } from './breed-detail.component';

describe('BreedDetailComponent', () => {
  let component: BreedDetailComponent;
  let fixture: ComponentFixture<BreedDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BreedDetailComponent]
    });
    fixture = TestBed.createComponent(BreedDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

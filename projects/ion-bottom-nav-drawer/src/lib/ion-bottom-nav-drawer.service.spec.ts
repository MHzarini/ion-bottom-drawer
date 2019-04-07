import { TestBed } from '@angular/core/testing';

import { IonBottomNavDrawerService } from './ion-bottom-nav-drawer.service';

describe('IonBottomNavDrawerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IonBottomNavDrawerService = TestBed.get(IonBottomNavDrawerService);
    expect(service).toBeTruthy();
  });
});

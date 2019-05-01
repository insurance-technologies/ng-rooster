import { TestBed } from '@angular/core/testing';

import { NgRoosterService } from './ng-rooster.service';

describe('NgRoosterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgRoosterService = TestBed.get(NgRoosterService);
    expect(service).toBeTruthy();
  });
});

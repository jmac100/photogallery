/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGuardService } from './authguard.service';

describe('Service: Authguard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardService]
    });
  });

  it('should ...', inject([AuthGuardService], (service: AuthGuardService) => {
    expect(service).toBeTruthy();
  }));
});

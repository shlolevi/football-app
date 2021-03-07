import { TestBed, async, inject } from '@angular/core/testing';

import { PlayerGaurdGuard } from './player-gaurd.guard';

describe('PlayerGaurdGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlayerGaurdGuard]
    });
  });

  it('should ...', inject([PlayerGaurdGuard], (guard: PlayerGaurdGuard) => {
    expect(guard).toBeTruthy();
  }));
});

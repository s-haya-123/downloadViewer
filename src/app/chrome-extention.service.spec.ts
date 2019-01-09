import { TestBed, inject } from '@angular/core/testing';

import { ChromeExtentionService } from './chrome-extention.service';

describe('ChromeExtentionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChromeExtentionService]
    });
  });

  it('should be created', inject([ChromeExtentionService], (service: ChromeExtentionService) => {
    expect(service).toBeTruthy();
  }));
});

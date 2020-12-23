import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoverPhotoModalComponent } from './cover-photo-modal.component';

describe('CoverPhotoModalComponent', () => {
  let component: CoverPhotoModalComponent;
  let fixture: ComponentFixture<CoverPhotoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoverPhotoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoverPhotoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

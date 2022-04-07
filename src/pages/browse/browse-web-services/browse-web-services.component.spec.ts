import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseWebServicesComponent } from './browse-web-services.component';

describe('BrowseWebServicesComponent', () => {
  let component: BrowseWebServicesComponent;
  let fixture: ComponentFixture<BrowseWebServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrowseWebServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseWebServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

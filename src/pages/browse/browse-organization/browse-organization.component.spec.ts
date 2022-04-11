import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseOrganizationComponent } from './browse-organization.component';

describe('BrowseOrganizationComponent', () => {
  let component: BrowseOrganizationComponent;
  let fixture: ComponentFixture<BrowseOrganizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrowseOrganizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

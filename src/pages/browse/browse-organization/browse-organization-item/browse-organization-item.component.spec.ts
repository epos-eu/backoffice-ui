import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseOrganizationItemComponent } from './browse-organization-item.component';

describe('BrowseOrganizationItemComponent', () => {
  let component: BrowseOrganizationItemComponent;
  let fixture: ComponentFixture<BrowseOrganizationItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrowseOrganizationItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseOrganizationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

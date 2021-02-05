import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagedGameComponent } from './managed-game.component';

describe('ManagedGameComponent', () => {
  let component: ManagedGameComponent;
  let fixture: ComponentFixture<ManagedGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagedGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagedGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

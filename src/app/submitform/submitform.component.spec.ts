import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitformComponent } from './submitform.component';

describe('SubmitformComponent', () => {
  let component: SubmitformComponent;
  let fixture: ComponentFixture<SubmitformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubmitformComponent]
    });
    fixture = TestBed.createComponent(SubmitformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

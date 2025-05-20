import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragdropmixedsortingexampleComponent } from './dragdropmixedsortingexample.component';

describe('DragdropmixedsortingexampleComponent', () => {
  let component: DragdropmixedsortingexampleComponent;
  let fixture: ComponentFixture<DragdropmixedsortingexampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DragdropmixedsortingexampleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DragdropmixedsortingexampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

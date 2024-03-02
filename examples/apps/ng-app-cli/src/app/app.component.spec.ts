import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app 2', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the 'Hello world' title`, () => {
    expect(component.title).toEqual('Hello world');
    expect(component.branch).toEqual('test');
  });
});

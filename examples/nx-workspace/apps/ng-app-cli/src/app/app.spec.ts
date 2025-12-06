import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    })
      .overrideComponent(AppComponent, {
        remove: { imports: [] },
        add: { imports: [] },
      })
      .compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app 2', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the 'Hello world' title`, () => {
    expect(component.title).toEqual('Hello world');
    expect(component.env).toEqual('test');
    expect(component.apiUsers).toEqual('/api/v1/users');
  });
});

import { TestBed } from '@angular/core/testing';
import { NgxEnvModule } from '@ngx-env/core';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxEnvModule],
      declarations: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should get the correct values from the environment', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.version).toEqual('0.0.1');
    expect(app.env).toEqual('test');
    expect(app.branch).toEqual('main');
    expect(app.home).toBeUndefined();
  });

  it('should get the correct values in the template', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const elt: Element = fixture.nativeElement;
    fixture.detectChanges();
    expect(elt.querySelector('#NG_APP_BRANCH_NAME')?.innerHTML).toEqual('main');
    expect(elt.querySelector('#USER_HOME')?.innerHTML).toEqual('');
  });
});

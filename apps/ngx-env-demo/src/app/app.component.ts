import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  env = process.env.NG_APP_ENV;
  version = environment.env.NG_APP_VERSION;
  branch = process.env.NG_APP_BRANCH_NAME;
  home = process.env.USER_HOME;
  appHome = process.env.NG_APP_USER_HOME;
  notInTest = process.env.NG_APP_NOT_IN_TEST;
  constructor() {
    console.log(process.env);
  }
}

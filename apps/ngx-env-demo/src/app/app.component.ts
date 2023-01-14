import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  env = process.env.NG_APP_ENV;
  version = environment.env.NGX_VERSION;
  branch = process.env.NGX_BRANCH_NAME;
  appHome = process.env.NGX_USER_HOME;
  home = process.env.USER_HOME;
  notInTest = process.env.NGX_NOT_IN_TEST;
  constructor() {
    console.log(process.env);
  }
}

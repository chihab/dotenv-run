import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ng-env-demo';
  constructor() {
    console.log(process.env);
    console.log(process.env.USERDOMAIN);
    console.log(process.env.NODE_ENV);
    console.log(process.env.NG_APP_ENVIRONMENT);
    console.log(environment.dotenv.NG_APP_VERSION);
  }
}

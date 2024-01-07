import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  env = process.env['NODE_ENV'];
  version = environment.env.NGX_VERSION;
  api = environment.env.API_USERS;
}

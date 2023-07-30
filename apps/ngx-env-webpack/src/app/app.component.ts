import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  env = process.env['NG_APP_ENV'];
  version = environment.env.NGX_VERSION;
}

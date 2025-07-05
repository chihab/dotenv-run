import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = `Hello world`;
  env = import.meta.env['NODE_ENV'];
  version = environment.env.NGX_VERSION;
  branch = import.meta.env['NGX_BRANCH'];
  apiUsers = import.meta.env['NGX_API_USERS'];
}

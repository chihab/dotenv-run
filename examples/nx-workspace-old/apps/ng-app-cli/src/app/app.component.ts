import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `<h2>{{ title }}</h2>
    <table>
      <div i18n i18n-title title="Attribute string">element string</div>
      <thead>
        <tr>
          <th>NAME</th>
          <th>VALUE</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>ENV</td>
          <td>
            <span id="ENV">{{ env }}</span>
          </td>
        </tr>
        <tr>
          <td>VERSION</td>
          <td>
            <span id="VERSION"> {{ version }} </span>
          </td>
        </tr>
        <tr>
          <td>BRANCH</td>
          <td>
            <span id="VERSION"> {{ branch }} </span>
          </td>
        </tr>
      </tbody>
    </table>
    <router-outlet />`,
})
export class AppComponent {
  title = $localize`Hello world`;
  env = import.meta.env['NODE_ENV'];
  version = environment.env.NGX_VERSION;
  branch = import.meta.env['NGX_BRANCH'];
}

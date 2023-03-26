import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxEnvModule } from '@ngx-env/core';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule.withServerTransition({ appId: 'serverApp' }), NgxEnvModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

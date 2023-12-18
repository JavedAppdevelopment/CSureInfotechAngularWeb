import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmailService } from './email.service';
import { HttpClientModule } from '@angular/common/http';
import { SubmitformComponent } from './submitform/submitform.component';//add

@NgModule({
  declarations: [
    AppComponent,
    SubmitformComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule  //add
  ],
  providers: [EmailService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './modules/components/landing-page/landing-page.component';
import { LoginPageComponent } from './modules/components/login-page/login-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { ImageService } from './services/image.service';
import { TableModule } from 'primeng/table';
import { ErrorModelComponent } from './modules/components/error-model/error-model.component';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    LoginPageComponent,
    ErrorModelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CheckboxModule,
    FormsModule,
    FileUploadModule,
    HttpClientModule,
    ButtonModule,
    TableModule,
    ReactiveFormsModule,
    ToastModule,
  ],
  providers: [provideClientHydration(), MessageService, ImageService],
  bootstrap: [AppComponent],
})
export class AppModule {}

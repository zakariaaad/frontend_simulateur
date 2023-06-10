import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { FormclientComponent } from './formclient/formclient.component';
import { FooterComponent } from './footer/footer.component';
import { SubmissionComponent } from './submission/submission.component';
import { ListcltsComponent } from './listclts/listclts.component';
import { CrudserviceService } from './service/crudservice.service';
import { ConfigapiService } from './service/configapi.service';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { AuthserviceService } from './service/authservice.service';
import { NoPermissionComponent } from './no-permission/no-permission.component';
import { ListsimulationsComponent } from './listsimulations/listsimulations.component';
import { HomeComponent } from './home/home.component';
import { DetailsimComponent } from './detailsim/detailsim.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FormclientComponent,
    FooterComponent,
    SubmissionComponent,
    ListcltsComponent,
    AboutComponent,
    LoginComponent,
    NoPermissionComponent,
    ListsimulationsComponent,
    HomeComponent,
    DetailsimComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    
  ],
  providers: [
    CrudserviceService,
    ConfigapiService,
    AuthserviceService
  ],
  bootstrap: [AppComponent,
    HeaderComponent,
    FooterComponent
  ]
})
export class AppModule { }

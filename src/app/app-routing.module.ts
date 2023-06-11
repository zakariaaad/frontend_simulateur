import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubmissionComponent } from './submission/submission.component';
import { FormclientComponent } from './formclient/formclient.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { ListcltsComponent } from './listclts/listclts.component';
import { ListsimulationsComponent } from './listsimulations/listsimulations.component';
import { HomeComponent } from './home/home.component';
import { EditcltComponent } from './editclt/editclt.component';

const routes: Routes = [
{
  path: '',
  component: HomeComponent
},
{
  path: 'validation',
  component: SubmissionComponent
},
{
  path: 'apropos',
  component: AboutComponent
},
{
  path: 'login',
  component: LoginComponent
},

{
  path: 'simulations',
  component: ListsimulationsComponent
},
{
  path: 'creation-simulation',
  component: FormclientComponent
},
{
  path: 'clients/:id_client',
  component: EditcltComponent
},
{
  path: 'clients',
  component: ListcltsComponent
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

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
import { EditsimComponent } from './editsim/editsim.component';
import { NoPermissionComponent } from './no-permission/no-permission.component';

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
  path: 'permission-error',
  component: NoPermissionComponent
},
{
  path: 'login',
  component: LoginComponent
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
{
  path: 'simulations/:id_simulation',
  component: EditsimComponent
},
{
  path: 'simulations',
  component: ListsimulationsComponent
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

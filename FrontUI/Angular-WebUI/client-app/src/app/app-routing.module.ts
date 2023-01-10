import { LoginComponent } from './../api-authorization/login/login.component';
import { ClientListComponent } from './client/client-list/client-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthorizeGuard} from "../api-authorization/authorize.guard";
import { MissionListComponent } from './mission/mission-list/mission-list.component';

const routes: Routes = [
  { path: '', component: ClientListComponent, canActivate: [AuthorizeGuard] },
  { path: 'client', component: ClientListComponent,canActivate: [AuthorizeGuard] },
  { path: 'mission', component: MissionListComponent,canActivate: [AuthorizeGuard] },
  { path: 'authentication', component: LoginComponent, canActivate: [AuthorizeGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

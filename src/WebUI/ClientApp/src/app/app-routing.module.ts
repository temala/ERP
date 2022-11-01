import { ClientListComponent } from './client/client-list/client-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthorizeGuard} from "../api-authorization/authorize.guard";

const routes: Routes = [
  { path: '', component: ClientListComponent, canActivate: [AuthorizeGuard] },
  { path: 'client-list', component: ClientListComponent,canActivate: [AuthorizeGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

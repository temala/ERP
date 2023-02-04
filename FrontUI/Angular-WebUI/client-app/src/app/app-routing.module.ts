import { InvoiceDetailsComponent } from './Invoice/invoice-details/invoice-details.component';
import { InvoiceListComponent } from './Invoice/invoice-list/invoice-list.component';
import { CraListComponent } from './cra/cra-list/cra-list.component';
import { LoginComponent } from './../api-authorization/login/login.component';
import { ClientListComponent } from './client/client-list/client-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizeGuard } from "../api-authorization/authorize.guard";
import { MissionListComponent } from './mission/mission-list/mission-list.component';
import { InvoiceAddComponent } from './Invoice/invoice-add/invoice-add.component';

const routes: Routes = [
  { path: '', component: ClientListComponent, canActivate: [AuthorizeGuard] },
  { path: 'client', component: ClientListComponent, canActivate: [AuthorizeGuard] },
  { path: 'mission', component: MissionListComponent, canActivate: [AuthorizeGuard] },
  { path: 'cra', component: CraListComponent, canActivate: [AuthorizeGuard] },
  {
    path: 'invoice',    
    children: [
      { path: '', component: InvoiceListComponent, pathMatch: 'full' },
      { path: 'create-invoice', component: InvoiceAddComponent, canActivate: [AuthorizeGuard] }
    ]
  },
  { path: 'authentication', component: LoginComponent, canActivate: [AuthorizeGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

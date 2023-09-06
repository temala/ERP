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
import { InvoiceUpdateComponent } from './Invoice/invoice-update/invoice-update.component';

const routes: Routes = [
  { path: '', component: ClientListComponent, canLoad: [AuthorizeGuard] },
  { path: 'client', component: ClientListComponent, canLoad: [AuthorizeGuard] },
  { path: 'mission', component: MissionListComponent, canLoad: [AuthorizeGuard] },
  { path: 'cra', component: CraListComponent, canLoad: [AuthorizeGuard] },
  {
    path: 'invoice',
    children: [
      { path: '', component: InvoiceListComponent, pathMatch: 'full',canLoad: [AuthorizeGuard] },
      { path: 'create-invoice', component: InvoiceAddComponent, canLoad: [AuthorizeGuard] },
      { path: 'update-invoice/:id', component: InvoiceUpdateComponent },
    ]
  },
  { path: 'authentication', component: LoginComponent, canLoad: [AuthorizeGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

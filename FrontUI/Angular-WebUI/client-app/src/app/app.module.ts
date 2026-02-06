import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule, HttpHandler} from '@angular/common/http';
import {ClientModule} from './client/client.module';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NavigationMenuComponent} from './navigation-menu/navigation-menu.component';
import {AppHeaderComponent} from './app-header/app-header.component';
import {MaterialModule} from './core.module';
import {AuthorizeInterceptor} from "../api-authorization/authorize.interceptor";
import {ApiAuthorizationModule} from "../api-authorization/api-authorization.module";
import {ClientListComponent} from "./client/client-list/client-list.component";
import { MissionModule } from './mission/mission.module';
import { CraModule } from './cra/cra.module';
import { ErrorInterceptor } from './common/error.interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
    declarations: [
        AppComponent,
        NavigationMenuComponent,
        AppHeaderComponent
    ],
    imports: [
        ApiAuthorizationModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ClientModule,
        MissionModule,
        CraModule,
        MaterialModule,
        MatSnackBarModule,
    ],
    providers: [
        HttpClient,
        { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

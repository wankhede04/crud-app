import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router'

import { AppComponent } from './app.component';
import { NgxsModule } from '@ngxs/store';
import { NgxsStoragePluginModule, StorageOption } from '@ngxs/storage-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { ngxsConfig } from './store/ngxs.config';
import { environment } from '../environments/environment';
import { HomeComponent } from './home/home.component';
import { TripMetadataComponent } from './trip-metadata/trip-metadata.component';
import { TripBoardComponent } from './trip-board/trip-board.component';
import { TripDetailsState } from './store/trips/trips.state';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {
    path: 'trip', component: HomeComponent
  },
  { path: '**', redirectTo: 'trip' }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TripMetadataComponent,
    TripBoardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabled' }),
    NgxsModule.forRoot(
      [TripDetailsState],
      ngxsConfig),
    NgxsStoragePluginModule.forRoot({
      storage: StorageOption.LocalStorage,
      key: []
    }),
    NgxsRouterPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot({
      name: 'TRIPS_APP',
      disabled: environment.production
    }),
    NgxsLoggerPluginModule.forRoot({
      disabled: environment.production
    }),
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

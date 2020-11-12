import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AgGridModule} from 'ag-grid-angular';
import {FeatureRequestFormComponent} from './feature-request-form/feature-request-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AgLinkComponent} from './ag-link/ag-link.component';

@NgModule({
  declarations: [AppComponent, FeatureRequestFormComponent, AgLinkComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AgGridModule.withComponents([AgLinkComponent])
  ],
  exports: [
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

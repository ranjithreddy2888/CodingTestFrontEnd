import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FeatureRequestFormComponent} from './feature-request-form/feature-request-form.component';

const routes: Routes = [
  {path: 'addFeatureRequest', component: FeatureRequestFormComponent},
  {path: 'editFeatureRequest/:featureId', component: FeatureRequestFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

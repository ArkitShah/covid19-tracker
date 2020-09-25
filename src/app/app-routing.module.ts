import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountryWiseComponent } from './country-wise/country-wise.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'country-wise', component: CountryWiseComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

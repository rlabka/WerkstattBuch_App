import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminPageComponent} from "./component/admin-page/admin-page.component";
import {FormularComponent} from "./component/formular/formular.component";


const routes: Routes = [
  {
    path: 'admin', component: AdminPageComponent,
    children: [
      { path: 'auftrag', component: FormularComponent }
    ]
  },
  { path: '**', component: FormularComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

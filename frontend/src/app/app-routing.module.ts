import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LivroCrudComponent } from './views/livro-crud/livro-crud.component'

const routes: Routes = [
  {
    path:'',
    component: LivroCrudComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

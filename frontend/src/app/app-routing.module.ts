import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LivroCrudComponent } from './views/livro-crud/livro-crud.component'
import{ LivroCreateComponent } from './component/livro/livro-create/livro-create.component'

const routes: Routes = [
  {
    path:'',
    component: LivroCrudComponent
  },
  {
    path:'create',
    component:LivroCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

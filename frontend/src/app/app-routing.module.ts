import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LivroCrudComponent } from './views/livro-crud/livro-crud.component'
import { LivroCreateComponent } from './component/livro/livro-create/livro-create.component'
import { BookUpdateComponent } from './component/livro/book-update/book-update.component';

const routes: Routes = [
  {
    path:'',
    component: LivroCrudComponent
  },
  {
    path:'create',
    component:LivroCreateComponent
  },
  {
    path:'updatebook/:id',
    component:BookUpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

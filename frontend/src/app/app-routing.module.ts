import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LivroCrudComponent } from './views/livro-crud/livro-crud.component'
import { LivroCreateComponent } from './component/livro/livro-create/livro-create.component'
import { BookUpdateComponent } from './component/livro/book-update/book-update.component';
import { LivroRemoveComponent } from './component/livro/livro-remove/livro-remove.component';

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
  },
  {
    path:'deletebook/:id',
    component:LivroRemoveComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

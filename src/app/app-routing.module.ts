import { CadastroComponent } from './components/home/cadastro/cadastro.component';
import { LoginComponent } from './components/home/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AdicionarProdutoComponent } from './components/dashboard/adicionar-produto/adicionar-produto.component';
import { ProdutosComponent } from './components/catalogo/produtos/produtos.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProdutoComponent } from './components/catalogo/produto/produto.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent, },
  { path: 'login', pathMatch: 'full', component: LoginComponent, },
  { path: 'cadastro', pathMatch: 'full', component: CadastroComponent, },
  {
    path: 'dashboard', component: DashboardComponent,
    children: [
      { path: ':id', component: AdicionarProdutoComponent }
    ]
  },
  { path: ':loja', component: ProdutosComponent },
  { path: ':loja/:id', component: ProdutoComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

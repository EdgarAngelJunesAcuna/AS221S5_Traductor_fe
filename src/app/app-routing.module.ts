import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaCargaComponent } from './components/pagina-carga/pagina-carga.component';
import { PaginaInicioComponent } from './components/pagina-inicio/pagina-inicio.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { IdiomasDisponiblesComponent } from './components/idiomas-disponibles/idiomas-disponibles.component';
import { TraductorTextComponent } from './components/traductor-text/traductor-text.component';
import { TraductorHistoryComponent } from './components/traductor-history/traductor-history.component';

const routes: Routes = [
  {
    path: '',
    component: PaginaCargaComponent,
  },
  {
    path: 'pagina-inicio',
    component: PaginaInicioComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'idiomas',
    component: IdiomasDisponiblesComponent,
  },
  {
    path: 'traductor',
    component: TraductorTextComponent,
  },
  {
    path: 'traductor', component: TraductorTextComponent,
    children: [
      { path: 'Historial', component: TraductorHistoryComponent }
    ]
  },
  { path: 'Historial', component: TraductorHistoryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

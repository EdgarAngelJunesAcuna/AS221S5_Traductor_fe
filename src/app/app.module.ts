import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaginaCargaComponent } from './components/pagina-carga/pagina-carga.component';
import { PaginaInicioComponent } from './components/pagina-inicio/pagina-inicio.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';

import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TableModule } from 'primeng/table';
import { MatSelectModule } from '@angular/material/select';
import { ExportAsModule } from 'ngx-export-as';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgSelectModule } from '@ng-select/ng-select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { IdiomasDisponiblesComponent } from './components/idiomas-disponibles/idiomas-disponibles.component';
import { TraductorTextComponent } from './components/traductor-text/traductor-text.component';
import { TraductorHistoryComponent } from './components/traductor-history/traductor-history.component';

@NgModule({
  declarations: [
    AppComponent,
    PaginaCargaComponent,
    PaginaInicioComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    IdiomasDisponiblesComponent,
    TraductorTextComponent,
    TraductorHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlickCarouselModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000, // Duración del mensaje en milisegundos
      positionClass: 'toast-top-right', // Posición del toast
    }),
    ModalModule.forRoot(),
    TableModule,
    MatSelectModule,
    ExportAsModule,
    SweetAlert2Module.forRoot(),
    NgSelectModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

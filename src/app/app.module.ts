/* Módulo principal de la aplicación, donde se importa, configura y se inicializa todo lo necesario 
para que la aplicación funcione correctamente. Importa los módulos necesarios de Angular y Ionic, 
incorpora los servicios, y declara el componente raíz de la AppComponent que posteriormente se exporta para poder ser usado por ./app.component.ts */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app.routing.module';
import { DataStorageService } from './services/data.storage.service';
import { ListaService } from './services/lista.service';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, DataStorageService, ListaService],
  bootstrap: [AppComponent],
})
export class AppModule { }
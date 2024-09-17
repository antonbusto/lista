// Se incorporan las interfaces, componentes y servicios servicios necesarios 
import { Component } from '@angular/core';
import { listas, Lista, Producto } from './interfaces/data';
import { DataStorageService } from './services/data.storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  // obtener los datos necesarios de forma dinámica para utilizar en el menú lateral desde las listas

  public listas: { id: string; nombre: string; url: string; icon: string; productos: Producto[]; fechaCreacion: Date }[] = [];

  constructor(private dataStorageService: DataStorageService) {
    const datos = this.dataStorageService.getData();

    // Si hay listas en localStorage las carga, en caso contrario carga los datos iniciales desde interfaces
    if (datos && datos.length > 0) {
      this.listas = datos.map((lista: Lista) => {
        return { id: lista.id, nombre: lista.nombre, url: lista.url, icon: lista.icon, productos: lista.productos, fechaCreacion: lista.fechaCreacion };
      });
    } else {
      this.listas = listas.map((lista: Lista) => {
        return { id: lista.id, nombre: lista.nombre, url: lista.url, icon: lista.icon, productos: lista.productos, fechaCreacion: lista.fechaCreacion };
      });
      this.dataStorageService.setData(this.listas);
    }
  }
}
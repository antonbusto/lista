/* Este archivo contiene la definición del servicio y los métodos para la gestión de Listas. 
Se han implementado todos los métodos requeridos por el equipo docente. También se han creado
métodos adicionales para posibles ampliaciones de módulos  o páginas de la aplicación */
import { Injectable } from '@angular/core';
import { DataStorageService } from '../services/data.storage.service';
import { Lista } from '../interfaces/data';

@Injectable({
  providedIn: 'root'
})
export class ListaService {

  constructor(private dataStorageService: DataStorageService) { }

  // Obtener todas las listas
  getListas(): Lista[] {
    const datos = this.dataStorageService.getData(); // obtener del almacenamiento local
    return datos ? datos : []; // condicional ternario
  }

  // Agregar una nueva lista
  addLista(lista: Lista): void {
    const datos = this.dataStorageService.getData();
    const nuevaLista = datos ? [...datos, lista] : [lista]; // operador spread
    this.dataStorageService.setData(nuevaLista); // guardar en almacenamiento local
  }

  // Obtener el último id de las listas
  getLastId(): number {
    let lastId = 1;
    const datos = this.dataStorageService.getData();
    if (datos.length > 0) {
      lastId += +datos[datos.length - 1].id;
    }
    return lastId;
  }

  // Obtener una lista por id
  getListaById(id: string): Lista | undefined {
    const datos = this.dataStorageService.getData();
    return datos ? datos.find((lista: Lista) => lista.id === id) : undefined;
  }

  // Eliminar una lista por id, no implementado
  /* Este método busca la lista con el id especificado en los datos almacenados,
  la elimina y guarda los datos actualizados */
  deleteListaById(id: string): void {
    const datos = this.dataStorageService.getData();
    if (datos) {
      // crear un nuevo array que excluya la lista con el id recibido
      const nuevaLista = datos.filter((lista: Lista) => lista.id !== id);
      this.dataStorageService.setData(nuevaLista);
    }
  }
}
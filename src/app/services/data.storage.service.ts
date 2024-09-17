/* Este archivo contiene la definición del servicio y los métodos para la gestión 
del almacenamiento en Local Storage */
import { Injectable } from '@angular/core';
import { Lista, listas } from '../interfaces/data';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor() { }

  /* Este método se encarga de obtener los datos del localStorage. Si existen, los devuelve, 
  y si no existen, devuelve los datos iniciales que se encuentran en el archivo de interfaces data.ts.*/
  getData() {
    const data = localStorage.getItem('listas');
    if (data) {
      return JSON.parse(data);
    } else {
      return listas;
    }
  }

  /* Este método recibe los datos para guardar en el localStorage, 
  los convierte a formato JSON y los guarda en el localStorage con la clave 'listas' y sus valores. */
  setData(data: Lista[]) {
    localStorage.setItem('listas', JSON.stringify(data));
  }
}



/* Refrescar la página. Dado que la app está trabajando con datos locales, en lugar de Bases de Datos, 
creo un servicio para utilizarlo justo después de añadir una nueva lista al menú con la finalidad de que se visualice 
inmediatamente en el listado del menú de las listas (sin necesidad de volver a cargar la app) */

// Este servicio se utiliza después de añadir una nueva lista al menú
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class AppRefreshService {

    constructor(private location: Location) { }

    refreshApp() {
        window.location.reload(); // refrescar la aplicación
    }
}

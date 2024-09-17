/* El componente FolderPage se utiliza para mostrar las listas de la compra. 
Se encarga de capturar el parámetro id de la ruta, buscar la lista correspondiente en el almacenamiento local, 
mostrar los productos de la lista y permitir gestionarlos. 
Además, permite agregar nuevos productos, eliminar productos y vaciar completamente la lista. 
También calcula el importe total de los productos comprados. 
El componente utiliza el servicio DataStorageService para obtener y guardar los datos en el almacenamiento local.*/

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataStorageService } from '../services/data.storage.service';
import { Producto, Lista } from '../interfaces/data';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ListaService } from '../services/lista.service';
import { AppRefreshService } from '../services/refrescar.service'; // para después de añadir nueva lista

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})

export class FolderPage implements OnInit {
  public folder!: string;
  public listaSeleccionada!: Lista;
  public nombreProducto = '';
  public unidadesProducto = 0;
  public precioProducto = 0;
  public fechaCreacionString = '';
  public lista: string[] = [];
  public nombreLista: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataStorageService: DataStorageService,
    private router: Router,
    private alertController: AlertController,
    private listaService: ListaService,
    private appRefreshService: AppRefreshService
  ) { }

  ngOnInit(): void {

    // Cargar los datos del almacenamiento local dependiendo del parámetro id  
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
    const data = this.dataStorageService.getData();
    this.listaSeleccionada = data.find((lista: Lista) => lista.id === this.folder)!;
    // Convertir la fecha en un string con el idioma local español  
    this.fechaCreacionString = new Date(this.listaSeleccionada.fechaCreacion).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  // Guardar cambios en el almacenamiento local utilizando el servicio
  guardarCambios(): void {
    const data = this.dataStorageService.getData();
    const index = data.findIndex((lista: Lista) => lista.id === this.listaSeleccionada.id);
    if (index > -1) {
      data[index] = this.listaSeleccionada;
      this.dataStorageService.setData(data);
    }
  }

  // Agregar un nuevo producto a la lista seleccionada
  // Este método usa TypeScript asincrónico
  async agregarProducto(): Promise<void> {
    /* Se eliminan los espacios en blanco en los extremos, usando una expresión regular la primera letra de la cadena se convertirá a mayúsculas
    o se mantendrá en mayúscula si ya lo está,  y el resto de la cadena se convertirá a minúsculas teniendo en cuenta el idioma español */
    const nombreProducto = this.nombreProducto.trim().replace(/^(.)(.*)$/, (match, firstChar, restOfString) => firstChar.toLocaleUpperCase() + restOfString.toLocaleLowerCase());
    // validación de datos para no permitir el nombre de un producto en blanco
    if (nombreProducto === '') {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'El producto no tiene nombre.',
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
    }
    // validación de datos para no permitir unidades con valor 0
    const unidades = this.unidadesProducto;
    if (unidades === 0) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Las unidades no pueden ser 0.',
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
    }
     // validación de datos para no permitir precios con valor 0
    const precio = this.precioProducto;
    if (precio === 0) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'El precio no puede ser 0.',
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
    }
    // Validación de datos para no permitir introducir productos repetidos       
    const productoExistente = this.listaSeleccionada.productos.find((producto: Producto) => producto.nombre === nombreProducto);
    if (productoExistente) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: `Ya existe un producto con el nombre "${nombreProducto}" en esta lista.`,
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
    }
    // Si los datos son correctos se añade el producto a la lista seleccionada
    const nuevoProducto: Producto = {
      nombre: nombreProducto,
      comprado: false,
      unidades: this.unidadesProducto,
      precio: this.precioProducto
    };
    this.listaSeleccionada.productos.push(nuevoProducto);
    this.guardarCambios(); // almacenamiento en Local Storage

    // reestablecer los valores en los inputs de entrada
    this.nombreProducto = '';
    this.unidadesProducto = 0;
    this.precioProducto = 0;
  }

  // Calcular el importe total de los productos marcados como comprados
  calculaTotal(): number {
    let total = 0;
    for (const producto of this.listaSeleccionada.productos) {
      if (producto.comprado) {
        total += producto.unidades * producto.precio;
      }
    }
    return Number(total.toFixed(2)); // redondear a dos decimales y devolver en formato number
  }

  // Eliminar un producto de la lista seleccionada si se confirma la eliminación y guardar cambios
  // Este método usa TypeScript asincrónico
  async eliminarProducto(producto: Producto): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Confirmas que quieres eliminar este producto?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Eliminar',
          handler: () => {
            const index = this.listaSeleccionada.productos.indexOf(producto);
            if (index > -1) {
              this.listaSeleccionada.productos.splice(index, 1);
              this.guardarCambios();
            }
          }
        }
      ]
    });
    await alert.present();
  }

  // Borrar todo el contenido de una lista (vaciarla)
  // Este método usa TypeScript asincrónico
  async vaciarLista(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Confirmas que quieres borrar todos los productos de esta lista?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Borrar',
          handler: () => {
            this.listaSeleccionada.productos = [];
            this.guardarCambios();
          }
        }
      ]
    });

    await alert.present();
  }

// Crear una nueva lista utilizando el servicio
// Este método usa TypeScript asincrónico
async nuevaLista() {
  if (!this.nombreLista) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'La lista no tiene nombre',
      buttons: ['OK']
    });

    await alert.present();
    return; 
  }
  const lastId = this.listaService.getLastId(); // obtener el último id de la lista
  const nuevaLista: Lista = {
    id: (lastId).toString(), // convertirlo en string
    nombre: this.nombreLista,
    url: 'folder/' + (lastId).toString(), // concatenar id a la ruta
    icon: 'fast-food', 
    productos: [], // comenzar con array de productos vacío
    fechaCreacion: new Date() // almacenar la fecha de creación
  };
  // Agregar la nueva lista al almacenamiento de datos
  this.listaService.addLista(nuevaLista);
  // Recargar la página utilizando el servicio para que se visualice en la lista
  this.appRefreshService.refreshApp();
  // Restablecer el valor del campo de entrada
  this.nombreLista = '';
}
}

/* Estos métodos servirían para eliminar una la lista del menú 
no son han implementados al no ser requeridos por el equipo docente
los dejo por si en el futuro se decidiese ampliar la app 

  // Eliminar la lista seleccionada del menú utilizando el servicio
  
  deleteLista(id: string): void {
    id = this.folder;
    this.listaService.deleteListaById(id);
    // Recargar la página utilizando el servicio
    this.appRefreshService.refreshApp();
  }

  // Obtener el id de la lista seleccionada e invocar al método que elimina la lista
  // Este método usa TypeScript asincrónico
  async eliminarLista(): Promise<void> {
  if (!this.folder) {
    return;
  }
  const alert = await this.alertController.create({
    header: 'Confirmar eliminación',
    message: '¿Está seguro que desea eliminar esta lista?',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        }
      },
      {
        text: 'Eliminar',
        handler: () => {
          this.deleteLista(this.folder);
          // Obtener el primer id de lista para redireccionar
          const listas = this.listaService.getListas();
          const firstId = listas.length > 0 ? listas[0].id : '';
          // Redireccionar a la primera lista o a una ruta específica en caso de no haber listas
          this.router.navigate(['folder', firstId]);
        }
      }
    ]
  });
  await alert.present();
}
*/
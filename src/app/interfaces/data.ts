/* Este archivo contiene la definición del modelo de datos de las interfaces, 
de las clases que las implementan y de sus constructores. 
Además incorporan unos valores iniciales para las listas, que tienen una doble finalidad, 
por un lado son las listas más habituales de la compra 
y por otro lado sirven para probar la aplicación. */

// Definición del tipo de datos
export interface Lista {
  id: string;
  nombre: string;
  url: string;
  icon: string;
  productos: Producto[];
  fechaCreacion: Date;
}

export interface Producto {
  nombre: string;
  comprado: boolean;
  unidades: number;
  precio: number;
}

// Clases que implementan los tipos de datos y sus constructores
export class Listas implements Lista {
  id: string;
  nombre: string;
  url: string;
  icon: string;
  productos: Producto[];
  fechaCreacion: Date;

  constructor(id: string, nombre: string, url: string, icon: string, productos: Producto[], fechaCreacion: Date = new Date()) {
    this.id = id;
    this.nombre = nombre;
    this.url = url;
    this.icon = icon;
    this.productos = productos;
    this.fechaCreacion = fechaCreacion;
  }
}

export class Productos implements Producto {
  nombre: string;
  comprado: boolean;
  unidades: number;
  precio: number;

  constructor(nombre: string, comprado: boolean, unidades: number, precio: number) {
    this.nombre = nombre;
    this.comprado = comprado;
    this.unidades = unidades;
    this.precio = precio;
  }
}

/*  Estos datos iniciales para las listas utlizan la notación literal de objetos de TypeScript 
que se convertirán a cadena JSON. Estos datos posteriormente se podrán actualizar utilizando 
el almacenamiento local de Local Storage. */
export const listas: Listas[] = [
  {
    id: '1',
    nombre: 'Eroski',
    url: 'folder/1',
    icon: 'fast-food',
    productos: [
      { nombre: 'Leche', comprado: false, unidades: 2, precio: 0.95 },
      { nombre: 'Pan', comprado: false, unidades: 1, precio: 1.95 },
      { nombre: 'Queso', comprado: false, unidades: 1, precio: 8.56 },
    ],
    fechaCreacion: new Date(2023, 4, 1),
  },
  {
    id: '2',
    nombre: 'Gadis',
    url: 'folder/2',
    icon: 'fast-food',
    productos: [
      { nombre: 'Arroz', comprado: false, unidades: 1, precio: 2.15 },
      { nombre: 'Cerveza', comprado: false, unidades: 3, precio: 1.19 },
      { nombre: 'Pollo', comprado: false, unidades: 1, precio: 6.25 },
    ],
    fechaCreacion: new Date(2023, 4, 1),
  },
  {
    id: '3',
    nombre: 'Mercadona',
    url: 'folder/3',
    icon: 'fast-food',
    productos: [
      { nombre: 'Pasta', comprado: false, unidades: 1, precio: 2.46 },
      { nombre: 'Tomate', comprado: false, unidades: 1, precio: 2.15 },
      { nombre: 'Agua', comprado: false, unidades: 2, precio: 1.49 },
    ],
    fechaCreacion: new Date(2023, 4, 1),
  },
];
/* En este archivo se definen todas las rutas de la aplicación. La ruta carga el módulo de inicio FolderPageModule, 
y la ruta /folder/:id carga el módulo FolderPageModule cuando se accede a ella, esta ruta tiene :id que es un parámetro variable. Se ha establecido como página de inicio la ruta ./folder/1. */
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', // página de inicio
    redirectTo: 'folder/1', // redirección
    pathMatch: 'full' // utilizar ruta completa
  },
  {
    path: 'folder/:id', // enviar parámetro id
    loadChildren: () => import('./folder/folder.module').then(m => m.FolderPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
/* En este archivo se importan los módulos necesarios, y se definen las rutas para el componente FolderPage, 
la url raíz mostrará el componente FolderPage, y se exporta el módulo para que pueda ser utilizado en otros módulos o páginas. */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FolderPage } from './folder.page';

const routes: Routes = [
  {
    path: '',
    component: FolderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FolderPageRoutingModule {}
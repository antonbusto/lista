/* Este archivo se encarga de la declaración del módulo, se importan los módulos necesarios, se declara 
y se exporta al componente FolderPage */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FolderPageRoutingModule } from './folder.routing.module';
import { FolderPage } from './folder.page';
import { IonicStorageModule } from '@ionic/storage-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FolderPageRoutingModule,
    IonicStorageModule.forRoot()
  ],
  declarations: [FolderPage]
})
export class FolderPageModule { }
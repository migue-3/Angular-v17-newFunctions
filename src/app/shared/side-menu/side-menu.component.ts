import { Component } from '@angular/core';
import { routes } from '../../app.routes';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css',
})
export class SideMenuComponent {
  public menuItems = routes
    // Con el map seleccionamos las rutas children y si no viene lo dejamos como un [] vacio
    .map((route) => route.children ?? [])
    // Con la funcion flat de los arreglos nos aseguramos de que muestre un solo array con todas las rutas(aplanarlo)
    .flat()
    // Filter para filtrar solo las rutas que tengan un path, caso contrario no las voy a mostrar
    .filter((route) => route && route.path)
    // Para excluir del arreglo la ruta 'user/:id'
    .filter((route) => !route.path?.includes(':'));

  constructor() {
    // const dashboardRoutes = routes
    //   .map((route) => route.children ?? [])
    //   .flat()
    //   .filter((route) => route && route.path)
    //   .filter((route) => !route.path?.includes(':'));
    // console.log(dashboardRoutes);
  }
}

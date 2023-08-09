import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-shared',
  templateUrl: './layout-shared.component.html',
  styles: [
  ]
})
export class LayoutSharedComponent {
    public sidebarItems = [
        { label: "Listado1", icon: "label", url: "./list"  },
        { label: "Añadir2", icon: "add", url: "./new-hero"  },
        { label: "Buscar3", icon: "search", url: "./search"  }
    ]
}

import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  isMenuOpen = false;

  toggleMenu(): void {
    try {
      this.isMenuOpen = !this.isMenuOpen;
    } catch (error) {
      console.error('Error al abrir/cerrar el menú:', error);
    }
  }

  closeMenu(): void {
    try {
      this.isMenuOpen = false;
    } catch (error) {
      console.error('Error al cerrar el menú:', error);
    }
  }

  // Cerrar menú al hacer click fuera
  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event): void {
    try {
      const target = event.target as HTMLElement;

      if (!target.closest('.navbar')) {
        this.isMenuOpen = false;
      }
    } catch (error) {
      console.error('Error detectando click fuera:', error);
    }
  }

  // Cerrar menú al cambiar tamaño (evita bugs entre mobile/desktop)
  @HostListener('window:resize')
  onResize(): void {
    try {
      if (window.innerWidth >= 992 && this.isMenuOpen) {
        this.isMenuOpen = false;
      }
    } catch (error) {
      console.error('Error en resize:', error);
    }
  }
}

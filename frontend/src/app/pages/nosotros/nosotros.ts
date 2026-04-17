import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Organigrama } from './organigrama/organigrama';

@Component({
  selector: 'app-nosotros',
  imports: [Organigrama],
  templateUrl: './nosotros.html',
  styleUrl: './nosotros.css',
})
export class Nosotros implements OnInit {
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        setTimeout(() => {
          const el = document.getElementById(fragment);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
      }
    });
  }
  /**
   * Muestra el contenido seleccionado (Misión/Visión/Valores)
   * @param contentType - Tipo de contenido: 'mision', 'vision' o 'valores'
   */
  showContent(contentType: string): void {
    // 1. Obtener referencias principales
    const displayArea = document.getElementById('content-display-area');
    const targetContent = document.getElementById(`content-${contentType}`);
    const targetButton = document.getElementById(`btn-${contentType}`);

    if (!displayArea || !targetContent || !targetButton) {
      console.warn(`No se encontraron elementos para ${contentType}`);
      return;
    }

    // 2. Verificar si el contenido solicitado YA está visible (para alternar/toggle)
    const isAlreadyVisible = !targetContent.classList.contains('hidden');

    // 3. Ocultar todo el texto de contenido anterior y quitar estados activos
    const allContentDivs = document.querySelectorAll('.content-text');
    const allButtons = document.querySelectorAll('.floating-btn');

    allContentDivs.forEach((div) => div.classList.add('hidden'));
    allButtons.forEach((btn) => btn.classList.remove('floating-btn-active'));

    // 4. Lógica de visualización (Toggle)
    if (isAlreadyVisible) {
      // Si ya estaba abierto, ocultamos el área completa
      displayArea.classList.add('hidden');
    } else {
      // Si estaba cerrado o era otro contenido, lo mostramos
      displayArea.classList.remove('hidden');
      targetContent.classList.remove('hidden');
      targetButton.classList.add('floating-btn-active');

      // Desplazamiento suave para mejorar el enfoque visual
      setTimeout(() => {
        displayArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    }
  }
}

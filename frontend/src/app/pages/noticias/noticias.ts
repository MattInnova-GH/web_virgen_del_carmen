import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-noticias',
  imports: [CommonModule, RouterLink],
  templateUrl: './noticias.html',
  styleUrl: './noticias.css',
})
export class Noticias implements OnInit {

  private http = inject(HttpClient);
  private api = 'http://localhost:3000/api';

  featuredNoticias = signal<any[]>([]);
  otrasNoticias = signal<any[]>([]);

  // Paginación
  readonly pageSize = 5;
  readonly currentPage = signal(1);

  readonly totalPages = computed(() =>
    Math.ceil(this.otrasNoticias().length / this.pageSize)
  );

  readonly paginatedNoticias = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.otrasNoticias().slice(start, start + this.pageSize);
  });

  readonly pages = computed(() =>
    Array.from({ length: this.totalPages() }, (_, i) => i + 1)
  );

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  ngOnInit(): void {
    this.http.get<any[]>(`${this.api}/news/list`).subscribe({
      next: data => {
        const activas = data.filter(n => n.status).map(n => ({
          ...n,
          contentPlain: this.stripHtml(n.content)
        }));
        this.featuredNoticias.set(activas.slice(0, 2));
        this.otrasNoticias.set(activas.slice(2));
      }
    });
  }

  private stripHtml(html: string): string {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }
}
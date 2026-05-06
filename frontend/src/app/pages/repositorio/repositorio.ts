import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface Investigacion {
  id: number;
  title: string;
  author: string;
  content: string;
  publication_date: string;
  description: string;
  pdf_url: SafeResourceUrl | null;
  rawPdfUrl: string | null;
  status: boolean;
}

@Component({
  selector: 'app-repositorio',
  standalone: true,
  imports: [CommonModule, DatePipe, RouterLink],
  templateUrl: './repositorio.html',
  styleUrl: './repositorio.css',
})
export class Repositorio implements OnInit {
  private http = inject(HttpClient);
  private sanitizer = inject(DomSanitizer);
  private BASE = 'http://localhost:3000';

  investigaciones = signal<Investigacion[]>([]);
  loading = signal(true);

  pdfViewer = signal<SafeResourceUrl | null>(null);
  pdfTitle = signal('');

  private sorted = computed(() =>
    [...this.investigaciones().filter(i => i.status)].sort((a, b) => {
      const da = a.publication_date ? new Date(a.publication_date).getTime() : 0;
      const db = b.publication_date ? new Date(b.publication_date).getTime() : 0;
      return db - da;
    })
  );

  destacados = computed(() => this.sorted().slice(0, 2));
  private allLista = computed(() => this.sorted().slice(2));

  readonly PAGE_SIZE = 10;

  currentPage = signal(1);
  totalPages = computed(() => Math.max(1, Math.ceil(this.allLista().length / this.PAGE_SIZE)));
  lista = computed(() => {
    const start = (this.currentPage() - 1) * this.PAGE_SIZE;
    return this.allLista().slice(start, start + this.PAGE_SIZE);
  });
  pages = computed(() => Array.from({ length: this.totalPages() }, (_, i) => i + 1));

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages()) return;
    this.currentPage.set(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  ngOnInit(): void {
    this.http.get<any[]>(`${this.BASE}/api/investigations/list`).subscribe({
      next: (data) => {
        this.investigaciones.set(
          data
            .filter(i => i.status)
            .map(i => ({
              id: i.id,
              title: i.title,
              author: i.author ?? 'Autor no especificado',
              content: i.content,
              publication_date: i.publication_date,
              description: i.description,
              rawPdfUrl: i.pdf_url ? `${this.BASE}${i.pdf_url}` : null,
              pdf_url: i.pdf_url
                ? this.sanitizer.bypassSecurityTrustResourceUrl(`${this.BASE}${i.pdf_url}`)
                : null,
              status: i.status,
            }))
        );
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  openPdf(inv: Investigacion, event: Event) {
    event.stopPropagation();
    if (!inv.pdf_url) return;
    this.pdfTitle.set(inv.title);
    this.pdfViewer.set(inv.pdf_url);
  }

  closePdf() {
    this.pdfViewer.set(null);
    this.pdfTitle.set('');
  }

  stripHtml(html: string): string {
    if (!html) return '';
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return (tmp.textContent || tmp.innerText || '').replace(/\s+/g, ' ').trim();
  }

  excerpt(html: string, max = 160): string {
    const text = this.stripHtml(html);
    return text.length > max ? text.substring(0, max) + '...' : text;
  }

}

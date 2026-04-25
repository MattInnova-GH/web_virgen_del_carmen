import { Component, OnInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-noticias',
  imports: [CommonModule],
  templateUrl: './noticias.html',
  styleUrl: './noticias.css',
})
export class Noticias implements OnInit {

  private http = inject(HttpClient);
  private api = 'http://localhost:3000/api';

  featuredNoticias = signal<any[]>([]);
  otrasNoticias = signal<any[]>([]);

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

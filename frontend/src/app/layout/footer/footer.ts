import { Component, OnInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, CommonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer implements OnInit {

  private http = inject(HttpClient);

  contacto = signal<any>(null);

  ngOnInit(): void {
    this.http.get<any[]>(`${environment.apiUrl}/contacts/list`).subscribe({
      next: data => {
        const activo = data.find(c => c.status);
        if (activo) this.contacto.set(activo);
      }
    });
  }
}

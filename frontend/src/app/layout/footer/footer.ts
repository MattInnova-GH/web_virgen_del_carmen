import { Component, OnInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

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
    this.http.get<any[]>('http://localhost:3000/api/contacts/list').subscribe({
      next: data => {
        const activo = data.find(c => c.status);
        if (activo) this.contacto.set(activo);
      }
    });
  }
}

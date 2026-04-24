import { Component, OnInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-trayectoria',
  standalone: true,
  imports: [FormsModule, QuillModule],
  templateUrl: './trayectoria.html',
  styleUrl: './trayectoria.css',
})
export class AdminTrayectoria {

}
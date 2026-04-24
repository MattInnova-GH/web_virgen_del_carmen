import { Component, OnInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-contactos',
  standalone: true,
  imports: [FormsModule, QuillModule],
  templateUrl: './contactos.html',
  styleUrl: './contactos.css',
})
export class AdminContactos {

}
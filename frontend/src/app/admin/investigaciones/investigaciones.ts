import { Component, OnInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-investigaciones',
  standalone: true,
  imports: [FormsModule, QuillModule],
  templateUrl: './investigaciones.html',
  styleUrl: './investigaciones.css',
})
export class AdminInvestigaciones {

}
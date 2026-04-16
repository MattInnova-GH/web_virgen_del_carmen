import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mesa-de-partes',
  imports: [FormsModule],
  templateUrl: './mesa-de-partes.html',
  styleUrl: './mesa-de-partes.css',
})
export class MesaDePartes implements OnInit {
  submitted = false;
  captchaCode = '';
  captchaInput = '';
  trackingCode = '';
  showTracking = false;

  form = {
    nombres: '',
    dni: '',
    correo: '',
    telefono: '',
    condicion: '',
    tipoDoc: '',
    asunto: '',
    mensaje: '',
    folios: 1,
    linkDocumento: '',
  };

  ngOnInit(): void {
    this.generarCaptcha();
  }

  generarCaptcha(): void {
    this.captchaCode = Math.floor(10000 + Math.random() * 90000).toString();
  }

  enviar(): void {
    if (this.captchaInput !== this.captchaCode) {
      alert('Código de verificación incorrecto. Intente de nuevo.');
      this.generarCaptcha();
      this.captchaInput = '';
      return;
    }
    this.submitted = true;
  }

  nuevoEnvio(): void {
    this.submitted = false;
    this.captchaInput = '';
    this.generarCaptcha();
    this.form = {
      nombres: '',
      dni: '',
      correo: '',
      telefono: '',
      condicion: '',
      tipoDoc: '',
      asunto: '',
      mensaje: '',
      folios: 1,
      linkDocumento: '',
    };
  }

  toggleTracking(): void {
    this.showTracking = !this.showTracking;
  }
}

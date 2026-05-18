import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-mesa-de-partes',
  imports: [FormsModule],
  templateUrl: './mesa-de-partes.html',
  styleUrl: './mesa-de-partes.css',
})
export class MesaDePartes implements OnInit {
  isSubmitting = false;
  private http = inject(HttpClient);

  captchaCode = '';
  captchaInput = '';

  trackingCode = '';

  showTracking = false;

  showSuccessModal = false;

  selectedFile: File | null = null;

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

    this.captchaCode =
      Math.floor(
        10000 + Math.random() * 90000
      ).toString();
  }

  enviar(): void {

    if (this.isSubmitting) return;

    if (this.captchaInput !== this.captchaCode) {

      alert(
        'Código de verificación incorrecto'
      );

      this.generarCaptcha();

      this.captchaInput = '';

      return;
    }

    this.isSubmitting = true;

    const formData = new FormData();

    formData.append(
      'full_name',
      this.form.nombres
    );

    formData.append(
      'DNI_RUC',
      this.form.dni
    );

    formData.append(
      'email',
      this.form.correo
    );

    formData.append(
      'phone_number',
      this.form.telefono
    );

    formData.append(
      'c_condition',
      this.form.condicion
    );

    formData.append(
      'verification_code',
      this.captchaInput
    );

    formData.append(
      'document_type',
      this.form.tipoDoc
    );

    formData.append(
      'v_subject',
      this.form.asunto
    );

    formData.append(
      'v_message',
      this.form.mensaje
    );

    formData.append(
      'number_of_pages',
      this.form.folios.toString()
    );

    formData.append(
      'document_url',
      this.form.linkDocumento
    );

    if (this.selectedFile) {

      formData.append(
        'attached_file',
        this.selectedFile
      );
    }

    this.http.post(
      `${environment.apiUrl}/digital_intake_office/create`,
      formData
    ).subscribe({

      next: (response: any) => {
        this.isSubmitting = false;
        this.trackingCode = response.tracking_code;
        this.showSuccessModal = true;
      },

      error: (error) => {
        this.isSubmitting = false;
        console.error(error);

        alert(
          error.error?.error ||
          'Error al enviar el documento'
        );
      }
    });
  }

  onFileSelected(event: any): void {

    const file = event.target.files[0];

    if (!file) return;

    this.selectedFile = file;
  }

  toggleTracking(): void {

    this.showTracking =
      !this.showTracking;
  }

  closeModal(): void {

    this.showSuccessModal = false;

    this.nuevoEnvio();
  }

  nuevoEnvio(): void {

    this.captchaInput = '';

    this.generarCaptcha();

    this.selectedFile = null;

    this.trackingCode = '';

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
}
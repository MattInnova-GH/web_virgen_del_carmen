import {
  Component, signal, ViewChild, ElementRef,
  AfterViewChecked, HostListener
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

export interface ChatMessage {
  id: number;
  text: string;
  type: 'bot' | 'user';
  time: string;
  links?: { label: string; path: string }[];
  quickReplies?: string[];
}

interface ChatRule {
  patterns: string[];
  response: string;
  links?: { label: string; path: string }[];
  quickReplies?: string[];
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './chatbot.html',
  styleUrl: './chatbot.css',
})
export class Chatbot implements AfterViewChecked {
  @ViewChild('messagesContainer') private msgContainer!: ElementRef;

  isOpen = signal(false);
  isTyping = signal(false);
  userInput = '';
  private msgIdCounter = 0;

  messages = signal<ChatMessage[]>([
    {
      id: this.nextId(),
      type: 'bot',
      text: '¡Hola! 👋 Soy el asistente virtual del **IESPP Virgen del Carmen**. Estoy aquí para ayudarte con cualquier consulta sobre nuestra institución.',
      time: this.nowTime(),
      quickReplies: ['¿Qué programas ofrecen?', 'Proceso de admisión', 'Contacto', 'Servicios'],
    },
  ]);

  private rules: ChatRule[] = [
    // ── SALUDOS ──────────────────────────────────────────────────────────────
    {
      patterns: ['hola', 'buenos dias', 'buenas tardes', 'buenas noches', 'buenas', 'saludos', 'hey', 'hi'],
      response: '¡Hola! Bienvenido al IESPP Virgen del Carmen 😊. ¿En qué puedo ayudarte hoy?',
      quickReplies: ['Programas de estudio', 'Admisión', 'Costos', 'Contacto'],
    },

    // ── INSTITUCIÓN ──────────────────────────────────────────────────────────
    {
      patterns: ['quienes son', 'que es el instituto', 'sobre ustedes', 'historia', 'mision', 'vision', 'valores', 'nosotros', 'institucional'],
      response: 'El **IESPP Virgen del Carmen** es una institución de Educación Superior Pedagógica dedicada a la formación de docentes de calidad. Contamos con una sólida trayectoria y estamos comprometidos con la excelencia educativa en la región.',
      links: [{ label: 'Conocer más sobre nosotros', path: '/nosotros' }],
      quickReplies: ['Misión y visión', 'Programas', 'Personal docente'],
    },
    {
      patterns: ['mision', 'vision', 'mision y vision', 'objetivos institucionales'],
      response: 'Nuestra **Misión** es formar docentes competentes, éticos y comprometidos con la educación. Nuestra **Visión** es ser una institución de referencia en educación superior pedagógica a nivel regional, reconocida por la calidad de sus egresados.',
      links: [{ label: 'Ver misión y visión', path: '/nosotros' }],
    },
    {
      patterns: ['organigrama', 'estructura', 'autoridades', 'director', 'directivos'],
      response: 'Puedes conocer la estructura organizacional y las autoridades del IESPP Virgen del Carmen en nuestra página de "Nosotros".',
      links: [{ label: 'Ver organigrama', path: '/nosotros#organigrama' }],
    },

    // ── PROGRAMAS ─────────────────────────────────────────────────────────────
    {
      patterns: ['programas', 'carreras', 'especialidades', 'que estudian', 'que ofrecen', 'educacion', 'inicial', 'primaria', 'computacion', 'ingles', 'secundaria'],
      response: 'Ofrecemos programas de formación docente en diversas especialidades. Puedes revisar el detalle de cada programa y su plan de estudios en nuestra sección de Programas.',
      links: [{ label: 'Ver todos los programas', path: '/programas' }],
      quickReplies: ['¿Cuánto dura la carrera?', 'Proceso de admisión', 'Costos de pensión'],
    },
    {
      patterns: ['duracion', 'cuanto dura', 'anos', 'semestres', 'años de estudio'],
      response: 'Los programas del IESPP Virgen del Carmen tienen una duración de **10 semestres académicos (5 años)**. Al concluir obtienes el título de Profesor en la especialidad correspondiente.',
      quickReplies: ['Costos', 'Programas disponibles'],
    },
    {
      patterns: ['titulo', 'grado', 'certificado', 'diploma', 'bachiller', 'licenciatura'],
      response: 'Al concluir satisfactoriamente tu formación obtienes el **Título Profesional de Profesor** en tu especialidad, reconocido por el Ministerio de Educación del Perú.',
      quickReplies: ['Programas disponibles', 'Proceso de admisión'],
    },

    // ── ADMISIÓN ──────────────────────────────────────────────────────────────
    {
      patterns: ['admision', 'ingreso', 'postular', 'inscripcion', 'inscribir', 'como entrar', 'proceso de admision', 'examen', 'postulacion', 'requisitos'],
      response: '**Proceso de Admisión:**\n\n📋 Para postular al IESPP Virgen del Carmen necesitas:\n• DNI vigente\n• Certificado de estudios de secundaria\n• Partida de nacimiento\n• 2 fotos tamaño carné\n• Pago de derecho de inscripción\n\nConsulta el cronograma y bases completas en nuestra sección de Admisión.',
      links: [{ label: 'Ver bases y documentos de admisión', path: '/admision' }],
      quickReplies: ['¿Cuándo es el examen?', 'Costos de admisión', 'Programas disponibles'],
    },
    {
      patterns: ['cuando es el examen', 'fecha examen', 'cronograma admision', 'fecha postulacion'],
      response: 'El cronograma de admisión se publica en nuestra sección oficial. Te recomendamos revisar los documentos publicados o contactarnos directamente para información actualizada.',
      links: [{ label: 'Ver documentos de admisión', path: '/admision' }],
      quickReplies: ['Contacto', 'Requisitos'],
    },

    // ── COSTOS / PAGOS ────────────────────────────────────────────────────────
    {
      patterns: ['costo', 'pension', 'mensualidad', 'matricula', 'cuanto cuesta', 'precio', 'pago', 'cuota', 'tarifa', 'arancel'],
      response: 'Puedes encontrar la información detallada sobre costos de matrícula, pensiones y otros aranceles en nuestra sección de Costos y Pensiones.',
      links: [{ label: 'Ver costos y pensiones', path: '/costos' }],
      quickReplies: ['Becas y financiamiento', 'Proceso de admisión'],
    },

    // ── BECAS ─────────────────────────────────────────────────────────────────
    {
      patterns: ['beca', 'becas', 'credito', 'financiamiento', 'apoyo economico', 'media beca', 'beca integral', 'pronabec'],
      response: 'El IESPP Virgen del Carmen cuenta con información sobre becas y créditos educativos. Puedes revisar los programas de apoyo disponibles en nuestra sección dedicada.',
      links: [{ label: 'Ver becas y créditos', path: '/becas' }],
      quickReplies: ['Requisitos de beca', 'Costos', 'Contacto'],
    },

    // ── SERVICIOS ─────────────────────────────────────────────────────────────
    {
      patterns: ['servicios', 'que ofrecen', 'servicios institucionales', 'apoyo estudiantil'],
      response: 'Contamos con los siguientes servicios para nuestros estudiantes:\n\n🧠 **Soporte Psicopedagógico** — Orientación y apoyo académico\n🏥 **Soporte Médico** — Atención en salud\n🤝 **Servicio Social** — Bienestar estudiantil\n📄 **Mesa de Partes Virtual** — Trámites en línea',
      links: [{ label: 'Ver todos los servicios', path: '/servicios' }],
      quickReplies: ['Soporte psicopedagógico', 'Soporte médico', 'Mesa de partes'],
    },
    {
      patterns: ['psicopedagogico', 'psicologia', 'orientacion', 'tutoria', 'apoyo psicologico', 'consejeria'],
      response: 'El servicio de **Soporte Psicopedagógico** ofrece orientación académica y psicológica a todos los estudiantes. Nuestro equipo está disponible para apoyarte en tu proceso de aprendizaje y bienestar emocional.',
      links: [{ label: 'Ir a Soporte Psicopedagógico', path: '/psicopedagogico' }],
    },
    {
      patterns: ['medico', 'salud', 'enfermeria', 'atencion medica', 'medica', 'soporte medico', 'salud estudiantil'],
      response: 'El servicio de **Soporte Médico** brinda atención básica de salud a estudiantes y personal. Contamos con profesionales disponibles para atender emergencias y consultas de salud.',
      links: [{ label: 'Ir a Soporte Médico', path: '/soporte-medico' }],
    },
    {
      patterns: ['servicio social', 'bienestar', 'bienestar estudiantil', 'trabajo social'],
      response: 'El **Servicio Social** del IESPP Virgen del Carmen trabaja para el bienestar integral del estudiante, brindando apoyo en situaciones especiales y gestionando programas de apoyo social.',
      links: [{ label: 'Ir a Servicio Social', path: '/servicio-social' }],
    },

    // ── MESA DE PARTES ────────────────────────────────────────────────────────
    {
      patterns: ['mesa de partes', 'tramite', 'solicitud', 'documento', 'constancia', 'certificado estudios', 'virtual', 'enviar documento'],
      response: 'Puedes realizar tus trámites y enviar documentos a través de nuestra **Mesa de Partes Virtual**, disponible las 24 horas. Solo necesitas completar el formulario en línea.',
      links: [{ label: 'Ir a Mesa de Partes Virtual', path: '/mesa-de-partes' }],
      quickReplies: ['¿Qué trámites puedo hacer?', 'Contacto'],
    },
    {
      patterns: ['que tramites', 'tramites disponibles', 'que puedo enviar', 'tipos de solicitud'],
      response: 'A través de Mesa de Partes Virtual puedes presentar:\n\n• Solicitudes de constancias y certificados\n• Recursos de apelación\n• Solicitudes de traslado\n• Documentos académicos en general\n• Cualquier comunicación formal a la institución',
      links: [{ label: 'Acceder a Mesa de Partes', path: '/mesa-de-partes' }],
    },

    // ── NOTICIAS ──────────────────────────────────────────────────────────────
    {
      patterns: ['noticias', 'novedades', 'actividades', 'eventos', 'que hay de nuevo', 'comunicados', 'anuncios'],
      response: 'Mantente informado sobre las últimas noticias, actividades y comunicados oficiales del IESPP Virgen del Carmen en nuestra sección de Noticias.',
      links: [{ label: 'Ver últimas noticias', path: '/noticias' }],
    },

    // ── REPOSITORIO ───────────────────────────────────────────────────────────
    {
      patterns: ['repositorio', 'investigacion', 'investigaciones', 'biblioteca', 'documentos academicos', 'publicaciones', 'tesis'],
      response: 'En nuestro **Repositorio Institucional** encontrarás investigaciones, publicaciones académicas y documentos elaborados por docentes y estudiantes del IESPP.',
      links: [{ label: 'Ir al Repositorio Institucional', path: '/repositorio' }],
      quickReplies: ['¿Cómo accedo a los documentos?'],
    },
    {
      patterns: ['como accedo', 'descargar', 'ver pdf', 'leer investigacion'],
      response: 'En el Repositorio Institucional puedes visualizar los documentos directamente en el navegador o descargarlos en formato PDF. El acceso es libre y gratuito para todos.',
      links: [{ label: 'Acceder al Repositorio', path: '/repositorio' }],
    },

    // ── TRANSPARENCIA ─────────────────────────────────────────────────────────
    {
      patterns: ['transparencia', 'informacion publica', 'portal transparencia', 'documentos oficiales', 'presupuesto', 'gestion'],
      response: 'En nuestro **Portal de Transparencia** encontrarás información institucional, documentos de gestión, presupuestos y toda la información de acceso público según la normativa vigente.',
      links: [{ label: 'Ir al Portal de Transparencia', path: '/transparencia' }],
    },

    // ── REGLAMENTOS ───────────────────────────────────────────────────────────
    {
      patterns: ['reglamento', 'reglamentos', 'normas', 'reglas', 'normativa', 'estatuto'],
      response: 'Los reglamentos y normativas institucionales están disponibles en nuestra sección dedicada. Incluyen el Reglamento Institucional, Reglamento de Evaluación y otras normas académicas.',
      links: [{ label: 'Ver reglamentos', path: '/reglamentos' }],
    },

    // ── LICENCIAMIENTO ────────────────────────────────────────────────────────
    {
      patterns: ['licenciamiento', 'licencia', 'acreditacion', 'reconocimiento', 'minedu reconoce', 'sunedu'],
      response: 'El IESPP Virgen del Carmen cuenta con información sobre su proceso de licenciamiento y reconocimiento oficial. Puedes revisar el estado y documentación en la sección correspondiente.',
      links: [{ label: 'Ver información de licenciamiento', path: '/licenciamiento' }],
    },

    // ── HORARIOS ──────────────────────────────────────────────────────────────
    {
      patterns: ['horarios', 'horario', 'clases', 'turno', 'mañana', 'tarde', 'noche', 'schedule'],
      response: 'Los horarios de clases y actividades académicas están publicados en nuestra sección de Horarios. Puedes consultarlos por programa y semestre.',
      links: [{ label: 'Ver horarios', path: '/horarios' }],
    },

    // ── PERSONAL DOCENTE ──────────────────────────────────────────────────────
    {
      patterns: ['docentes', 'profesores', 'personal', 'plana docente', 'maestros', 'quienes enseñan', 'staff'],
      response: 'Contamos con una destacada plana docente con profesionales altamente calificados. Puedes conocer a nuestro personal académico en la sección "Nosotros".',
      links: [{ label: 'Conocer el personal académico', path: '/nosotros#personal' }],
    },

    // ── PROCEDIMIENTOS ────────────────────────────────────────────────────────
    {
      patterns: ['procedimientos', 'proceso', 'pasos', 'como hago', 'como solicito'],
      response: 'Los procedimientos administrativos y académicos están detallados en nuestra sección de Procedimientos. Incluyen guías paso a paso para los trámites más frecuentes.',
      links: [{ label: 'Ver procedimientos', path: '/procedimientos' }],
    },

    // ── ESTADÍSTICAS ──────────────────────────────────────────────────────────
    {
      patterns: ['estadisticas', 'datos', 'cifras', 'indicadores', 'resultados institucionales'],
      response: 'Las estadísticas institucionales, incluyendo indicadores de rendimiento académico y datos de la institución, están disponibles en nuestra sección de Estadísticas.',
      links: [{ label: 'Ver estadísticas', path: '/estadisticas' }],
    },

    // ── INVERSIONES ───────────────────────────────────────────────────────────
    {
      patterns: ['inversiones', 'infraestructura', 'obras', 'proyectos', 'inversion'],
      response: 'Información sobre las inversiones en infraestructura y proyectos de mejora institucional está disponible en nuestra sección de Inversiones dentro del portal de transparencia.',
      links: [{ label: 'Ver inversiones', path: '/inversiones' }],
    },

    // ── CONTACTO ──────────────────────────────────────────────────────────────
    {
      patterns: ['contacto', 'telefono', 'celular', 'email', 'correo', 'direccion', 'ubicacion', 'donde estan', 'como llegar', 'whatsapp', 'redes sociales', 'facebook'],
      response: '📞 **Contáctanos:**\n\n• **WhatsApp / Teléfono:** Disponible en el pie de página\n• **Email:** Disponible en el pie de página\n• **Dirección:** Revisa nuestra información de contacto\n• **Facebook / Instagram / TikTok:** Encuéntranos en redes sociales\n\n¿Prefieres que te ayude directamente? Usa la Mesa de Partes Virtual.',
      links: [{ label: 'Ir a Mesa de Partes', path: '/mesa-de-partes' }],
      quickReplies: ['Mesa de partes', 'Ubicación'],
    },

    // ── DESPEDIDA ─────────────────────────────────────────────────────────────
    {
      patterns: ['gracias', 'muchas gracias', 'chau', 'adios', 'hasta luego', 'bye', 'ok gracias', 'perfecto gracias'],
      response: '¡De nada! Fue un placer ayudarte 😊. Si tienes más preguntas, ¡aquí estaré! Que tengas un excelente día. 🎓',
      quickReplies: ['Volver al inicio', 'Otra consulta'],
    },

    // ── AYUDA / OTRAS CONSULTAS ───────────────────────────────────────────
    {
      patterns: ['ayuda', 'help', 'que puedes hacer', 'opciones', 'menu', 'informacion', 'otras consultas', 'consultas', 'temas', 'ver todo'],
      response: 'Puedo ayudarte con información sobre:\n\n📚 Programas de estudio\n📝 Proceso de admisión\n💰 Costos y pensiones\n🎓 Becas y créditos\n📋 Trámites (Mesa de Partes)\n📰 Noticias y comunicados\n📞 Contacto y ubicación\n📊 Transparencia y reglamentos\n\n¿Sobre qué deseas saber más?',
      quickReplies: ['Programas', 'Admisión', 'Costos', 'Contacto'],
    },
  ];

  toggle() {
    this.isOpen.update(v => !v);
  }

  close() {
    this.isOpen.set(false);
  }

  sendQuickReply(text: string) {
    this.userInput = text;
    this.sendMessage();
  }

  sendMessage() {
    const text = this.userInput.trim();
    if (!text) return;

    this.addMessage({ type: 'user', text, time: this.nowTime() });
    this.userInput = '';
    this.isTyping.set(true);

    setTimeout(() => {
      const response = this.getResponse(text);
      this.isTyping.set(false);
      this.addMessage({ type: 'bot', ...response, time: this.nowTime() });
    }, 700 + Math.random() * 400);
  }

  private addMessage(msg: Omit<ChatMessage, 'id'>) {
    this.messages.update(msgs => [...msgs, { id: this.nextId(), ...msg }]);
    setTimeout(() => this.scrollToBottom(), 60);
  }

  private readonly BACK_BTN = '🔍 Otras consultas';

  private withBack(replies?: string[]): string[] {
    const base = replies ? replies.filter(r => r !== this.BACK_BTN) : [];
    return [...base, this.BACK_BTN];
  }

  private getResponse(input: string): Omit<ChatMessage, 'id' | 'type' | 'time'> {
    const normalized = this.normalize(input);

    let bestRule: ChatRule | null = null;
    let bestScore = 0;

    for (const rule of this.rules) {
      let score = 0;
      for (const pattern of rule.patterns) {
        if (normalized.includes(pattern)) score += pattern.split(' ').length;
      }
      if (score > bestScore) { bestScore = score; bestRule = rule; }
    }

    if (bestRule && bestScore > 0) {
      return {
        text: bestRule.response,
        links: bestRule.links,
        quickReplies: this.withBack(bestRule.quickReplies),
      };
    }

    return {
      text: 'Lo siento, no entendí tu consulta 🤔. Puedo ayudarte con información sobre programas, admisión, costos, servicios, contacto y más. ¿Puedes reformular tu pregunta?',
      quickReplies: ['Programas de estudio', 'Admisión', 'Costos', 'Servicios', 'Contacto'],
    };
  }

  private normalize(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9 ]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  private nextId(): number { return ++this.msgIdCounter; }

  private nowTime(): string {
    return new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' });
  }

  formatText(text: string): string {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');
  }

  ngAfterViewChecked() {}

  private scrollToBottom() {
    try {
      const el = this.msgContainer?.nativeElement;
      if (el) el.scrollTop = el.scrollHeight;
    } catch {}
  }

  @HostListener('document:keydown.escape')
  onEscape() { this.isOpen.set(false); }
}

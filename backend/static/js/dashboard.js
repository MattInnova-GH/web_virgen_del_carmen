const menuItems = document.querySelectorAll(".sidebar li");
const content = document.getElementById("content");

/* Barra de navegación lateral */

menuItems.forEach(item => {
  item.addEventListener("click", () => {
    const section = item.dataset.section;

    switch (section) {
      case "news":
        renderNewsSection();
        break;
      default:
        content.innerHTML = `<h2>${section}</h2>`;
    }
  });
});

/* Noticias */
let editingId = null; // Id por actualizar

function renderNewsSection() {
  content.innerHTML = `
    <h2>Noticias</h2>
    <button class="btn-primary" id="btn-open-modal">+ Agregar noticia</button>
    <div id="news-list" class="news-list"></div>

    <div id="news-modal" class="modal hidden">
      <div class="modal-content">
        <h3 id="modal-title">Nueva noticia</h3>
        <label>Título</label>
        <input type="text" id="news-title">
        <label>Contenido</label>
        <textarea id="news-content"></textarea>
        <label>Imagen (URL)</label>
        <input type="text" id="news-image">

        <div class="modal-actions">
          <button id="btn-save" class="btn-primary">Guardar</button>
          <button id="btn-cancel" class="danger">Cancelar</button>
        </div>
      </div>
    </div>
  `;

  document.getElementById("btn-open-modal").addEventListener("click", () => openNewsModal());
  document.getElementById("btn-save").addEventListener("click", saveNews);
  document.getElementById("btn-cancel").addEventListener("click", closeNewsModal);

  loadNews();
}
/* Modal de creación y actuaización (lógica dual) */

function openNewsModal(news = null) {
  const modal = document.getElementById("news-modal");
  const titleLabel = document.getElementById("modal-title");
  
  if (news) {
    // Modo Edición
    editingId = news.id;
    titleLabel.innerText = "Editar noticia";
    document.getElementById("news-title").value = news.title;
    document.getElementById("news-content").value = news.content;
    document.getElementById("news-image").value = news.img_url;
  } else {
    // Modo Creación
    editingId = null;
    titleLabel.innerText = "Nueva noticia";
    closeNewsModal(); // Limpia campos
  }
  
  modal.classList.remove("hidden");
}

function closeNewsModal() {
  document.getElementById("news-modal").classList.add("hidden");
  document.getElementById("news-title").value = "";
  document.getElementById("news-content").value = "";
  document.getElementById("news-image").value = "";
  editingId = null;
}

/* Creación y actualización de noticias */

async function saveNews() {
  const title = document.getElementById("news-title").value;
  const contentText = document.getElementById("news-content").value;
  const image = document.getElementById("news-image").value;

  if (!title || !contentText) return alert("Título y contenido son obligatorios");

  const url = editingId ? `/api/news/update/${editingId}` : "/api/news/create";
  const method = editingId ? "PUT" : "POST";

  try {
    const res = await fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        content: contentText,
        img_url: image
      })
    });

    if (res.ok) {
      closeNewsModal();
      loadNews();
    }
  } catch (error) {
    console.error("Error al guardar:", error);
  }
}

/* Lectura y eliminación de noticias */

async function loadNews() {
  const res = await fetch("/api/news/list");
  const data = await res.json();
  const list = document.getElementById("news-list");
  list.innerHTML = "";

  data.forEach(n => {
    const card = document.createElement("div");
    card.className = "news-card";
    card.innerHTML = `
      <h4>${n.title}</h4>
      <img src="${n.img_url}" class="news-img" onerror="this.src='/img/logo.png'">
      <p>${n.content}</p>
      <button class="btn-edit">Editar</button>
      <button class="danger btn-delete">Eliminar</button>
    `;

    // Asignar eventos a los botones de la card
    card.querySelector(".btn-edit").onclick = () => openNewsModal(n);
    card.querySelector(".btn-delete").onclick = () => deleteNews(n.id);
    
    list.appendChild(card);
  });
}

async function deleteNews(id) {
  if (!confirm("¿Eliminar esta noticia?")) return;

  try {
    const res = await fetch(`/api/news/delete/${id}`, { 
      method: "DELETE" 
    });

    if (res.ok) {
      loadNews();
    } else {
      const errorData = await res.json();
      alert(errorData.message || "Error al eliminar");
    }
  } catch (error) {
    console.error("Error en el borrado:", error);
  }
}
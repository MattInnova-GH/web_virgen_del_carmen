const menuItems = document.querySelectorAll(".sidebar li");
const content = document.getElementById("content");

/* ======================
   MENÚ LATERAL
====================== */

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

/* ======================
   SECCIÓN NOTICIAS
====================== */

function renderNewsSection() {
  content.innerHTML = `
    <h2>Noticias</h2>
    <p>Gestión de noticias</p>

    <button class="btn-primary" id="btn-open-modal">
      + Agregar noticia
    </button>

    <div id="news-list" class="news-list"></div>

    <div id="news-modal" class="modal hidden">
      <div class="modal-content">

        <h3>Nueva noticia</h3>

        <label>Título</label>
        <input type="text" id="news-title">

        <label>Contenido</label>
        <textarea id="news-content"></textarea>

        <label>Imagen (URL)</label>
        <input type="text" id="news-image" placeholder="https://...">

        <div class="modal-actions">
          <button id="btn-save" class="btn-primary">Guardar</button>
          <button id="btn-cancel" class="danger">Cancelar</button>
        </div>

      </div>
    </div>
  `;

  // Eventos (CLAVE)
  document.getElementById("btn-open-modal").addEventListener("click", openNewsModal);
  document.getElementById("btn-save").addEventListener("click", saveNews);
  document.getElementById("btn-cancel").addEventListener("click", closeNewsModal);

  loadNews();
}

/* ======================
   MODAL
====================== */

function openNewsModal() {
  document.getElementById("news-modal").classList.remove("hidden");
}

function closeNewsModal() {
  document.getElementById("news-modal").classList.add("hidden");

  document.getElementById("news-title").value = "";
  document.getElementById("news-content").value = "";
  document.getElementById("news-image").value = "";
}

/* ======================
   CREATE (GUARDAR EN BD)
====================== */

async function saveNews() {
  const title = document.getElementById("news-title").value;
  const contentText = document.getElementById("news-content").value;
  const image = document.getElementById("news-image").value;

  if (!title || !contentText || !image) {
    alert("Completa título, contenido e imagen");
    return;
  }

  await fetch("/api/news/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title,
      content: contentText,
      img_url: image
    })
  });

  closeNewsModal();
  loadNews();
}

/* ======================
   READ (DESDE BD)
====================== */

async function loadNews() {
  const res = await fetch("/api/news/list");
  const data = await res.json();

  const list = document.getElementById("news-list");
  list.innerHTML = "";

  data.forEach(n => {
    list.innerHTML += `
      <div class="news-card">
        <h4>${n.title}</h4>
        <img 
          src="${n.img_url}" 
          class="news-img"
          onerror="this.src='/img/logo.png'"
        >
        <p>${n.content}</p>
        <button class="danger" onclick="deleteNews(${n.id})">Eliminar</button>
      </div>
    `;
  });
}

/* ======================
   DELETE
====================== */

async function deleteNews(id) {
  if (!confirm("¿Eliminar esta noticia?")) return;

  await fetch(`/api/news/delete/${id}`, { method: "DELETE" });
  loadNews();
}
async function loadLatestNews() {
    try {
        const res = await fetch('/api/news/list');
        const data = await res.json();

        if (!data.length) return;

        const latest = data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )[0];

        const words = latest.content.split(' ');
        const shortText =
            words.length > 200
                ? words.slice(0, 200).join(' ') + '...'
                : latest.content;

        const container = document.getElementById('news-container');

        container.innerHTML = `
            <div class="news-card">
                <img src="${latest.img_url}" alt="noticia">
                
                <div class="news-content">
                    <h3>${latest.title}</h3>
                    <p>${shortText}</p>
                </div>
            </div>
        `;

    } catch (error) {
        console.error('Error cargando noticias:', error);
    }
}

loadLatestNews();
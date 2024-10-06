let currentPage = 1;

async function fetchAnime(page) {
    const response = await fetch(`https://corsproxy.io/?https://animeapi.free.nf/popular.php?page=${page}`);
    const data = await response.json();
    return data;
}

function createAnimeCard(anime) {
    const col = document.createElement('div');
    col.className = 'col';
    col.innerHTML = `
        <div class="card h-100">
            <img src="${anime.animeImg}" class="card-img-top" alt="${anime.animeTitle}">
            <div class="card-body">
                <h5 class="card-title">${anime.animeTitle}</h5>
            </div>
        </div>
    `;
    col.addEventListener('click', () => {
        // Navigate to anime details page (to be implemented)
        console.log(`Clicked on ${anime.animeTitle}`);
    });
    return col;
}

async function loadAnime() {
    const animeContainer = document.getElementById('animeContainer');
    const animeData = await fetchAnime(currentPage);
    
    animeData.forEach(anime => {
        const card = createAnimeCard(anime);
        animeContainer.appendChild(card);
    });
    
    currentPage++;
}

document.addEventListener('DOMContentLoaded', () => {
    loadAnime();
    
    const loadMoreButton = document.getElementById('loadMore');
    loadMoreButton.addEventListener('click', loadAnime);
});
function createAnimeCard(anime) {
    const col = document.createElement('div');
    col.className = 'col';
    col.innerHTML = `
        <div class="card h-100">
            <img src="${anime.animeImg}" class="card-img-top" alt="${anime.animeTitle}">
            <div class="card-body">
                <h5 class="card-title">${anime.animeTitle}</h5>
            </div>
        </div>
    `;
    col.addEventListener('click', () => {
        window.location.href = `anime-details.html?id=${anime.animeId}`;
    });
    return col;
}

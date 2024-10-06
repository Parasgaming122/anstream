let currentPage = 1;
let currentQuery = '';

async function searchAnime(query, page = 1) {
    const response = await fetch(`https://corsproxy.io/?https://animeapi.free.nf/search.php?page=${page}&q=${query}`);
    const data = await response.json();
    return data;
}

function displaySearchResults(results) {
    const searchResultsContainer = document.getElementById('searchResults');
    searchResultsContainer.innerHTML = '';

    results.forEach(anime => {
        const animeCard = document.createElement('div');
        animeCard.classList.add('anime-card');
        animeCard.innerHTML = `
            <img src="${anime.animeImg}" alt="${anime.animeTitle}">
            <h3>${anime.animeTitle}</h3>
            <p>Released: ${anime.releasedDate}</p>
        `;
        animeCard.addEventListener('click', () => {
            window.location.href = `anime-details.html?id=${anime.animeId}`;
        });
        searchResultsContainer.appendChild(animeCard);
    });
}

function updatePagination(totalResults) {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';

    const totalPages = Math.ceil(totalResults / 20); // Assuming 20 results per page

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.addEventListener('click', () => {
            currentPage = i;
            performSearch();
        });
        if (i === currentPage) {
            pageButton.classList.add('active');
        }
        paginationContainer.appendChild(pageButton);
    }
}

async function performSearch() {
    const results = await searchAnime(currentQuery, currentPage);
    displaySearchResults(results);
    updatePagination(results.length); // You might need to adjust this if the API provides a total count
}

document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');

    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        currentQuery = searchInput.value;
        currentPage = 1;
        performSearch();
    });

    // Check if there's a query parameter in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const queryParam = urlParams.get('q');
    if (queryParam) {
        searchInput.value = queryParam;
        currentQuery = queryParam;
        performSearch();
    }
});

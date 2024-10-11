async function fetchAnimeDetails(animeId) {
    const response = await fetch(`https://corsproxy.io/?https://animeapi.free.nf/anime-details.php?id=${animeId}`);
    const data = await response.json();
    return data;
}

function displayAnimeDetails(animeDetails) {
    const animeDetailsContainer = document.getElementById('animeDetails');

    animeDetailsContainer.innerHTML = `
        <div class="anime-cover" style="background-image: url('${animeDetails.animeImg}')">
            <h1 class="anime-title">${animeDetails.animeTitle}</h1>
        </div>
        <div class="anime-info">
            <div class="info-item"><span class="info-label">Type:</span> ${animeDetails.type}</div>
            <div class="info-item"><span class="info-label">Released Date:</span> ${animeDetails.releasedDate}</div>
            <div class="info-item"><span class="info-label">Status:</span> ${animeDetails.status}</div>
            <div class="info-item"><span class="info-label">Genres:</span> ${animeDetails.genres}</div>
            <div class="info-item"><span class="info-label">Other Names:</span> ${animeDetails.otherNames}</div>
            <div class="info-item"><span class="info-label">Total Episodes:</span> ${animeDetails.totalEpisodes}</div>
            <div class="synopsis-container">
                <span class="info-label">Synopsis:</span>
                <p class="synopsis-text">${animeDetails.synopsis}</p>
                <span class="synopsis-toggle">Read More</span>
            </div>
            <div class="episode-buttons">
                ${animeDetails.episodesList.map(episode => `
                    <button class="episode-button" data-episode-id="${episode.episodeId}">
                        EP ${episode.episodeNum}
                    </button>
                `).join('')}
            </div>
        </div>
    `;

    
    const synopsisContainer = animeDetailsContainer.querySelector('.synopsis-container');
    const synopsisText = synopsisContainer.querySelector('.synopsis-text');
    const synopsisToggle = synopsisContainer.querySelector('.synopsis-toggle');

    synopsisText.style.maxHeight = '30px';
    synopsisText.style.overflow = 'hidden';
    synopsisText.style.transition = 'max-height 0.3s ease';

    synopsisToggle.addEventListener('click', () => {
        if (synopsisText.style.maxHeight === '30px') {
            synopsisText.style.maxHeight = synopsisText.scrollHeight + 'px';
            synopsisToggle.textContent = 'Read Less';
        } else {
            synopsisText.style.maxHeight = '30px';
            synopsisToggle.textContent = 'Read More';
        }
    });

    const episodeButtons = animeDetailsContainer.querySelectorAll('.episode-button');
    episodeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const episodeId = button.getAttribute('data-episode-id');
            window.location.href = `test.html?id=${episodeId}`;
        });
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const animeId = urlParams.get('id');

    if (animeId) {
        const animeDetails = await fetchAnimeDetails(animeId);
        displayAnimeDetails(animeDetails);
    } else {
        console.error('No anime ID provided');
    }
});

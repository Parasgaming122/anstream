async function fetchStreamingLink(episodeId) {
    const response = await fetch(`https://corsproxy.io/?https://animeapi.free.nf/generate-link.php?id=${episodeId}`);
    const data = await response.json();
    return data;
}

async function fetchAnimeDetails(animeId) {
    const response = await fetch(`https://corsproxy.io/?https://animeapi.free.nf/anime-details.php?id=${animeId}`);
    const data = await response.json();
    return data;
}

function initializePlayer(source) {
    const video = document.getElementById('video');
    
    if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(source);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function() {
            video.play();
        });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = source;
        video.addEventListener('loadedmetadata', function() {
            video.play();
        });
    } else {
        console.error('HLS is not supported on this browser.');
    }
}

function createEpisodeButtons(episodes, currentEpisodeId) {
    const episodeButtons = document.getElementById('episodeButtons');
    episodeButtons.innerHTML = '';

    episodes.forEach(episode => {
        const button = document.createElement('button');
        button.textContent = `Episode ${episode.episode_number}`;
        button.classList.add('episode-button');
        if (episode.id === currentEpisodeId) {
            button.classList.add('active');
        }
        button.addEventListener('click', () => {
            window.location.href = `video-player.html?id=${episode.id}`;
        });
        episodeButtons.appendChild(button);
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const episodeId = urlParams.get('id');

    if (episodeId) {
        const streamingData = await fetchStreamingLink(episodeId);
        if (streamingData && streamingData.source && streamingData.source.length > 0) {
            const source = streamingData.source[0].file;
            initializePlayer(source);

            const animeId = episodeId.split('-').slice(0, -1).join('-');
            const animeDetails = await fetchAnimeDetails(animeId);

            const animeTitle = document.getElementById('animeTitle');
            animeTitle.textContent = animeDetails.title;

            const episodeTitle = document.getElementById('episodeTitle');
            episodeTitle.textContent = `Episode ${episodeId.split('-').pop()}`;

            createEpisodeButtons(animeDetails.episodes, episodeId);
        } else {
            console.error('Unable to load video data');
        }
    } else {
        console.error('No episode ID provided');
    }
});

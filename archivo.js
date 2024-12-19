document.addEventListener('DOMContentLoaded', function() {
    const videoPlayer = document.getElementById('videoPlayer');
    const playlistLinks = document.querySelectorAll('.playlist a');
    const currentVideoTitle = document.getElementById('currentVideoTitle');
    const searchInput = document.getElementById('searchInput');
    const playlistItems = document.querySelectorAll('#playlistItems li');
    const clearButton = document.getElementById('clearButton');
    let currentVideoIndex = 0;

    // Function to handle playlist click
    function handlePlaylistClick(event) {
        event.preventDefault();
        const videoUrl = this.getAttribute('href');
        const videoTitle = this.innerText;
        playVideo(videoUrl, videoTitle);
        setCurrentVideoIndex(this); // Set currentVideoIndex to the clicked song
    }



    // Function to set the current video index based on the clicked link
    function setCurrentVideoIndex(clickedLink) {
        playlistLinks.forEach(function(link, index) {
            if (link === clickedLink) {
                currentVideoIndex = index;
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Function to play video
    function playVideo(videoUrl, videoTitle) {
        videoPlayer.src = videoUrl;
        videoPlayer.play();
        currentVideoTitle.innerHTML = `<b>${videoTitle}</b>`;
    }

    // Function to handle search
    function handleSearch() {
        const searchTerm = searchInput.value.toLowerCase();

        playlistItems.forEach(function(item) {
            const itemText = item.textContent;
            const itemTextLowerCase = itemText.toLowerCase();
            if (itemText.includes(searchTerm) || itemTextLowerCase.includes(searchTerm)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    }

    // Add event listeners
    playlistLinks.forEach(function(link) {
        link.addEventListener('click', handlePlaylistClick);
    });

    searchInput.addEventListener('input', handleSearch);

    clearButton.addEventListener('click', function() {
        searchInput.value = ''; // Clear the search input
        playlistItems.forEach(function(item) {
            item.style.display = 'flex'; // Show all items in the playlist
        });
    });

    // Function to find the next visible video link in the playlist after the active video
    function findNextVideoLink() {
        let nextVideoLink = null;
        for (let i = currentVideoIndex + 1; i < playlistLinks.length; i++) {
            if (playlistLinks[i].parentNode.style.display !== 'none') {
                nextVideoLink = playlistLinks[i];
                break;
            }
        }
        return nextVideoLink;
    }

    // Add event listener to detect when a video ends
    videoPlayer.addEventListener('ended', function() {
        // Find the next visible video link after the active video
        const nextVideoLink = findNextVideoLink();
        if (nextVideoLink) {
            nextVideoLink.click(); // Click the next video link to play it
        }
    });
});

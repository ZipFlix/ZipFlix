const API_URL = `http://localhost:8080`;

function fetchVideosData() {
    fetch(`${API_URL}/api/videos`)
        .then((res) => res.json())
        .then((data) => {
            handleGenrePage(data);
        })
        .catch((error) => {
            console.error(`Error Fetching Data: ${error}`);
            document.getElementById('posts').innerHTML = 'Error Loading Videos';
        });
}

function handleGenrePage(data) {
    let genre = parseGenre();
    console.log("Genre:", genre);

    const ul = document.getElementById('posts');
    ul.innerHTML = ''; // Clear any previous content

    if (genre !== null) {

        const filteredVideos = data.filter((video) =>
            video.genre.trim().toLowerCase() === genre.trim().toLowerCase()
        );

        if (filteredVideos.length > 0) {
            showVideoList(filteredVideos);
        } else {
            document.getElementById('posts').innerHTML = 'No videos found for this genre.';
        }
    } else {
        console.log("No genre specified.");
    }
}



function showVideoList(data) {
    const ul = document.getElementById('posts');
    ul.innerHTML = ''; // Clear any previous content

    let currentRow = document.createElement('div');
    currentRow.classList.add('video-row'); 

    data.forEach(function (video, index) {
        console.log("Video:", video);

        // Create an anchor element to wrap the image and link to video details
        let link = document.createElement('a');
        link.href = `/details.html?videoid=${video.id}`;

        // Create an image element and set its attributes
        let image = document.createElement('img');
        image.src = video.movieArtURL;
        image.alt = `${video.title} Image`; // You can set a meaningful alt text
        image.classList.add('image-thumbnail'); // Add a class for styling

        link.appendChild(image);

        // Create a container for each video and append it to the current row
        let videoContainer = document.createElement('div');
        videoContainer.classList.add('video-container'); 
        videoContainer.appendChild(link);
        currentRow.appendChild(videoContainer);

        // Check if we've reached 5 videos or it's the last video in the list
        if ((index + 1) % 5 === 0 || index === data.length - 1) {
            ul.appendChild(currentRow); // Append the current row to the main container
            currentRow = document.createElement('div'); // Start a new row
        }
    });
}



function parseGenre() {
    try {
        var url_string = (window.location.href).toLowerCase();
        var url = new URL(url_string);
        var genre = url.searchParams.get("genre");
        return genre;
    } catch (error) {
        console.error("Issues with Parsing URL Parameter's - " + error);
        return null;
    }
}

fetchVideosData();

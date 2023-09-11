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
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results-dropdown');
searchForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent the form from submitting

  const searchTerm = searchInput.value.toLowerCase();
  const searchResultsMenu = document.getElementById('search-results-dropdown');

  if (searchTerm.trim() !== '') {
    // Make a GET request to fetch videos based on the search term
    fetch(`${API_URL}/api/videos`)
      .then((res) => res.json())
      .then((data) => {
        // Filter the videos based on the search term
        const filteredVideos = data.filter((video) =>
          video.title.toLowerCase().includes(searchTerm)
        );

        // Display the search results in the dropdown menu
        displaySearchResults(filteredVideos);

        // Show the dropdown menu
        searchResultsMenu.style.display = 'block';
      })
      .catch((error) => {
        console.error(`Error fetching data: ${error}`);
        searchResultsMenu.innerHTML = '<li>No results found</li>';
      });
  } else {
    // Hide the dropdown menu when the search term is empty
    searchResultsMenu.style.display = 'none';
  }
});
function displaySearchResults(results) {
  const searchResultsList = document.getElementById('search-results-list');
  // Clear previous search results
  searchResultsList.innerHTML = '';
  if (results.length === 0) {
    // Display a message when no results are found
    searchResultsList.innerHTML = '<li>No results found</li>';
  } else {
    // Create and populate list items for the dropdown menu
    results.forEach((video) => {
      const listItem = document.createElement('li');
      // Create an image element and set its source
      let image = document.createElement('img');
      image.src = video.movieArtURL;
      image.alt = `${video.title} Image`;
      image.classList.add('thumbnail'); // Add a class for styling
      // Create a link for the title
      let titleLink = document.createElement('a');
      titleLink.href = `/details.html?videoid=${video.id}`;
      titleLink.textContent = video.title;
      // Append the image and title link to the list item
      listItem.appendChild(image);
      listItem.appendChild(titleLink);
      listItem.dataset.videoId = video.id;
      listItem.addEventListener('click', () => {
        // Handle the click event when a movie is selected
        const selectedVideoId = listItem.dataset.videoId;
        // You can perform actions when a movie is selected here
        // For now, let's redirect to the details page
        window.location.href = `/details.html?videoid=${selectedVideoId}`;
      });

      searchResultsList.appendChild(listItem);
    });
  }
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
            var text =  document.getElementById('posts');
            text.style.color = 'white';
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

        // Check if we've reached 8 videos or it's the last video in the list
        if ((index + 1) % 8 === 0 || index === data.length - 1) {
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



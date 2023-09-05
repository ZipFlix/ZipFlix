const API_URL = `http://localhost:8080`

function doPostOfForm(event) {
  event.preventDefault(); // Prevent default form submission

  const form = document.getElementById("add-video-form");
  const formData = new FormData(form);

  var object = {};
  formData.forEach(function (value, key) {
    object[key] = value;
  });

  // Remove the JSON.stringify from here
  postJSON(object);
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

async function postJSON(data) {
  try {
    const response = await fetch(`${API_URL}/api/videos/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // Stringify the object here
    });

    const result = await response.json();
    console.log("Success:", result);

    const addedVideoId = result.id;
    const detailPageUrl = `/details.html?videoid=${addedVideoId}`;

    // Redirect to the detail page
    window.location.href = detailPageUrl;
  } catch (error) {
    console.error("Error:", error);
  }

}

const form = document.getElementById("add-video-form");
form.addEventListener("submit", function(event) {
    doPostOfForm(event);
});




const API_URL = `http://localhost:8080`

function fetchVideo(videoid) {
  fetch(`${API_URL}/api/videos/${videoid}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      // Check if the data contains a valid backgroundURL property
      showVideoDetail(data);
    })
    .catch((error) => {
      console.log(`Error Fetching data : ${error}`)
      document.getElementById('post').innerHTML = 'Error Loading Single Video Data'
    })
}


function fetchVideo(videoid) {
    fetch(`${API_URL}/api/videos/${videoid}`)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
          const backgroundUR = data.backgroundURL;
          console.log(backgroundUR);
          // Pass the backgroundURL to setBodyBackground
          setBodyBackground(backgroundUR);
            showVideoDetail(data)
        })
        .catch((error) => {
            console.log(`Error Fetching data : ${error}`)
            document.getElementById('post').innerHTML = 'Error Loading Single Video Data'
        })
}

function showVideoList(data) {
    const ul = document.getElementById('posts');
    const list = document.createDocumentFragment();

  data.map(function(post) {
        console.log("Video:", post);
        let li = document.createElement('li');
        let title = document.createElement('h3');
        title.innerHTML = `<a href="http://localhost:8080/details.html?videoid=${post.id}">${post.title}</a>`;

        li.appendChild(title);
        list.appendChild(li);
    });

    ul.appendChild(list);
}

function showVideoDetail(post) {
  const element = document.getElementById('post');
  element.innerHTML = ''; // Clear any existing content

  // Create a container for the video details
  const container = document.createElement('div');
  container.classList.add('video-details-container');

  // Create the left side container
  const leftContainer = document.createElement('div');
  leftContainer.classList.add('text-container');

  // Create and populate elements for the left side
  const title = document.createElement('h1');
  title.innerHTML = post.title;

  const internaldetail = document.createElement('div');
  internaldetail.classList.add('genre-release-container');

  const genre = document.createElement('h4');
  genre.innerHTML = `<strong>Genre:</strong> ${post.genre}`;
  const releaseDate = document.createElement('h4');
  releaseDate.innerHTML = `<strong>Release Date:</strong> ${post.releaseDate}`;

  internaldetail.appendChild(genre);
  internaldetail.appendChild(releaseDate);

  const description = document.createElement('p');
  description.innerHTML = post.description;

  // Append the title, internaldetail, and description to the leftContainer
  leftContainer.appendChild(title);
  leftContainer.appendChild(internaldetail);
  leftContainer.appendChild(description);

  // Create an element for displaying reviews
  const RecentReviewHeading = document.createElement('h4');
  RecentReviewHeading.innerHTML = 'Recent Reviews:';
  RecentReviewHeading.classList.add('center-text');
  const reviewsContainer = document.createElement('div');
  reviewsContainer.classList.add('reviews-container');

  // Loop through the reviews and create elements for each one
  post.reviews.forEach((review) => {
    const reviewElement = document.createElement('div');
    reviewElement.classList.add('review');

    const reviewMessage = document.createElement('p');
    reviewMessage.innerHTML = review.message;

    reviewElement.appendChild(reviewMessage);
    reviewsContainer.appendChild(reviewElement);
  });


  // Append the reviewsContainer to the leftContainer
  leftContainer.appendChild(RecentReviewHeading);
  leftContainer.appendChild(reviewsContainer);
  leftContainer.appendChild(writeReviewLink);


  // Create the right side container
  const rightContainer = document.createElement('div');
  rightContainer.classList.add('image-container');

  const image = document.createElement('img');
  image.classList.add('resized-image');
  image.src = post.movieArtURL;
  image.alt = `${post.title} Image`;
  rightContainer.appendChild(image);
  const imageLink = document.createElement('a');
  imageLink.href = post.videoURL;
  imageLink.addEventListener('click', function (e) {
    e.preventDefault(); // Prevent the default link behavior

    // Set the modal's display property to block
    const modal = document.getElementById('videoModal');
    modal.style.display = 'block';

    // Optionally, you can set the video source here based on your use case
    const videoPlayer = document.getElementById('videoPlayer');
    const sourceElement = videoPlayer.querySelector('source');
    sourceElement.src = post.videoURL;
    videoPlayer.load();
    videoPlayer.play();
  });
  const closeModalButton = document.getElementById('closeModal');
  closeModalButton.addEventListener('click', function () {
    // Set the modal's display property to none to hide it
    const modal = document.getElementById('videoModal');
    const videoPlayer = document.getElementById('videoPlayer');
    videoPlayer.pause();
    modal.style.display = 'none';
  });
  imageLink.appendChild(image);

  // const writeReviewLink = document.createElement('button');
  // writeReviewLink.href = `./review.html?videoid=${post.id}`;
  // writeReviewLink.textContent = 'Write a Review';
  // writeReviewLink.classList.add('write-review-link');


  rightContainer.appendChild(imageLink);
  // rightContainer.appendChild(writeReviewLink);

  container.appendChild(leftContainer);
  container.appendChild(rightContainer);
  element.appendChild(container);
}

function parseVideoId() {
    try {
        var url_string = (window.location.href).toLowerCase();
        var url = new URL(url_string);
        var videoid = url.searchParams.get("videoid");
        return videoid
      } catch (error) {
        console.log("Issues with Parsing URL Parameter's - " + error);
        return "0"
      }
}

function handlePages() {
  let videoid = parseVideoId();
  console.log("videoId: ", videoid);

  if (videoid != null) {
      console.log("found a videoId");
      fetchVideo(videoid);

      // Set the correct href for the "Write a Review" link
      const writeReviewLink = document.getElementById("writeReviewLink");
      writeReviewLink.href = `./review.html?videoid=${videoid}`;
  } else {
      console.log("load all videos");
      fetchVideosData();
  }
}
handlePages();

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
// Close the dropdown menu when clicking outside of it
document.addEventListener('click', (e) => {
  if (!searchResults.contains(e.target)) {
    searchResults.style.display = 'none';
  }
});
function hasVideoIdParam() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.has('videoid');
}



// Function to set the background image or color based on the presence of videoid

function setBodyBackground(backgroundURL) {
  const body = document.body;
  if (backgroundURL) {
    console.log('Setting Background Image');
    const backgroundImage = new Image(); // Create a new image element

    // Set up an onload event handler for the image
    backgroundImage.onload = function() {
      console.log('Background Image Loaded');
      body.style.backgroundImage = `url("${backgroundURL}")`;
      body.style.backgroundColor = 'transparent';
      body.style.backgroundSize = 'cover'; // Set the background image
      // Now that the image is loaded, you can display the page content
      document.getElementById('pageContent').style.display = 'block';
    };

    // Set up an onerror event handler for the image in case it fails to load
    backgroundImage.onerror = function() {
      console.error('Error loading background image');
      body.style.backgroundColor = '#000000'; // Set the background color
      // Now that the image loading has been attempted, you can display the page content
      document.getElementById('pageContent').style.display = 'block';
    };

    backgroundImage.src = backgroundURL; // Set the image source to start loading
  } else {
    console.log('Setting color');
    body.style.backgroundImage = 'none';
    body.style.backgroundColor = '#000000'; // Set the background color
    // Since there's no image to load, you can display the page content immediately
    document.getElementById('pageContent').style.display = 'block';
  }
}







// Call the function when the page loads
window.addEventListener('load', setBodyBackground);

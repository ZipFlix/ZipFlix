const API_URL = `http://localhost:8080`

function fetchVideosData() {
  fetch(`${API_URL}/api/videos`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      showVideoList(data)
      showActionMovies(data)
      showDramaMovies(data)
      showComedyMovies(data)
      showThrillerMovies(data)
    })
    .catch((error) => {
      console.log(`Error Fetching Data: ${error}`)
      document.getElementById('posts').innerHTML = 'Error Loading Videos'
    })
}

function fetchVideo(videoid) {
  fetch(`${API_URL}/api/videos/${videoid}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      showVideoDetail(data)
    })
    .catch((error) => {
      console.log(`Error Fetching data : ${error}`)
      document.getElementById('post').innerHTML = 'Error Loading Single Video Data'
    })
}

function showVideoList(data) {
  const container = document.getElementById('image-list-container'); // Container for recently added
  const list = document.createDocumentFragment();

  data.sort((a, b) => b.id - a.id);

  // data.forEach(function (post) {
  //   console.log("Video:", post);

  for (let i = 0; i < Math.min(data.length, 8); i++) {
    const post = data[i];

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image-list-item');

    const link = document.createElement('a');
    link.href = `http://localhost:8080/details.html?videoid=${post.id}`;

    const image = document.createElement('img');
    image.src = post.movieArtURL;
    image.alt = post.title;
    image.className = 'image-item';

    const description = document.createElement('div');
    description.classList.add('image-description');

    const descriptionText = document.createTextNode(post.description);
    description.appendChild(descriptionText);

    link.appendChild(image);
    imageContainer.appendChild(link);
    imageContainer.appendChild(description);

    list.appendChild(imageContainer);
  };

  container.appendChild(list);
}

 function showActionMovies(data) {
  const container = document.getElementById('action-movies-container'); // Container for action movies
  const list = document.createDocumentFragment();

  // Filter movies by the "action" genre
  const actionMovies = data.filter(post => post.genre === 'Action');
  actionMovies.forEach(function(post) {
    console.log("Video:", post);

    const movieContainer = document.createElement('div');
    movieContainer.classList.add('image-list-item');

    const link = document.createElement('a');
    link.href = `http://localhost:8080/details.html?videoid=${post.id}`;

    const image = document.createElement('img');
    image.src = post.movieArtURL;
    image.alt = post.title;
    image.className = 'image-item';

    link.appendChild(image);
    movieContainer.appendChild(link);

    list.appendChild(movieContainer);
  });

  container.appendChild(list);
}

function showDramaMovies(data) {
  const container = document.getElementById('drama-movies-container'); // Container for drama movies
  const list = document.createDocumentFragment();

  // Filter movies by the "drama" genre
  const dramaMovies = data.filter(post => post.genre === 'Drama');
  dramaMovies.forEach(function(post) {
    console.log("Video:", post);

    const movieContainer = document.createElement('div');
    movieContainer.classList.add('image-list-item');

    const link = document.createElement('a');
    link.href = `http://localhost:8080/details.html?videoid=${post.id}`;

    const image = document.createElement('img');
    image.src = post.movieArtURL;
    image.alt = post.title;
    image.className = 'image-item';

    link.appendChild(image);
    movieContainer.appendChild(link);

    list.appendChild(movieContainer);
  });

  container.appendChild(list);
}

function showComedyMovies(data) {
  const container = document.getElementById('comedy-movies-container'); // Container for drama movies
  const list = document.createDocumentFragment();

  // Filter movies by the "drama" genre
  const comedyMovies = data.filter(post => post.genre === 'Comedy');
  comedyMovies.forEach(function(post) {
    console.log("Video:", post);

    const movieContainer = document.createElement('div');
    movieContainer.classList.add('image-list-item');

    const link = document.createElement('a');
    link.href = `http://localhost:8080/details.html?videoid=${post.id}`;

    const image = document.createElement('img');
    image.src = post.movieArtURL;
    image.alt = post.title;
    image.className = 'image-item';

    link.appendChild(image);
    movieContainer.appendChild(link);

    list.appendChild(movieContainer);
  });

  container.appendChild(list);
}

function showThrillerMovies(data) {
  const container = document.getElementById('thriller-movies-container'); // Container for drama movies
  const list = document.createDocumentFragment();

  // Filter movies by the "drama" genre
  const thrillerMovies = data.filter(post => post.genre === 'Drama');
  thrillerMovies.forEach(function(post) {
    console.log("Video:", post);

    const movieContainer = document.createElement('div');
    movieContainer.classList.add('image-list-item');

    const link = document.createElement('a');
    link.href = `http://localhost:8080/details.html?videoid=${post.id}`;

    const image = document.createElement('img');
    image.src = post.movieArtURL;
    image.alt = post.title;
    image.className = 'image-item';

    link.appendChild(image);
    movieContainer.appendChild(link);

    list.appendChild(movieContainer);
  });

  container.appendChild(list);
}


///////////////////////////////////////////////////////////////////////////////////////////////////


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
  leftContainer.appendChild(reviewsContainer);

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
  imageLink.appendChild(image);

  rightContainer.appendChild(imageLink);

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
  let videoid = parseVideoId()
  console.log("videoId: ",videoid)

  if (videoid != null) {
    console.log("found a videoId")
    fetchVideo(videoid)
  } else {
    console.log("load all videos")
    fetchVideosData()
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







// const API_URL = `http://localhost:8080`
//
// function fetchVideosData() {
//   fetch(`${API_URL}/api/videos`)
//     .then((res) => {
//       return res.json();
//     })
//     .then((data) => {
//       showVideoList(data)
//     })
//     .catch((error) => {
//       console.log(`Error Fetching Data: ${error}`)
//       document.getElementById('posts').innerHTML = 'Error Loading Videos'
//     })
// }
//
// function fetchVideo(videoid) {
//   fetch(`${API_URL}/api/videos/${videoid}`)
//     .then((res) => {
//       return res.json();
//     })
//     .then((data) => {
//       showVideoDetail(data)
//     })
//     .catch((error) => {
//       console.log(`Error Fetching data : ${error}`)
//       document.getElementById('post').innerHTML = 'Error Loading Single Video Data'
//     })
// }
//
// function showVideoList(data) {
//   const ul = document.getElementById('posts');
//   const list = document.createDocumentFragment();
//   const image = document.createDocumentFragment();
//
//
//   data.map(function(post) {
//     console.log("Video:", post);
//     let li = document.createElement('li');
//    // let title =
//     let image = document.createElement('img');
//     //title.innerHTML = `<a href="/details.html?videoid=${post.id}">${post.title}</a>`;
//     image.innerHTML = `<a href="/videolist.html">${post.movieArtURL}</a>`;
//
//     image.src = post.movieArtURL;
//
//
//     li.appendChild(image);
//     //li.appendChild(title);
//     list.appendChild(li);
//   });
//
//   ul.appendChild(list);
// }
//
//
// function showVideoDetail(post) {
//
//   const element = document.getElementById('post');
//   element.innerHTML = ''; // Clear any existing content
//
//   // Create a container for the video details
//   const container = document.createElement('div');
//   container.classList.add('video-details-container');
//
//   // Create the left side container
//   const leftContainer = document.createElement('div');
//   leftContainer.classList.add('text-container');
//
//   // Create and populate elements for the left side
//   const title = document.createElement('h1');
//   title.innerHTML = post.title;
//
//   const internaldetail = document.createElement('div');
//   internaldetail.classList.add('genre-release-container');
//
//   const genre = document.createElement('h4');
//   genre.innerHTML = `<strong>Genre:</strong> ${post.genre}`;
//   const releaseDate = document.createElement('h4');
//   releaseDate.innerHTML = `<strong>Release Date:</strong> ${post.releaseDate}`;
//
//   internaldetail.appendChild(genre);
//   internaldetail.appendChild(releaseDate);
//
//   const description = document.createElement('p');
//   description.innerHTML = post.description;
//
//   leftContainer.appendChild(title);
//   leftContainer.appendChild(internaldetail);
//   leftContainer.appendChild(description);
//
//   // Create the right side container
//   const rightContainer = document.createElement('div');
//   rightContainer.classList.add('image-container');
//
//   const image = document.createElement('img');
//   image.classList.add('resized-image');
//   image.src = post.movieArtURL;
//   image.alt = `${post.title} Image`;
//   rightContainer.appendChild(image);
//
//   const imageLink = document.createElement('a');
//   imageLink.href = post.videoURL;
//   imageLink.appendChild(image);
//
//   rightContainer.appendChild(imageLink);
//
//   container.appendChild(leftContainer);
//   container.appendChild(rightContainer);
//   element.appendChild(container);
//
// }
//
// function parseVideoId() {
//   try {
//     var url_string = (window.location.href).toLowerCase();
//     var url = new URL(url_string);
//     var videoid = url.searchParams.get("videoid");
//     return videoid
//   } catch (error) {
//     console.log("Issues with Parsing URL Parameter's - " + error);
//     return "0"
//   }
// }
//
// function handlePages() {
//   let videoid = parseVideoId()
//   console.log("videoId: ",videoid)
//
//   if (videoid != null) {
//     console.log("found a videoId")
//     fetchVideo(videoid)
//   } else {
//     console.log("load all videos")
//     fetchVideosData()
//   }
// }
//
// handlePages()

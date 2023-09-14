const windowURL = window.location.href;
var urlParts = windowURL.split('/');
var desiredPortion = urlParts[2];
console.log(desiredPortion);
const API_URL ="https://"+desiredPortion;
async function fetchVideo(videoid) {
    try {
        const res = await fetch(`${API_URL}/api/videos/${videoid}`);
        const data = await res.json();
        showVideoReviews(data); // Display reviews after successfully fetching video data
    } catch (error) {
        console.log(`Error Fetching data : ${error}`);
        document.getElementById('post').innerHTML = 'Error Loading Single Video Data';
        throw error;
    }
}

function showVideoReviews(post) {
    const element = document.getElementById('post');
    element.innerHTML = ''; // Clear any existing content

    // Create a container for the video details
    const container = document.createElement('div');
    container.classList.add('video-reviews-container');

    const reviewsHeader = document.createElement('h3');
    reviewsHeader.innerHTML = `${post.title}`;
    reviewsHeader.classList.add('center-text');
    const reviewsContainer = document.createElement('div');
    reviewsContainer.classList.add('reviews-container');

    post.reviews.forEach((review) => {
        const reviewElement = document.createElement('div');
        reviewElement.classList.add('review');

        const reviewMessage = document.createElement('p');
        reviewMessage.innerHTML = review.message;

        reviewElement.appendChild(reviewMessage);
        reviewsContainer.appendChild(reviewElement);
      });

      const backButton = document.createElement('button');
      backButton.textContent = 'Back to Video Details';
      backButton.classList.add('back-button');

      backButton.addEventListener('click', () => {
          window.location.href = `/details.html?videoid=${post.id}`;
      });

      const buttonWrapper = document.createElement('div');
      buttonWrapper.classList.add('button-wrapper');
      buttonWrapper.appendChild(backButton);


    container.appendChild(reviewsHeader);
    container.appendChild(reviewsContainer);
    container.appendChild(buttonWrapper);
    element.appendChild(container);

    // Add an "Add Review" form to the left panel
    const leftPanel = document.getElementById('left');
    leftPanel.innerHTML = '';
    const addReviewForm = document.createElement('form');
    addReviewForm.id = 'add-review-form';
    addReviewForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form submission

    const reviewMessage = document.getElementById("review-message").value;

    // Get the videoid from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const videoid = urlParams.get("videoid");

    // Ensure videoid is a string (if not null)
    const stringVideoid = videoid ? videoid.toString() : null;

    if (stringVideoid) {
        // Create a new review object
        const newReview = {
            message: reviewMessage,
            videoName: {
                id: parseInt(stringVideoid), // Parse the videoid as an integer
            },
        };

        // Send a POST request to create the new review
        fetch(`${API_URL}/api/reviews`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newReview),
        })
        .then((response) => {
            if (response.ok) {
                console.log("Review added successfully");
                // Clear the input field
                document.getElementById("review-message").value = "";

                // Fetch the video details to get the updated reviews property
                return fetch(`${API_URL}/api/videos/${stringVideoid}`);
            } else {
                console.error("Failed to add review");
            }
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Failed to fetch video details");
            }
        })
        .then((videoData) => {
            // Update the displayed reviews with the new one
            const reviewElement = document.createElement('div');
            reviewElement.classList.add('review');
            const reviewMessage = document.createElement('p');
            reviewMessage.innerHTML = newReview.message;
            reviewElement.appendChild(reviewMessage);
            reviewsContainer.appendChild(reviewElement);
        })
        .catch((error) => {
            console.error("Error adding review:", error);
        });
    } else {
        console.error("Invalid videoid");
    }
    });
    const formHeader = document.createElement('h3');
    formHeader.innerHTML = "Add a Review";
    formHeader.classList.add('form-header');

    const reviewMessageInput = document.createElement('textarea');
    reviewMessageInput.id = 'review-message';
    reviewMessageInput.name = 'review-message';
    reviewMessageInput.required = true;

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Add Review';

    addReviewForm.appendChild(formHeader);
    addReviewForm.appendChild(reviewMessageInput);
    addReviewForm.appendChild(submitButton);
    leftPanel.appendChild(addReviewForm);
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

function handlePages() {
  let videoid = parseVideoId();
  console.log("videoId: ", videoid);

  if (videoid != null) {
      console.log("found a videoId");
      fetchVideo(videoid);
  }
}
handlePages();

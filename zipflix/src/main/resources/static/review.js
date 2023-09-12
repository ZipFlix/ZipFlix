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

function handlePages() {
  let videoid = parseVideoId();
  console.log("videoId: ", videoid);

  if (videoid != null) {
      console.log("found a videoId");
      fetchVideo(videoid);
  }
}
handlePages();

const API_URL = `http://localhost:8080`;

// Function to fetch video data by videoid
async function fetchVideoById(videoid) {
    try {
        const response = await fetch(`${API_URL}/api/videos/${videoid}`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching video data:", error);
        return null;
    }
}

// Function to display reviews
function displayReviews(reviews) {
    const reviewsContainer = document.getElementById("reviews-container");
    reviewsContainer.innerHTML = ""; // Clear previous reviews

    reviews.forEach((review) => {
        const reviewElement = document.createElement("div");
        reviewElement.classList.add("review");

        const reviewMessage = document.createElement("p");
        reviewMessage.innerHTML = review.message;

        reviewElement.appendChild(reviewMessage);
        reviewsContainer.appendChild(reviewElement);
    });
}


// Handle form submission
const reviewForm = document.getElementById("add-review-form");
reviewForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    // Get the review message from the form
    const reviewMessage = document.getElementById("message").value;

    // Get the videoid from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const videoid = urlParams.get("videoid");

    // Fetch the video data by videoid
    fetchVideoById(videoid)
        .then((videoData) => {
            if (!videoData) {
                console.error("Video not found");
                return;
            }

            // Create a new review object
            const newReview = {
                id: videoData.reviews.length + 1, // Generate a new unique ID
                message: reviewMessage,
            };

            // Add the new review to the video's reviews array
            videoData.reviews.push(newReview);

            // Send a PUT request to update the video with the new review
            fetch(`${API_URL}/api/videos/${videoid}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(videoData),
            })
            .then((response) => {
                if (response.ok) {
                    console.log("Review added successfully");
                    // Clear the input field
                    document.getElementById("message").value = "";

                    // Fetch and display the updated reviews associated with the video
                    displayReviews(videoData.reviews);
                } else {
                    console.error("Failed to add review");
                }
            })
            .catch((error) => {
                console.error("Error updating video with review:", error);
            });
        });
});

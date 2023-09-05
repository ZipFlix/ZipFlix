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




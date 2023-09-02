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

    // Assuming your response contains an ID or unique identifier for the added video
    const addedVideoId = result.id; // Replace 'id' with the actual property name

    // Construct the URL for the detail page
    const detailPageUrl = `/details.html?videoid=${addedVideoId}`;

    // Redirect to the detail page
    window.location.href = detailPageUrl;
  } catch (error) {
    console.error("Error:", error);
  }

//     const result = await response.json();
//     console.log("Success:", result);
//   } catch (error) {
//     console.error("Error:", error);
//   }
}

const form = document.getElementById("add-video-form");
form.addEventListener("submit", function(event) {
    doPostOfForm(event);
}); 




const API_URL = `http://localhost:8080`

function fetchVideosData() {
    fetch(`${API_URL}/api/videos`)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            showVideoList(data)
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
    const ul = document.getElementById('posts');
    const list = document.createDocumentFragment();

    data.map(function(post) {
        console.log("Video:", post);
        let li = document.createElement('li');
        let title = document.createElement('h3');
        title.innerHTML = `<a href="/details.html?videoid=${post.id}">${post.title}</a>`;

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

    leftContainer.appendChild(title);
    leftContainer.appendChild(internaldetail);
    leftContainer.appendChild(description);

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

handlePages()
const API_URL = `http://localhost:8080`;

function fetchTicketsData() {
  fetch(`${API_URL}/api/videos`)
    .then(res => {
      //console.log("res is ", Object.prototype.toString.call(res));
      return res.json();
    })
    .then(data => {
      showTicketList(data);
    })
    .catch(error => {
      console.log(`Error Fetching data : ${error}`);
      document.getElementById('posts').innerHTML = 'Error Loading Moviez Data';
    });
}
function fetchReview(VideoId) {
  fetch(`${API_URL}/api/videos/${VideoId}`)
    .then(res => {
      //console.log("res is ", Object.prototype.toString.call(res));
      return res.json();
    })
    .then(data => {
      showReviewDetail(data);
    })
    .catch(error => {
      console.log(`Error Fetching data : ${error}`);
      document.getElementById('posts').innerHTML = 'Error Loading Single Video Data';
    });
}
function fetchTicket(VideoId) {
  fetch(`${API_URL}/api/videos/${VideoId}`)
    .then(res => {
      //console.log("res is ", Object.prototype.toString.call(res));
      return res.json();
    })
    .then(data => {
      showTicketDetail(data);
    })
    .catch(error => {
      console.log(`Error Fetching data : ${error}`);
      document.getElementById('posts').innerHTML = 'Error Loading Single Video Data';
    });
}
function parseReviewId() {
  try {
    var url_string = window.location.href.toLowerCase();
    var url = new URL(url_string);
    var ticketid = url.searchParams.get('reviewid');
    // var geo = url.searchParams.get("geo");
    // var size = url.searchParams.get("size");
    // console.log(name+ " and "+geo+ " and "+size);
    return ticketid;
  } catch (err) {
    console.log("Issues with Parsing URL Parameter's - " + err);
    return '0';
  }
}
function parseTicketId() {
  try {
    var url_string = window.location.href.toLowerCase();
    var url = new URL(url_string);
    var ticketid = url.searchParams.get('videoid');

    return ticketid;
  } catch (err) {
    console.log("Issues with Parsing URL Parameter's - " + err);
    return '0';
  }
}


// takes a UNIX integer date, and produces a prettier human string
  function dateOf(date) {
    const milliseconds = date * 1000; // 1575909015000
    const dateObject = new Date(milliseconds);
    const humanDateFormat = dateObject.toLocaleString(); //2019-12-9 10:30:15
    return humanDateFormat;
  }

  function showTicketList(data) {
    // the data parameter will be a JS array of JS objects
    // this uses a combination of "HTML building" DOM methods (the document createElements) and
    // simple string interpolation (see the 'a' tag on title)
    // both are valid ways of building the html.
    const ul = document.getElementById('posts');
    const list = document.createDocumentFragment();
    data.map(function (post) {
      console.log('Video:', post);
      let li = document.createElement('li');
      let title = document.createElement('h3');
      let body = document.createElement('p');
      title.innerHTML = `<a href="/reviews.html?videoid=${post.id}">${post.title}</a>`; //What I want to output
      // body.innerHTML = "Hi!";

      li.appendChild(title);
      li.appendChild(body);
      list.appendChild(li);
    });

    ul.appendChild(list);
  }

  function showTicketDetail(post) {
    // the data parameter will be a JS array of JS objects
    // this uses a combination of "HTML building" DOM methods (the document createElements) and
    // simple string interpolation (see the 'a' tag on title)
    // both are valid ways of building the html.
    const ul = document.getElementById('post');
    const detail = document.createDocumentFragment();
    console.log('Synopsis: ', post);
    let li = document.createElement('div');
    let title = document.createElement('h2');
    let body = document.createElement('p');
    let by = document.createElement('p');
    let image = document.createElement('img');
    image.src = post.movieArtURL;
    let imageLink = document.createElement('a');
    imageLink.href = post.videoURL;
    title.innerHTML = `${post.title}`;
    body.innerHTML = `Movie Detail: ${post.description}`;
    image.style.width = '200px'; // Set the width of the image (adjust the size as needed)
    image.style.height = 'auto'; // Maintain aspect ratio by setting height to 'auto'
    li.appendChild(title);
    imageLink.appendChild(image);
    li.appendChild(body);
    li.appendChild(imageLink)
    li.appendChild(by);
    detail.appendChild(li);
    ul.appendChild(detail);
  }
function showReviewDetail(post) {
  // the data parameter will be a JS array of JS objects
  // this uses a combination of "HTML building" DOM methods (the document createElements) and
  // simple string interpolation (see the 'a' tag on title)
  // both are valid ways of building the HTML.
  const ul = document.getElementById('reviewSection');
  const detail = document.createDocumentFragment();
  console.log('Synopsis: ', post);

  // Create elements for the movie details
  let li = document.createElement('div');
  let title = document.createElement('h2');
  let body = document.createElement('p');
  let by = document.createElement('p');
  let image = document.createElement('img');
  let imageLink = document.createElement('a');

  // Set the attributes and content for the movie details
  image.src = post.movieArtURL;
  image.style.width = '200px'; // Set the width of the image (adjust the size as needed)
  image.style.height = 'auto'; // Maintain aspect ratio by setting height to 'auto'
  imageLink.href = post.videoURL;
  title.innerHTML = `${post.title}`;
  body.innerHTML = `Movie Detail: ${post.description}`;

  // Append movie details to the list item

  li.appendChild(imageLink);
  li.appendChild(by);

  // Append the list item to the document fragment
  detail.appendChild(li);

  // Create elements for the reviews section
  let reviewsTitle = document.createElement('h3');
  reviewsTitle.innerHTML = 'Reviews:';
  detail.appendChild(reviewsTitle);

  // Loop through the reviews and create elements for each review
  for (const review of post.reviews) {
    let reviewItem = document.createElement('div');
    let reviewMessage = document.createElement('p');
    reviewMessage.innerHTML = review.message;
    reviewItem.appendChild(reviewMessage);
    detail.appendChild(reviewItem);
  }

  // Append the document fragment to the review section
  ul.appendChild(detail);
}

  function handlePages() {
    let VideoId = parseTicketId();
    let reviewId = parseReviewId();
    console.log('Video Id: ', VideoId);
    if (VideoId != null) {
      console.log('found a Video Id');
      fetchTicket(VideoId);
    } else if (reviewId != null) {
      fetchReview(reviewId);
    } else {
      console.log('load all Videos');
      fetchTicketsData();
    }
  }

  handlePages();




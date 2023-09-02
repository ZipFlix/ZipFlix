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
function parseTicketId() {
  try {
    var url_string = window.location.href.toLowerCase();
    var url = new URL(url_string);
    var ticketid = url.searchParams.get('videoid');
    // var geo = url.searchParams.get("geo");
    // var size = url.searchParams.get("size");
    // console.log(name+ " and "+geo+ " and "+size);
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

  function handlePages() {
    let VideoId = parseTicketId();
    console.log('Video Id: ', VideoId);
    if (VideoId != null) {
      console.log('found a Video Id');
      fetchTicket(VideoId);
    } else {
      console.log('load all Videos');
      fetchTicketsData();

    }
  }
  handlePages();



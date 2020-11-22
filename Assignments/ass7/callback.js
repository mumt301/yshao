const apiKey = "107d472aac457bf5f9f2d27cbe690d2e";
const baseUrl = "http://ws.audioscrobbler.com/2.0/";

function querySimilar(event) {
  event.preventDefault();
  let artistName = document.getElementById("artist").value;
  let trackName = document.getElementById("track").value;
  let queryURL =
    baseUrl +
    "?method=track.getsimilar&artist=" +
    artistName +
    "&track=" +
    trackName +
    "&api_key=" +
    apiKey +
    "&format=json";
  httpGet(queryURL, getRecommendation);
}

function httpGet(theURL, cbFunction) {
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theURL);
  xmlHttp.responseType = "json";
  xmlHttp.send();
  xmlHttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      cbFunction(this);
    }
  };
}

function getRecommendation(xhttp) {
  let retrievedData = xhttp.response;
  let tracks = retrievedData.similartracks.track.slice(0, 5);
  let table = document.getElementById("recTrack");
  table.innerHTML = `<tr>
                        <th>TrackName</th>
                        <th>ArtistName</th>
                        <th>Description</th>
                        <th>Image</th>
                    </tr>`;
  for (let i of tracks) {
    let artist = i.artist.name;
    let track = i.name;
    let queryURL2 =
      baseUrl +
      "?method=track.getInfo&api_key=" +
      apiKey +
      "&artist=" +
      artist +
      "&track=" +
      track +
      "&format=json";
    httpGet(queryURL2, getInfo);
  }
}

function getInfo(xhttp) {
  let retrievedData2 = xhttp.response;
  let track = retrievedData2.track.name;
  let artist = retrievedData2.track.artist.name;
  let imgUrl = retrievedData2.track.album.image[2]["#text"];
  let description = retrievedData2.track.wiki.content;
  let table = document.getElementById("recTrack");
  let tr = document.createElement("tr");
  let td_1 = document.createElement("td");
  let td_2 = document.createElement("td");
  let td_3 = document.createElement("td");
  let td_4 = document.createElement("td");
  let img = document.createElement("img");
  td_1.innerHTML = track;
  td_2.innerHTML = artist;
  td_3.innerHTML = description;
  img.src = imgUrl;
  td_4.appendChild(img);
  tr.appendChild(td_1);
  tr.appendChild(td_2);
  tr.appendChild(td_3);
  tr.appendChild(td_4);
  table.appendChild(tr);
}

document.getElementById("rec").addEventListener("submit", querySimilar);

function formSubmit(event) {
  event.preventDefault();
  let artistName = document.getElementById("name").value;
  let url = "https://musicbrainz.org/ws/2/artist?query=" + artistName;
  let request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = function () {
    let retrievedData = request.responseXML;
    let artistData = retrievedData.getElementsByTagName("artist")[0];
    let artistMBID = artistData.id;
    let url =
      "https://musicbrainz.org/ws/2/release-group?artist=" +
      artistMBID +
      "&type=album";
    let request_2 = new XMLHttpRequest();
    request_2.open("GET", url);
    request_2.onload = () => {
      let res = request_2.responseXML;
      let albumList = res.getElementsByTagName("release-group");
      let fragment = new DocumentFragment();
      let li = document.createElement("li");
      let p1 = document.createElement("p");
      let p2 = document.createElement("p");
      p1.innerHTML = "ALBUM NAME";
      p1.className='album';
      p2.innerHTML = "FIRST RELEASE DATE";
      p2.className='date';
      li.append(p1, p2);
      fragment.append(li);
      for (let i of albumList) {
        let album = i.getElementsByTagName("title")[0].innerHTML;
        let releaseDate = i.getElementsByTagName("first-release-date")[0].innerHTML;
        let li = document.createElement("li");
        let p1 = document.createElement("p");
        let p2 = document.createElement("p");
        p1.className='album';
        p2.className='date';
        p1.innerHTML = album;
        p2.innerHTML = releaseDate;
        li.append(p1,p2);
        fragment.append(li);
      }
      let ul=document.getElementById("ul");
      ul.innerHTML='';
      ul.appendChild(fragment);
    };
    request_2.send();
  };
  request.send();
}

document.getElementById("artist").addEventListener("submit", formSubmit);

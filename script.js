var link = document.querySelector(".link");
var btn = document.querySelector(".btnButton");
var objectElement = document.querySelector(".object");
// var paramElenment = objectElement.querySelector(".param");
// var embedElenment = objectElement.querySelector(".embed");
// var body = document.querySelector("body");

function youtube_parser(url) {
  var regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(live\/)|(embed\/)|(shorts\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return match && match[9].length == 11 ? match[9] : false;
}

const ytVideo = (youtubeID) => {
  objectElement.innerHTML = `
  <img loop class="catwalk" src="catwalk.gif" alt="Cat Walk" />
    <param
      class="param"
      name="movie"
      value="https://www.youtube-nocookie.com/embed/${youtubeID}"
    />
    <embed
      class="embed"
      src="https://www.youtube-nocookie.com/embed/${youtubeID}"
      width="100%"
      height="90%"
    />`;
};

function setCookie(key, value) {
  document.cookie = key + "=" + value;
}

function OpenVideo(linkVideo) {
  let result = youtube_parser(linkVideo);
  ytVideo(result);
}

btn.addEventListener("click", () => {
  setCookie("youtubeID", link.value);
  OpenVideo(link.value);
});

link.addEventListener("keypress", function (event) {
  if (event.which === 13) {
    setCookie("youtubeID", link.value);
    OpenVideo(link.value);
  }
});

const btnChat = document.querySelector(".btnChat");

const popChat = document.getElementById("popChat");

btnChat.addEventListener("click", () => {
  popChat.classList.toggle("hidechat");
});

// console.log(paramElenment.value);

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function LoadObject() {
  let linkVideoCookie = getCookie("youtubeID");
  OpenVideo(linkVideoCookie);
  console.log(linkVideoCookie);
}

window.addEventListener("load", LoadObject);

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyAOy0AgyX2TRCKX1CwMMR2HvpP-p1CWHf8",
  authDomain: "xem-418ab.firebaseapp.com",
  databaseURL: "https://xem-418ab-default-rtdb.firebaseio.com",
  projectId: "xem-418ab",
  storageBucket: "xem-418ab.firebasestorage.app",
  messagingSenderId: "174323555720",
  appId: "1:174323555720:web:6f44fea2e8eaedbbdaee3d",
  measurementId: "G-L6VF91FYD1",
};
const app = initializeApp(firebaseConfig);

import {
  getDatabase,
  ref,
  child,
  get,
  set,
  query,
  limitToLast,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

const db = getDatabase();

export default app;

var link = document.querySelector(".link");
var btn = document.querySelector(".btnButton");
var objectElement = document.querySelector(".object");
// var paramElenment = objectElement.querySelector(".param");
// var embedElenment = objectElement.querySelector(".embed");
// var body = document.querySelector("body");

const API_KEY = "AIzaSyAy5h65ZAjr7SucUxXl9ACJLhFCcwwvIxk";
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
  setCookie("youtubeID", youtube_parser(link.value));
  if (youtube_parser(link.value)) {
    getVideoTitle(youtube_parser(link.value), API_KEY).then((data) => {
      const title = data.items[0].snippet.title;
      const channel = data.items[0].snippet.channelTitle;
      const src = data.items[0].snippet.thumbnails.medium.url;
      listVideoBody.appendChild(
        CreateItemVideo(youtube_parser(link.value), src, title, channel)
      );
    });
  }

  listVideoBody.scrollTop = 999999999;
  AddVideo(link.value);
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
const btnVideo = document.querySelector(".btnListVideo");
const popVideo = document.getElementById("popVideo");

btnChat.addEventListener("click", () => {
  popChat.classList.toggle("hidechat");
});

btnVideo.addEventListener("click", () => {
  popVideo.classList.toggle("hidelistvideo");
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
  ytVideo(linkVideoCookie);
  GetVideoList();
  // console.log(linkVideoCookie);
}
function GioiHanKyTuHienThi(text) {
  if (text.length > 25) {
    text = text.substring(0, 25) + "...";
  }
  return text;
}

// API youtube

function AddVideo(urlMessenge) {
  let result = youtube_parser(urlMessenge);
  const dbRef = ref(db);
  if (result) {
    get(child(dbRef, "/videoY")).then((videos) => {
      set(ref(db, "videoY/" + videos.val().length), {
        videoID: result,
      });
    });
  }
}

function GetVideoList() {
  const dbRef = ref(db);
  get(child(dbRef, "/videoY")).then((videos) => {
    videos.forEach((video) => {
      if (parseInt(video.key) >= videos.val().length - 30) {
        getVideoTitle(video.val().videoID, API_KEY).then((data) => {
          const title = data.items[0].snippet.title;
          const channel = data.items[0].snippet.channelTitle;
          const src = data.items[0].snippet.thumbnails.medium.url;
          listVideoBody.appendChild(
            CreateItemVideo(video.val().videoID, src, title, channel)
          );
        });
      }
    });
  });
  listVideoBody.scrollTop = 999999999;
}

async function getVideoTitle(videoId, apiKey) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetching data failed:", error);
  }
}

// function getVideoTitle(videoId, apiKey) {
//   fetch(
//     `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`
//   )
//     .then(function (a) {
//       return a.json(); // call the json method on the response to get JSON
//     })
//     .then(function (json) {
//       console.log(json);
//     })
//     .catch((error) => console.error("Error fetching video title:", error));
// }

const listVideoBody = document.querySelector(".listVideoBody");

function CreateItemVideo(id, src, title, channel) {
  const itemVideo = document.createElement("div");
  itemVideo.classList.add("itemVideo");
  itemVideo.setAttribute("videoid", id);
  const imgVideo = document.createElement("img");
  imgVideo.src = src;
  const snippetVideo = document.createElement("div");
  snippetVideo.classList.add("snippet");
  const titleVideo = document.createElement("span");
  titleVideo.classList.add("title");
  titleVideo.innerHTML = GioiHanKyTuHienThi(title);
  const channelVideo = document.createElement("span");
  channelVideo.classList.add("channel");
  channelVideo.innerHTML = GioiHanKyTuHienThi(channel);

  snippetVideo.appendChild(titleVideo);
  snippetVideo.appendChild(channelVideo);

  itemVideo.appendChild(imgVideo);
  itemVideo.appendChild(snippetVideo);

  itemVideo.addEventListener("click", PlayVideo);

  return itemVideo;
}

const videoId = "noCAIbiEnww";

function PlayVideo() {
  ytVideo(this.getAttribute("videoid"));
  setCookie("youtubeID", this.getAttribute("videoid"));
}
// const apiKey = "AIzaSyAy5h65ZAjr7SucUxXl9ACJLhFCcwwvIxk";

window.addEventListener("load", LoadObject);

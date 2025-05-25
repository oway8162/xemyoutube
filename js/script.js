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
      console.log(data.items[0].snippet.channelId);
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

function timeAgoFormat(isoDateString) {
  const now = new Date();
  const date = new Date(isoDateString);
  const seconds = Math.floor((now - date) / 1000);

  const intervals = [
    { label: "năm", seconds: 31536000 },
    { label: "tháng", seconds: 2592000 },
    { label: "tuần", seconds: 604800 },
    { label: "ngày", seconds: 86400 },
    { label: "giờ", seconds: 3600 },
    { label: "phút", seconds: 60 },
    { label: "giây", seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? "" : ""} trước`;
    }
  }

  return "Vừa xong";
}

function GioiHanKyTuHienThi(text, limit) {
  if (text.length > limit) {
    text = text.substring(0, limit) + "...";
  }
  return text;
}

function formatViews(views) {
  if (views < 1000) {
    return views.toString();
  } else if (views < 1_000_000) {
    return (
      (views / 1000).toFixed(views % 1000 >= 100 ? 1 : 0).replace(/\.0$/, "") +
      "K"
    );
  } else if (views < 1_000_000_000) {
    return (
      (views / 1_000_000)
        .toFixed(views % 1_000_000 >= 100_000 ? 1 : 0)
        .replace(/\.0$/, "") + "Tr"
    );
  } else {
    return (
      (views / 1_000_000_000)
        .toFixed(views % 1_000_000_000 >= 100_000_000 ? 1 : 0)
        .replace(/\.0$/, "") + "T"
    );
  }
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

// async function GetVideoList() {
//   const dbRef = ref(db);

//   try {
//     const snapshot = await get(child(dbRef, "/videoY"));
//     const videosData = snapshot.val();
//     const totalVideos = videosData.length;

//     const videoArray = [];
//     snapshot.forEach((videoSnapshot) => {
//       const key = parseInt(videoSnapshot.key);
//       const data = videoSnapshot.val();

//       // Lấy 30 video gần nhất
//       if (key >= totalVideos - 30) {
//         videoArray.push({ key, data });
//       }
//     });

//     // Sắp xếp theo key tăng dần (hoặc đảo ngược nếu muốn ngược lại)
//     videoArray.sort((a, b) => a.key - b.key);

//     // Tạo mảng Promise để lấy thông tin video
//     const fetchPromises = videoArray.map(({ key, data }) =>
//       getVideoTitle(data.videoID, API_KEY)
//         .then((response) => {
//           const item = response.items?.[0];
//           if (!item || !item.snippet) {
//             console.warn(
//               `Không tìm thấy thông tin video cho ID: ${data.videoID}`
//             );
//             return null;
//           }

//           return {
//             key,
//             videoID: data.videoID,
//             title: item.snippet.title,
//             channel: item.snippet.channelTitle,
//             thumbnail: item.snippet.thumbnails.medium.url,
//           };
//         })
//         .catch((error) => {
//           console.error(`Lỗi với video ${data.videoID}:`, error);
//           return null;
//         })
//     );

//     // Chờ tất cả hoàn tất
//     const videoDetails = await Promise.all(fetchPromises);

//     // Lọc bỏ các video lỗi (null)
//     const validVideos = videoDetails.filter(Boolean);

//     // Render đúng thứ tự
//     validVideos.forEach(({ videoID, thumbnail, title, channel }) => {
//       const videoElement = CreateItemVideo(videoID, thumbnail, title, channel);
//       listVideoBody.appendChild(videoElement);
//     });

//     listVideoBody.scrollTop = listVideoBody.scrollHeight;
//   } catch (error) {
//     console.error("Lỗi khi truy cập cơ sở dữ liệu:", error);
//   }
// }
async function GetVideoList() {
  const dbRef = ref(db);

  try {
    const snapshot = await get(child(dbRef, "/videoY"));
    if (!snapshot.exists()) {
      console.warn("Không có dữ liệu video trong Firebase.");
      return;
    }

    const videoArray = [];

    // Chuyển Firebase snapshot thành mảng có key số nguyên
    snapshot.forEach((videoSnapshot) => {
      const key = parseInt(videoSnapshot.key);
      const data = videoSnapshot.val();
      videoArray.push({ key, videoID: data.videoID });
    });

    // Sắp xếp theo key giảm dần => video mới nhất trước
    videoArray.sort((a, b) => b.key - a.key);

    // Lấy 30 video mới nhất
    const latestVideos = videoArray.slice(0, 30);

    // Lấy danh sách ID
    const videoIds = latestVideos.map((item) => item.videoID);

    // Gọi API 1 lần với toàn bộ videoId
    const videoDetails = await getVideoDetailsBatch(videoIds, API_KEY);

    const videoMap = new Map(videoDetails.map((item) => [item.id, item]));

    // Render theo đúng thứ tự gốc
    latestVideos.reverse().forEach(({ videoID }) => {
      const item = videoMap.get(videoID);
      if (!item || !item.snippet) {
        console.warn(`Không có thông tin cho video: ${videoID}`);
        return;
      }

      const videoElement = CreateItemVideo(
        videoID,
        item.snippet.thumbnails.medium.url,
        item.snippet.title,
        item.snippet.channelTitle
      );
      listVideoBody.appendChild(videoElement);
    });

    listVideoBody.scrollTop = listVideoBody.scrollHeight;
  } catch (error) {
    console.error("Lỗi khi truy cập cơ sở dữ liệu:", error);
  }
}

async function getVideoTitle(videoId, apiKey) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet,statistics,contentDetails`
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

async function getVideoDetailsBatch(videoIds, apiKey) {
  try {
    if (!videoIds.length) return [];

    const joinedIds = videoIds.join(",");
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?id=${joinedIds}&key=${apiKey}&part=snippet,statistics`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data?.items || [];
  } catch (error) {
    console.error("Fetching video details failed:", error);
    return [];
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
  titleVideo.innerHTML = GioiHanKyTuHienThi(title, 25);
  const channelVideo = document.createElement("span");
  channelVideo.classList.add("channel");
  channelVideo.innerHTML = GioiHanKyTuHienThi(channel, 25);

  snippetVideo.appendChild(titleVideo);
  snippetVideo.appendChild(channelVideo);

  itemVideo.appendChild(imgVideo);
  itemVideo.appendChild(snippetVideo);

  itemVideo.addEventListener("click", PlayVideo);

  return itemVideo;
}

const videoId = "noCAIbiEnww";

let currentChannelID = null;
async function PlayVideo() {
  const thisVideoID = this.getAttribute("videoid");
  ytVideo(thisVideoID);
  setCookie("youtubeID", thisVideoID);

  const videoData = await getVideoDetailsBatch([thisVideoID], API_KEY);
  const video = videoData?.[0];
  const newChannelID = video?.snippet?.channelId;

  if (!newChannelID) {
    console.warn("Không tìm thấy channel ID cho video này.");
    return;
  }

  if (newChannelID !== currentChannelID) {
    currentChannelID = newChannelID;
    await GetChannelVideoList(thisVideoID); // chỉ gọi nếu khác channel
  }
}
// const apiKey = "AIzaSyAy5h65ZAjr7SucUxXl9ACJLhFCcwwvIxk";

// <---------------- CHANNEL  --------------->

const cNVideoItems = document.querySelector(".videos-grid");
function createCNVideoItem(videoId, imgSrc, videoName, videoViews, timeAgo) {
  // Tạo thẻ div chính
  const videoItem = document.createElement("div");
  videoItem.className = "cn-video-item";
  videoItem.setAttribute("videoid", videoId);

  // Tạo thẻ img
  const img = document.createElement("img");
  img.src = imgSrc;
  img.alt = "Channel Avatar";

  // Tạo thẻ div cn-video-thumbnail
  const thumbnail = document.createElement("div");
  thumbnail.className = "cn-video-thumbnail";

  // Tạo thẻ span cho tên video
  const nameSpan = document.createElement("span");
  nameSpan.className = "cn-video-name";
  nameSpan.textContent = GioiHanKyTuHienThi(videoName, 45);

  // Tạo thẻ span cho lượt xem
  const viewSpan = document.createElement("span");
  viewSpan.className = "cn-video-view";
  viewSpan.textContent = formatViews(videoViews) + " lượt xem";

  // Tạo thẻ span cho ngày tạo Video
  const dateSpan = document.createElement("span");
  dateSpan.className = "cn-video-date";
  dateSpan.textContent = timeAgoFormat(timeAgo);

  // Gắn các span vào thumbnail
  thumbnail.appendChild(nameSpan);
  thumbnail.appendChild(viewSpan);
  thumbnail.appendChild(dateSpan);

  // Gắn img và thumbnail vào videoItem
  videoItem.appendChild(img);
  videoItem.appendChild(thumbnail);

  videoItem.addEventListener("click", PlayVideo);

  return videoItem;
}

async function getChannelData(channelID, apiKey) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelID}&part=snippet,id&type=video&order=date&maxResults=30`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data?.items || [];
  } catch (error) {
    console.error("Fetching channel data failed:", error);
    return [];
  }
}
async function GetChannelVideoList(getVideoID) {
  try {
    const dataVideo = await getVideoDetailsBatch([getVideoID], API_KEY);
    const baseVideo = dataVideo[0];
    if (!baseVideo || !baseVideo.snippet?.channelId) {
      throw new Error("Không tìm thấy thông tin kênh từ video gốc.");
    }

    const channelID = baseVideo.snippet.channelId;
    const channelVideos = await getChannelData(channelID, API_KEY);

    const videoIds = channelVideos
      .map((item) => item.id?.videoId)
      .filter(Boolean);

    const detailedVideos = await getVideoDetailsBatch(videoIds, API_KEY);

    cNVideoItems.innerHTML = "";

    detailedVideos.forEach((video) => {
      const snippet = video.snippet;
      const stats = video.statistics;

      const videoElement = createCNVideoItem(
        video.id,
        snippet?.thumbnails?.default?.url,
        snippet?.title,
        stats?.viewCount,
        snippet?.publishedAt
      );

      cNVideoItems.appendChild(videoElement);
    });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách video:", error);
  }
}
window.addEventListener("load", LoadObject);

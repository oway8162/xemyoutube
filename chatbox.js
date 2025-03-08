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

let chatBody = document.querySelector(".chatBody");
const btnSend = document.querySelector(".btnSend");
const chatFoot = document.querySelector(".chatFoot");
const textMessenger = chatFoot.querySelector("input");

const divElement = document.createElement("div");
const spanElement = document.createElement("span");
spanElement.classList.add("chatContent");
const spanElement2 = document.createElement("span");
spanElement2.classList.add("chatGetTime");
divElement.classList.add("mess");

divElement.appendChild(spanElement2);
divElement.appendChild(spanElement);
var getLengthMessenger = 0;

function getCurrentTime() {
  const d = new Date();
  const timeWithoutSeconds = d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(d.getDate()).padStart(2, "0");
  const getD = day + "/" + month + "/" + year;
  return `${timeWithoutSeconds} ${getD}`;
}

textMessenger.addEventListener("keypress", function (event) {
  if (event.which === 13) {
    AddText(textMessenger.value);
    AddMessBoxChat();
  }
});

btnSend.addEventListener("click", () => {
  if (textMessenger.value == "") {
    textMessenger.focus();
    return;
  } else {
    AddText(textMessenger.value);
    AddMessBoxChat();
  }
});

// const scrollToBottom = (id) => {
//   const element = document.getElementById(id);
//   element.scrollTop = element.scrollHeight;
// };
var MinusLimit;
function GetMessenger() {
  const dbRef = ref(db);
  chatBody.innerHTML = "";

  get(child(dbRef, "/messenger")).then((messenges) => {
    getLengthMessenger = messenges.val().length;
    const limit = getLengthMessenger - 30;
    MinusLimit = getLengthMessenger - limit + 1;
    messenges.forEach((messenge) => {
      if (messenge.key > limit) {
        spanElement.innerHTML = messenge.val().text;
        spanElement2.innerHTML = messenge.val().time;
        chatBody.innerHTML += divElement.outerHTML;
      }
    });

    chatBody.scrollTop = 999999999;
  });
}

const getTimeNow = getCurrentTime();
function AddMessBoxChat() {
  spanElement.innerHTML = textMessenger.value;
  spanElement2.innerHTML = getTimeNow;
  chatBody.innerHTML += divElement.outerHTML;
  textMessenger.focus();
  textMessenger.value = "";
  chatBody.scrollTop = 999999999;
}

function AddText(textMessenge) {
  set(ref(db, "messenger/" + getLengthMessenger), {
    text: textMessenge,
    time: getTimeNow,
  });
  getLengthMessenger++;
}

var checkLastMess = "";
async function getLastMessages(numMessages) {
  const lastMessagesQuery = query(
    ref(db, "/messenger"),
    limitToLast(numMessages)
  );
  const snapshot = await get(lastMessagesQuery);

  if (snapshot.exists()) {
    const messages = snapshot.val();
    return Object.values(messages)[0].text;
  } else {
    console.log("No messages found");
  }
}

var lastText = "";
setInterval(() => {
  getLastMessages(1).then((x) => {
    if (x != "") {
      lastText = x;
    }
  });
  if (
    lastText != chatBody.lastElementChild.lastElementChild.innerHTML &&
    lastText != ""
  ) {
    GetMessenger();
  } else {
    return;
  }
}, 1000);

window.addEventListener("load", GetMessenger);

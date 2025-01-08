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
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

const db = getDatabase();

let chatBody = document.querySelector(".chatBody");
const btnSend = document.querySelector(".btnSend");
const chatFoot = document.querySelector(".chatFoot");
const textMessenger = chatFoot.querySelector("input");

const divElement = document.createElement("div");
const spanElement = document.createElement("span");
divElement.classList.add("mess");
divElement.appendChild(spanElement);

var getLengthMessenger = 0;

btnSend.addEventListener("click", () => {
  if (textMessenger.value == "") {
    textMessenger.focus();
    return;
  } else {
    AddText(textMessenger.value);
    AddMessBoxChat();
  }
});

function GetMessenger() {
  const dbRef = ref(db);
  chatBody.innerHTML = "";
  get(child(dbRef, "/messenger")).then((messenges) => {
    messenges.forEach((messenge) => {
      spanElement.innerHTML = messenge.val().text;
      chatBody.innerHTML += divElement.outerHTML;
      getLengthMessenger = messenges.val().length;
    });
  });
}

function AddMessBoxChat() {
  spanElement.innerHTML = textMessenger.value;
  chatBody.innerHTML += divElement.outerHTML;
  textMessenger.focus();
  textMessenger.value = "";
}

function AddText(textMessenge) {
  set(ref(db, "messenger/" + getLengthMessenger), {
    text: textMessenge,
  });

  getLengthMessenger++;
}

var checktime = getLengthMessenger;
setInterval(() => {
  get(child(ref(db), "/messenger")).then((messenges) => {
    checktime = messenges.val().length;
  });
  if (checktime != chatBody.childElementCount) {
    GetMessenger();
  } else {
    return;
  }
}, 2000);

window.addEventListener("load", GetMessenger);

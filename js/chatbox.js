import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
  getDatabase,
  ref,
  onChildAdded,
  push,
  query,
  limitToLast,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

// === Firebase cấu hình ===
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
const db = getDatabase(app);

// === DOM Elements ===
const chatBody = document.querySelector(".chatBody");
const btnSend = document.querySelector(".btnSend");
const chatFoot = document.querySelector(".chatFoot");
const textInput = chatFoot.querySelector("input");

// === Hàm hỗ trợ ===
function getCurrentTime() {
  const d = new Date();
  const time = d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const date = `${String(d.getDate()).padStart(2, "0")}/${String(
    d.getMonth() + 1
  ).padStart(2, "0")}/${d.getFullYear()}`;
  return `${time} ${date}`;
}

function createMessageElement(text, time) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("mess");

  const timeSpan = document.createElement("span");
  timeSpan.classList.add("chatGetTime");
  timeSpan.textContent = time;

  const textSpan = document.createElement("span");
  textSpan.classList.add("chatContent");
  textSpan.textContent = text;

  messageDiv.appendChild(timeSpan);
  messageDiv.appendChild(textSpan);
  return messageDiv;
}

function appendMessage(text, time) {
  const messageElement = createMessageElement(text, time);
  chatBody.appendChild(messageElement);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function sendMessage(text) {
  const timeNow = getCurrentTime();
  const messagesRef = ref(db, "messenger");
  push(messagesRef, {
    text: text,
    time: timeNow,
  });
}

// === Sự kiện gửi tin nhắn ===
btnSend.addEventListener("click", () => {
  const text = textInput.value.trim();
  if (text) {
    sendMessage(text);
    textInput.value = "";
    textInput.focus();
  }
});

textInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    const text = textInput.value.trim();
    if (text) {
      sendMessage(text);
      textInput.value = "";
      textInput.focus();
    }
  }
});

// === Lắng nghe thay đổi thời gian thực ===
function startChatListener() {
  const messagesRef = query(ref(db, "messenger"), limitToLast(30));
  chatBody.innerHTML = ""; // clear chat
  onChildAdded(messagesRef, (snapshot) => {
    const { text, time } = snapshot.val();
    appendMessage(text, time);
  });
}

window.addEventListener("load", startChatListener);

console.log("hi");

const availableEmojis = ["💸", "🤑", "💰", "💵", "🪙"];
const socket = io();
document
  .getElementsByClassName("money-box")[0]
  .addEventListener("click", (event) => {
    if (availableEmojis.includes(event.target.innerText)) {
      socket.emit("emoji-click", event.target.innerText);
    }
  });

const stage = document.querySelector(".stage");

socket.on("emoji-click", function (emoji) {
  let item = document.createElement("p");
  item.textContent = emoji;
  item.style.left = Math.random() * 100 + "%";
  stage.appendChild(item);
  setTimeout(() => {
    stage.removeChild(item);
  }, 2200);
});

socket.on("current-users", function (currentUsers) {
  let currentUsersCount = document.querySelector(".current-users-count");
  currentUsersCount.innerHTML = `online: <div class="spring">${currentUsers}</div>`;
});

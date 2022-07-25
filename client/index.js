const availableEmojis = ["💸", "🤑", "💰", "💵", "🪙"];
const socket = io();
document
  .getElementsByClassName("money-box")[0]
  .addEventListener("click", (event) => {
    if (availableEmojis.includes(event.target.innerText)) {
      socket.emit("chat message", event.target.innerText);
    }
  });
const stage = document.querySelector(".stage");

socket.on("chat message", function (msg) {
  let item = document.createElement("p");
  item.textContent = msg;
  item.style.left = Math.random() * 100 + "%";
  stage.appendChild(item);
  setTimeout(() => {
    stage.removeChild(item);
  }, 2200);
});


function changeName() {
  const name = prompt("Введите ваше имя:");
  if (name) {
    document.getElementById("player-name").textContent = name;
  }
}

function goBack() {
  if (window.Telegram && Telegram.WebApp) {
    Telegram.WebApp.close();
  } else {
    alert("Функция работает только в Telegram WebApp");
  }
}

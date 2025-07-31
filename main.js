const startScreen = document.getElementById("start-screen");
const profileScreen = document.getElementById("profile-screen");
const modeScreen = document.getElementById("mode-screen");
const levelSelectScreen = document.getElementById("level-select-screen");
const gameScreen = document.getElementById("game-screen");

const playBtn = document.getElementById("play-btn");
const profileBtn = document.getElementById("profile-btn");
const saveNameBtn = document.getElementById("save-name-btn");
const nameInput = document.getElementById("name-input");

const soloBtn = document.getElementById("solo-btn");
const multiBtn = document.getElementById("multi-btn");

const levelButtons = document.querySelectorAll(".level-btn");
const backButtons = document.querySelectorAll(".back-btn");

const gameImage = document.getElementById("game-image");
const gameText = document.getElementById("game-text");
const gameActions = document.getElementById("game-actions");

let playerName = "";

function showScreen(screen) {
  [startScreen, profileScreen, modeScreen, levelSelectScreen, gameScreen].forEach(s => s.classList.add("hidden"));
  screen.classList.remove("hidden");
}

playBtn.onclick = () => showScreen(modeScreen);
profileBtn.onclick = () => {
  nameInput.value = playerName;
  showScreen(profileScreen);
};
saveNameBtn.onclick = () => {
  playerName = nameInput.value.trim() || "Герой";
  showScreen(startScreen);
};
soloBtn.onclick = () => showScreen(levelSelectScreen);
multiBtn.onclick = () => alert("Сетевой режим пока недоступен");

backButtons.forEach(btn => {
  btn.onclick = () => showScreen(startScreen);
});

levelButtons.forEach(btn => {
  btn.onclick = () => startLevel(parseInt(btn.dataset.level));
});

function createActionButton(text, handler) {
  const btn = document.createElement("button");
  btn.textContent = text;
  btn.onclick = handler;
  gameActions.appendChild(btn);
}

function startLevel(level) {
  if (level === 1) {
    showScreen(gameScreen);
    gameImage.src = "IMG_9914.jpeg";
    gameText.textContent = "⛰️ Ты заспавнился на горе. Выбери действие:";
    gameActions.innerHTML = "";
    createActionButton("🏰 Пойти в замок", goToCastle);
    createActionButton("🌍 Путешествовать", dieByWolf);
  }
}

function goToCastle() {
  gameImage.src = "castle.jpg";
  gameText.textContent = "🏰 Ты дошел до замка и исследуешь его. Что будешь делать?";
  gameActions.innerHTML = "";
  createActionButton("🚪 Зайти в замок", () => {
    gameText.textContent = "Ты попытался зайти в замок, но тебя не пропустили! В следующий раз повезёт!\nУровень пройден.";
    gameActions.innerHTML = "";
    createActionButton("🏠 Перейти в меню", () => showScreen(startScreen));
  });
  createActionButton("🌍 Убежать и путешествовать", fightWerewolf);
}

function fightWerewolf() {
  gameImage.src = "wolf.jpg";
  gameText.textContent = "Ты путешествуешь по миру, но на тебя напал оборотень.\nУ тебя есть меч. Что будешь делать?";
  gameActions.innerHTML = "";
  createActionButton("⚔️ Атаковать", () => {
    gameText.textContent = "Ты успешно убил оборотня. Уровень завершён.";
    gameActions.innerHTML = "";
    createActionButton("🏠 Перейти в меню", () => showScreen(startScreen));
  });
  createActionButton("🏃‍♂️ Попробовать убежать", () => {
    gameText.textContent = "Ты еле-еле убежал, но лучше было атаковать.\nУровень завершён.";
    gameActions.innerHTML = "";
    createActionButton("🏠 Перейти в меню", () => showScreen(startScreen));
  });
}

function dieByWolf() {
  gameImage.src = "wolf.jpg";
  gameText.textContent = "❌ Поздно! Тебя ранил волк, и ты умер от кровотечения.";
  gameActions.innerHTML = "";
  createActionButton("🔁 Начать заново", () => showScreen(startScreen));
}

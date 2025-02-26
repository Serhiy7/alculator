

let a = ""; // Первое число
let b = ""; // Второе число
let sign = ""; // Знак операции
let finish = false;

const digit = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const action = ["-", "+", "X", "/"];
const percent = "%";
const changeSign = "+/-";

// Экран
const out = document.querySelector(".calc-screen div");

// Очистка всего
function clearAll() {
  a = b = sign = "";
  finish = false;
  out.textContent = 0;
}

// Обновление экрана
function updateScreen(value) {
  out.textContent = value;
}

// Логирование (для отладки)
function logState() {
  console.log({ a, b, sign });
}

// Математические операции
const operations = {
  "+": (x, y) => x + y,
  "-": (x, y) => x - y,
  "X": (x, y) => x * y,
  "/": (x, y) => (y === 0 ? "Error" : x / y),
};

// Обработка нажатий
document.querySelector(".buttons").onclick = (event) => {
  if (!event.target.classList.contains("btn") || event.target.classList.contains("ac")) return;

  const key = event.target.textContent;

  if (digit.includes(key)) {
    if (b === "" && sign === "") {
      a += key;
    } else if (a !== "" && b !== "" && finish) {
      b = key;
      finish = false;
    } else {
      b += key;
    }
    updateScreen(b === "" ? a : b);
    logState();
    return;
  }

  if (action.includes(key)) {
    sign = key;
    updateScreen(sign);
    logState();
    return;
  }

  if (key === percent && a !== "") {
    a = a / 100;
    updateScreen(a);
    return;
  }

  if (key === changeSign && a !== "") {
    a = a * -1;
    updateScreen(a);
    return;
  }

  if (key === "=") {
    if (b === "") b = a;
    a = operations[sign]?.(+a, +b) ?? "Error";
    finish = true;
    updateScreen(a);
    logState();
  }
};

// Очистка
document.querySelector(".ac").onclick = clearAll;


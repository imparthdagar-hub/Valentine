const s1 = document.getElementById("screen1");
const s2 = document.getElementById("screen2");
const cat = document.getElementById("catScreen");
const treeScreen = document.getElementById("treeScreen");

const no1 = document.getElementById("no1");
const no2 = document.getElementById("no2");

function dodge(btn) {
  btn.onmouseover = () => {
    btn.style.position = "absolute";
    btn.style.left = Math.random() * 200 + "px";
    btn.style.top = Math.random() * 100 + "px";
  };
}

dodge(no1);
dodge(no2);

document.getElementById("yes1").onclick = () => {
  s1.style.display = "none";
  cat.style.display = "flex";
  setTimeout(() => {
    cat.style.display = "none";
    s2.style.display = "flex";
  }, 2500);
};

document.getElementById("yes2").onclick = () => {
  s2.style.display = "none";
  treeScreen.style.display = "block";
  startTree();
};

/* TREE LOGIC */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const textBox = document.getElementById("text");

canvas.width = window.innerWidth * 0.55;
canvas.height = window.innerHeight;

/* typing */
const lines = [
  "Hey ❤️",
  "",
  "I was nervous to ask...",
  "",
  "But now I’m glad I did."
];

let l = 0, c = 0;
function typeText() {
  if (l >= lines.length) return;
  if (c < lines[l].length) {
    textBox.innerHTML += lines[l][c++];
    setTimeout(typeText, 60);
  } else {
    textBox.innerHTML += "\n";
    l++; c = 0;
    setTimeout(typeText, 400);
  }
}

/* STEM then HEART LEAVES */
let stemY = canvas.height;
let hearts = [];

function drawStem() {
  ctx.strokeStyle = "hotpink";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, canvas.height);
  ctx.lineTo(canvas.width / 2, stemY);
  ctx.stroke();

  stemY -= 3;
  if (stemY > canvas.height / 2) {
    requestAnimationFrame(drawStem);
  } else {
    growLeaves();
  }
}

function growLeaves() {
  if (hearts.length < 300) {
    hearts.push({
      x: canvas.width / 2 + Math.random() * 160 - 80,
      y: canvas.height / 2 + Math.random() * 140,
      c: `hsl(${Math.random() * 360},80%,65%)`
    });
  }

  hearts.forEach(h => {
    ctx.beginPath();
    ctx.arc(h.x, h.y, 4, 0, Math.PI * 2);
    ctx.fillStyle = h.c;
    ctx.fill();
  });

  requestAnimationFrame(growLeaves);
}

function startTree() {
  typeText();
  drawStem();
}

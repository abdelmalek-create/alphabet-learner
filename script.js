const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
let currentLetter = '';

const targetLetter = document.getElementById('target-letter');
const choicesContainer = document.getElementById('choices-container');
const feedback = document.getElementById('feedback');
const correctSound = document.getElementById('audio-correct');
const wrongSound = document.getElementById('audio-wrong');

function getRandomLetter() {
  return letters[Math.floor(Math.random() * letters.length)];
}

function loadNewQuestion() {
  feedback.classList.add('hidden');
  currentLetter = getRandomLetter();
  targetLetter.innerText = currentLetter;

  const correctChoices = [currentLetter, currentLetter.toLowerCase()];
  const allChoices = new Set(correctChoices);

  // Add wrong options
  while (allChoices.size < 6) {
    let random = getRandomLetter();
    allChoices.add(Math.random() > 0.5 ? random.toLowerCase() : random);
  }

  const shuffled = Array.from(allChoices).sort(() => Math.random() - 0.5);
  renderChoices(shuffled, correctChoices);
}

function renderChoices(options, correct) {
  choicesContainer.innerHTML = '';

  options.forEach(option => {
    const btn = document.createElement('button');
    btn.innerText = option;
    btn.onclick = () => checkAnswer(option, correct);
    choicesContainer.appendChild(btn);
  });
}

function checkAnswer(selected, correct) {
  if (correct.includes(selected)) {
    feedback.innerText = '✅ Excellent!';
    feedback.style.color = 'green';
    correctSound.play();
    setTimeout(loadNewQuestion, 1500);
  } else {
    feedback.innerText = '❌ Try again!';
    feedback.style.color = 'red';
    wrongSound.play();
  }

  feedback.classList.remove('hidden');
}

// ----- Canvas for cursive writing -----
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let drawing = false;

canvas.addEventListener('mousedown', () => (drawing = true));
canvas.addEventListener('mouseup', () => (drawing = false));
canvas.addEventListener('mouseout', () => (drawing = false));
canvas.addEventListener('mousemove', draw);

function draw(e) {
  if (!drawing) return;
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  ctx.strokeStyle = '#3366cc';

  const rect = canvas.getBoundingClientRect();
  ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// ----- Start the game -----
window.onload = loadNewQuestion;


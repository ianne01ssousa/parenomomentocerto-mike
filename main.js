const bar = document.getElementById('moving-bar');
const stopBtn = document.getElementById('stop-btn');
const result = document.getElementById('result');

let position = 0;
let direction = 1;
let interval;
let tentativas = 3;

function startMoving() {
  position = 0;
  direction = 1;
  bar.style.left = position + '%';
  result.textContent = `Tentativas restantes: ${tentativas}`;
  result.style.color = '#fff';

  interval = setInterval(() => {
    position += direction * 0.5;
    if (position >= 95 || position <= 0) {
      direction *= -1;
    }
    bar.style.left = position + '%';
  }, 10);
}

function stopBar() {
  clearInterval(interval);
  const barLeft = parseFloat(bar.style.left);
  const targetStart = 60;
  const targetEnd = 70;

  tentativas--;

  if (barLeft >= targetStart && barLeft <= targetEnd) {
    result.textContent = '🎉 Parabéns! Você parou no lugar certo!';
    result.style.color = '#00ff00';
    stopBtn.disabled = true;
    setTimeout(resetGame, 3000);
  } else {
    if (tentativas > 0) {
      result.textContent = `❌ Errou! Tentativas restantes: ${tentativas}`;
      result.style.color = '#ff3333';
      setTimeout(startMoving, 1500);
    } else {
      result.textContent = '🔁 Fim das tentativas. Reiniciando...';
      result.style.color = '#ffff00';
      stopBtn.disabled = true;
      setTimeout(resetGame, 3000);
    }
  }
}

function resetGame() {
  tentativas = 3;
  stopBtn.disabled = false;
  result.textContent = '';
  startMoving();
}

stopBtn.addEventListener('click', stopBar);

startMoving();

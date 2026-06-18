function showPage(id) {
  document.querySelectorAll('.page').forEach(function(p){ p.classList.remove('active'); });
  document.querySelectorAll('.nav-links a').forEach(function(a){ a.classList.remove('active'); });
  var page = document.getElementById('page-' + id);
  var link = document.getElementById('nav-' + id);
  if (page) page.classList.add('active');
  if (link) link.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (id === 'jogo') restartQuiz();
}

function switchGuide(tab) {
  document.querySelectorAll('.guide-tab').forEach(function(t){ t.classList.remove('active'); });
  document.querySelectorAll('.guide-panel').forEach(function(p){ p.classList.remove('active'); });
  document.querySelector('.guide-tab.' + tab).classList.add('active');
  document.getElementById('panel-' + tab).classList.add('active');
}

function previewImg(input) {
  if (!input.files || !input.files[0]) return;
  var slot = input.closest('.img-slot');
  var reader = new FileReader();
  reader.onload = function(e) {
    var existing = slot.querySelector('img');
    if (existing) existing.remove();
    var img = document.createElement('img');
    img.src = e.target.result;
    slot.appendChild(img);
    slot.classList.add('has-img');
  };
  reader.readAsDataURL(input.files[0]);
}

var quizData = [
  { question: "Qual dessas opções é uma prática aliada da sustentabilidade no campo?", options: ["Uso excessivo de defensivos", "Rotação de culturas", "Queimada de restos vegetais", "Desmatamento de encostas"], answer: 1 },
  { question: "O que significa dizer que um alimento é orgânico?", options: ["Que foi modificado em laboratório", "Que foi cultivado sem agrotóxicos sintéticos", "Que cresce apenas usando água salgada", "Que dura mais tempo no supermercado"], answer: 1 },
  { question: "Qual inseto é considerado um dos maiores polinizadores da nossa agricultura?", options: ["Pernilongo", "Formiga saúva", "Abelha", "Gafanhoto"], answer: 2 }
];

var currentIndex = 0, score = 0;

function loadQuestion() {
  var q = quizData[currentIndex];
  document.getElementById('quiz-question').innerText = q.question;
  document.getElementById('quiz-progress').style.width = ((currentIndex / quizData.length) * 100) + '%';
  document.getElementById('quiz-counter').innerText = 'Pergunta ' + (currentIndex + 1) + ' de ' + quizData.length;
  var c = document.getElementById('quiz-options');
  c.innerHTML = '';
  q.options.forEach(function(opt, i) {
    var btn = document.createElement('button');
    btn.className = 'quiz-opt-btn';
    btn.innerText = opt;
    btn.onclick = function(){ checkAnswer(i); };
    c.appendChild(btn);
  });
}

function checkAnswer(s) {
  if (s === quizData[currentIndex].answer) score++;
  currentIndex++;
  if (currentIndex < quizData.length) { loadQuestion(); } else { showResults(); }
}

function showResults() {
  document.getElementById('quiz-progress').style.width = '100%';
  document.getElementById('quiz-screen').classList.add('hide');
  document.getElementById('quiz-result').classList.remove('hide');
  var pct = score / quizData.length;
  var emoji = pct === 1 ? '🏆' : pct >= 0.6 ? '👍' : '📚';
  var msg = pct === 1 ? 'Parabéns! Você acertou tudo!' : pct >= 0.6 ? 'Muito bem! Continue aprendendo.' : 'Que tal rever o Guia do Agro?';
  document.getElementById('result-emoji').innerText = emoji;
  document.getElementById('quiz-score').innerText = 'Você acertou ' + score + ' de ' + quizData.length + ' perguntas.';
  document.getElementById('quiz-message').innerText = msg;
}

function restartQuiz() {
  currentIndex = 0; score = 0;
  document.getElementById('quiz-screen').classList.remove('hide');
  document.getElementById('quiz-result').classList.add('hide');
  loadQuestion();
}

// Initialize quiz on page load
restartQuiz();
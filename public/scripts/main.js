if (document.documentElement.classList.contains('dark')) {
  document.querySelectorAll('.nav-sprite, .card-404 img').forEach(img => {
    img.src = img.src.replace('-light.', '-dark.');
  });
  document.querySelector('#theme-toggle .button-sprite').src = '/assets/Sprite-sun.png';
}

document.querySelectorAll('.dropdown-toggle').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.closest('.dropdown');
    item.classList.toggle('open');
  });
});

const toggle = document.getElementById('theme-toggle');
const sprite = toggle.querySelector('.button-sprite');

toggle.addEventListener('click', () => {
  document.documentElement.classList.toggle('dark');
  const isDark = document.documentElement.classList.contains('dark');

  localStorage.setItem('theme', isDark ? 'dark' : 'light');

  sprite.src = isDark ? '/assets/Sprite-sun.png' : '/assets/Sprite-moon.png';

  document.querySelectorAll('.nav-sprite, .card-404 img').forEach(img => {
    img.src = img.src.replace(
      isDark ? '-light.' : '-dark.',
      isDark ? '-dark.'  : '-light.'
    );
  });
});

// =========================================
// Fun Facts
// =========================================

let lastFactIndex = null;

function getRandomFactIndex(length) {
  let index;
  do {
    index = Math.floor(Math.random() * length);
  } while (index === lastFactIndex);
  lastFactIndex = index;
  return index;
}

async function getRandomFact(filePath) {
  const response = await fetch(filePath);
  const data = await response.json();
  const facts = data.facts;
  return facts[getRandomFactIndex(facts.length)];
}

const funFactBtn = document.getElementById('fun-fact-btn');
if (funFactBtn) {
  funFactBtn.addEventListener('click', async () => {
    const factEl = document.getElementById('fun-fact-text');
    try {
      factEl.textContent = await getRandomFact('/scripts/data/funFacts.json');
    } catch (e) {
      factEl.textContent = 'Oops, couldn\'t load a fact!';
      console.error(e);
    }
  });
}
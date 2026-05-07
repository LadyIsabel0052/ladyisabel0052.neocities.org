// =========================================
// Post Pagination
// =========================================

(function () {
  const POSTS_PER_PAGE = 4;

  const card = document.getElementById('posts-card');
  if (!card) return;

  // Collect all posts
  const posts = Array.from(card.querySelectorAll('.post'));
  if (posts.length === 0) return;

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  let currentPage = 1;

  // Inject a date span into each post heading
  posts.forEach(post => {
    const date = post.dataset.date;
    if (!date) return;
    const heading = post.querySelector('h2');
    if (!heading) return;

    const dateEl = document.createElement('span');
    dateEl.classList.add('post-date');
    dateEl.textContent = date;
    heading.appendChild(dateEl);
  });

  // Insert an <hr> after every post — JS will show/hide them per page
  posts.forEach(post => {
    const hr = document.createElement('hr');
    hr.classList.add('post-divider');
    post.after(hr);
  });

  // Build pagination controls container
  const controls = document.createElement('div');
  controls.classList.add('pagination');
  card.appendChild(controls);

  function renderPage(page) {
    const start = (page - 1) * POSTS_PER_PAGE;
    const end   = page * POSTS_PER_PAGE;

    posts.forEach((post, i) => {
      const visible = i >= start && i < end;
      post.style.display = visible ? '' : 'none';

      // Show the divider between visible posts; hide after the last one on the page
      const hr = post.nextElementSibling;
      if (hr && hr.classList.contains('post-divider')) {
        const isLast = i === end - 1 || i === posts.length - 1;
        hr.style.display = (visible && !isLast) ? '' : 'none';
      }
    });

    currentPage = page;
    renderControls();
  }

  function renderControls() {
    controls.innerHTML = '';

    const prev = document.createElement('button');
    prev.classList.add('pagination-btn');
    prev.textContent = '←';
    prev.disabled = currentPage === 1;
    prev.addEventListener('click', () => renderPage(currentPage - 1));
    controls.appendChild(prev);

    // Page number buttons
    for (let p = 1; p <= totalPages; p++) {
      const btn = document.createElement('button');
      btn.classList.add('pagination-btn');
      if (p === currentPage) btn.classList.add('pagination-btn--active');
      btn.textContent = p;
      btn.addEventListener('click', () => renderPage(p));
      controls.appendChild(btn);
    }

    const next = document.createElement('button');
    next.classList.add('pagination-btn');
    next.textContent = '→';
    next.disabled = currentPage === totalPages;
    next.addEventListener('click', () => renderPage(currentPage + 1));
    controls.appendChild(next);
  }

  // Init
  renderPage(1);
})();

const filters = document.querySelector('.filters');
const cards = [...document.querySelectorAll('[data-category]')];
const status = document.querySelector('#filter-status');

filters.hidden = false;
filters.addEventListener('click', (event) => {
  const selected = event.target.closest('[data-filter]');
  if (!selected) return;

  const filter = selected.dataset.filter;
  filters.querySelectorAll('button').forEach((button) => {
    button.setAttribute('aria-pressed', String(button === selected));
  });
  cards.forEach((card) => {
    card.hidden = filter !== 'all' && !card.dataset.category.split(' ').includes(filter);
  });
  const visibleCount = cards.filter((card) => !card.hidden).length;
  status.textContent = `${visibleCount} ${visibleCount === 1 ? 'project' : 'projects'} shown`;
});

const video = document.querySelector('.video-player video');
const videoPlay = document.querySelector('.video-play');
const videoStatus = document.querySelector('.video-status');

video.controls = false;
videoPlay.hidden = false;
videoPlay.addEventListener('click', () => {
  videoPlay.hidden = true;
  video.controls = true;
  video.focus();
  video.play().catch(() => {
    if (video.error) videoStatus.hidden = false;
  });
});
video.addEventListener('error', () => {
  videoStatus.hidden = false;
});

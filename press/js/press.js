document.addEventListener('DOMContentLoaded', async () => {
  const grid = document.querySelector('#pressGrid');
  if (!grid) {
    return;
  }

  const layoutMasonry = () => {
    const cards = grid.querySelectorAll('.press-card');
    if (!cards.length) {
      return;
    }

    const styles = window.getComputedStyle(grid);
    const rowHeight = parseFloat(styles.getPropertyValue('grid-auto-rows')) || 1;
    const rowGap = parseFloat(styles.getPropertyValue('row-gap')) || 0;

    cards.forEach(card => {
      const figure = card.querySelector('figure');
      if (!figure) {
        return;
      }

      const height = figure.getBoundingClientRect().height;
      const rowSpan = Math.ceil((height + rowGap) / (rowHeight + rowGap));
      card.style.gridRowEnd = `span ${rowSpan}`;
    });
  };

  let resizeAnimationFrame;
  const scheduleLayout = () => {
    cancelAnimationFrame(resizeAnimationFrame);
    resizeAnimationFrame = requestAnimationFrame(layoutMasonry);
  };

  const waitForImages = images => Promise.all(
    images.map(img => new Promise(resolve => {
      if (img.complete) {
        resolve();
        return;
      }

      img.addEventListener('load', resolve, { once: true });
      img.addEventListener('error', resolve, { once: true });
    }))
  );

  try {
    const response = await fetch('data/press-items.json');
    if (!response.ok) {
      throw new Error('Unable to load press items.');
    }

    const items = await response.json();
    if (!Array.isArray(items) || items.length === 0) {
      grid.innerHTML = '<p class="press-error">Press features will be published soon.</p>';
      return;
    }

    const fragment = document.createDocumentFragment();

    items.forEach(item => {
      if (!item || !item.url || !item.image) {
        return;
      }

      const link = document.createElement('a');
      link.href = item.url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.className = 'press-card';

      const labelParts = [];
      if (item.title) labelParts.push(item.title);
      if (item.publication) labelParts.push(item.publication);
      if (labelParts.length) {
        const label = labelParts.join(' — ');
        link.setAttribute('aria-label', label);
        link.title = label;
      }

      const figure = document.createElement('figure');

      const image = document.createElement('img');
      image.src = item.image;
      image.alt = item.alt || item.title || 'Press article screenshot';

      figure.appendChild(image);
      link.appendChild(figure);
      fragment.appendChild(link);
    });

    if (!fragment.childNodes.length) {
      grid.innerHTML = '<p class="press-error">Press features will be published soon.</p>';
      return;
    }

    grid.appendChild(fragment);

    const images = Array.from(grid.querySelectorAll('.press-card img'));
    await waitForImages(images);
    layoutMasonry();
    window.addEventListener('resize', scheduleLayout);
  } catch (error) {
    console.error(error);
    grid.innerHTML = '<p class="press-error">Trouble loading press features. Please refresh.</p>';
  }
});

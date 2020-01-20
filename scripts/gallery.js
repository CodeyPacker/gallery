function Gallery(gallery) {
  if (!gallery) {
    throw new Error('Gallery not found!');
  }

  // select the elements we need
  const images = Array.from(gallery.querySelectorAll('img'));
  const modal = document.querySelector('.modal');
  const prevButton = modal.querySelector('.prev');
  const nextButton = modal.querySelector('.next');
  let currentImage;

  function openModal() {
    console.log('opened modal');
    // first check if modal is already open
    if (modal.matches('.open')) {
      console.info('modal already open');
      return; // stop function from running
    }

    modal.classList.add('open');
  }

  function closeModal() {
    modal.classList.remove('open');
  }

  function handleClickOutside(e) {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }

  function showImage(el) {
    if (!el) { // safety net
      console.info('no image to show');
      return;
    }

    // update the modal with this info
    console.log(el);
    modal.querySelector('img').src = el.src;
    modal.querySelector('h2').textContent = el.title;
    modal.querySelector('figure p').textContent = el.dataset.description;
    currentImage = el;
    openModal();
  }

  // All event listeners
  images.forEach(image => image.addEventListener('click', e => showImage(e.currentTarget)));
  modal.addEventListener('click', handleClickOutside);
}


const gallery1 = Gallery(document.querySelector('.gallery1'));
const gallery2 = Gallery(document.querySelector('.gallery2'));
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
    // first check if modal is already open
    if (modal.matches('.open')) {
      return; // stop function from running
    }

    modal.classList.add('open');

    // Event listeners to be bound when modal is opened
    window.addEventListener('keyup', handleKeyUp);
    nextButton.addEventListener('click', showNextImage);
    prevButton.addEventListener('click', showPrevImage);
  }

  function closeModal() {
    modal.classList.remove('open');
    // cleanup listeners. these only need to exist when a modal is open
    window.removeEventListener('keyup', handleKeyUp);
    nextButton.removeEventListener('click', showNextImage);
    prevButton.removeEventListener('click', showPrevImage);
  }

  function handleClickOutside(e) {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }

  function handleKeyUp(e) {
    // adding a return prevents the function from checking each key
    if (e.key === 'Escape') return closeModal();
    if (e.key === 'ArrowRight') return showNextImage();
    if (e.key === 'ArrowLeft') return showPrevImage();
  }

  function showNextImage() {
    // If there are no more images, go back to the first image
    showImage(currentImage.nextElementSibling ||
      gallery.firstElementChild);
  }

  function showPrevImage() {
    showImage(currentImage.previousElementSibling ||
      gallery.lastElementChild);
  }

  function showImage(el) {
    if (!el) { // safety net
      console.info('no image to show');
      return;
    }

    // update the modal with this info
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
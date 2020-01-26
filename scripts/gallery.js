function Gallery(gallery) {
  if (!gallery) {
    throw new Error('Gallery not found!');
  }

  this.gallery = gallery;

  // select the elements we need
  this.images = Array.from(gallery.querySelectorAll('img'));
  this.modal = document.querySelector('.modal');
  this.prevButton = this.modal.querySelector('.prev');
  this.nextButton = this.modal.querySelector('.next');

  // Bind the methods to the instance when we need them
  // These need to have access to 'this'
  this.showNextImage = this.showNextImage.bind(this);
  this.showPrevImage = this.showPrevImage.bind(this);
  this.handleKeyUp = this.handleKeyUp.bind(this);
  this.handleClickOutside = this.handleClickOutside.bind(this);

  // All event listeners
  this.images.forEach(image => image.addEventListener('click', e => this.showImage(e.currentTarget)));

  this.images.forEach(image => {
    image.addEventListener('keyup', e => {
      if(e.key === 'Enter') {
        this.showImage(e.currentTarget);
      }
    });
  });

  this.modal.addEventListener('click', this.handleClickOutside);
}

Gallery.prototype.openModal = function() {
  // first check if modal is already open
  if (this.modal.matches('.open')) {
    return; // stop function from running
  }

  this.modal.classList.add('open');

  // Event listeners to be bound when modal is opened
  window.addEventListener('keyup', this.handleKeyUp);
  this.nextButton.addEventListener('click', this.showNextImage);
  this.prevButton.addEventListener('click', this.showPrevImage);
}

Gallery.prototype.closeModal = function() {
  this.modal.classList.remove('open');
  // cleanup listeners. these only need to exist when a modal is open
  window.removeEventListener('keyup', this.handleKeyUp);
  this.nextButton.removeEventListener('click', this.showNextImage);
  this.prevButton.removeEventListener('click', this.showPrevImage);
}

Gallery.prototype.handleClickOutside = function(e) {
  if (e.target === e.currentTarget) {
    this.closeModal();
  }
}

Gallery.prototype.handleKeyUp = function(e) {
  // adding a return prevents the function from checking each key
  if (e.key === 'Escape') return this.closeModal();
  if (e.key === 'ArrowRight') return this.showNextImage();
  if (e.key === 'ArrowLeft') return this.showPrevImage();
}

Gallery.prototype.showNextImage = function() {
  // If there are no more images, go back to the first image
  this.showImage(this.currentImage.nextElementSibling ||
    this.gallery.firstElementChild);
}

Gallery.prototype.showPrevImage = function() {
  this.showImage(this.currentImage.previousElementSibling ||
    this.gallery.lastElementChild);
}

Gallery.prototype.showImage = function(el) {
  if (!el) { // safety net
    console.info('no image to show');
    return;
  }

  // update the modal with this info
  this.modal.querySelector('img').src = el.src;
  this.modal.querySelector('h2').textContent = el.title;
  this.modal.querySelector('figure p').textContent = el.dataset.description;
  this.currentImage = el;
  this.openModal();
}

const gallery1 = new Gallery(document.querySelector('.gallery1'));
const gallery2 = new Gallery(document.querySelector('.gallery2'));
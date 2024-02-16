//sidebar
const btnBurger = document.querySelector('.icon-menu');
const menuSideBar = document.querySelector('.menu');
const menuClose = document.querySelector('.menu__close');

const navListSideBar = document.querySelectorAll('.nav--list-sideBar');

btnBurger.addEventListener('click', function () {
  btnBurger.classList.toggle('_active');
  menuSideBar.classList.toggle('menu--active');

  if (menuSideBar.classList.contains('menu--active')) {
    document.body.style.overflow = 'hidden';
    menuClose.addEventListener('click', function () {
      menuSideBar.classList.remove('menu--active');
      document.body.style.overflow = 'auto';
      btnBurger.classList.remove('_active');
    });
  }

  navListSideBar.forEach(navItem => {
    navItem.addEventListener('click', function () {
      menuSideBar.classList.remove('menu--active');
      document.body.style.overflow = 'auto';
      btnBurger.classList.remove('_active');
    });
  });
});



//quiz
const quizRealtyForm = document.querySelector('.quiz__realty-form');
const quizAreaForm = document.querySelector('.quiz__area-form');
const quizDesignForm = document.querySelector('.quiz__design-form');
const quizStart = document.querySelector('.quiz__start');
const quizSendForm = document.querySelector('.quiz__send-form');
const quizBody = document.querySelector('.quiz__body');

const questionSet = document.querySelectorAll('.quiz__body>form');
const quizPrev = document.querySelector('.quiz__prev');
const quizNext = document.querySelector('.quiz__next');
const quizCorrectScore = document.querySelector('.quiz__correct-score');
const quizSendData = document.querySelector('.quiz__button');

quizCorrectScore.textContent = 1;

const data = {
  realty: '',
  area: '',
  design: '',
  name: '',
  number: '',
};

quizRealtyForm.addEventListener('change', function (e) {
  const value = e.target.value;
  data.realty = value;

  setTimeout(() => {
    quizRealtyForm.hidden = true;
    quizAreaForm.hidden = false;
    quizPrev.disabled = false;
    quizNext.disabled = !quizAreaForm.querySelector('input:checked');
    quizCorrectScore.textContent = Number(quizCorrectScore.textContent) + 1;
  }, 200);
});

quizAreaForm.addEventListener('change', function (e) {
  const value = e.target.value;
  data.area = value;

  setTimeout(() => {
    quizAreaForm.hidden = true;
    quizDesignForm.hidden = false;
    quizNext.disabled = !quizDesignForm.querySelector('input:checked');
    quizCorrectScore.textContent = Number(quizCorrectScore.textContent) + 1;

  }, 200);
});

quizDesignForm.addEventListener('change', function (e) {
  const value = e.target.value;
  data.design = value;

  setTimeout(() => {
    quizDesignForm.hidden = true;
    quizStart.hidden = false;
    quizNext.disabled = !quizStart.querySelector('input:checked');
    quizCorrectScore.textContent = Number(quizCorrectScore.textContent) + 1;
  }, 200);
});

quizStart.addEventListener('change', function (e) {
  const value = e.target.value;
  data.start = value;

  setTimeout(() => {
    quizBody.hidden = true;
    quizSendForm.hidden = false;
  }, 200);
});

quizPrev.addEventListener('click', function () {
  const currentForm = document.querySelector('.quiz__body>form:not([hidden])');
  const prevForm = currentForm.previousElementSibling;

  currentForm.hidden = true;
  prevForm.hidden = false;
  quizNext.disabled = false;

  if (prevForm === quizRealtyForm) {
    quizPrev.disabled = true;
  }

  quizCorrectScore.textContent = Number(quizCorrectScore.textContent) - 1;
});

quizNext.addEventListener('click', function () {
  const currentForm = document.querySelector('.quiz__body>form:not([hidden])');
  const nextForm = currentForm.nextElementSibling;

  currentForm.hidden = true;
  nextForm.hidden = false;
  quizPrev.disabled = false;

  if (nextForm === quizDesignForm) {
    quizNext.disabled = true;
  }

  quizCorrectScore.textContent = Number(quizCorrectScore.textContent) + 1;
});

quizSendForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.querySelector('.quiz__name').value;
  const number = document.querySelector('.quiz__number').value;

  data.name = name;
  data.number = number;

  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('number', data.number);
  formData.append('realty', data.realty);
  formData.append('area', data.area);
  formData.append('design', data.design);
  formData.append('start', data.start);

  fetch('sendForm.php', {
    method: 'POST',
    body: formData,
  })
    .then((response) => response.text())
    .then((data) => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });

  const openThanks = window.open('thanks.html', '_self');

  openThanks.onload = function () {
    openThanks.postMessage(data, '*');
  }
});

const form = document.querySelector('.send-form__form');
const footerForm = document.querySelector('.footer__form');

form.addEventListener('submit', handleSubmit);
footerForm.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
  e.preventDefault(); // Prevent default form submission

  // Create new FormData object from the form
  const formData = new FormData(e.target);
  console.log(formData);

  // Send form data to the PHP script using Fetch API
  fetch('sendform.php', {
    method: 'POST',
    body: formData
  })
    .then(response => response.text())
    .then(data => {
      console.log(data); // Response from PHP script
    })
    .catch(error => {
      console.error('Error:', error);
    });

  const openThanks = window.open('thanks.html', '_self');

  openThanks.onload = function () {
    openThanks.postMessage(data, '*');
  }
}

//scroll on click
const menuLinks = document.querySelectorAll('.nav__link[data-goto]')
const heroBtn = document.querySelector('.hero__btn[data-goto]')

if (menuLinks.length > 0) {
  menuLinks.forEach(menuLink => {
    menuLink.addEventListener('click', onMenuLinkClick)
  })

  if (heroBtn) {
    heroBtn.addEventListener('click', onMenuLinkClick)
  }


  function onMenuLinkClick(e) {
    const menuLink = e.target
    if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
      const gotoBlock = document.querySelector(menuLink.dataset.goto)
      const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY - document.querySelector('.header').offsetHeight + 80

      window.scrollTo({
        // top: gotoBlock.offsetTop,
        top: gotoBlockValue,
        behavior: "smooth"
      })
      e.preventDefault()
    }
  }
}

// Gallery
new Swiper('.gallery-swiper', {
  observer: true,
  observerParents: true,
  slidesPerView: 3,
  spaceBetween: 3,
  speed: 800,
  // loop: true,
  centeredSlides: false,
  watchOverflow: true,
  loopAdditionalSlides: 5,
  preloadImages: false,
  parallax: true,
  scrollbar: {
    el: '.swiper-scrollbar',
    draggable: true
  },
  navigation: {
    nextEl: '.gallery-swiper .slider-arrow_next',
    prevEl: '.gallery-swiper .slider-arrow_prev',
  },
  breakpoints: {
    220: {
      slidesPerView: 1,
    },
    479: {
      slidesPerView: 1,
    },
    767: {
      slidesPerView: 2,
    },
    991: {
      slidesPerView: 3,
    },
  }

});

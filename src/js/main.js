
if (window.innerWidth < 1024) {
  openModal();
}
if (window.innerWidth > 1024) {
  findHref();
}
burgerMenu();

function openModal() {
  const itemClick = document.querySelector('.link');
  const itemList = document.querySelector('.collection_list');
  const itemClose = document.querySelector('.back_item');

  itemClick.addEventListener('click', () => {
    itemList.classList.add('list_active');
  });

  itemClose.addEventListener('click', () => {
    itemList.classList.remove('list_active');
  });
}

function burgerMenu() {
  const burger = document.querySelector('.burger_menu');
  const navMenu = document.querySelector('.menu');
  const itemList = document.querySelector('.collection_list');

  burger.addEventListener('click', () => {
    burger.classList.toggle('burger_active');
    navMenu.classList.toggle('menu_active');
    document.body.classList.toggle('body_lock');
    itemList.classList.remove('list_active');
  });
}

function findHref() {
  let menu = document.getElementById('menu');

  if (!menu) {
    return;
  }

  let links = menu.getElementsByTagName('a');
  let url = window.location.href;

  for (let i = 0; i < links.length; i++) {
    if (url === links[i].href) {
      links[i].classList.add('menu_link_active');
      break;
    }
  }
}

var slider = new KeenSlider('#keen-slider', {
  mode: 'free-snap',
  loop: true,
  slides: {
    spacing: 20,
    perView: 1.84,
    origin: 'center',
  },

  breakpoints: {
    '(max-width: 650px)': {
      slides: {
        perView: 1.5,
        spacing: 20,
      },
    },
    '(max-width: 450px)': {
      slides: {
        perView: 1.3,
        spacing: 20,
      },
    },
  },
});

changeBackground();
function changeBackground() {
  const button = document.querySelector('.catalogue_btn');
  const topShadow = document.querySelector('.top_shadow');
  const bottomShadow = document.querySelector('.bottom_shadow');
  const bgBlack = document.querySelector('.catalogue_bg');
  const bgWhite = document.querySelector('.catalogue_bg_white');

  button.addEventListener('mouseenter', () => {
    bottomShadow.classList.add('change_shadow_bot');
    topShadow.classList.add('change_shadow_top');
    bgBlack.classList.add('change_black');
    bgWhite.classList.add('change_white');
  });

  button.addEventListener('mouseleave', () => {
    bottomShadow.classList.remove('change_shadow_bot');
    topShadow.classList.remove('change_shadow_top');
    bgBlack.classList.remove('change_black');
    bgWhite.classList.remove('change_white');
  });
}

new WOW().init();
if (window.innerWidth < 1024) {
  openModal();
}
if (window.innerWidth > 1024) {
  findHref();
}
burgerMenu();
changeBackground();
filter();
openFilter();
initTabs();
countCards();

function openModal() {
  const itemClick = document.querySelector('.link');
  if (!itemClick) {
    return;
  }
  const itemList = document.querySelector('.collection_list');
  const itemClose = document.querySelector('.back_item');

  itemClick.addEventListener('click', () => {
    itemList.classList.add('list_active');
    document.body.classList.add('body_lock');
  });

  itemClose.addEventListener('click', () => {
    itemList.classList.remove('list_active');
    document.body.classList.remove('body_lock');
  });
}

function openFilter() {
  const itemClick = document.querySelector('.filter_title');
  if (!itemClick) {
    return;
  }
  const itemList = document.querySelector('.filters');
  const itemClose = document.querySelectorAll('.back_filter');

  itemClick.addEventListener('click', () => {
    itemList.classList.add('filters_active');
    document.body.classList.add('body_lock');
  });

  itemClose.forEach((item) => {
    item.addEventListener('click', () => {
      itemList.classList.remove('filters_active');
      document.body.classList.remove('body_lock');
    });
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

function changeBackground() {
  const button = document.querySelector('.catalogue_btn');
  if (!button) {
    return;
  }
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

function filter() {
  const checkboxes = document.querySelectorAll('.filter');
  const items = document.querySelectorAll('.item');
  const showAllButton = document.getElementById('showAll');
  if (!showAllButton) {
    return;
  }

  showAllButton.addEventListener('click', function () {
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });

    items.forEach((item) => {
      item.style.display = 'grid';
    });
  });

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', function () {
      if (checkbox.checked && checkbox !== showAllButton) {
        showAllButton.classList.remove('active');
      }

      const selectedFilters = Array.from(checkboxes)
        .filter((c) => c.checked && c !== showAllButton)
        .map((c) => c.value);

      items.forEach((item) => {
        const itemFilters = item.classList;
        item.style.display =
          selectedFilters.length === 0 ||
          selectedFilters.some((filter) => itemFilters.contains(filter))
            ? 'grid'
            : 'none';
      });
    });
  });
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
    '(min-width: 1440px)': {
      slides: {
        perView: 3,
        spacing: 20,
      },
    },
    '(min-width: 1920px)': {
      slides: {
        perView: 4,
        spacing: 20,
      },
    },
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

function initTabs() {
  const faqTabs = document.querySelector('#faqTabs');

  if (!faqTabs) return;

  const tabs = document.querySelectorAll('.title_body'),
    tabsContent = document.querySelectorAll('.tab_content'),
    tabsParent = document.querySelector('.tab_wrapper'),
    closeItem = document.querySelectorAll('.open_status');

  function showTabContent(i = 0) {
    tabsContent[i].classList.toggle('show');
    tabs[i].classList.toggle('tab_active');
    closeItem[i].classList.toggle('open_active');
  }

  tabsParent.addEventListener('click', (event) => {
    const target = event.target;
    if (target && target.classList.contains('title_body')) {
      tabs.forEach((item, i) => {
        if (target == item) {
          showTabContent(i);
        }
      });
    }
  });
}

function countCards() {
  document.addEventListener('DOMContentLoaded', function () {
    const items = document.querySelectorAll('.item');

    // Проходимся циклом по каждому элементу "item"
    items.forEach((item, index) => {
      // Находим все элементы "card" внутри текущего элемента "item"
      const cards = item.querySelectorAll('.card');

      // Находим все элементы "count" внутри всех элементов "filter_name"
      const countElements = document.querySelectorAll(`.filter_name .count`);

      // Записываем количество найденных карточек в соответствующие элементы "count"
      countElements[index].textContent = cards.length;
    });
  });
}

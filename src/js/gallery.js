function ThumbnailPlugin(main) {
  return (slider) => {
    function removeActive() {
      slider.slides.forEach((slide) => {
        slide.classList.remove('active');
      });
    }
    function addActive(idx) {
      slider.slides[idx].classList.add('active');
    }

    function addClickEvents() {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener('click', () => {
          main.moveToIdx(idx);
        });
      });
    }

    slider.on('created', () => {
      addActive(slider.track.details.rel);
      addClickEvents();
      main.on('animationStarted', (main) => {
        removeActive();
        const next = main.animator.targetIdx || 0;
        addActive(main.track.absToRel(next));
        slider.moveToIdx(Math.min(slider.track.details.maxIdx, next));
      });
    });
  };
}

function navigation(slider) {
  let wrapper, dots, arrowLeft, arrowRight;

  function markup(remove) {
    wrapperMarkup(remove);
    dotMarkup(remove);
  }

  // function removeElement(elment) {
  //   elment.parentNode.removeChild(elment);
  // }

  function createDiv(className) {
    var div = document.createElement('div');
    var classNames = className.split(' ');
    classNames.forEach((name) => div.classList.add(name));
    return div;
  }

  function wrapperMarkup(remove) {
    if (remove) {
      var parent = wrapper.parentNode;
      while (wrapper.firstChild)
        parent.insertBefore(wrapper.firstChild, wrapper);
      removeElement(wrapper);
      return;
    }
    wrapper = createDiv('navigation-wrapper');
    slider.container.parentNode.appendChild(wrapper);
    wrapper.appendChild(slider.container);
  }

  function dotMarkup(remove) {
    if (remove) {
      removeElement(dots);
      return;
    }
    dots = createDiv('dots');
    slider.track.details.slides.forEach((_e, idx) => {
      var dot = createDiv('dot');
      dot.addEventListener('click', () => slider.moveToIdx(idx));
      dots.appendChild(dot);
    });
    wrapper.appendChild(dots);
  }

  function updateClasses() {
    var slide = slider.track.details.rel;
    Array.from(dots.children).forEach(function (dot, idx) {
      idx === slide
        ? dot.classList.add('dot--active')
        : dot.classList.remove('dot--active');
    });
  }

  slider.on('created', () => {
    markup();
    updateClasses();
  });
  slider.on('optionsChanged', () => {
    console.log(2);
    markup(true);
    markup();
    updateClasses();
  });
  slider.on('slideChanged', () => {
    updateClasses();
  });
  slider.on('destroyed', () => {
    markup(true);
  });
}

var slider = new KeenSlider(
  '#my-keen-gallery',
  {
    perView: 1,
    breakpoints: {
      '(max-width: 768px)': {
        slides: {
          perView: 2,
          spacing: 20,
        },
      },
      '(max-width: 480px)': {
        slides: {
          perView: 1,
          spacing: 20,
        },
      },
    },
  },
  [navigation],
);
var thumbnails = new KeenSlider(
  '#thumbnails',
  {
    vertical: true,
    slides: {
      perView: 3,
      spacing: 20,
    },
  },
  [ThumbnailPlugin(slider)],
);

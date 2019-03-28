let slider = (function() {
  return function() {
    let
      mainElement = document.querySelector('.slider'),
      sliderWrapper = document.querySelector('.slider_wrapper'),
      sliderItems = document.querySelectorAll('.slider_item'),
      sliderItemsDivide = sliderItems.length / 2,
      controlClick = document.querySelectorAll('.control_click'),
      controlClickRight = document.querySelector('.control_click_right'),
      controlClickLeft = document.querySelector('.control_click_left'),
      step = parseFloat(getComputedStyle(sliderItems[0]).width),
      sliderWrapperWidth = parseFloat(getComputedStyle(sliderWrapper).width),
      positionLeftItem = 0,
      transform = 0,
      items = [],
      counter = 0,
      activeSliderItem = Math.round(sliderWrapperWidth / step);

      // Работаем не со всеми элементами слайдера, а с половиной. Если надо тройной слайдер, то с третью.
      for(let i = 1; i <= sliderItemsDivide; i++) {
        items.push({item: sliderItems[i], position: i, transform: 0});
      }


      var position = {
        getMin: 0,
        getMax: items.length,
      }

      // Если кол-во активных элементов слайдера больше или равно кол-ву элементов массива, стрелок не будет
      if(position.getMax <= activeSliderItem) {
        controlClickRight.classList.add('showNone');
      }

    let transformItem = function(direction) {
      if(direction === 'right') {

        if(items[counter].position > position.getMin) { //не смог обратиться к номеру элемента без счетчика.
          controlClickLeft.classList.remove('showNone');
        }
        if(items[counter].position == position.getMax - activeSliderItem) {
          controlClickRight.classList.add('showNone');
        }

        transform -= step;
        sliderWrapper.style.transform = 'translateX(' + transform + 'px)';
        counter++;

      }
      if(direction === 'left') {
        // console.log('items[counter].position' +' = '+ items[counter].position);
        if(items[counter].position === position.getMin + 2) {
          controlClickLeft.classList.add('showNone');
        }
        if(items[counter].position > position.getMax - activeSliderItem) {
          controlClickRight.classList.remove('showNone');
        }

        transform += step;
        sliderWrapper.style.transform = 'translateX(' + transform + 'px)';
        counter--;
      }
    };

    let getControlClick = function() {
      let direction = this.classList.contains('control_click_right') ? 'right' : 'left';
      transformItem(direction);
    }

    let setUpListener = function() {
      controlClick.forEach(function(item) {
        item.addEventListener('click', getControlClick);
      })
    };
    setUpListener();



  }
}());
slider();

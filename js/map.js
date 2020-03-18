'use strict';

(function () {
  function moveToActive() {
    window.dataMain.mapTemplate.classList.remove('map--faded');
    window.dataMain.adFormTemplate.classList.remove('ad-form--disabled');
    window.activeFields(window.dataMain.adFormTemplate, window.dataMain.mapFormTemplate);
  }

  function popupAdd(pin) {
    var fragmentCard = document.createDocumentFragment();
    var cardItem = window.renderPopup(pin);
    fragmentCard.appendChild(cardItem);
    window.dataMain.mapTemplate.insertBefore(fragmentCard, window.dataMain.mapTemplate.querySelector('.map__filters-container'));
    document.addEventListener('keydown', window.onEscPress);
  }

  function renderPin(singlePin) {
    var pinItem = window.dataMain.pinTemplate.cloneNode(true);

    pinItem.style.left = singlePin.location.x + window.dataMisc.pinOffsetLeft + 'px';
    pinItem.style.top = singlePin.location.y + window.dataMisc.pinOffsetTop + 'px';
    pinItem.querySelector('img').src = singlePin.author.avatar;
    pinItem.querySelector('img').alt = singlePin.offer.title;

    pinItem.addEventListener('click', function () {
      if (!pinItem.matches('.map__pin--main')) {
        if (document.querySelector('.popup')) {
          window.popupRemove();
        }
        popupAdd(singlePin);
      }
    });

    return pinItem;
  }

  function renderMap(amount) {
    moveToActive();
    var fragment = document.createDocumentFragment();
    var pins = window.getPins(amount);
    for (var i = 0; i < pins.length; i++) {
      fragment.appendChild(renderPin(pins[i]));
    }
    window.dataMain.mapPinsTemplate.appendChild(fragment);
  }

  window.active = function (event) {
    if (event.button === window.keys.mouseButton || event.key === window.keys.enter) {
      renderMap(window.dataMisc.amount);
      window.dataMain.mainPinTemplate.removeEventListener('mousedown', window.active);
      window.dataMain.mainPinTemplate.removeEventListener('keydown', window.active);
    }
  };

  window.getPinCord = function (event) {
    if (event.button === window.keys.mouseButton) {
      var pinX = Math.floor(event.pageX + window.dataMisc.pinOffsetLeft / 2);
      var pinY = Math.floor(event.pageY + window.dataMisc.pinOffsetTop / 2);
      window.dataMain.addressField.value = pinX + ', ' + pinY;
      window.dataMain.mainPinTemplate.removeEventListener('mousedown', window.getPinCord);
    }
  };

  window.popupRemove = function () {
    var targetMap = document.querySelector('.map');
    var targetPopup = document.querySelector('.popup');
    targetMap.removeChild(targetPopup);
    document.removeEventListener('keydown', window.onEscPress);
  };
})();

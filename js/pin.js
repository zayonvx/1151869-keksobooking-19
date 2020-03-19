'use strict';

(function () {
  function getLocationX() {
    return window.getRandomInteger(window.dataMisc.locationMinX, window.dataMisc.locationMaxX);
  }

  function getLocationY() {
    return window.getRandomInteger(window.dataMisc.locationMinY, window.dataMisc.locationMaxY);
  }

  function getSinglePin(i) {
    var author = {
      avatar: 'img/avatars/user0' + (i + 1) + '.png'
    };

    var location = {
      x: getLocationX(),
      y: getLocationY(),
    };

    var offer = {
      title: 'Заголовок',
      address: location.x + ', ' + location.y,
      price: window.getRandomInteger(1000, 1000000),
      type: window.getRandomElementArray(window.dataMain.typesObj),
      rooms: window.getRandomInteger(1, 3),
      guests: window.getRandomInteger(1, 3),
      checkin: window.getRandomElementArray(window.dataMain.timesObj),
      checkout: window.getRandomElementArray(window.dataMain.timesObj),
      features: window.setRandomArray(window.dataMain.featuresObj),
      description: 'Описание недвижимости номер ' + (i + 1),
      photos: window.getRandomElementArray(window.dataMain.photosObj),
    };

    var singlePin = {
      author: author,
      offer: offer,
      location: location,
    };

    return singlePin;
  }

  window.getPins = function (amount) {
    var array = [];
    for (var i = 0; i < amount; i++) {
      array[array.length] = getSinglePin(i);
    }
    return array;
  };
})();

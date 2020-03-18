'use strict';

(function () {
  window.getRandomInteger = function (min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  };

  window.getRandomElementArray = function (array) {
    var randomIndex = window.getRandomInteger(0, array.length - 1);
    return array[randomIndex];
  };

  window.setRandomArray = function (array) {
    var items = [];
    var randomAmount = window.getRandomInteger(1, array.length);
    for (var i = 0; i <= randomAmount; i++) {
      items.push(items.length);
    }
    return items;
  };

  window.setDisabled = function (form) {
    var fieldsArray = form.querySelectorAll('fieldset');
    for (var i = 0; i < fieldsArray.length; i++) {
      fieldsArray[i].setAttribute('disabled', '');
    }
  };

  window.setEnabled = function (form) {
    var fieldsArray = form.querySelectorAll('fieldset');
    for (var i = 0; i < fieldsArray.length; i++) {
      fieldsArray[i].removeAttribute('disabled', '');
    }
  };

  window.inactiveFields = function (adFormData, mapFormData) {
    var fieldsSetArray = [adFormData, mapFormData];
    for (var i = 0; i < fieldsSetArray.length; i++) {
      window.setDisabled(fieldsSetArray[i]);
    }
  };

  window.activeFields = function (adFormData, mapFormData) {
    var fieldsSetArray = [adFormData, mapFormData];
    for (var i = 0; i < fieldsSetArray.length; i++) {
      window.setEnabled(fieldsSetArray[i]);
    }
  };

})();

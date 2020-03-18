'use strict';

(function () {

  function setTypeParams(priceData) {
    window.dataMain.priceField.setAttribute('min', priceData);
    window.dataMain.priceField.setAttribute('placeholder', priceData);
  }

  window.setPrice = function (costData) {
    setTypeParams(costData[window.dataMain.typeField.value].price);
  };

  window.setTime = function (timeInData, timeOutData) {
    if (timeInData.value !== timeOutData.value) {
      timeOutData.value = timeInData.value;
    }
  };

  window.validation = function () {
    window.dataMain.roomsField.setCustomValidity('');
    window.dataMain.capacityField.setCustomValidity('');
    if (+window.dataMain.roomsField.value < +window.dataMain.capacityField.value) {
      window.dataMain.roomsField.setCustomValidity('Количество комнат не может быть меньше, чем количество гостей');
      window.dataMain.capacityField.setCustomValidity('Количество комнат не может быть меньше, чем количество гостей');
    }
    if ((+window.dataMain.roomsField.value === 100 && +window.dataMain.capacityField.value !== 0) ||
        (+window.dataMain.roomsField.value !== 100 && +window.dataMain.capacityField.value === 0)) {
      window.dataMain.roomsField.setCustomValidity('Доступно не для гостей');
      window.dataMain.capacityField.setCustomValidity('Доступно не для гостей');
    }
  };


  window.inactiveFields(window.dataMain.adFormTemplate, window.dataMain.mapFormTemplate);

})();

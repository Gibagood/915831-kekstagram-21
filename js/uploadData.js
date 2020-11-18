'use strict';

(function () {
  const URL = `https://21.javascript.pages.academy/kekstagram`;
  const StatusCode = {
    OK: 200
  };
  const TIMEOUT_IN_MS = 10000;


  window.upload = function (data, onSuccess, onError) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      if (xhr.status === StatusCode.OK) {
        window.successHandler();
        onSuccess(xhr.response);
      } else {
        window.errorHandler();
        onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
      }
    });
    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });

    xhr.timeout = TIMEOUT_IN_MS;


    xhr.open(`POST`, URL);
    xhr.send(data);
  };
})();

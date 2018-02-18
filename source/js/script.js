(function () {
  document.body.classList.remove('no-js');
  var menuToggle = document.querySelector('.burger');
  var exampleInputRange = document.querySelector('.example__slider-range');
  var catAfterPhoto = document.querySelector('.example__slide--after');
  var questionnaireForm = document.querySelector('.form form');

  if (questionnaireForm) {
    var questionnaireInputs = questionnaireForm.querySelectorAll('.field-text__input');

    var formInvalidHandler = function (event) {
      event.target.classList.add('field-text__input--invalid');
    };

    var inputChangeHandler = function (event) {
      if (event.target.validity.valid) {
        event.target.classList.remove('field-text__input--invalid');
      };
    };

    questionnaireForm.addEventListener('invalid', formInvalidHandler, true);

    Array.from(questionnaireInputs).forEach(function (input) {
      input.addEventListener('change', inputChangeHandler);
    });
  };

  var showBurgerTarget = function () {
    var targetId = this.dataset.targetId;
    var targetClassToggle = this.dataset.targetClassToggle;
    if (targetId && targetClassToggle) {
      this.classList.toggle('burger--close');
      document.querySelector('#' + targetId).classList.toggle(targetClassToggle);
    }
  };

  menuToggle.addEventListener('click', showBurgerTarget);

  var rangeInoutHandler = function () {
    catAfterPhoto.style.width = this.value + '%';
  };

  if (exampleInputRange !== null) {
    exampleInputRange.addEventListener('input', rangeInoutHandler);
  }

  var map = document.querySelector('.contacts__map');

  if (map !== null) {
    var initMap = function () {
      var map = new google.maps.Map(document.querySelector('.contacts__map'), {
        center: (function () {
          return (window.innerWidth > 1299) ? {lat: 59.938549, lng: 30.320} : {lat: 59.938595, lng: 30.322993};
        }()),
        zoom: 17
      });

      var marker = new google.maps.Marker({
        position: {lat: 59.938595, lng: 30.322993},
        map: map,
        title: 'Мишка',
        icon: {
          url: 'img/map-pin.png',
          scaledSize: (function () {
            return (window.innerWidth > 768) ? new google.maps.Size(113, 106) : new google.maps.Size(60, 53);
          }())
        }
      });
    };
  }
  window.initMap = initMap;
}());

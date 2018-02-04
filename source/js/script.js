document.addEventListener('DOMContentLoaded', function () {
  document.body.classList.remove('no-js');

  var menuToggle = document.querySelector('.burger');
  var exampleInputRange = document.querySelector('.example__slider-range');
  var catAfterPhoto = document.querySelector('.example__slide--after');

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
          return (window.innerWidth > 1299) ? {lat: 59.938549, lng: 30.320} : {lat: 59.938549, lng: 30.322993};
        }()),
        zoom: 17,
        styles: [
          {
            'featureType': 'all',
            'elementType': 'all',
            'stylers': [
              {
                'hue': '#f9f7f2'
              }
            ]
          },
          {
            'featureType': 'all',
            'elementType': 'geometry.fill',
            'stylers': [
              {
                'hue': '#fdf7ef'
              }
            ]
          },
          {
            'featureType': 'all',
            'elementType': 'labels',
            'stylers': [
              {
                'weight': '0.01'
              },
              {
                'hue': '#54a3ad'
              }
            ]
          },
          {
            'featureType': 'administrative',
            'elementType': 'geometry.fill',
            'stylers': [
              {
                'hue': '#fdf7ef'
              }
            ]
          }
        ]
      });

      var marker = new google.maps.Marker({
        position: {lat: 59.938549, lng: 30.322993},
        map: map,
        title: 'Мишка',
        icon: 'img/map-pin.png'
      });
    };
  }
  window.initMap = initMap;
});

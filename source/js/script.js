document.addEventListener('DOMContentLoaded', function () {
  document.body.classList.remove('no-js');

  var menuToggle = document.querySelector('.burger');

  var showBurgerTarget = function () {
    var targetId = this.dataset.targetId;
    var targetClassToggle = this.dataset.targetClassToggle;
    if (targetId && targetClassToggle) {
      this.classList.toggle('burger--close');
      document.querySelector('#' + targetId).classList.toggle(targetClassToggle);
    }
  };

  menuToggle.addEventListener('click', showBurgerTarget);
});

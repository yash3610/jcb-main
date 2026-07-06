(function () {
  var wrapper = document.getElementById("baWrapper");
  var slider = document.getElementById("baSlider");
  var after = document.getElementById("baAfter");

  if (!wrapper || !slider || !after) {
    return;
  }

  var active = false;
  var currentPercent = 50;

  function setPosition(percent) {
    currentPercent = Math.max(4, Math.min(96, percent));
    after.style.clipPath = "inset(0 0 0 " + currentPercent + "%)";
    slider.style.left = currentPercent + "%";
    slider.setAttribute("aria-valuenow", Math.round(currentPercent));
  }

  function moveSlider(clientX) {
    var rect = wrapper.getBoundingClientRect();
    var position = clientX - rect.left;
    setPosition((position / rect.width) * 100);
  }

  slider.addEventListener("mousedown", function () {
    active = true;
  });

  wrapper.addEventListener("mousedown", function (event) {
    active = true;
    moveSlider(event.clientX);
  });

  window.addEventListener("mouseup", function () {
    active = false;
  });

  window.addEventListener("mousemove", function (event) {
    if (active) {
      moveSlider(event.clientX);
    }
  });

  slider.addEventListener("touchstart", function () {
    active = true;
  }, { passive: true });

  wrapper.addEventListener("touchstart", function (event) {
    active = true;
    moveSlider(event.touches[0].clientX);
  }, { passive: true });

  window.addEventListener("touchend", function () {
    active = false;
  });

  window.addEventListener("touchmove", function (event) {
    if (active) {
      moveSlider(event.touches[0].clientX);
    }
  }, { passive: true });

  slider.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
      setPosition(currentPercent - 4);
    }

    if (event.key === "ArrowRight") {
      setPosition(currentPercent + 4);
    }
  });

  setPosition(currentPercent);
})();

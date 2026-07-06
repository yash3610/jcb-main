(function () {
  var includeNodes = document.querySelectorAll("[data-include]");

  includeNodes.forEach(function (node) {
    var file = node.getAttribute("data-include");
    var request = new XMLHttpRequest();

    try {
      request.open("GET", file, false);
      request.send(null);
    } catch (error) {
      return;
    }

    if (request.status === 200 || (request.status === 0 && request.responseText)) {
      node.outerHTML = request.responseText;
    }
  });
})();

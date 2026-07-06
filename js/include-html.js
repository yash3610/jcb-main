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

  var currentPage = window.location.pathname.split("/").pop() || "index.html";
  var navigation = document.querySelector(".main-menu .navigation");

  if (!navigation) {
    return;
  }

  navigation.querySelectorAll("li.current").forEach(function (item) {
    item.classList.remove("current");
  });

  var topItems = Array.prototype.slice.call(navigation.children);

  function getTopLink(item) {
    return Array.prototype.slice.call(item.children).filter(function (child) {
      return child.tagName && child.tagName.toLowerCase() === "a";
    })[0];
  }

  function itemByHref(href) {
    return topItems.filter(function (item) {
      var link = getTopLink(item);
      return link && link.getAttribute("href") === href;
    })[0];
  }

  function itemByLabel(label) {
    return topItems.filter(function (item) {
      var link = getTopLink(item);
      return link && link.textContent.trim().toLowerCase() === label;
    })[0];
  }

  var activeItem;

  if (currentPage === "index.html") {
    activeItem = itemByHref("index.html");
  } else if (currentPage === "page-about.html") {
    activeItem = itemByHref("page-about.html");
  } else if (currentPage === "page-contact.html") {
    activeItem = itemByHref("page-contact.html");
  } else if (currentPage.indexOf("page-service") === 0) {
    activeItem = itemByLabel("services");
  } else if (currentPage.indexOf("news-") === 0) {
    activeItem = itemByLabel("news");
  } else if (currentPage.indexOf("page-") === 0 || currentPage.indexOf("shop-") === 0) {
    activeItem = itemByLabel("pages");
  } else {
    activeItem = itemByHref("index.html");
  }

  if (activeItem) {
    activeItem.classList.add("current");
  }
})();

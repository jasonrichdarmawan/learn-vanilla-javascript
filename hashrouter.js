"use strict";

document.querySelectorAll("[data-go-to-id]").forEach(function (link) {
  link.addEventListener("click", function () {
    const element = document.getElementById(link.dataset.goToId);

    if (!(element instanceof HTMLElement)) {
      throw new ReferenceError(`Unable to found element with id "${goToId}"`);
    }

    window.scroll({
      top: element.getBoundingClientRect().top,
      left: 0,
      behavior: "smooth"
    });
  });
});

function request(onload, method, url) {
  var request = new XMLHttpRequest();
  request.onload = onload;
  request.open(method, url, true);
  request.send();
}

function onLoad() {
  const hash = window.location.hash.slice(1);
  const routerView = document.getElementById("router-view");

  if (hash) {
    function onload() {
      if (this.status >= 200 && this.status < 400) {
        routerView.innerHTML = this.responseText;
      } else {
        routerView.innerHTML = "<h1>404 - Page Not Found </h1>";
      }
    }
    request(onload, 'get', `/${hash}.html`)
  }
}

window.addEventListener("load", onLoad);

function onRouteChanged() {
  const hash = window.location.hash;
  const routerView = document.getElementById("router-view");

  if (!(routerView instanceof HTMLElement)) {
    throw new ReferenceError("No router view element available for rendering");
  }

  switch (hash) {
    case "#home":
      routerView.innerHTML = "<h1>Home page</h1>";
      break;
    case "#about":
      request(function () { routerView.innerHTML = this.responseText }, 'get', '/about.html')
      break;
    default:
      routerView.innerHTML = "<h1>404 - Page Not Found</h1>";
      break;
  }
}

window.addEventListener("hashchange", onRouteChanged);
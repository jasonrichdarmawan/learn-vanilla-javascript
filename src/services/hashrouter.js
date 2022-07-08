import request from "./request.js"

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

(function () {
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
    
    request(onload, 'get', `/pages/${hash}.html`)
  }
})()

function onRouteChanged() {
  const hash = window.location.hash.slice(1);
  const routerView = document.getElementById("router-view");

  if (!(routerView instanceof HTMLElement)) {
    throw new ReferenceError("No router view element available for rendering");
  }

  function onload() {
    if (this.status >= 200 && this.status < 400) {
      routerView.innerHTML = this.responseText;
    } else {
      routerView.innerHTML = "<h1>404 - Page Not Found </h1>";
    }
  }

  request(onload, 'get', `/pages/${hash}.html`)
}

window.addEventListener("hashchange", onRouteChanged);
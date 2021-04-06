MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
let lastRoute = "";

function forceLogin() {
  const modalMng = document.querySelector(".ModalManager");
  document.head.innerHTML +=
    "<style>.modal-dialog{z-index:9999;} .Modal-close{display:none;}</style>";

  setTimeout(_ => {
    let bg = document.createElement("div");
    bg.classList.add("modal-backdrop", "fade", "in");
    document.querySelector(".item-signUp button").click();
    document.querySelector(".modal-backdrop").remove();
    const modalHeader = document.querySelector(".Modal-header");
    let txt = document.createElement("span");
    txt.innerText = "Cadastre-se gratuitamente para continuar navegando";

    txt.style.position = "relative";
    txt.style.display = "block";
    txt.style.textAlign = "center";
    txt.style.margin = "10px";

    modalHeader.append(txt);

    modalMng.append(bg);
  }, 3000);
}

function carregarElementoReact(elemento) {
  return new Promise(resolve => {
    let item = document.querySelector(elemento);
    if (item) resolve(item);

    const config = {
      childList: true,
      subtree: true
    };

    const loadItem = (element, observer) => {
      resolve(element);
      observer.disconnect();
    };

    new MutationObserver((_, observer) => {
      Array.from(document.querySelectorAll(elemento)).forEach(element =>
        loadItem(element, observer)
      );
    }).observe(document.documentElement, config);
  });
}

var observer = new MutationObserver(_ => {
  let currentRoute = location.pathname;
  if (lastRoute != currentRoute) {
    lastRoute = currentRoute;
    if (currentRoute.match(/^\/d\/*/g)) {
      carregarElementoReact(".item-signUp button").then(_ =>
        carregarElementoReact(".ModalManager").then(_ => forceLogin())
      );
    }
  }
});

observer.observe(document, {
  subtree: true,
  childList: true
});

MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
let lastRoute = "";

function initBlockEscInputs() {
  const blockEsc = e => {
    e = e || window.event;
    const keycode = e.which || e.keyCode;
    if (keycode == 27) {
      if (e.preventDefault) e.preventDefault();
      else e.returnValue = false;

      if (e.stopPropagation) e.stopPropagation();
      else e.cancelBubble = true;
      return false;
    }
  };

  const allInputs = document.querySelectorAll(".ModalManager input");
  if (allInputs) allInputs.forEach(input => (input.onkeydown = blockEsc));
}

function forceLogin() {
  const styles = `
  .Modal-close{
    display:none;
  }
  #modal{
    pointer-events: none;
  }
  #modal .Modal-content {
    pointer-events: all;
    overflow-y: overlay;
    max-height: 80vh;
  }
  .modal-open .ModalManager {
      height: 100vh;
  }
  .Modal {
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
  }
  @media (max-width:767px){
    .Modal {
      display: block;
    }
  }
  `;
  document.head.innerHTML += `<style>${styles}</style>`;

  setTimeout(_ => {
    document.querySelector(".item-signUp button").click();
    const modalHeader = document.querySelector(".Modal-header");
    let txt = document.createElement("span");
    txt.innerText = "Cadastre-se gratuitamente para continuar navegando";

    txt.style.position = "relative";
    txt.style.display = "block";
    txt.style.textAlign = "center";
    txt.style.margin = "10px";

    modalHeader.append(txt);
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
  let x = location.pathname.split("/");

  let currentRoute = "";
  x.forEach(part => {
    n = +part;
    if (!n) currentRoute += part != "" ? `/${part}` : "";
  });
  if (currentRoute.match(/^\/d\/*/g))
    carregarElementoReact(".item-signUp button").then(_ =>
      initBlockEscInputs()
    );

  if (lastRoute != currentRoute) {
    lastRoute = currentRoute;
    if (currentRoute.match(/^\/d\/*/g))
      carregarElementoReact(".item-signUp button").then(_ =>
        carregarElementoReact(".ModalManager").then(_ => forceLogin())
      );
  }
});

observer.observe(document, {
  subtree: true,
  childList: true
});

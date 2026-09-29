const routes = {};

export function registerRoute(path, render) {
  routes[path] = render;
}

export function currentPath() {
  const hash = window.location.hash.replace(/^#/, "");
  return hash || "/home";
}

export function startRouter(mount) {
  const render = () => {
    const path = currentPath();
    const fn = routes[path] || routes["/home"];
    mount.innerHTML = "";
    fn(mount);
    setActiveNav(path);
    mount.scrollTo?.(0, 0);
    window.scrollTo(0, 0);
  };
  window.addEventListener("hashchange", render);
  render();
}

function setActiveNav(path) {
  document.querySelectorAll(".nav-link").forEach((el) => {
    el.classList.toggle("active", el.getAttribute("href") === `#${path}`);
  });
}

const routes = {};

// Exact paths ("/home") or prefixes ending in "/" ("/doc/"). A prefix route receives the rest of
// the path as its second argument.
export function registerRoute(path, render) {
  routes[path] = render;
}

export function currentPath() {
  const hash = window.location.hash.replace(/^#/, "");
  return hash || "/home";
}

function resolve(path) {
  if (routes[path]) return { fn: routes[path], rest: "" };
  const prefix = Object.keys(routes)
    .filter((key) => key.endsWith("/") && path.startsWith(key))
    .sort((a, b) => b.length - a.length)[0];
  if (prefix) return { fn: routes[prefix], rest: decodeURIComponent(path.slice(prefix.length)) };
  return { fn: routes["/home"], rest: "" };
}

/** Starts listening for hash changes and returns a function that re-renders the current route. */
export function startRouter(mount) {
  const render = () => {
    const path = currentPath();
    const { fn, rest } = resolve(path);
    mount.innerHTML = "";
    try {
      fn(mount, rest);
    } catch (err) {
      console.error(err);
      mount.innerHTML = `<div class="empty-state"><h3>This page didn't load</h3><p>${String(err?.message || err)}</p></div>`;
    }
    setActiveNav(path);
    mount.scrollTo?.(0, 0);
    window.scrollTo(0, 0);
  };
  window.addEventListener("hashchange", render);
  render();
  return render;
}

// Doc pages (#/doc/discovery/...) highlight the section their file lives in; decks highlight Presentations.
function setActiveNav(path) {
  let section = path;
  if (path.startsWith("/doc/")) section = `/${path.slice(5).split("/")[0]}`;
  else if (path.startsWith("/deck/")) section = "/presentations";
  document.querySelectorAll(".nav-link").forEach((el) => {
    el.classList.toggle("active", el.getAttribute("href") === `#${section}`);
  });
}

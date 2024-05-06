import "regenerator-runtime"; /* for async await transpile */
import "../styles/main.css";
import App from "./views/app";
import swRegister from "./utils/sw-register";

const apps = new App({
  button: document.querySelector("#menu"),
  drawer: document.querySelector("#drawer-nav"),
  content: document.querySelector("#content"),
});

window.addEventListener("hashchange", () => {
  apps.renderPage();
});

window.addEventListener("load", () => {
  apps.renderPage();
  swRegister();
});

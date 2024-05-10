import "regenerator-runtime"; /* for async await transpile */
import "../styles/main.css";
import "../styles/test.css";
import App from "./views/app";
import swRegister from "./utils/sw-register";

const app = new App({
  button: document.querySelector("#menu"),
  drawer: document.querySelector("#drawer-nav"),
  content: document.querySelector("#content"),
});

window.addEventListener("hashchange", () => {
  app.renderPage();
});

window.addEventListener("load", () => {
  app.renderPage();
  swRegister();
});

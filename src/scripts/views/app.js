/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
import DrawerInitiator from "../utils/drawer-init";
import UrlParser from "../routes/url-pars";
import routes from "../routes/routes";

class App {
  constructor({ button, drawer, content }) {
    this._button = button;
    this._drawer = drawer;
    this._content = content;

    this._initialAppShell();
  }

  _initialAppShell() {
    DrawerInitiator.init({
      button: this._button,
      drawer: this._drawer,
      content: this._content,
    });

    this._button.addEventListener(
      "click",
      function (event) {
        this._drawer.classList.toggle("open");
        event.stopPropagation();
        // eslint-disable-next-line comma-dangle
      }.bind(this)
    );
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    this._content.innerHTML = await page.render();
    await page.afterRender();
    const mainContent = document.querySelector("#content");
    const skipLink = document.querySelector(".skip-link");
    const hero = document.querySelector(".jumbotron");
    skipLink.addEventListener("click", (e) => {
      e.preventDefault();
      mainContent.scrollIntoView({ behavior: "smooth" });
      skipLink.blur();
    });
    hero.style.display = url !== "/" ? "none" : "block";
  }
}

export default App;

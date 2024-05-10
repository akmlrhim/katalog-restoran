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

    this._button.addEventListener("click", (event) => {
      this._drawer.classList.toggle("open");
      event.preventDefault();
    });

    const navigationButtons = this._drawer.querySelectorAll(
      // eslint-disable-next-line comma-dangle
      ".nav-item-mobile button"
    );
    navigationButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        const targetUrl = button.dataset.url;
        this.navigateTo(targetUrl);
      });
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    this._content.innerHTML = await page.render();
    await page.afterRender();
    const skipLink = document.querySelector(".skip-link");
    const hero = document.querySelector(".jumbotron");
    skipLink.addEventListener("click", (event) => {
      event.preventDefault();
      document.querySelector("#content").focus();
    });
    if (url !== "/") {
      hero.style.display = "none";
    } else {
      hero.style.display = "block";
    }
  }

  navigateTo(url) {
    const page = routes[url];
    if (page) {
      this._content.innerHTML = page.render();
      page.afterRender();
    } else {
      console.error(`Page not found for URL: ${url}`);
    }
  }
}

export default App;

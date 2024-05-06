const DrawerInit = {
  init({ button, drawer, content }) {
    button.addEventListener("click", (event) => {
      this.toggleDrawer(event, drawer);
    });

    content.addEventListener("click", (event) => {
      this.closeDrawer(event, drawer);
    });
  },

  toggleDrawer(event, drawer) {
    const drawerElement = drawer;
    if (drawerElement.style.maxHeight) {
      drawerElement.style.maxHeight = null;
    } else {
      drawerElement.style.maxHeight = `${drawerElement.scrollHeight}px`;
    }
    event.stopPropagation();
  },

  closeDrawer(event, drawer) {
    const drawerElement = drawer;
    drawerElement.style.maxHeight = null;
    event.stopPropagation();
  },
};

export default DrawerInit;

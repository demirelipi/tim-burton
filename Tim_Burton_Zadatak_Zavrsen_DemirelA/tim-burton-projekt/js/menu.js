"use strict";

const menuToggle = document.getElementById("menuToggle");
const menuCheckbox = document.getElementById("menuCheckbox");
const menu = document.getElementById("menu");

if (menuToggle && menuCheckbox && menu) {
  function syncMenu() {
    menuCheckbox.setAttribute("aria-label", menuCheckbox.checked ? "Zatvori meni" : "Otvori meni");
    menu.inert = !menuCheckbox.checked;
  }

  function closeMenu() {
    menuCheckbox.checked = false;
    syncMenu();
  }

  syncMenu();
  menuCheckbox.addEventListener("change", syncMenu);

  menu.addEventListener("click", function (event) {
    const link = event.target.closest("a");
    if (!link) return;
    closeMenu();
    const target = link.hash ? document.getElementById(link.hash.slice(1)) : null;
    if (target) {
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && menuCheckbox.checked) {
      closeMenu();
      menuCheckbox.focus();
    }
  });

  document.addEventListener("click", function (event) {
    if (!menuToggle.contains(event.target)) closeMenu();
  });

  document.addEventListener("focusin", function (event) {
    if (!menuToggle.contains(event.target)) closeMenu();
  });
}

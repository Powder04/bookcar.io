import * as Data from "./config.js";
import { initTheme } from "./theme.js";
import { initAnimation } from "./animation.js";
import { initCarousel } from "./carousel.js";
import { initForm, showForm, closeForm } from "./form.js";

document.addEventListener("DOMContentLoaded", () => {

  function formatPhoneDisplay(phone) {
    return phone.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3");
  }

  // Chen Site name
  document.querySelectorAll(".owner").forEach((el) => (el.textContent = Data.SITE_NAME));

  // Chen sdt va zalo
  document.querySelectorAll(".phone-vr").forEach((tel) => (tel.href = `tel:${Data.PHONE}`));
  document.querySelector(".zalo-vr").href = `https://zalo.me/${Data.ZALO_PHONE}`;
  document.querySelector(".phone_display").innerHTML = formatPhoneDisplay(Data.PHONE);

  initTheme();
  initAnimation();
  initCarousel();
  initForm();
});

// Onclick show/hiden form booking
window.showForm = showForm;
window.closeForm = closeForm;

"use strict";
window.addEventListener("DOMContentLoaded", () => {
  //tabs

  const tabs = document.querySelectorAll(".tabheader__item");
  const tabContent = document.querySelectorAll(".tabcontent");
  const tabsParent = document.querySelector(".tabheader__items");

  function hideTabContent() {
    tabContent.forEach((item) => {
      item.classList.remove("show", "fade");
      item.classList.add("hide");
    });
    tabs.forEach((tab) => {
      tab.classList.remove("tabheader__item_active");
    });
  }

  function showTabContent(i = 0) {
    tabContent[i].classList.add("show", "fade");
    tabContent[i].classList.remove("hide");
    tabs[i].classList.add("tabheader__item_active");
  }
  hideTabContent();
  showTabContent();

  tabsParent.addEventListener("click", (event) => {
    const target = event.target;
    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((tab, i) => {
        if (tab === target) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

  // timer

  const deadline = "2021-08-15";

  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date());
    const days = Math.floor(t / (1000 * 60 * 60 * 24));
    const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((t / (1000 * 60)) % 60);
    const seconds = Math.floor((t / 1000) % 60);
    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector);
    const days = timer.querySelector("#days");
    const hours = timer.querySelector("#hours");
    const minutes = timer.querySelector("#minutes");
    const seconds = timer.querySelector("#seconds");
    const timeInterval = setInterval(updateClock, 1000);
    updateClock();
    function updateClock() {
      const t = getTimeRemaining(endtime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock(".timer", deadline);

  //modal

  const modalOpen = document.querySelectorAll("[data-modal]");
  const modal = document.querySelector(".modal");
  const modalClose = document.querySelector("[data-close]");

  function openModal() {
    modal.classList.toggle("hide");
    document.body.style.overflow = "hidden";
    clearInterval(modalTimerId);
  }

  function closeModal() {
    modal.classList.toggle("hide");
    document.body.style.overflow = "";
  }

  modalOpen.forEach((btn) => {
    btn.addEventListener("click", openModal);
  });
  modalClose.addEventListener("click", closeModal);

  modal.addEventListener("click", (event) => {
    const target = event.target;
    if (target && target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.code === "Escape" && !modal.classList.contains("hide")) {
      closeModal();
    }
  });

  function openModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight ===
      document.documentElement.scrollHeight
    ) {
      openModal();
    }
    window.removeEventListener("scroll", openModalByScroll);
  }

  const modalTimerId = setTimeout(openModal, 5000);
  window.addEventListener("scroll", openModalByScroll);
});

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


window.addEventListener("DOMContentLoaded", () => {
  //tabs
  const tabs = document.querySelectorAll(".tabheader__item");
  const tabContent = document.querySelectorAll(".tabcontent");
  const tabsParent = document.querySelector(".tabheader__items");

  function hideTabContent() {
    tabContent.forEach(item => {
      item.classList.remove("show", "fade");
      item.classList.add("hide");
    });
    tabs.forEach(tab => {
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
  tabsParent.addEventListener("click", event => {
    const target = event.target;

    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((tab, i) => {
        if (tab === target) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  }); // timer

  const deadline = "2022-01-01";

  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date());
    const days = Math.floor(t / (1000 * 60 * 60 * 24));
    const hours = Math.floor(t / (1000 * 60 * 60) % 24);
    const minutes = Math.floor(t / (1000 * 60) % 60);
    const seconds = Math.floor(t / 1000 % 60);
    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds
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

  setClock(".timer", deadline); //modal

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
    clearInterval(modalTimerId);
  }

  modalOpen.forEach(btn => {
    btn.addEventListener("click", openModal);
  });
  modalClose.addEventListener("click", closeModal);
  modal.addEventListener("click", event => {
    const target = event.target;

    if (target && target === modal) {
      closeModal();
    }
  });
  document.addEventListener("keydown", event => {
    if (event.code === "Escape" && !modal.classList.contains("hide")) {
      closeModal();
    }
  });

  function openModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight === document.documentElement.scrollHeight) {
      openModal();
    }

    window.removeEventListener("scroll", openModalByScroll);
  }

  const modalTimerId = setTimeout(openModal, 5000);
  window.addEventListener("scroll", openModalByScroll);
}); // Menu Cards

const $MENU = document.querySelector(".menu__field .container");
const MENU_DATA = [["vegy", "Фитнес", 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 9], ["elite", "Премиум", "В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!", 21], ["post", "Постное", "Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.", 14]];

class MenuCard {
  constructor(imgName, menuTitle, menuDescr, price) {
    this.imgName = imgName;
    this.menuTitle = menuTitle;
    this.menuDescr = menuDescr;
    this.price = price;
    this.transfer = 27;
    this.changeToUAH();
  }

  changeToUAH() {
    this.price = +this.price * this.transfer;
  }

  render() {
    const MENU_ITEM = `
      <div class="menu__item">
          <img src="img/tabs/${this.imgName}.jpg" alt="${this.imgName}">
          <h3 class="menu__item-subtitle">Меню "${this.menuTitle}"</h3>
          <div class="menu__item-descr">${this.menuDescr}</div>
          <div class="menu__item-divider"></div>
          <div class="menu__item-price">
              <div class="menu__item-cost">Цена:</div>
              <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
          </div>
      </div>
      `;
    return MENU_ITEM;
  }

}

MENU_DATA.forEach(menuItem => {
  const MENU_ITEM = new MenuCard(menuItem[0], menuItem[1], menuItem[2], menuItem[3]);
  $MENU.insertAdjacentHTML("beforeend", MENU_ITEM.render());
  const $FORMS = document.querySelectorAll("form");
  $FORMS.forEach(item => {
    postData(item);
  });
  const MESSAGE = {
    loading: "Loading",
    success: "Thank you. Let's keep in touch",
    failure: "It's gonna blow!!!"
  };

  function postData(form) {
    form.addEventListener("submit", event => {
      event.preventDefault();
      const $STATUS_MESSAGE = document.createElement("div");
      $STATUS_MESSAGE.classList.add("status");
      $STATUS_MESSAGE.textContent = MESSAGE.loading;
      form.append(STATUS_MESSAGE);
      const request = new XMLHttpRequest();
      request.open("POST", "server.php");
      request.setRequestHeader("content-type", "application/json");
      const formData = new FormData(form);
      const object = {};
      formData.forEach((value, key) => {
        object[key] = value;
      });
      const json = JSON.stringify(object);
      request.send(json);
      request.send(formData);
      request.addEventListener("load", () => {
        if (request.status === 200) {
          console.log(request.response);
          $STATUS_MESSAGE.textContent = MESSAGE.success;
          form.reset;
          setTimeout(() => {
            $STATUS_MESSAGE.remove();
          }, 2000);
        } else {
          $STATUS_MESSAGE.textContent = MESSAGE.failure;
        }
      });
    });
  }
});

/***/ })

/******/ });
//# sourceMappingURL=script.js.map
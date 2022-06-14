import "../assets/sass/index.scss";
import burger from "./burger";
import slider from "./slider";
import { getPagination } from "./pagination";

function getApp() {
  const path = (window.location.pathname).split('/');
  if (
    path[path.length - 1] === "index.html" ||
    path[path.length - 1] === ""
  ) {
    slider();
  } else if (path[path.length - 1] === "pets.html") {
    getPagination();
  }
  burger();
};

getApp();
const clockContainer = document.querySelector(".js__clock"),
  clockTitle = document.querySelector(".js__title");

function getTime() {
  const date = new Date();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();
  clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }`;
}

function init() {
  setInterval(getTime, 1000);
}

getTime();
init();

const form_ = document.querySelector(".js__form"),
  input_ = document.querySelector(".js__form input"),
  USER_LS = "currentUser";

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
  } else {
  }
}

function init() {
  loadName();
}

init();

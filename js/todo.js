const todo_form = document.querySelector(".todo__form__js"),
  todo_input = document.querySelector(".todo__input__js"),
  LS_TODO = localStorage.getItem("todoList"),
  todo_ul = document.querySelector("ul"),
  icon_class_names_1 = ["far", "fa-square", "todo__check__js"],
  icon_class_names_2 = ["far", "fa-check-square", "todo__check__js"],
  icon_class_names_3 = ["far", "fa-times-circle", "todo__delete__js"];

let todo_check = document.querySelectorAll(".todo__check__js"),
  todoList = {};

function checkLStodo() {
  if (LS_TODO !== null || LS_TODO !== "{}") {
    todoList = JSON.parse(localStorage.getItem("todoList"));
  }
}

function returnTodoCheck() {
  const todo_check = document.querySelectorAll(".todo__check__js");
  return todo_check;
}

function changeCheckBox(event) {
  const targetElement = event.target;

  if (targetElement.className.includes("fa-square")) {
    targetElement.classList.remove(...icon_class_names_1);
    targetElement.classList.add(...icon_class_names_2);
  } else {
    targetElement.classList.remove(...icon_class_names_2);
    targetElement.classList.add(...icon_class_names_1);
  }
}

function delTodoList(event) {
  const id = event.target.id;
}

function createListHtml() {
  if (LS_TODO !== null || LS_TODO === {}) {
    for (var i = 0; i < Object.keys(todoList).length; i++) {
      const li = document.createElement("li"),
        icon_1 = document.createElement("i"),
        span = document.createElement("span"),
        icon_2 = document.createElement("i");

      li.className = "css__TODO";
      li.id = "todo_list_" + String(i);
      icon_1.classList.add(...icon_class_names_1);
      span.innerText = todoList[i];
      icon_2.classList.add(...icon_class_names_3);
      icon_2.id = `del_btn_${i}`;
      li.appendChild(icon_1);
      li.appendChild(span);
      li.appendChild(icon_2);
      todo_ul.appendChild(li);
    }
  }
}

function getTodo() {
  let todo = "";
  todo = todo_input.value;
  return todo;
}

function deleteElement(id) {
  delete todoList[id];
  localStorage.setItem("todoList", JSON.stringify(todoList));
}

function saveTodoList(event) {
  checkLStodo();
  let result = getTodo();
  event.preventDefault();
  if (Object.keys(todoList).length === 0) {
    todoList[0] = result;
  } else {
    todoList[String(Math.max.apply(null, Object.keys(todoList)) + 1)] = result;
  }
  todo_input.value = "";
  localStorage.setItem("todoList", JSON.stringify(todoList));
}

function init() {
  checkLStodo();
  createListHtml();
  todo_check = returnTodoCheck();
  for (var i = 0; i < todo_check.length; i++) {
    todo_check[i].addEventListener("click", changeCheckBox);
  }
  todo_form.addEventListener("submit", saveTodoList);
}

init();

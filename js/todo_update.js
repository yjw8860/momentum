const todo_form = document.querySelector(".todo__form__js"),
  todo_input = document.querySelector(".todo__input__js");


function updateTodoIcons() {
  todoCheckBoxIcons = document.querySelectorAll(".todo__check__js");
  todoDelBtnIcons = document.querySelectorAll('.todo__delete__js');
}

function changeCheckBox(event) {
  const targetElement = event.target,
  ID = targetElement.id.replace('check_btn_','');

  if (targetElement.className.includes("fa-square")) {
    targetElement.classList.remove(...icon_class_names_1);
    targetElement.classList.add(...icon_class_names_2);
    checkBoxObj[ID] = checkBoxObj[ID].replace("fa-square", 'fa-check-square')
  } else {
    targetElement.classList.remove(...icon_class_names_2);
    targetElement.classList.add(...icon_class_names_1);
    checkBoxObj[ID] = checkBoxObj[ID].replace("fa-check-square", 'fa-square')
  }
  console.log(checkBoxObj[ID]);
  localStorage.setItem('checkBox', JSON.stringify(checkBoxObj));
}

function changeCheckBoxExecute(){
  for (var i = 0; i < todoCheckBoxIcons.length; i++) {
    todoCheckBoxIcons[i].addEventListener("click", changeCheckBox);
  }
}

function checkUl(){
  if(todoCheckBoxIcons.length===0){
    todo_ul.classList.remove('background__ul');
  }else{
    todo_ul.classList.add('background__ul');
  }
}

function delTodoList(event) {
  const id = event.target.id.replace('del_btn_','');
  delete todoList[id];
  delete checkBoxObj[id];
  localStorage.setItem("todoList", JSON.stringify(todoList));
  localStorage.setItem("checkBox", JSON.stringify(checkBoxObj));
  document.querySelector(`#todo_list_${id}`).remove();
  updateTodoIcons();
  checkUl();
}

function delTodoListExecute(){
  for (var i = 0; i < todoDelBtnIcons.length; i++){
    todoDelBtnIcons[i].addEventListener("click", delTodoList);
  }
}

function createListHtml(id){
  const li = document.createElement("li"),
  icon_1 = document.createElement("i"),
  span = document.createElement("span"),
  icon_2 = document.createElement("i");

  li.className = "css__TODO";
  li.id = "todo_list_" + String(id);
  icon_1.id = `check_btn_${id}`
  icon_1.classList.add(...icon_class_names_1);
  span.innerText = todoList[id];
  icon_2.classList.add(...icon_class_names_3);
  icon_2.id = `del_btn_${id}`;
  li.appendChild(icon_1);
  li.appendChild(span);
  li.appendChild(icon_2);
  todo_ul.appendChild(li);
  updateTodoIcons();
  checkUl();
}

function getTodo() {
  let todo = "";
  todo = todo_input.value;
  return todo;
}

function appendCheckBox(id){
  checkBoxObj[id] = "far fa-square todo__check__js"
  localStorage.setItem("checkBox", JSON.stringify(checkBoxObj));
}

function saveTodoList(event) {
  checkLStodo();
  let result = getTodo(),
  id = 0;
  event.preventDefault();
  if (Object.keys(todoList).length === 0) {
    todoList[id] = result;
  } else {
    id = Math.max.apply(null, Object.keys(todoList)) + 1
    todoList[id] = result;
  }
  todo_input.value = "";
  localStorage.setItem("todoList", JSON.stringify(todoList));
  createListHtml(id);
  appendCheckBox(id);
  changeCheckBoxExecute();
  delTodoListExecute();
}

function init() {
  changeCheckBoxExecute();
  todo_form.addEventListener("submit", saveTodoList);
  delTodoListExecute();
}

init();

const LS_TODO = localStorage.getItem("todoList"),
  todo_ul = document.querySelector("ul"),
  icon_class_names_1 = ["far", "fa-square", "todo__check__js"],
  icon_class_names_2 = ["far", "fa-check-square", "todo__check__js"],
  icon_class_names_3 = ["far", "fa-times-circle", "todo__delete__js"],
  body = document.querySelector('body'),
  MIN_NUM = 1,
  MAX_NUM = 3;

let todoCheckBoxIcons = document.querySelectorAll(".todo__check__js"),
todoDelBtnIcons = document.querySelectorAll('.todo__delete__js'),
todoList = {},
checkBoxObj = {};

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //최댓값도 포함, 최솟값도 포함
}

function initBackgroundImg(){
  let num = getRandomIntInclusive(MIN_NUM,MAX_NUM),
  img_path = `url('https://github.com/yjw8860/momentum/blob/master/img/bg_${num}.jpg?raw=true')`
  body.style.backgroundImage = img_path;
}

function checkLStodo() {
  if (LS_TODO !== null) {
    todoList = JSON.parse(localStorage.getItem("todoList"));
  }
}

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
  localStorage.setItem('checkBox', JSON.stringify(checkBoxObj));
}

function delTodoList(event) {
  const id = event.target.id.replace('del_btn_','');
  delete todoList[id];
  delete checkBoxObj[id];
  localStorage.setItem("todoList", JSON.stringify(todoList));
  localStorage.setItem("checkBox", JSON.stringify(checkBoxObj));
  document.querySelector(`#todo_list_${id}`).remove();
  checkUl();
}

function createListHtml(id){
  const li = document.createElement("li"),
  icon_1 = document.createElement("i"),
  span = document.createElement("span"),
  icon_2 = document.createElement("i");

  checkBoxObj = JSON.parse(localStorage.getItem("checkBox"));

  li.className = "css__TODO";
  li.id = "todo_list_" + String(id);
  if(Object.keys(checkBoxObj).length !== 0){
    if(checkBoxObj[id].includes('fa-check-square')){
      icon_1.classList.add(...icon_class_names_2);
    }else{
      icon_1.classList.add(...icon_class_names_1);
    }
  }else{
    icon_1.classList.add(...icon_class_names_1);
  }
  icon_1.id = `check_btn_${id}`
  icon_1.addEventListener("click", changeCheckBox);
  span.innerText = todoList[id];
  icon_2.classList.add(...icon_class_names_3);
  icon_2.id = `del_btn_${id}`;
  icon_2.addEventListener("click", delTodoList);
  li.appendChild(icon_1);
  li.appendChild(span);
  li.appendChild(icon_2);
  todo_ul.appendChild(li);
}

function createWholeListHtml() {
  if (LS_TODO !== null) {
    for (var i = 0; i < Object.keys(todoList).length; i++) {
      createListHtml(Object.keys(todoList)[i]);
    }
  }
  updateTodoIcons();
  initCheckBox();
}

function initCheckBox(){
  let ID = 0;
  if(todoCheckBoxIcons.length===0){
    localStorage.setItem("checkBox", JSON.stringify(checkBoxObj));
    todo_ul.classList.remove('background__ul');
  }else{
    todo_ul.classList.add('background__ul');
    for(var i=0; i<todoCheckBoxIcons.length;i++){
      ID = todoCheckBoxIcons[i].id.replace('check_btn_','');
      let basket = todoCheckBoxIcons[i].classList.value
      checkBoxObj[ID] = basket;
    }
  }
}

function init() {
  initBackgroundImg();
  checkLStodo();
  createWholeListHtml();
}

init();

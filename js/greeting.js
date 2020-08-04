const form_ = document.querySelector(".js__form"),
  input_ = document.querySelector(".js__form input"),
  USER_LS = "currentUser",
  clock_ = document.querySelector('.js__clock'),
  welcome_ = document.querySelector('.welcome'),
  message_ = document.createElement('h1');

function handleInput(event) {
  event.preventDefault();
  const currentValue = input_.value;
  localStorage.setItem(USER_LS, currentValue);
  clock_.classList.add('animation');
  clock_.classList.add('flex-column');
  welcome_.style.display = 'none';
  message_.classList.add('welcome');
  message_.innerText = 'Welcome ' + `${currentValue}`
  clock_.appendChild(message_);
}

function checkUserName(){
  if(localStorage.getItem(USER_LS) === null){
    clock_.style.display = 'none';
  }else{
    welcome_.style.display = 'none';
  }
}

function getUserName(){
  form_.addEventListener("submit",handleInput);
}

checkUserName();
getUserName();
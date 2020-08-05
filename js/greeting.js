const identify = document.querySelector('.identify'),
  welcome_form = document.querySelector(".welcome__js"),
  welcome_input = document.querySelector(".welcome__js input"),
  email_form = document.querySelector('.email__js'),
  email_message = document.querySelector('.email__js h1'),
  email_input = document.querySelector('.email__js input'),
  password_form = document.querySelector('.password__js'),
  password_input = document.querySelector('.password__js input'),
  USER_LS = "currentUser",
  EMAIL_LS = 'email',
  PW_LS = 'password',
  clock_ = document.querySelector('.clock__js'),
  top__row__container = document.querySelector('.top__row__container'),
  greeting_ = document.querySelector('.greeting__js');


function createGreetingMessage() {
  const currentTime = Number(new Date().toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute: "numeric"}).replace(':', ''));
  let message = '';

  if(currentTime >= 600 && currentTime < 1200){
    message = 'Good morning, ' + localStorage.getItem(USER_LS) + '.';
  }else if(currentTime >= 1200 && currentTime < 1800){
    message = 'Good afternoon, ' + localStorage.getItem(USER_LS) + '.';
  }else if(currentTime >= 1800 && currentTime <= 1259){
    message = 'Good evening, '  + localStorage.getItem(USER_LS) + '.';
  }else{
    message = 'What are you doing '  + localStorage.getItem(USER_LS) + '?';
  }

  greeting_.innerText = message;
}

function checkUserName(){
  if(localStorage.getItem(USER_LS) === null || localStorage.getItem(EMAIL_LS) === null || localStorage.getItem(PW_LS) === null ){
    // localstorage에 USERNAME에 대한 정보가 없으면
    clock_.classList.add('invisible');
    top__row__container.classList.add('invisible');
  }else{
    // localstorage에 USERNAME이 있으면
    welcome_form.classList.add('invisible');
  }
}

function getUserName(event) {
  event.preventDefault();
  const currentValue = welcome_input.value;
  localStorage.setItem(USER_LS, currentValue);
  welcome_form.remove();
  email_form.classList.remove('invisible');
  email_message.innerText = "What's your email, " + `${localStorage.getItem(USER_LS)}` + "?";
  email_form.classList.add('fade_in');
}

function getEmail(event){
  event.preventDefault();
  const currentEmail = email_input.value;
  localStorage.setItem(EMAIL_LS, currentEmail);
  email_form.remove();
  password_form.classList.remove('invisible');
  password_form.classList.add('fade_in');
}

function getPassword(event){
  event.preventDefault();
  const currentPW = password_input.value;
  localStorage.setItem(PW_LS, currentPW);
  password_form.remove();
  clock_.classList.remove('invisible');
  top__row__container.classList.remove('invisible');
  top__row__container.classList.add('fade_in');
  clock_.classList.add('fade_in');
  createGreetingMessage();
}


function saveUserName(){
  welcome_form.addEventListener("submit",getUserName);
}

function saveEmail(){
  email_form.addEventListener("submit", getEmail);
}

function savePassword(){
  password_form.addEventListener("submit", getPassword);
}

function init(){
  checkUserName();
  saveUserName();
  saveEmail();
  savePassword();
}

init();


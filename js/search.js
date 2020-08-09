const SEARCH_FORM = document.querySelector('.search__form__js'),
SEARCH_INPUT = document.querySelector('.search__input');

function search(event){
    event.preventDefault();
    url = `https://www.google.com/search?q=${SEARCH_INPUT.value}`
    window.open(url, '_blank');
    SEARCH_INPUT.value = '';
}

function init(){
    SEARCH_FORM.addEventListener("submit", search);
}
init();
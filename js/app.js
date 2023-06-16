document.querySelectorAll('.btn-crypt').forEach(function(btn) {btn.addEventListener('click', startCrypt)});
let methodSelectorElement = document.querySelector('#encryption');

function startCrypt(){
    console.log(methodSelectorElement.value);
}
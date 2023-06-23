document.querySelectorAll('.btn-crypt').forEach(function(btn) {btn.addEventListener('click', startCrypt)});
let methodSelectorElement = document.querySelector('#encryption');

function startCrypt(){
    console.log(methodSelectorElement.value);

    let cipher = document.querySelector('#cipher').value;

    let out = encodeXOR(document.querySelector('#input').value, cipher)

    console.log(out);
    document.querySelector('#output').value = out;
}

/**
 * xor should be one character long
 * @param {String} input 
 * @param {String} xor 
 * @returns {String}
 */
function encodeXOR(input, xor){
    return input.split('').map(function(e){
        return String.fromCharCode(e.charCodeAt(0) ^ xor.charCodeAt(0))
    }).join('');
}
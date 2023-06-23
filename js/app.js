// Element
const inputElement = document.getElementById('input');
const outputElement = document.getElementById('output');

const selectorElement = document.getElementById('methodSelector');
const checkboxElement = document.getElementById('encDec');
const submitElement = document.getElementById('button');
const cipherElement = document.getElementById('cipher');

// Variable
let isDecrypt = false;

// Event Listeners

// Checkbox Listener
checkboxElement.addEventListener('click', function() {
  if (checkboxElement.checked) {
    submitElement.innerHTML = "Entschlüsseln";
    isDecrypt = true;
  } else {
    submitElement.innerHTML = "Verschlüsseln";
    isDecrypt = false;
  }
});

// Submit Listener
submitElement.addEventListener('click', function() {
  if (isDecrypt) {
    decrypt();
  } else {
    encrypt();
  }
});

selectorElement.addEventListener('change', function() {
  // You can add code here if needed
});

// Encryption Function
function encrypt() {
  let result = "";
  let method = selectorElement.value;
  let text = inputElement.value;
  let cipher = cipherElement.value;

  switch (method) {
    case "caesar":
      result = caesarEncrypt(text, cipher);
      break;
    case "xor":
      result = XORencode(text, cipher);
      break;

    default:
      result = "Error";
  }

  // Output
  outputElement.value = result;
}

// Decryption Function
function decrypt() {
  let result = "";
  let method = selectorElement.value;
  let text = inputElement.value;
  let cipher = cipherElement.value;

  switch (method) {
    case "caesar":
      result = caesarDecrypt(text, cipher);
      break;
    case "xor":
      result = XORencode(text, cipher);
      break;

    default:
      result = "Error";
  }

  // Output
  outputElement.value = result;
}

// Caesar Encryption
function caesarEncrypt(input, cipher) {
  let shift = parseInt(cipher);
  let output = "";

  for (let i = 0; i < input.length; i++) {
    let c = input.charCodeAt(i);

    if (c >= 65 && c <= 90) {
      output += String.fromCharCode((c - 65 + shift) % 26 + 65);
    } else if (c >= 97 && c <= 122) {
      output += String.fromCharCode((c - 97 + shift) % 26 + 97);
    } else {
      output += input.charAt(i);
    }
  }

  return output;
}

// Caesar Decryption
function caesarDecrypt(text, cipher) {
  let shift = parseInt(cipher);
  let result = "";

  for (let i = 0; i < text.length; i++) {
    let c = text.charCodeAt(i);

    if (c >= 65 && c <= 90) {
      result += String.fromCharCode((c - 65 - shift + 26) % 26 + 65);
    } else if (c >= 97 && c <= 122) {
      result += String.fromCharCode((c - 97 - shift + 26) % 26 + 97);
    } else {
      result += text.charAt(i);
    }
  }

  return result;
}

/**
 * xor should be one character long
 * @param {String} input 
 * @param {String} xor 
 * @returns {String}
 */
function XORencode(input, xor){
    return input.split('').map(function(e){
        return String.fromCharCode(e.charCodeAt(0) ^ xor.charCodeAt(0))
    }).join('');
}

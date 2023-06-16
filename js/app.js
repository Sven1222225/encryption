// Element
const inputElement = document.getElementById('input');
const outputElement = document.getElementById('output');

const selectorElement = document.getElementById('methodSelector');
const checkboxElement = document.getElementById('encDec');
const submitElement = document.getElementById('button');
const cipherElement = document.getElementById('cipher');

// Variable
let useDecrypt = false;

// Event Listeners

// Checkbox Listener
checkboxElement.addEventListener('click', function() {
  if (checkboxElement.checked) {
    submitElement.innerHTML = "Entschlüsseln";
    useDecrypt = true;
  } else {
    submitElement.innerHTML = "Verschlüsseln";
    useDecrypt = false;
  }
});

// Submit Listener
submitElement.addEventListener('click', function() {
  if (useDecrypt) {
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

  switch (method) {
    case "caesar":
      result = caesarEncrypt(text);
      break;
    // Add more cases here

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

  switch (method) {
    case "caesar":
      result = caesarDecrypt(text);
      break;
    // Add more cases here

    default:
      result = "Error";
  }

  // Output
  outputElement.value = result;
}

// Caesar Encryption
function caesarEncrypt(input) {
  let shift = 3;
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
function caesarDecrypt(text) {
  let shift = 3;
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

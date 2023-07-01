//Elements
const methodSelect = document.getElementById('method');
const inputEncrypt = document.getElementById('input_encrypt');
const inputDecrypt = document.getElementById('input_decrypt');
const outputEncrypt = document.getElementById('output_encrypt');
const outputDecrypt = document.getElementById('output_decrypt');
const encryptButton = document.getElementById('encrypt');
const decryptButton = document.getElementById('decrypt');
const caesarShiftEncryptField = document.getElementById('caesar_shift_encrypt');
const caesarShiftDecryptField = document.getElementById('caesar_shift_decrypt');

//Setup random default values
//generiert en nummer vo -25 bis +25
const random_caesar = Math.floor(Math.random() * 51) - 25;
document.getElementById('caesar_shift_encrypt').value = random_caesar;
document.getElementById('caesar_shift_decrypt').value = random_caesar;

//Event Listeners
methodSelect.addEventListener('change', handleMethod);
encryptButton.addEventListener('click', handleEncrypt);
decryptButton.addEventListener('click', handleDecrypt);
caesarShiftEncryptField.addEventListener('change', event => handleFieldSynchronization(event, caesarShiftDecryptField));
caesarShiftDecryptField.addEventListener('change', event => handleFieldSynchronization(event, caesarShiftEncryptField));

//Handle Methods
function handleMethod() {
    const selectedMethod = methodSelect.value;

    // Get all Elements with a 'name' attribute
    const methodElements = document.querySelectorAll('[name]');

    // Go through each element
    methodElements.forEach(function(element) {
        // if the element is associated with the selected method make it visible
        if (element.getAttribute('name') === selectedMethod) {
            element.classList.remove('hidden');
        }
        //if element is not associated with the selected method hide it
        else {
            element.classList.add('hidden');
        }
    });

    //Clear Outputs
    const encrypt = document.getElementById('output_encrypt');
    const decrypt = document.getElementById('output_decrypt');

    encrypt.value = "";
    decrypt.value = "";
}

//Handle Encrypt
function handleEncrypt() {
    //get Values
    const selectedMethod = methodSelect.value;
    const inputText = document.getElementById('input_encrypt').value;
    const outputField = document.getElementById('output_encrypt');

    let outputText = "";

    //check which method is selected and call the corresponding function
    switch (selectedMethod) {
    
        //Caesar
        case 'caesar':
            outputText = caesarEncrypt(inputText);
            break;

        //Xor
        case 'xor':
            outputText = xorEncrypt(inputText);
            break;

        //Atbash
        case 'atbash':
            outputText = atbashEncrypt(inputText);
            break;
    }

    //set output
    outputField.value = outputText;
}

//Handle Decrypt
function handleDecrypt() {
    //get Values
    const selectedMethod = methodSelect.value;
    const inputText = document.getElementById('input_decrypt').value;
    const outputField = document.getElementById('output_decrypt');

    let outputText = "";

    //check which method is selected and call the corresponding function
    switch (selectedMethod) {
    
        //Caesar
        case 'caesar':
            outputText = caesarDecrypt(inputText);
            break;

        //Xor
        case 'xor':
            outputText = xorDecrypt(inputText);
            break;

        //Atbash
        case 'atbash':
            outputText = atbashDecrypt(inputText);
            break;
    }

    //set output
    outputField.value = outputText;
}

//Handle Field Synchronization
function handleFieldSynchronization(event, fieldToBeSynced) {
    const value = event.currentTarget.value;
    fieldToBeSynced.value = value;
}

// Caesar Encryption
function caesarEncrypt(inputText) {

    //get Parameter
    let shift_parameter = parseInt(document.getElementById('caesar_shift_encrypt').value);

    //handle negative number
    if(shift_parameter < 0){
        shift_parameter = 26 - Math.abs(shift_parameter);
    }

    //initialize output
    let outputText = "";

    for (let i = 0; i < inputText.length; i++) {
        let c = inputText.charCodeAt(i);

        if (c >= 65 && c <= 90) {
            outputText += String.fromCharCode((c - 65 + shift_parameter) % 26 + 65);
        } else if (c >= 97 && c <= 122) {
            outputText += String.fromCharCode((c - 97 + shift_parameter) % 26 + 97);
        } else {
            outputText += inputText.charAt(i);
        }
    }

    return outputText;
}

// Caesar Decryption
function caesarDecrypt(inputText) {

    //get Parameter
    let shift_parameter = parseInt(document.getElementById('caesar_shift_decrypt').value);

    //handle negative number
    if(shift_parameter < 0){
        shift_parameter = 26 - Math.abs(shift_parameter);
    }

    //initialize output
    let outputText = "";

    for (let i = 0; i < inputText.length; i++) {
        let c = inputText.charCodeAt(i);

        if (c >= 65 && c <= 90) {
            outputText += String.fromCharCode((c - 65 - shift_parameter + 26) % 26 + 65);
        } else if (c >= 97 && c <= 122) {
            outputText += String.fromCharCode((c - 97 - shift_parameter + 26) % 26 + 97);
        } else {
            outputText += inputText.charAt(i);
        }
    }

    return outputText;
}

//xor Encrypt
function xorEncrypt(inputText) {

    //get Parameter
    const parameter = document.getElementById('xor_unnamed_encrypt').value;

    //initialize output
    let outputText = "";
    
    outputText = inputText.split('').map(function (e) {
        return String.fromCharCode(e.charCodeAt(0) ^ parameter.charCodeAt(0))
    }).join('');

    return outputText;
}

//xor Decrypt
function xorDecrypt(inputText) {

    //get Parameter
    const parameter = document.getElementById('xor_unnamed_decrypt').value;

    //initialize output
    let outputText = "";

    outputText = inputText.split('').map(function (e) {
        return String.fromCharCode(e.charCodeAt(0) ^ parameter.charCodeAt(0))
    }).join('');

    return outputText;
}

// Atbash Encryption
function atbashEncrypt(inputText) {

    //initialize output
    let outputText = "";

    for (let i = 0; i < inputText.length; i++) {
        let c = inputText.charCodeAt(i);

        if (c >= 65 && c <= 90) {
            // Uppercase letter
            outputText += String.fromCharCode(90 - (c - 65));
        } else if (c >= 97 && c <= 122) {
            // Lowercase letter
            outputText += String.fromCharCode(122 - (c - 97));
        } else {
            // Non-alphabetic character, copy as is
            outputText += inputText.charAt(i);
        }
    }

    return outputText;
}

// Atbash Decryption
function atbashDecrypt(inputText) {

    //initialize output
    let outputText = "";

    for (let i = 0; i < inputText.length; i++) {
        let c = inputText.charCodeAt(i);

        if (c >= 65 && c <= 90) {
            // Uppercase letter
            outputText += String.fromCharCode(90 - (c - 65));
        } else if (c >= 97 && c <= 122) {
            // Lowercase letter
            outputText += String.fromCharCode(122 - (c - 97));
        } else {
            // Non-alphabetic character, copy as is
            outputText += inputText.charAt(i);
        }
    }
    return outputText;
}

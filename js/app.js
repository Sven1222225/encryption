//Selector
let selectedMethod = "";

document.querySelectorAll(".method_item").forEach(function(item) {
    item.addEventListener('click', function(event) {

        // Update the selected value
        selectedMethod = this.getAttribute("data-value");

        // Update the html
        handleMethod();

        // Update the button text
        document.getElementById("method").textContent = this.textContent;
    });
});


//Elements
const inputEncrypt = document.getElementById('input_encrypt');
const inputDecrypt = document.getElementById('input_decrypt');
const outputEncrypt = document.getElementById('output_encrypt');
const outputDecrypt = document.getElementById('output_decrypt');
const encryptButton = document.getElementById('encrypt');
const decryptButton = document.getElementById('decrypt');

//Event Listeners
encryptButton.addEventListener('click', handleEncrypt);
decryptButton.addEventListener('click', handleDecrypt);

//Handle Methods
function handleMethod() {

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
        
        default:
            outputText = inputText;
            break;
    }

    //set output
    outputField.value = outputText;
}

//Handle Decrypt
function handleDecrypt() {
    //get Values
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
        
        default:
            outputText = inputText;
            break;
    }

    //set output
    outputField.value = outputText;
}

// Caesar Encryption
function caesarEncrypt(inputText) {

    //get Parameter
    const shift_parameter = parseInt(document.getElementById('caesar_shift_encrypt').value);

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
    const shift_parameter = parseInt(document.getElementById('caesar_shift_decrypt').value);

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

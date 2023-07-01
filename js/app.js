// Element
const navCaesar = document.getElementById('nav_caesar').addEventListener('click', handleNav);
const navXor = document.getElementById('nav_xor').addEventListener('click', handleNav);
const navAtbash = document.getElementById('nav_atbash').addEventListener('click', handleNav);

const caesarButtonEncrypt = document.getElementById('caesar_button_encrypt').addEventListener('click', caesarEncrypt);
const caesarButtonDecrypt = document.getElementById('caesar_button_decrypt').addEventListener('click', caesarDecrypt);
const xorButtonEncrypt = document.getElementById('xor_button_encrypt').addEventListener('click', xorEncrypt);
const xorButtonDecrypt = document.getElementById('xor_button_decrypt').addEventListener('click', xorDecrypt);
const atbashButtonEncrypt = document.getElementById('atbash_button_encrypt').addEventListener('click', atbashEncrypt);
const atbashButtonDecrypt = document.getElementById('atbash_button_decrypt').addEventListener('click', atbashDecrypt);

//Handle Navigation
function handleNav() {
    const navs = document.querySelectorAll('[id^="nav_"]');
    const sections = document.querySelectorAll('[id^="section_"]');

    navs.forEach(function(nav){
        nav.dataset.state = 'unselected';
    });

    this.dataset.state = 'selected';

    sections.forEach(function(section){
        section.classList.add('hidden');
    });

    const navName = this.id.replace('nav', 'section');
    
    selectedSection = document.getElementById(navName);
    selectedSection.classList.remove('hidden');
}

// Caesar Encryption
function caesarEncrypt() {
    const inputElement = document.getElementById('caesar_input_encrypt');
    const outputElement = document.getElementById('caesar_output_encrypt');
    const cipherElement = document.getElementById('caesar_cipher_encrypt');

    let shift = parseInt(cipherElement.value);
    let input = inputElement.value;
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

    outputElement.value = output;
}

// Caesar Decryption
function caesarDecrypt() {
    const inputElement = document.getElementById('caesar_input_decrypt');
    const outputElement = document.getElementById('caesar_output_decrypt');
    const cipherElement = document.getElementById('caesar_cipher_decrypt');

    let shift = parseInt(cipherElement.value);
    let text = inputElement.value;
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

    outputElement.value = result;
}

//xor Encrypt
function xorEncrypt() {
    const input = document.getElementById('xor_input_encrypt').value;
    const outputElement = document.getElementById('xor_output_encrypt');
    const cipher = document.getElementById('xor_cipher_encrypt').value;
    
    outputElement.value = input.split('').map(function (e) {
        return String.fromCharCode(e.charCodeAt(0) ^ cipher.charCodeAt(0))
    }).join('');
}

//xor Decrypt
function xorDecrypt() {
    const input = document.getElementById('xor_input_decrypt').value;
    const outputElement = document.getElementById('xor_output_decrypt');
    const cipher = document.getElementById('xor_cipher_decrypt').value;

    outputElement.value = input.split('').map(function (e) {
        return String.fromCharCode(e.charCodeAt(0) ^ cipher.charCodeAt(0))
    }).join('');
}

// Atbash Encryption
function atbashEncrypt() {
    const inputElement = document.getElementById('atbash_input_encrypt');
    const outputElement = document.getElementById('atbash_output_encrypt');
    
    let input = inputElement.value;
    let output = "";

    for (let i = 0; i < input.length; i++) {
        let c = input.charCodeAt(i);

        if (c >= 65 && c <= 90) {
            // Uppercase letter
            output += String.fromCharCode(90 - (c - 65));
        } else if (c >= 97 && c <= 122) {
            // Lowercase letter
            output += String.fromCharCode(122 - (c - 97));
        } else {
            // Non-alphabetic character, copy as is
            output += input.charAt(i);
        }
    }

    outputElement.value = output;
}

// Atbash Decryption
function atbashDecrypt() {
    const inputElement = document.getElementById('atbash_input_decrypt');
    const outputElement = document.getElementById('atbash_output_decrypt');
    
    let input = inputElement.value;
    let output = "";

    for (let i = 0; i < input.length; i++) {
        let c = input.charCodeAt(i);

        if (c >= 65 && c <= 90) {
            // Uppercase letter
            output += String.fromCharCode(90 - (c - 65));
        } else if (c >= 97 && c <= 122) {
            // Lowercase letter
            output += String.fromCharCode(122 - (c - 97));
        } else {
            // Non-alphabetic character, copy as is
            output += input.charAt(i);
        }
    }

    outputElement.value = output;
}

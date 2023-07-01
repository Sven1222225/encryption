//Uswhäler
let selectedMethod = "";

document.querySelectorAll(".method_item").forEach(function(item) {
    item.addEventListener('click', function(event) {

        // "selectedMethod" Updäte
        selectedMethod = this.getAttribute("data-value");

        // "active" Klass entärnä
        document.querySelectorAll(".method_item").forEach(function(otherItem) {
            otherItem.classList.remove('active');
        });

        // "active" Klass hinzufüegä zum gwählte Elemänt
        this.classList.add('active');

        // "Html" Updäte
        handleMethod();

        // Knopf Text ändärä
        document.getElementById("method").textContent = this.textContent;
    });
});


//Elemänt
const inputEncrypt = document.getElementById('input_encrypt');
const inputDecrypt = document.getElementById('input_decrypt');
const outputEncrypt = document.getElementById('output_encrypt');
const outputDecrypt = document.getElementById('output_decrypt');
const encryptButton = document.getElementById('encrypt');
const decryptButton = document.getElementById('decrypt');
const container = document.getElementById('container');
const caesarShiftEncryptField = document.getElementById('caesar_shift_encrypt');
const caesarShiftDecryptField = document.getElementById('caesar_shift_decrypt');

//generiert en nummer von -25 bis +25
const random_caesar = Math.floor(Math.random() * 51) - 25;
document.getElementById('caesar_shift_encrypt').value = random_caesar;
document.getElementById('caesar_shift_decrypt').value = random_caesar;

//generiert en nummer von 0 bis 9
const random_xor = Math.floor(Math.random() * 10);
document.getElementById('xor_encrypt').value = random_xor;
document.getElementById('xor_decrypt').value = random_xor;

//Fall Zuälosär
encryptButton.addEventListener('click', handleEncrypt);
decryptButton.addEventListener('click', handleDecrypt);
caesarShiftEncryptField.addEventListener('change', event => handleFieldSynchronization(event, caesarShiftDecryptField));
caesarShiftDecryptField.addEventListener('change', event => handleFieldSynchronization(event, caesarShiftEncryptField));

//Metodä Umgang
function handleMethod() {

    // Alli Elemänt mitm "name" Attribut
    const methodElements = document.querySelectorAll('[name]');

    // Container Anzäigä
    document.getElementById('container').classList.remove('hidden');

    //Dur alli Elemänt duräga
    methodElements.forEach(function(element) {
        //Wänns Element mitm gwählte Methodä verbundä isch, zeigs
        if (element.getAttribute('name') === selectedMethod) {
            element.classList.remove('hidden');
        }
        //Wänn nöd, verstecks
        else {
            element.classList.add('hidden');
        }
    });

    //"Outputs" lärä
    const encrypt = document.getElementById('output_encrypt');
    const decrypt = document.getElementById('output_decrypt');

    encrypt.value = "";
    decrypt.value = "";
}

//Verschlüsslig Umgang
function handleEncrypt() {
    //Wertä holä
    const inputText = document.getElementById('input_encrypt').value;
    const outputField = document.getElementById('output_encrypt');

    let outputText = "";

    //luegä weli Methodä gwählt isch und rüefä drichtig Funktion uf
    switch (selectedMethod) {
    
        //Zäsar
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

    //Text usgäh
    outputField.value = outputText;
}

//Entschlüsslig Umgang
function handleDecrypt() {
    //Wertä holä
    const inputText = document.getElementById('input_decrypt').value;
    const outputField = document.getElementById('output_decrypt');

    let outputText = "";

    //luegä weli Methodä gwählt isch und rüefä drichtig Funktion uf
    switch (selectedMethod) {
    
        //Zäsar
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

    //Text usgäh
    outputField.value = outputText;
}

//mit Fäld synchronisation Umgah
function handleFieldSynchronization(event, fieldToBeSynced) {
    const value = event.currentTarget.value;
    fieldToBeSynced.value = value;
}

//Zäsar Verschlüsslig 
function caesarEncrypt(inputText) {
    //Text validierä
    error = validateCaesar(inputText)

    if(error != null){
        return error;
    }

    //hol Parameter
    let shift_parameter = parseInt(document.getElementById('caesar_shift_encrypt').value);

    //mit negativä Zahlä umgah
    if(shift_parameter < 0){
        shift_parameter = 26 - Math.abs(shift_parameter);
    }

    //"Output" Text erstellä
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

// Zäsar Entschlüsslig
function caesarDecrypt(inputText) {
    //Text validierä
    error = validateCaesar(inputText)

    if(error != null){
        return error;
    }

    //hol Parameter
    let shift_parameter = parseInt(document.getElementById('caesar_shift_decrypt').value);

    //mit negativä Zahlä umgah
    if(shift_parameter < 0){
        shift_parameter = 26 - Math.abs(shift_parameter);
    }

    //"Output" Text erstellä
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

//Xor Verschlüsslig
function xorEncrypt(inputText) {
    //hol Parameter
    const parameter = document.getElementById('xor_encrypt').value;

    //"Output" Text erstellä
    let outputText = "";
    
    //Mer splittet jede charakter ond looped über de. Bi jedem loop machet mer en xor operation am charakter sim code(zahl) met em key(zahl) denn konvertieret mer das ine hex wert.
    //Das met em hex machet mer das mer vermeidet das mer net darstellbari symbohl bechömid.
    outputText = inputText.split('').map(function (e) {
        return (e.charCodeAt(0) ^ parameter.charCodeAt(0)).toString('16');
    }).join('');

    return outputText;
}

//Xor Entschlüsslig
function xorDecrypt(inputText) {
    //validate input text.
    //Mer checked ob de input en hex wert esh idem mer met regex schnell lueget obs nur 0-9 ond a-f charakters het.
    error = validateXorHex(inputText)

    if(error != null){
        return error;
    }

    //hol Parameter
    const parameter = document.getElementById('xor_decrypt').value;

    //"Output" Text erstellä
    let outputText = "";

    //Zerst splittet mer de inputText ines array wo immer 2 charakter zeme sind (oder wenns net uf gaht esh bem letzte 1 charakter). Z.B. ['5e', '3f]
    //denn Looped mer über die liste ond parsed d hex wert in en integer ond de wird met em key sim integer g xor'd.
    //met Join() chlebet mer das ganze weder ine string zeme.
    outputText = inputText.match(/.{1,2}/g).map(function (e) {
        return String.fromCharCode(parseInt(e, 16) ^ parameter.charCodeAt(0))
    }).join('');

    return outputText;
}

//Atbash Verschlüsslig
function atbashEncrypt(inputText) {

    //"Output" Text erstellä
    let outputText = "";

    for (let i = 0; i < inputText.length; i++) {
        let c = inputText.charCodeAt(i);

        if (c >= 65 && c <= 90) {
            //Grosä Buchstabä
            outputText += String.fromCharCode(90 - (c - 65));
        } else if (c >= 97 && c <= 122) {
            //Chlinä Buchstabä
            outputText += String.fromCharCode(122 - (c - 97));
        } else {
            //kopierä wänn nöd Buchstabä 
            outputText += inputText.charAt(i);
        }
    }

    return outputText;
}

//Atbash Entschlüsslig
function atbashDecrypt(inputText) {

    //"Output" Text erstellä
    let outputText = "";

    for (let i = 0; i < inputText.length; i++) {
        let c = inputText.charCodeAt(i);

        if (c >= 65 && c <= 90) {
            //Grosä Buchstabä
            outputText += String.fromCharCode(90 - (c - 65));
        } else if (c >= 97 && c <= 122) {
            //Chlinä Buchstabä
            outputText += String.fromCharCode(122 - (c - 97));
        } else {
            //kopierä wänn nöd Buchstabä
            outputText += inputText.charAt(i);
        }
    }
    return outputText;
}


//Validierigsfunktion
function validateCaesar(text){
    const check = text.match(/[^a-zA-Z\s]/);

    if(check !== null){
        return 'Bitte nur Buchstaben und Leerzeichen!';
    }

    return null;
}

function validateXorHex(text){
    const check = text.match(/[^0-9a-f]/);

    if(check !== null){
        return 'Bitte nur HEX Zahlen!';
    }

    return null;
}
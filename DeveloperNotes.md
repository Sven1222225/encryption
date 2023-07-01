# (Devs only)

if you wanna add a new encryption method, please follow the guide below. otherwise just create the encryption and decryption methods inside ``app.js`` and I will do the rest so it works with the system once you pushed it to the repo. otherwise if you wanna do it yourself, please follow the guide below.

## adding new Encryption methods:

### adding the method

in order to add a new encryption method, you firstly Create the Encryption Method.

to do so add the encryption method inside ``app.js``

Example:

```javascript

// ...rest of Code

// Example Encrypt
function example_encrypt(input, parameter) {

    let output = "";

    //encryption

    return output;
}

// Example Decrypt
function example_decrypt(input, parameter) {

    let output = "";

    //decryption

    return output;
}

```

### making it work with the system

after creating the actual Methods, you need to make them work with the system.

so firstly for your methods make sure that they use ``return`` to return the output. (for consistency reasons it is recommended to use ``outputText`` as the output variable) 

then you have to make sure that the input is a passing Value (for consistency reasons it is recommended to use ``inputText`` as the input variable)

as for the parameters you can call for the needed parameter Values using ``document.getElementById('<name>').value`` (for consistency reasons it is recommended to set parameters at the beginning of the function)
[for parameters themself please go to the html section](#html)

```javascript

// ...rest of Code

// Example Encrypt
function example_encrypt(inputText) {

    const parameter = document.getElementById('parameter').value;

    let outputText = "";

    //encryption

    return outputText;
}

// Example Decrypt
function example_decrypt(inputText) {

    const parameter = document.getElementById('parameter').value;

    let outputText = "";

    //decryption

    return outputText;
}

```

### Html

now we need to configure the html to include the new method.

so firstly we are going to add the new method to the ``<select>`` element so it can be selected.

to do so add a new ``<option>`` element inside the ``<select>`` element. (for consistency reasons it is recommended to use the method name in lowercase for the Value and the method name in the text)

```html

<!-- ...rest of Code -->

<label for="method">Verschlüsselungsmethode</label>
<select id="method" class="">
    <option value="none" selected disabled>--Bitte wählen--</option>
    <!-- Other Methods -->
    <option value="example">Example</option>
</select>

<!-- rest of Code... -->
```

now we are going to add the needed parameters for the method. (if it doesn't need any parameters you can skip this step)

to add parameters we are going to add a new ``<div>`` element inside the Parameter Div, this new Div Element is going to contain the needed input elements. and should have the class ``hidden`` and the name of the div should be the same as what we used for the Value of the ``<option>`` element. (for consistency reasons it is recommended to add ``<h3 class="text-2xl">Parameter:</h3>`` as the first element of the div)

the actuall Parameters themselfs, can be added as needed but the input element should have the id set to the specific parameter name. (for consistency reasons it is recommended to follow this naming scheme: ``<name of Method>_<label>_<encrypt/ decrypt>``)

note: inside the methods, make sure to call for the correct parameters

encrypt Example:

```html
<!-- ...rest of Code -->

<div> <!-- Parameters -->
                            
    <!-- Other Methods -->

    <!-- XOR -->
    <div name="example" class="hidden">
        <h3 class="text-2xl">Parameter:</h3>
        <label for="example_unnamed_encrypt">Unnamed</label>
        <input id="example_unnamed_encrypt" type="text">
    </div>

</div>
<button id="encrypt" class="block bg-teal-400 rounded-xl p-2 select-none">Vertschlüsseln</button>

<!-- rest of Code... -->
```

decrypt Example:

```html
<!-- ...rest of Code -->

<div> <!-- Parameters -->
                            
    <!-- Other Methods -->

    <!-- XOR -->
    <div name="example" class="hidden">
        <h3 class="text-2xl">Parameter:</h3>
        <label for="example_unnamed_decrypt">Unnamed</label>
        <input id="example_unnamed_decrypt" type="text">
    </div>

</div>
<button id="decrypt" class="block bg-teal-400 rounded-xl p-2 select-none">Entschlüsseln</button>

<!-- rest of Code... -->
```

inside the Methods:

example_encrypt:
```javascript
const parameter = document.getElementById('example_unnamed_encrypt').value;
```
example_decrypt:
```javascript
const parameter = document.getElementById('example_unnamed_decrypt').value;
```

### configuring the system

so now the Final Step is to configure the system to include the new method.

for that we only need to modify the ``handleEncrypt()`` and ``handleDecrypt()`` functions.

all we need to do is add a new chase statement for the new method to the Switch Statement.
in where we set outputText to the output of the method with the passing value inputText.

note: the case should be the same as the Value of the ``<option>`` element and the name of parameter div.

```javascript
// ...rest of Code

//Example
case 'example':
    outputText = example_encrypt(inputText);
    break;

//rest of Code...
```

```javascript
// ...rest of Code

//Example
case 'example':
    outputText = example_decrypt(inputText);
    break;

//rest of Code...
```

### Testing

now test the new method and make sure it works as intended.

### Note

I'm not to sure if this guide covers everything, so if it doesn't work because I frogot to mention a step I'm sorry.
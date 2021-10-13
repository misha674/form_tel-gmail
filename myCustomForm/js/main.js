var countryData = window.intlTelInputGlobals.getCountryData(), // получить данные о стране из плагина
    input = document.querySelector("#phone"),
    addressDropdown = document.querySelector("#country"),
    currencyList = document.querySelectorAll("#currency option"),
    errorMsg = document.querySelector("#error-msg"),
    btnSubmit = document.querySelector('.sub-form'),
    validMsg = document.querySelector("#valid-msg");

// здесь индекс соответствует коду ошибки, возвращаемому из getValidationError - см. readmevar
errorMap = [
    "Invalid number",
    "Invalid country code",
    "Too short",
    "Too long",
    "Invalid number",
];

// инициализация плагина
var iti = window.intlTelInput(input, {
    preferredCountries: ["us", "ua", "br"],
    separateDialCode: true, // отображение кода страны возле флага
    // nationalMode: false,
    // initialCountry: "auto", // автоматическоа подставление страны по IP
    // geoIpLookup: function (callback) {  // автоматическоа подставление страны по IP
    //     $.get("https://ipinfo.io", function () {}, "jsonp").always(function (resp) {
    //         var countryCode = resp && resp.country ? resp.country : "us";
    //         callback(countryCode);
    //     });
    // },
    utilsScript: "js/utils.js", // только для форматирования/плейсхолдера и т.д.
});

// заполнить выпадающий список стран
for (var i = 0; i < countryData.length; i++) {
    var country = countryData[i];
    var optionNode = document.createElement("option");
    optionNode.value = country.iso2;
    var textNode = document.createTextNode(country.name);
    optionNode.appendChild(textNode);
    addressDropdown.appendChild(optionNode);
}

// установить его начальное значение
addressDropdown.value = iti.getSelectedCountryData().iso2;

// переключение валюты в зависимости от активной (выбранной) страны
function currencySwitch(country) {
    switch (country) {
        case "ua":
        case "ru":
            currencyList.forEach(function (el) {
                el.value === "UAH" ? (el.selected = true) : "";
            });
            break;
        case "pt":
        case "fr":
        case "ee":
        case "ro":
        case "pl":
        case "de":
        case "br":
            currencyList.forEach(function (el) {
                (el.value === "EUR") ? (el.selected = true) : '';
            });
            break;
        default:
            document.getElementById("currency").options[0].selected = true;
    }
}

// отслеживаем изменения телефонного кода
input.addEventListener("countrychange", function (e) {
    addressDropdown.value = iti.getSelectedCountryData().iso2;
    currencySwitch(addressDropdown.value);
});

// отлслеживаем изменения в выпадающем списке стран
addressDropdown.addEventListener("change", function () {
    iti.setCountry(this.value);
    var activeCountry = iti.defaultCountry; // получение кода активной (выбранной) страны
    currencySwitch(activeCountry);
});

// var reset = function () {
//     input.classList.remove("error");
//     errorMsg.innerHTML = "";
//     errorMsg.classList.add("hide");
//     validMsg.classList.add("hide");
// };


// функция вадлидации для ввода номера телефона. активирует кнопку отправки при успешном вводе номера
function validatAction() {
    if (iti.isValidNumber()) {
        errorMsg.classList.add("hide");
        validMsg.classList.remove("hide");
        btnSubmit.classList.remove("sub-form-disabled")
        btnSubmit.disabled = false;
    } else {
        input.classList.add("error");
        validMsg.classList.add("hide");
        btnSubmit.classList.add("sub-form-disabled")
        btnSubmit.disabled = true;
        var errorCode = iti.getValidationError();
        errorMsg.innerHTML = errorMap[errorCode];
        errorMsg.classList.remove("hide");
    }
}

// запуск функции валидации формы
input.addEventListener("input", validatAction); 
input.addEventListener("change", validatAction);
input.addEventListener("keyup", validatAction);


// on keyup / change flag: reset
// input.addEventListener("change", reset);
// input.addEventListener("keyup", reset);


btnSubmit.addEventListener('click', function () {
    var formData = new FormData(document.querySelector('form'));
    var phone = iti.getNumber(intlTelInputUtils.numberFormat.E164);
    var country = formData.get('country'); 
    var currency = formData.get('currency'); 
    console.log(phone);
    console.log(country);
    console.log(currency);
});
// Step-1 validation

//UI
let nextBtn = document.getElementById("next-btn");
let step1 = document.querySelector(".step-1");
let step2 = document.querySelector(".step-2");
let step3 = document.querySelector(".step-3");
let backBtn = document.querySelector(".back-btn");
let submitBtn = document.getElementById("submit-btn");
let progressBar = document.querySelector(".progress-bar");


nextBtn.addEventListener("click", (e) => {
    // Email validation
    let regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    let email = document.getElementById("inputEmail").value;
    let emailLabel = document.querySelector("label[for=inputEmail]");

    if (email.length === 0) {
        emailLabel.classList.add("is-required");
    } else if (regEmail.test(email) == false) {
        emailLabel.classList.add("is-invalid");
    } else {
        emailLabel.classList.remove("is-required");
        emailLabel.classList.remove("is-invalid");
    }

    let inputPassword = document.getElementById("inputPassword").value;
    let confirmInputPassword = document.getElementById("confirmInputPassword").value;
    let passwordLabel = document.querySelector("label[for=inputPassword]");
    let confirmPasswordLabel = document.querySelector("label[for=confirmInputPassword]");

    // Password validation
    if (inputPassword.length === 0) {
        passwordLabel.classList.add("is-required");
    } else if (inputPassword.length > 0 && inputPassword.length < 6) {
        passwordLabel.classList.add("is-short");
    } else {
        passwordLabel.classList.remove("is-required");
        passwordLabel.classList.remove("is-short");
    };

    // Password match check
    if (inputPassword !== confirmInputPassword) {
        confirmPasswordLabel.classList.add("dont-match");
    } else {
        confirmPasswordLabel.classList.remove("dont-match");
    }

    // Next step check
    if (!emailLabel.classList.contains("is-required") && !emailLabel.classList.contains("is-invalid") && !passwordLabel.classList.contains("is-required") && !passwordLabel.classList.contains("is-short") && !confirmPasswordLabel.classList.contains("dont-match")) {
        step1.classList.add("hidden");
        step2.classList.remove("hidden");
        submitBtn.classList.remove("hidden");
        nextBtn.classList.add("hidden");
        backBtn.classList.remove("hidden");

        progressBar.style.width = "66.66%";
    }
});

// Step-2 validation

//UI
let dayOfBirth = document.getElementById("dayOfBirth");
let monthOfBirth = document.getElementById("monthOfBirth");
let yearOfBirth = document.getElementById("yearOfBirth");
let birthDateLabel = document.getElementById("birthDateLabel");


submitBtn.addEventListener("click", (e) => {
    e.preventDefault;


    // DATE OF BIRTH validation
    function dateOfBirth() {
        return dayOfBirth.value + "." + monthOfBirth.value + "." + yearOfBirth.value;
    }

    let date = dateOfBirth();

    function dateIsValid(userValue) {
        var regexp = /^\d{1,2}\.\d{1,2}\.\d{1,4}$/;
        if (regexp.test(userValue)) {
            let values = userValue.split('.');
            let d = values[0] - 0;
            let m = values[1] - 0;
            let y = values[2] - 0;
            let daysInMonth = 0;

            if (m < 1 || m > 12 || y < 1 || y > 9999) return false
            else {
                if (m == 2) {
                    daysInMonth = ((y % 4) == 0) ? 29 : 28;
                } else if (m == 4 || m == 6 || m == 9 || m == 11) {
                    daysInMonth = 30;
                } else daysInMonth = 31;
                return (d <= daysInMonth);
            }
        } else return false;
    }

    if (dateIsValid(date) === false) {
        birthDateLabel.classList.add("is-invalid");
    } else {
        birthDateLabel.classList.remove("is-invalid");
    };

    // 18 years check
    let day = dayOfBirth.value;
    let month = monthOfBirth.value;
    let year = yearOfBirth.value;
    let age = 18;
    let mydate = new Date();
    mydate.setFullYear(year, month - 1, day);

    let currdate = new Date();
    let setDate = new Date();
    setDate.setFullYear(mydate.getFullYear() + age, month - 1, day);

    if (dateIsValid(date) === true && (currdate - setDate) < 0) {
        birthDateLabel.innerText = "YOU SHOULD BE 18 YEARS OLD";
        birthDateLabel.classList.add("is-red");
    } else {
        birthDateLabel.innerText = "DATE OF BIRTH";
        birthDateLabel.classList.remove("is-red");
        step2.classList.add("hidden");
        step3.classList.remove("hidden");
        document.querySelector(".btn-wrapper").classList.add("hidden");

        progressBar.style.width = "100%";
    };
});

// Back Button

backBtn.addEventListener("click", (e) => {
    step2.classList.add("hidden");
    step1.classList.remove("hidden");
    submitBtn.classList.add("hidden");
    nextBtn.classList.remove("hidden");
    backBtn.classList.add("hidden");

    progressBar.style.width = "33.33%";
});
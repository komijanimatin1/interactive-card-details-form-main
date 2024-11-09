var inputs = document.querySelectorAll('.forms form input');
var submit = document.getElementById('submit');


// When you refreshed your window the values will clean

window.addEventListener('load', () => {
    inputs.forEach((input) => {
        input.value = '';
    })
})

//input limits

document.getElementById('name').addEventListener('input', function () {
    this.value = this.value.replace(/[^a-zA-Z\s]/g, '');
})

var cardNumber = document.getElementById('cardNumber');

cardNumber.addEventListener("input", (event) => {
    if (event.target.value > 16) {
        event.target.value = event.target.value.slice(0, 16);

    }
    if (event.target.value < 0) {
        event.target.value = '';
    }
})

cardNumber.addEventListener('keydown', function (event) {
    if (event.key === "-" || event.key === "e" || event.key === "+") {
        event.preventDefault();

    }
})
var month = document.getElementById('month');
month.addEventListener("input", function () {
    if (this.value > 12 || this.value < 1) {
        this.value = this.value.slice(0, 1);

    }
    if (this.value.length > 2) {
        this.value = this.value.slice(1);
    }
})
var year = document.getElementById('year');


year.addEventListener("input", function (event) {
    if (this.value.length > 4 || this.value < 1) {
        this.value = this.value.slice(0, 4);
    }
    if (this.value < 0) {
        this.value = '';
    }
})

var CVC = document.getElementById('CVC')
CVC.addEventListener("input", function () {
    if (this.value.length > 3) {
        this.value = this.value.slice(0, 3)

    }
    if (this.value < 0) {
        this.value = '';
    }
})

CVC.addEventListener('keydown', function (event) {
    if (event.key === "-" || event.key === "e" || event.key === "+") {
        event.preventDefault();
    }
})

//ERRORS
isComlete = false;
//when client clicked on submit Btn it will show errors
submit.addEventListener('click', function (e) {
    e.preventDefault();
    cardDates.classList.remove('cardError');
    onCardNumber.classList.remove('cardError');
    onCardName.classList.remove('cardError');
    cardCVC.classList.remove('cardError');

    document.querySelectorAll('.error').forEach(error => error.remove());
    inputs.forEach(input => input.classList.remove('errorInput'));
//for blank inputs
    inputs.forEach((input) => {
        if (input.value === '') {
            // e.preventDefault();
            if (!input.nextElementSibling || !input.nextElementSibling.classList.contains('errorInput')) {
                var errorMassage = document.createElement('p');
                errorMassage.innerHTML = "can't be blank *";
                errorMassage.classList.add('error');
                input.insertAdjacentElement('afterend', errorMassage);
                input.classList.add('errorInput');

            }

        }

    })

    //card number errors

    if (cardNumber.value.length < 16 && cardNumber.value.length >= 1) {
        if (!cardNumber.nextElementSibling || !cardNumber.nextElementSibling.classList.contains('error')) {
            var unCompleteError = document.createElement('p');
            unCompleteError.innerHTML = 'Enter the required number *';
            unCompleteError.classList.add('error');
            cardNumber.insertAdjacentElement('afterend', unCompleteError);
            cardNumber.classList.add('errorInput');
            onCardNumber.classList.add('cardError');

        }
    }
    if (cardNumber.value.length === 0) {
        onCardNumber.classList.add('cardError');

    }


    //CVC error
    if (CVC.value.length < 3 && CVC.value.length >= 1) {
        if (!CVC.nextElementSibling || !CVC.nextElementSibling.classList.contains('error')) {
            var unCompleteError = document.createElement('p');
            unCompleteError.innerHTML = 'Insert 3 numbers *';
            unCompleteError.classList.add('error');
            CVC.insertAdjacentElement('afterend', unCompleteError);
            CVC.classList.add('errorInput');
            cardCVC.classList.add('cardError');
        }

    }
    if (CVC.value === '') {
        cardCVC.classList.add('cardError');
    }

    if (year.value.length < 4 && year.value.length >= 1) {

        var unCompleteError = document.createElement('p');
        unCompleteError.innerHTML = 'Insert 4 numbers *';
        unCompleteError.classList.add('error');
        year.insertAdjacentElement('afterend', unCompleteError);
        year.classList.add('errorInput');
    }


    //  month/year error
    if (year.value.length < 4 || month.value.length === 0) {
        cardDates.classList.add('cardError');
        updateCardDate();
    }

    //name of card error
    if (cardName.value === '') {
        onCardName.classList.add('cardError');
    }

    // verify
    if (!isComlete) {
        const errors = document.querySelectorAll('.error');
        isComlete = true;

        if (errors.length === 0) {
            let main = document.querySelector('.main');
            let forms = document.querySelector('.forms form');
            let labels = document.querySelectorAll('.label');
            forms.style.alignItems = 'center';
            let confirmContainer = document.createElement('div');
            confirmContainer.classList.add('confirmContainer')

            //cleaning form
            labels.forEach(item => item.remove());
            inputs.forEach(item => item.remove());

            submit.innerHTML = 'Continue';

            //building confirm massage

            //status massage
            let statusMassage = document.createElement('p');
            statusMassage.innerHTML = " We've added your card details";

            //thanks massage
            let thanks = document.createElement('p');
            thanks.innerHTML = 'THANK YOU !';


            //image
            let confirmCheck = document.createElement('img');
            confirmCheck.src = './images/icon-complete.svg';

            confirmContainer.append(confirmCheck, thanks, statusMassage);
            forms.insertBefore(confirmContainer, submit);
        }
    }

})

//card information

var onCardNumber = document.querySelector('.frontOfCard > P');      //card number on the card

cardNumber.addEventListener('keyup', function () {
    if (this.value.length !== 0) {
        let a = this.value.replace(/(\d{4})(?=\d)/g, '$1 ');
        onCardNumber.innerHTML = a;
    } else {

        onCardNumber.innerHTML = '0000 0000 0000 0000';
    }
})

var cardDates = document.querySelector('.cardDetails p:last-of-type');

month.addEventListener('input', updateCardDate);
year.addEventListener('input', updateCardDate);

function updateCardDate() {

    let monthValue = month.value.padStart(2, '0');
    let yearValue = year.value.length === 4 ? year.value.slice(-2) : "00";
   
    if (monthValue || yearValue) {
        cardDates.innerHTML = `${monthValue}/${yearValue}`;

    } else {
        cardDates.innerHTML = '00/00';
    }
}

var cardName = document.getElementById('name');
var onCardName = document.querySelector('.cardDetails p:first-of-type')

cardName.addEventListener('input', (event) => {
    onCardName.innerHTML = event.target.value;
    if (event.target.value === '') {
        onCardName.innerHTML = 'Jane Appleseed';
    }
})
var cardCVC = document.querySelector('.backOfCard p');
CVC.addEventListener('input', () => {
    cardCVC.innerHTML = CVC.value;
    if (CVC.value === '') {
        cardCVC.innerHTML = '000';
    }
})
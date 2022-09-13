window.addEventListener('DOMContentLoaded', function(event) {

    const formContactUs = document.getElementById('form_contact_us');
    formContactUs.addEventListener("submit", submitFunction);

});

function submitFunction(event) {
    event.preventDefault();

    const formName = document.getElementById('form_name').value;
    const formEmail = document.getElementById('form_email').value;
    const formPhone = document.getElementById('form_phone').value;
    const formMessage = document.getElementById('form_message').value;

    console.log(formName);
    console.log(formEmail);
    console.log(formPhone);
    console.log(formMessage);

    const url = 'https://database.deta.sh/v1/a0wwnrex/contactmessages/items';
    const data = {
        user: formName,
        email: formEmail,
        phone: formPhone,
        message: formMessage
    };
    
    const body = {
        item: data
    };

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'X-API-Key': 'a0wwnrex_JeRhBybn5iFYziStv9d2M6Mchd2b4B4H',
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then(function(response) {
        if(response.ok) {
            return response.json();
        } else {
            throw 'Error in API';
        }
    }).then(function(responseObject) {
        showSuccess(responseObject);
    }).catch(function(errorMessage) {
        showError(errorMessage);
    });
}

function showSuccess(responseObject) {
    const message = 'The form was submitted successfully.';

    const resultMessage = document.getElementById('p_result_message');
    resultMessage.innerHTML = message;

    resultMessage.classList.remove("contact_us_result_message");
    resultMessage.classList.add("contact_us_result_message_success");

    clearForm();
}

function showError(errorMessage) {
    const message = `Error submitting the form, please try again. Error: <b>${errorMessage}</b>`;

    const resultMessage = document.getElementById('p_result_message');
    resultMessage.innerHTML = message;

    resultMessage.classList.remove("contact_us_result_message");
    resultMessage.classList.add("contact_us_result_message_error");
}

function clearForm() {
    const formContactUs = document.getElementById('form_contact_us');
    formContactUs.reset();
}
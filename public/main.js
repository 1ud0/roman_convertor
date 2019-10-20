const convertForm = document.querySelector("#convert-form");
const inputNumber = document.querySelector("#to-convert");
const resultDiv = document.querySelector("#result");

function status(response) {
    if (response.ok) {
        return Promise.resolve(response)
    } else {
        return Promise.reject(new Error(response.statusText))
    }
}

function cleanResults() {
    resultDiv.innerHTML = "";
    resultDiv.className = "result";
}


const handleSubmit = function (event) {
    event.preventDefault();
    cleanResults();
    fetch("/convertor", {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({ number: inputNumber.value })
    }).then(status)
        .then(response => response.json())
        .then(data => {
            resultDiv.innerHTML = `${inputNumber.value} turns into: <span class="roman-number">${data.romanNumber}<span>`;
            resultDiv.classList.add("correct");
            convertForm.reset();
        }).catch(function (err) {
            console.log(err);
            resultDiv.innerHTML = err.message;
            resultDiv.classList.add("invalid");
            convertForm.reset();
        })
};



convertForm.addEventListener("submit", handleSubmit);

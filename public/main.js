const convertForm = document.querySelector("#convert-form");
const inputNumber = document.querySelector("#to-convert");
const resultDiv = document.querySelector("#result");

let sseSource;

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

function closeConnexion() {
    console.log("closing connexion");
    sseSource.removeEventListener('message', handleVisibilityChange);
    sseSource.close();
}

function openConnexion() {
    console.log("opening connexion");
    sseSource = new EventSource('/event-stream');
    sseSource.addEventListener('message', (e) => {
        const messageData = JSON.parse(e.data);
        showResults(messageData);
    });
}

function showResults(result) {
    if (result.error) {
        resultDiv.innerHTML = result.error;
        resultDiv.classList.add("invalid");
    } else {
        resultDiv.innerHTML = `${inputNumber.value} turns into: <span class="roman-number">${result.romanNumber}<span>`;
        resultDiv.classList.add("correct");
    }
    convertForm.reset();
}

function handleSubmit(event) {
    event.preventDefault();
    cleanResults();
    fetch("/convertor", {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({ number: inputNumber.value })
    })
        .then(status)
        .then(() => console.log("data sent to the server successfully"))
        .catch(err => console.log(err));
};

openConnexion();
convertForm.addEventListener("submit", handleSubmit);
window.addEventListener("unload", closeConnexion);

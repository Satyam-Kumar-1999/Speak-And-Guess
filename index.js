const messageEle = document.getElementById("msg");
const randomNumber = getRandomNumber();

window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new window.SpeechRecognition();
recognition.start();

function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

function onSpeak(event) {
    const message = event.results[0][0].transcript;
    writeMessage(message);
    checkNumber(message);
}

function writeMessage(message) {
    messageEle.innerHTML = `
    <div>You said : </div>
    <span class="box">${message}</span>
    `;
}

function checkNumber(message) {
    const number = +message;
    if (Number.isNaN(number)) {
        messageEle.innerHTML += "<div>Ts is not a number </div>";
        return;
    }

    if (number > 100 || number < 1) {
        messageEle.innerHTML += "<div>Guess the number between 1 to 100 </div>";
        return;
    }
    if (number === randomNumber) {
        document.body.innerHTML = `<h2>Congrats ! You have guessed the number  ! <br><br>
        It was ${number} </h2>
        <button class="play-again" id="play-again">Play Again </button>
        `;
    } else if (number > randomNumber) {
        messageEle.innerHTML += "<div> GO LOWER </div>";
    } else {
        messageEle.innerHTML += "<div> GO HIGHER </div>";
    }

}
recognition.addEventListener("result", onSpeak);
recognition.addEventListener("end", () => recognition.start());
document.body.addEventListener("click", (e) => {
    if (e.target.id == "play-again") history.go(0);
});
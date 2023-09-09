document.addEventListener("DOMContentLoaded", (event) => {
  function sendMessage() {
    const userInput = document.getElementById("userInput").value;

    fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userInput: userInput,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("response").innerText = data.generatedText;
      });
  }

  const sendButton = document.querySelector("button");
  sendButton.addEventListener("click", sendMessage);
});

const btn = document.getElementById("copyButton");

btn.addEventListener("click", handleClick);

function handleClick(e) {
  e.preventDefault();
  console.log("hello world");
  const text = document.getElementById("textToCopy");

  //select the text inside the  text area
  text.select();
  text.setSelectionRange(0, 99999); //for mobile devices

  //copy the selected text to the clipboard
  navigator.clipboard
    .writeText(text.value)
    .then(() => {
      alert("Text copied to clipboard");
    })
    .catch((error) => {
      console.log("Error copying text", error);
    });
}





//dit is mijn black en white filter

const toggleModeButton = document.getElementById("toggle-mode");
const currentMode = localStorage.getItem("mode");

if (currentMode === "black-and-white") {
  document.body.classList.add("black-and-white");
}

toggleModeButton.addEventListener("click", () => {
  document.body.classList.toggle("black-and-white");
  if (document.body.classList.contains("black-and-white")) {
    localStorage.setItem("mode", "black-and-white");
  } else {
    localStorage.removeItem("mode");
  }
});

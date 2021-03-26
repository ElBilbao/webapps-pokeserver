function logSubmit(event) {
  let name = pname.value;

  // Validate text fields, else create item
  if (name === "") {
    alert("ERROR: The field is empty, please input a name or ID!");
  } else {
    // Consume API endpoint
    pokeRequest(name.toLowerCase());

    pname.value = "";
    document.getElementById("pname").focus();
  }
  event.preventDefault();
}

const form = document.getElementById("form");
const log = document.getElementById("log");
const pname = document.getElementById("pname");
form.addEventListener("submit", logSubmit);

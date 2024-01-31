// copyrights year
document.getElementById("copyright-year").innerHTML = new Date().getFullYear();

//phone area
fetch("json/CountryCodes.json")
  .then(response => response.json())
  .then(phoneAreasData => {
    let phoneAreaSelect = document.getElementById("phone-area");

    // Create placeholder option for Indonesia
    const placeholderOption = document.createElement("option");
    placeholderOption.value = "62";
    placeholderOption.text = "Indonesia (ID) (+62)";
    phoneAreaSelect.appendChild(placeholderOption);

    // Populate the select element
    phoneAreasData.forEach(phoneArea => {
      let option = document.createElement("option");
      option.value = phoneArea.code;
      option.text = `${phoneArea.name} (${phoneArea.id}) (+${phoneArea.code})`;
      phoneAreaSelect.appendChild(option);
    });

    // Validation and dynamic phone area updates
    let inputPhone = document.querySelector("input[name='phone']");
    let phoneAreaInput = document.getElementById("phone-area-input");

    phoneAreaSelect.addEventListener("change", function() {
      phoneAreaInput.value = this.value;
      let phoneArea = this.value;
      inputPhone.value = inputPhone.value.replace(phoneArea, "");
    });

    // Initial validation (outside fetch promise)
    inputPhone.addEventListener("input", function() {
      this.value = this.value.replace(/\D/g, '');
    });

    // Dynamic phone area updates (inside fetch promise)
    inputPhone.addEventListener("input", function() {
      let phoneArea = phoneAreaSelect.value;
      if (this.value.startsWith(phoneArea)) {
        this.value = this.value.substring(phoneArea.length);
      }
      console.log(phoneArea)
    });
  })
  .catch(error => console.error("Error fetching CountryCodes.json:", error));

// Send to WhatsApp (no changes needed here)
function sendMessage() {
  let phoneNumber = document.getElementById("phone").value;
  let textMessage = document.getElementById("message").value;
  let phoneArea = document.getElementById("phone-area").value;

  window.open(`https://api.whatsapp.com/send/?phone=${phoneArea}${phoneNumber}&text=${textMessage}&type=phone_number&app_absent=0`);
}

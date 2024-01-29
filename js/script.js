// copyrights year
document.getElementById("copyright-year").innerHTML = new Date().getFullYear();

//validation number
const inputPhone = document.querySelector("input[name='phone']");

inputPhone.addEventListener("input", function() {
  this.value = this.value.replace(/\D/g, '');
});

//send to WA
function sendMessage() {
let phoneNumber = document.getElementById("phone").value;
let textMessage = document.getElementById("message").value;

window.open(`https://api.whatsapp.com/send/?phone=62${phoneNumber}&text=${textMessage}&type=phone_number&app_absent=0`);
}

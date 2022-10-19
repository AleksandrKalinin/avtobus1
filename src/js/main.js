var groups = document.getElementById("#groups");
var contacts = document.getElementById("#contacts");
var modal = document.getElementById("#modal");
var modalClose = document.getElementById("#modalClose");
var toggleContacts = document.getElementById("#toggleContacts");
var nestedList = document.getElementById("#nestedList");

groups.addEventListener("click", function(e) {
  e.preventDefault();
  modal.classList.toggle("modal_open");
})

modalClose.addEventListener("click", function(e) {
  e.preventDefault();
  modal.classList.toggle("modal_open");
})



//var append = document.getElementById("append");
contacts.addEventListener("click", function(e) {
  e.preventDefault();
  window.localStorage.clear();
  var contactsList = {
    "Друзья": [
      {
        name: "Фамилия",
        lastname: "Имя",
        surname: "Отчество",
        phone: "+7 (ХХХ) ХХХ - ХХ - ХХ"
      },
      {
        name: "Фамилия",
        lastname: "Имя",
        surname: "Отчество",
        phone: "+7 (ХХХ) ХХХ - ХХ - ХХ"        
      }
    ],
    "Коллеги": [
      {
        name: "Фамилия",
        lastname: "Имя",
        surname: "Отчество",
        phone: "+7 (ХХХ) ХХХ - ХХ - ХХ"
      },
      {
        name: "Фамилия",
        lastname: "Имя",
        surname: "Отчество",
        phone: "+7 (ХХХ) ХХХ - ХХ - ХХ"        
      }
    ]    
  }
  window.localStorage.setItem("contacts", JSON.stringify(contactsList))
})

toggleContacts.addEventListener("click", function(e) {
  nestedList.classList.toggle("nested-list_open")
})

var addGroup = document.getElementById("#addGroup");
var submitGroup = document.getElementById("#submitGroup");
var input = document.getElementById("#input");
var modalForm = document.getElementById("#modalForm");


addGroup.addEventListener("click", function(e) {
  e.preventDefault();
  modalForm.classList.add("modal-form_visible");
})

submitGroup.addEventListener("click", function() {
  var value = input.value;
  alert(value); 
})
var groups = document.getElementById("#groups");
var submitContact = document.getElementById("#submitContact");
var addContact = document.getElementById("#addContact");
var modalGroups = document.getElementById("#modalGroups");
var modalContacts = document.getElementById("#modalContacts");
var modalClose = document.getElementById("#modalClose");
var toggleContacts = document.getElementById("#toggleContacts");
let toggleButtons = document.getElementsByClassName('contacts-header__icon');

//var nestedList = document.getElementById("#nestedList");

groups.addEventListener("click", function(e) {
  e.preventDefault();
  modalGroups.classList.toggle("modal_open");
})

modalClose.addEventListener("click", function(e) {
  e.preventDefault();
  modalGroups.classList.toggle("modal_open");
})


let reset = document.getElementById("#reset");

reset.addEventListener("click", function(e) {
  e.preventDefault();
  window.localStorage.clear();
  var contactsList = {
    "Друзья": [
      {
        name: "Фамилия Имя Отчество",
        phone: "+7 (ХХХ) ХХХ - ХХ - ХХ",
        id: "id3f4efeaae6f99"
      },
      {
        name: "Фамилия Имя Отчество",
        phone: "+7 (ХХХ) ХХХ - ХХ - ХХ",
         id: "id5f4efebbe6f99"        
      }
    ],
    "Коллеги": [
      {
        name: "Фамилия Имя Отчество",
        phone: "+7 (ХХХ) ХХХ - ХХ - ХХ",
         id: "id6a3eddbbe6f98"
      },
      {
        name: "Фамилия Имя Отчество",
        phone: "+7 (ХХХ) ХХХ - ХХ - ХХ",
        id: "id6a5effcce6798"        
      }
    ],
    "Пустой": []    
  }
  window.localStorage.setItem("contacts", JSON.stringify(contactsList))
})


for (var i = 0; i < toggleButtons.length; i++) {
  toggleButtons[i].addEventListener("click", function(e) {
    //nestedList.classList.toggle("nested-list_open");
  })
}

var addGroup = document.getElementById("#addGroup");
var submitGroup = document.getElementById("#submitGroup");
var submitContact = document.getElementById("#submitContact");
var inputGroup = document.getElementById("#inputGroup");
var modalGroups = document.getElementById("#modalGroups");
var modalContacts = document.getElementById("#modalContacts");
var modalForm = document.getElementById("#modalForm"); 

addGroup.addEventListener("click", function(e) {
  e.preventDefault();
  modalForm.classList.add("modal-form_visible");
})

submitGroup.addEventListener("click", function(e) {
  e.preventDefault();
  let name = inputGroup.value;
  var storage = window.localStorage.getItem("contacts");
  var contacts = JSON.parse(storage);
  var keys = Object.keys(contacts);
  if (keys.includes(name)) {
    alert("Key already exists!");
  } else if(name === "") {
    alert("Cannot be empty!");
  } else {
    contacts[name] = [];
  }
  window.localStorage.setItem("contacts", JSON.stringify(contacts));
  inputGroup.value = "";
  modalForm.classList.remove("modal-form_visible");
  location.reload(); 
})

addContact.addEventListener("click", function(e) {
  e.preventDefault();
  modalContacts.classList.toggle("modal_open");
})

submitContact.addEventListener("click", function(e) {
  e.preventDefault();
  var inputName = document.getElementById("#inputName").value;
  var inputPhone = document.getElementById("#inputPhone").value;
  var selectGroup = document.getElementById("#selectGroup").value;
  if (selectGroup.length !== 0 && inputName.length !== 0 && inputPhone.length !== 0 ) {
    var storage = window.localStorage.getItem("contacts");
    var contacts = JSON.parse(storage);
    var keys = Object.keys(contacts);
    var id = "id" + Math.random().toString(16).slice(2)
    let newItem = {
      name: inputName,
      phone: inputPhone,
      id: id
    };    
    if (keys.includes(selectGroup)) {
      let arr = contacts[selectGroup];
      arr.push(newItem);
      contacts[selectGroup] = arr;
    } else {
      let arr = [];
      arr.push(newItem);
      contacts[selectGroup] = arr
    }
    window.localStorage.setItem("contacts", JSON.stringify(contacts));
    inputName = "";
    inputGroup = "";
    inputPhone = "";
    location.reload();    
  } else {
    alert("Заполните все поля!");
  }
})

window.onload = function() {
  renderList();
  renderGroups();
  renderOptions();
}

function renderList() {
  var contactsList = document.getElementById("#contactsList");
  var storage = window.localStorage.getItem("contacts");
  var contacts = JSON.parse(storage);
  var keys = Object.keys(contacts);
  for (var i = 0; i < keys.length; i++) {
    let name = keys[i];
    let values = contacts[name];
    let listItem = document.createElement("li");
    listItem.classList.add("main-list__item", "contacts-header", "contacts-item");  
    let nestedList = document.createElement("ul");
    nestedList.classList.add("contact-item__nested", "nested-list");
    nestedList.setAttribute("id", "#nestedList");    
    let wrap = document.createElement("div");
    wrap.classList.add("contacts-header__wrapper");
    wrap.setAttribute("id", "#toggleItem");
    wrap.addEventListener("click", function() {
      listItem.classList.toggle("contacts-item_active");
      nestedList.classList.toggle("nested-list_open");
    })    
    let text = document.createElement("span");
    text.classList.add("contacts-header__text");
    text.innerText = name;
    let icon = document.createElement("span");
    icon.classList.add("contacts-header__icon");
    icon.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.5" clip-path="url(#clip0_1894_90)"><path d="M16.885 8.29504L12.295 12.875L7.70498 8.29504L6.29498 9.70504L12.295 15.705L18.295 9.70504L16.885 8.29504Z" fill="black"/></g><defs><clipPath id="clip0_1894_90"><rect width="24" height="24" fill="white"/></></defs></svg>';
    listItem.appendChild(wrap);
    listItem.appendChild(nestedList);
    wrap.appendChild(text);
    wrap.appendChild(icon);
    contactsList.appendChild(listItem);
    for (var j = 0; j < values.length; j++) {
      let nestedItem = document.createElement("li");
      nestedItem.classList.add("nested-list__item", "nested-item");
      nestedItem.setAttribute("data-value", values[j].id);
      let nestedTxt = document.createElement("p");
      nestedTxt.classList.add("nested-item__text");
      let nestedName = document.createElement("span");
      nestedName.classList.add("nested-item__name");
      let nestedPhone = document.createElement("span");
      nestedPhone.classList.add("nested-item__phone");
      let nestedIcons = document.createElement("div");
      nestedIcons.classList.add("nested-item__icons", "nested-icons");
      let iconEdit = document.createElement("span"); 
      let iconDelete = document.createElement("span"); 
      iconEdit.classList.add("nested-icons__item","nested-icon", "nested-icon_blue");
      iconEdit.addEventListener("click", function() {
        let id = values[j].id;
        console.log(id);
      })
      iconDelete.classList.add("nested-icons__item","nested-icon", "nested-icon_red");
      iconEdit.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_3901_1643)"><path opacity="0.3" d="M3 17.2501V21.0001H6.75L17.81 9.94006L14.06 6.19006L3 17.2501ZM20.71 7.04006C21.1 6.65006 21.1 6.02006 20.71 5.63006L18.37 3.29006C17.98 2.90006 17.35 2.90006 16.96 3.29006L15.13 5.12006L18.88 8.87006L20.71 7.04006Z" fill="black"/></g><defs><clipPath id="clip0_3901_1643"><rect width="24" height="24" fill="white"/></clipPath></defs></svg>';
      iconDelete.innerHTML = '<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_3901_100)"><path opacity="0.3" d="M6.66664 20.3889C6.66664 21.55 7.61664 22.5 8.77775 22.5H17.2222C18.3833 22.5 19.3333 21.55 19.3333 20.3889V7.72222H6.66664V20.3889ZM9.26331 12.8733L10.7516 11.385L13 13.6228L15.2378 11.385L16.7261 12.8733L14.4883 15.1111L16.7261 17.3489L15.2378 18.8372L13 16.5994L10.7622 18.8372L9.27386 17.3489L11.5116 15.1111L9.26331 12.8733ZM16.6944 4.55556L15.6389 3.5H10.3611L9.30553 4.55556H5.61108V6.66667H20.3889V4.55556H16.6944Z" fill="black"/></g><defs><clipPath id="clip0_3901_100"><rect width="25.3333" height="25.3333" fill="white" transform="translate(0.333313 0.333344)"/></clipPath></defs></svg>';
      nestedName.innerText = values[j].name;
      nestedPhone.innerText = values[j].phone;  

      nestedIcons.appendChild(iconEdit);
      nestedIcons.appendChild(iconDelete);
      nestedTxt.appendChild(nestedName);
      nestedTxt.appendChild(nestedPhone);
      nestedItem.appendChild(nestedTxt);
      nestedItem.appendChild(nestedIcons); 
      nestedList.appendChild(nestedItem);
    }
  }
}

function renderGroups() {
  let groupsList = document.getElementById("#groupsList");
  let modalItem = document.getElementById("#modalItem");

  var storage = window.localStorage.getItem("contacts");
  var contacts = JSON.parse(storage);
  var keys = Object.keys(contacts);  
  for (var i = 0; i < keys.length; i++) {
    let item = document.createElement("li");
    item.classList.add("modal-list__item", "modal-item");
    item.setAttribute("data-name", keys[i]);
    let text = document.createElement("p");
    text.classList.add("modal-item__text");
    text.innerText = keys[i];
    let icon = document.createElement("div");
    icon.classList.add("modal-item__button");
    icon.innerHTML = '<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_3901_100)"><path opacity="0.3" d="M6.66664 20.3889C6.66664 21.55 7.61664 22.5 8.77775 22.5H17.2222C18.3833 22.5 19.3333 21.55 19.3333 20.3889V7.72222H6.66664V20.3889ZM9.26331 12.8733L10.7516 11.385L13 13.6228L15.2378 11.385L16.7261 12.8733L14.4883 15.1111L16.7261 17.3489L15.2378 18.8372L13 16.5994L10.7622 18.8372L9.27386 17.3489L11.5116 15.1111L9.26331 12.8733ZM16.6944 4.55556L15.6389 3.5H10.3611L9.30553 4.55556H5.61108V6.66667H20.3889V4.55556H16.6944Z" fill="black"/></g><defs><clipPath id="clip0_3901_100"><rect width="25.3333" height="25.3333" fill="white" transform="translate(0.333313 0.333344)"/></clipPath></defs></svg>';
    icon.addEventListener("click", function() {
      deleteItem(text.innerText);
    });
    item.appendChild(text);
    item.appendChild(icon);

    groupsList.insertBefore(item, modalItem);
  }
}

function deleteItem(name) {
  var storage = window.localStorage.getItem("contacts");
  var contacts = JSON.parse(storage);
  delete contacts[name];
  window.localStorage.setItem("contacts", JSON.stringify(contacts));
  location.reload();
}

function addContact() {

}

function renderOptions() {
  let selectGroup = document.getElementById("#selectGroup");
  var storage = window.localStorage.getItem("contacts");
  var contacts = JSON.parse(storage);
  let keys = Object.keys(contacts);
  for (var i = 0; i < keys.length; i++) {
    let option = document.createElement("option");
    option.text = keys[i];
    option.setAttribute("value", keys[i]);
    selectGroup.appendChild(option);      
  }  
}


let inputPhone = document.getElementById("#inputPhone");

inputPhone.addEventListener("input", function() {
  this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
})


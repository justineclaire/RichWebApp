const table = document.querySelector('table');
const form = document.querySelector('form');
//class for new contact
class Contact {
    constructor(name, number, email) {
        this.name = name;
        this.number = number;
        this.email = email;
        this.id = Contact.incrementId();
    }

    static incrementId() {
        if (!this.latestId) this.latestId = 1;
        else this.latestId++;
        return this.latestId;
    }
    
}

//Show alert message
function showAlertMessage(message, alertClass){
    const alertDiv = document.createElement('div');
    const titleinput = document.getElementById('nameInput');
    alertDiv.className = `message ${alertClass}`;
    alertDiv.appendChild(document.createTextNode(message));
    form.insertAdjacentElement('beforebegin', alertDiv);
    titleinput.focus();
    setTimeout(() => { alertDiv.remove(); }, 2000);
}

//get notes from storage
function getContacts() {
    let contacts;
    if (localStorage.getItem('phoneApp.contacts') === null){
        contacts = [];
    } else {
        contacts = JSON.parse(localStorage.getItem('phoneApp.contacts'));
    }
    return contacts;
    console.log(contacts);
}

//add note to storage
function addContacttoStorage(contact) {
    const contacts = getContacts();
    contacts.push(contact);
    localStorage.setItem('phoneApp.contacts', JSON.stringify(contacts));
}


// create note for user
function addContacttoList(contact){
    const newContact = document.createElement('tr');
    newContact.classList.add('contact');
    newContact.innerHTML = `
        <span hidden>${contact.id}</span>
        <td class='name'>${contact.name}</td>
        <td class='number'>${contact.number}</td>
        <td class='email'>${contact.email}</td>
    `;
    table.appendChild(newContact);
}

//show notes to user
function displayContacts() {
    const contacts = getContacts();
    contacts.forEach(contact => {
        addContacttoList(contact);
    })
}

document.addEventListener('DOMContentLoaded', displayContacts);

//event submit form
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.querySelector('#nameInput');
    const numberInput = document.querySelector('#numberInput');
    const emailInput = document.querySelector('#emailInput');
    var validMail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+$/;
    var validName = /^[a-zA-Z\s]+$/;  

    //validate inputs
    if(nameInput.value.length <= 20 && nameInput.value.match(validName)){
        if(!isNaN(numberInput.value) && numberInput.value.length === 10) {
            if(emailInput.value.match(validMail) && emailInput.value.length < 40){

                const newContact = new Contact(nameInput.value, numberInput.value, emailInput.value);
                addContacttoList(newContact);
                addContacttoStorage(newContact);
                emailInput.value = '';
                numberInput.value = '';
                nameInput.value = '';
                showAlertMessage('Contact successfully added', 'success-message');
                nameInput.focus();
            }else {
                showAlertMessage('Invalid email', 'alert-message');
            }//end email validation if statement
        }else {
            showAlertMessage('Number should only be 10 numerical digits', 'alert-message');
        }//end number validation if statement
  } else {
    showAlertMessage('Name should be less than 20 characters and only contain letters and spaces', 'alert-message');
  }//end name validation if
});

//filter contacts by number
function searchContact() {
    var input, filter, trs, td, i, txtValue, noMatch;
    input = document.getElementById("searchInput");
    filter = String(input.value);
    trs = table.getElementsByTagName("tr");

    noMatch = 1;
    for (i = 0; i < trs.length; i++) {
      td = trs[i].getElementsByTagName("td")[1];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.indexOf(filter) > -1) {
          trs[i].style.display = "";
          noMatch = 0;
        } else {
          trs[i].style.display = "none";
        }
      }       
    }
    if(noMatch == 1){
        const alertDiv = document.createElement('div');
        alertDiv.className = `message alert-message`;
        alertDiv.appendChild(document.createTextNode('No Results'));
        table.insertAdjacentElement('beforebegin', alertDiv);
        setTimeout(() => { alertDiv.remove(); }, 2000);
    }

}

function sortTable() {
    var rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      rows = table.getElementsByTagName("tr");
      /* Loop through all table rows (except the
      first, which contains table headers): */
      for (i = 1; i < (rows.length - 1); i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
        x = rows[i].getElementsByTagName("td")[0];
        y = rows[i + 1].getElementsByTagName("td")[0];
        /* Check if the two rows should switch place,
        based on the direction, asc or desc: */
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        // Each time a switch is done, increase this count by 1:
        switchcount ++;
      } else {
        /* If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again. */
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }
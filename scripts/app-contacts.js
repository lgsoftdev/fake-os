import {
    firstNameCtl,
    controlsArr,
    contactMsg 
} from './mod-doc-objects.js';

import { 
    setDisplay, 
    focusOnControlClick, 
    hideMessageOnKeyDown, 
    clearForm,
    appendNewChildToParent     
} from './mod-utility.js';

const contactForm = document.querySelector('#modalContactForm');
const contactsTable = document.querySelector('#modalContactTable');
const tableBody = document.querySelector('#modalContactTableBody');

const contactsStorage = 'contacts';

setDisplay(contactsTable, 'none');
setDisplay(contactMsg, 'none');

// added code to focus on controls to enable to write text input inside modal
focusOnControlClick(controlsArr);
// important on subsequent form fields entry after a successful submit
hideMessageOnKeyDown(controlsArr, contactMsg);

document.querySelector('#modalContactClear').addEventListener('click', () => {
    clearForm(controlsArr, firstNameCtl);
    setDisplay(contactMsg, 'none');
});

document.querySelector('#modalContactForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);

    let currentContacts = [];
    if (window.sessionStorage.getItem(contactsStorage)) {
        //Assign existing contacts to var currentContacts
        currentContacts = JSON.parse(window.sessionStorage.getItem(contactsStorage));
    }
    //Store new contact together with existing contacts.
    currentContacts.push(Array.from(formData));
    window.sessionStorage.setItem(contactsStorage, JSON.stringify(currentContacts));

    clearForm(controlsArr, firstNameCtl);
    setDisplay(contactMsg, 'block');
});

document.querySelector('#modalContactView').addEventListener('click', () => {
    setDisplay(contactForm, 'none');
    setDisplay(contactsTable, 'block')
    displayContacts();
});

const displayContacts = () => {
    tableBody.replaceChildren('');
    let currentContacts = [];

    if (window.sessionStorage.getItem(contactsStorage)) {
        currentContacts = JSON.parse(window.sessionStorage.getItem(contactsStorage));
    }

    if (currentContacts.length > 0) {
        currentContacts.forEach( element => {
            const info = String(element).split(',');
            const trCtl = document.createElement('tr');
            info.forEach((detail, index) => {               
                if (index % 2 > 0){                   
                    appendNewChildToParent('td', detail, trCtl);
                } 
            });
            tableBody.appendChild(trCtl);
        });
    }
}

document.querySelector('#modalContactNew').addEventListener('click', () => {
    tableBody.replaceChildren('');
    setDisplay(contactsTable, 'none');
    setDisplay(contactForm, 'block');
    clearForm(controlsArr, firstNameCtl)
    setDisplay(contactMsg, 'none');
});

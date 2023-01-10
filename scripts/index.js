import { postCtl,
    postItMsg,
    controlsArr, 
    firstNameCtl,
    contactMsg 
} from "./mod-doc-objects.js";
import { clearForm, 
    setDisplay,
    setVisibility 
} from "./mod-utility.js";
import dragElement from "./mod-drag-element.js";

const photos = ['img_coding.jpg', 'img_coffee.jpg', 'img_dancing.jpg', 'img_food.jpg', 'img_sewing.jpg', 'img_singing.jpg'];

const nonAppItems = ['Power', 'Settings', 'Pictures', 'Documents', 'User', 'Start'];

const startMenu = document.querySelector('.startmenu');
const appButtons = document.querySelectorAll('.btn-app');
const closeButtons = document.querySelectorAll('.btn-close');
const exitButtons = document.querySelectorAll('.btn-exit');

const notifyLabel = document.querySelector('.notification');
const notifyIcon = document.querySelector('#notify');

const dateDisplay = document.querySelector('.date-display');
const dateTimeText = document.querySelector('.datetime');

const locale = 'en-au';

// make the modal windows draggagle:
dragElement(document.getElementById('modalContact'));
dragElement(document.getElementById('modalPhoto'));
dragElement(document.getElementById('modalPostIt'));

setDisplay(notifyLabel, 'none');
setDisplay(dateDisplay, 'none');

document.querySelector('#iconWin10').addEventListener("click", () => {
    // visibility is an empty string onload
    if (startMenu.style.visibility === 'hidden' || startMenu.style.visibility === ''){
        setVisibility(startMenu, 'visible');
    } else{
        setVisibility(startMenu, 'hidden');
    }

    nonAppItems.forEach(item => {
        setDisplay(document.querySelector(`#lbl${item}`), 'none');
    });
});

nonAppItems.forEach(item => {
    document.querySelector(`#btn${item}`).addEventListener('mouseover', () => {
        showNonAppLabels(nonAppItems);
    });
});

nonAppItems.forEach(item => {
    document.querySelector(`#btn${item}`).addEventListener('mouseout', () => {
        showNonAppLabels(nonAppItems, false);
    });
});

const showNonAppLabels = (array, show = true) => {
    let displayValue = 'none';
    const nonAppMenu =  document.querySelector('.startmenu-power')
    
    if (show) {
        displayValue = 'block';
        nonAppMenu.classList.add('nonappitems-show');
    } else {
        nonAppMenu.classList.remove('nonappitems-show');
    }
    array.forEach(item => {
        setDisplay(document.querySelector(`#lbl${item}`), displayValue);
    });
}

appButtons.forEach( item => {     
    item.addEventListener('click', () => { 
        const modalId = `modal${(item.id).split('-')[1]}`;
        // show modal
        document.querySelector(`#${modalId}`).style.display = 'block'; 
        if (modalId === 'modalPhoto') {
            // populate modal content with images
            buildCarousel('#photoSlide', document.querySelector('.carousel-indicators'), document.querySelector('.carousel-inner'), photos);
        } else if (modalId === 'modalPostIt') {
            clearForm([postCtl], postCtl);
            setDisplay(postItMsg, 'none');
        } else {
            clearForm(controlsArr, firstNameCtl);
            setDisplay(contactMsg, 'none');
        }
    });
});

const buildCarousel = (targetId, indicatorParentCtl, innerParentCtl, array) => {
    indicatorParentCtl.replaceChildren('');
    innerParentCtl.replaceChildren('');

    array.forEach((element,index) => {
        const btnCtl = document.createElement('button');
        btnCtl.setAttribute('type', 'button');
        btnCtl.setAttribute('data-bs-target', targetId);
        btnCtl.setAttribute('data-bs-slide-to', `${index}`);
        if(index === 0) btnCtl.setAttribute('class', 'active');
        indicatorParentCtl.appendChild(btnCtl);

        const imgCtl = document.createElement('img');
        imgCtl.setAttribute('src', `./images/${element}`);
        imgCtl.setAttribute('alt', `${element}`);;
        const divCtl = document.createElement('div');
        divCtl.setAttribute('class', 'carousel-item');
        if(index === 0) divCtl.classList.add('active');
        divCtl.appendChild(imgCtl);
        innerParentCtl.appendChild(divCtl);
    }); 
}

// event listener to close modal
closeButtons.forEach( btn => closeModal(btn));

exitButtons.forEach( btn => closeModal(btn));

// this function does not work if it is changed to arrow syntax
function closeModal(control) {
    control.addEventListener('click', () => { 
        const modalId = (control.name).replace('Close', '');
        setDisplay(document.querySelector(`#${modalId}`), 'none');
    });
}

notifyIcon.addEventListener('mouseover', () => {
    setDisplay(notifyLabel, 'block');
}); 
notifyIcon.addEventListener('mouseout', () => {
    setDisplay(notifyLabel, 'none');
});

const today = new Date();
document.querySelector('.datetime').children[0].innerHTML = today.toLocaleTimeString(locale, {hour: 'numeric', minute: '2-digit'});
document.querySelector('.datetime').children[1].innerHTML = today.toLocaleDateString();

document.querySelector('#dateLabel').innerText = today.toLocaleDateString(locale, {weekday: 'long', day: "numeric", month: "long", year: "numeric"});

dateTimeText.addEventListener('mouseover', () => {
    setDisplay(dateDisplay, 'block');
}); 
dateTimeText.addEventListener('mouseout', () => {
    setDisplay(dateDisplay, 'none');
});

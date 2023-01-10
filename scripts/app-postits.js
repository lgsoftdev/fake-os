import { postCtl, postItMsg } from "./mod-doc-objects.js";
import { 
    clearForm, 
    setDisplay, 
    focusOnControlClick,
    hideMessageOnKeyDown
 } from "./mod-utility.js";

const backgrounds = ['lightyellow', 'lightpink', 'lightblue', 'lightgreen', 'lightgrey'];
const delimiter = '#@#';
const postItsStorage = 'postits';
const postItForm = document.querySelector('#modalPostItForm');
const postIts = document.querySelector('#modalPostIts');

setDisplay(postItMsg, 'none');

// added code to focus on control to enable to write text input inside modal
focusOnControlClick([postCtl]);
// important on subsequent form fields entry after a successful submit
hideMessageOnKeyDown([postCtl], postItMsg);

document.querySelector('#modalPostItClear').addEventListener('click', () => {
    clearForm([postCtl], postCtl);
    setDisplay(postItMsg, 'none');
});

document.querySelector('#modalPostItNew').addEventListener('click', () => {
    postIts.replaceChildren('');
    postIts.classList.remove('flex-row');
    setDisplay(postItForm, 'block');
    clearForm([postCtl], postCtl);
    setDisplay(postItMsg, 'none');
});

postItForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(postItForm);
    for(const entry of formData.entries()){
        // replace comma because JSON parse delimits with a comma
        formData.set(entry[0], entry[1].replaceAll(',', delimiter));
    }
    let currentPostIts = [];
    if (window.sessionStorage.getItem(postItsStorage)) {
        //Assign existing posts to var currentPostIts
        currentPostIts = JSON.parse(window.sessionStorage.getItem(postItsStorage));
    }
    //Store new post together with existing posts.
    currentPostIts.push(Array.from(formData));
    window.sessionStorage.setItem(postItsStorage, JSON.stringify(currentPostIts));

    clearForm([postCtl], postCtl);
    setDisplay(postItMsg, 'block');
});

document.querySelector('#modalPostItView').addEventListener('click', () => {
    setDisplay(postItForm, 'none');
    postIts.classList.add('flex-row');
    displayPostIts();
});

const displayPostIts = () => {
    postIts.replaceChildren('');
    let currentPostIts = [];

    if (window.sessionStorage.getItem(postItsStorage)) {
        currentPostIts = JSON.parse(window.sessionStorage.getItem(postItsStorage));
    }

    if (currentPostIts.length > 0) {
        currentPostIts.forEach( (element, idx) => {
            const info = String(element).split(',');
            info.forEach((detail, index) => {               
                if (index % 2 > 0){                   
                    const divCtl = document.createElement('div');
                    const bg = idx % 5;
                    divCtl.style.backgroundColor = backgrounds[bg]
                    divCtl.style.width = '180px';
                    divCtl.style.height = '180px';
                    divCtl.classList.add('p-3');
                    divCtl.classList.add('m-3');
                    divCtl.classList.add('border');
                    divCtl.classList.add('rounded-3');
                    const content = document.createTextNode(detail.replaceAll(delimiter, ','));
                    divCtl.appendChild(content);
                    postIts.appendChild(divCtl);
                } 
            });
        });
    }
}


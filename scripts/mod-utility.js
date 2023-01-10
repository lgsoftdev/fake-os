export const setVisibility = (element, value) => {
    element.style.visibility = value;
}

export const setDisplay = (element, value) => {
    element.style.display = value;
}

export const focusOnControlClick = (array) => {
    array.forEach(control => {
        control.addEventListener('click', () => {
            control.focus();
        });
    });
} 

export const hideMessageOnKeyDown = (array, msgCtl) => {
    array.forEach(control => {
        control.addEventListener('keydown', () => {
            setDisplay(msgCtl, 'none');
        });
    });
} 

export const clearForm = (array, ctlOnFocus = undefined) => {
    array.forEach(control => {
        control.value = '';
    });
    
    if (ctlOnFocus != undefined){
        ctlOnFocus.focus();
    }
}

export const appendNewChildToParent = (element, text, parent) => {
    const child = document.createElement(element);
    const content = document.createTextNode(text);
    child.appendChild(content);
    parent.appendChild(child);
}
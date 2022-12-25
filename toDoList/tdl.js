let inp = document.getElementById('tdl');
window.addEventListener('load', () => inp.focus());

const section = document.getElementById('show');

const addBtn = document.getElementById('Add');

addBtn.addEventListener('click', add);

//for set empty object in first load in local storage
if (localStorage.getItem('tdl') === null) {
    let workObject = {};
    localStorage.setItem('tdl', JSON.stringify(workObject))
    localStorage.setItem('indextdl', 0);
}

function add() {
    if (inp.value === '') {
        alert('First Enter a work!');
        inp.focus();
    }
    else {
        const divElement = document.createElement('div');

        const newInput = document.createElement('input');
        newInput.setAttribute('type', 'checkbox');

        //store input value in new div element
        const newtext = document.createTextNode(inp.value);

        //add work in differenet key and value in local storage as a object
        let indextdl = localStorage.getItem('indextdl')
        workObject = JSON.parse(localStorage.getItem('tdl'));

        workObject[`${indextdl}a`] = inp.value;

        //add id to new element
        divElement.setAttribute('id', `${indextdl}a`);

        indextdl++;
        localStorage.setItem('indextdl', indextdl);

        localStorage.setItem('tdl', JSON.stringify(workObject));

        divElement.appendChild(newInput);
        divElement.appendChild(newtext);

        divElement.style.fontFamily = "'Roboto Mono', monospace";

        //set delete feature
        const deleteItem = document.createElement('button');
        deleteItem.innerHTML = 'delete';
        deleteItem.setAttribute('class', 'delete');

        divElement.appendChild(deleteItem);

        //set edit feature
        const editItem = document.createElement('button');
        editItem.innerHTML = 'edit';
        editItem.setAttribute('class', 'edit');

        divElement.appendChild(editItem);

        //set div element on the page :
        section.appendChild(divElement);

        inp.value = '';

        newInput.addEventListener('change', completed);

        deleteItem.addEventListener('click', trash);

        editItem.addEventListener('click', editText);
    }
}

function completed(event) {
    let divElement = event.target.parentNode;

    if (localStorage.getItem('comtdl') === null) {
        let workObject2 = {};
        localStorage.setItem('comtdl', JSON.stringify(workObject2))
    }
    //add an item to comtdl localstorge
    let comIndexTdl = divElement.id;
    comIndexTdl = String(comIndexTdl);
    let workObject2 = JSON.parse(localStorage.getItem('comtdl'));

    //add compeleted item value to comtdl in locastroge 
    workObject2[comIndexTdl] = divElement.firstElementChild.nextSibling.nodeValue;

    //set id to new element 
    divElement.setAttribute('id', comIndexTdl);

    localStorage.setItem('comtdl', JSON.stringify(workObject2));

    //delete item from tdl local storage from its id :
    const workObject = JSON.parse(localStorage.getItem('tdl'));
    delete workObject[comIndexTdl];
    localStorage.setItem('tdl', JSON.stringify(workObject));

    divElement.remove();

    divElement.setAttribute("class", "overline");
    //set compeleted item in compteletd box in html page
    const complete = document.getElementById('completed');
    complete.appendChild(divElement);

    //for return after click on inpute check box
    divElement.firstElementChild.addEventListener('change', returns);
}

//make a new div element and add to tdl local storage and remove from completed list and comtdl local storge :
function returns(event) {
    const divElement = document.createElement('div');

    const newInput = document.createElement('input');
    newInput.setAttribute('type', 'checkbox');

    //here event.target is out checkbox button in div element
    const newtext = document.createTextNode(event.target.nextSibling.nodeValue);

    //add work in differenet key and value in local storage as a object
    let idItem = event.target.parentNode.id;
    idItem = String(idItem);
    let workObject = JSON.parse(localStorage.getItem('tdl'));

    workObject[idItem] = event.target.parentNode.firstElementChild.nextSibling.nodeValue;
    //add id to new element
    divElement.setAttribute('id', idItem);

    localStorage.setItem('tdl', JSON.stringify(workObject));

    //delete item from comtdl local storge
    const workObject2 = JSON.parse(localStorage.getItem('comtdl'));
    delete workObject2[idItem];
    localStorage.setItem('comtdl', JSON.stringify(workObject2));

    divElement.appendChild(newInput);
    divElement.appendChild(newtext);

    divElement.style.fontFamily = "'Roboto Mono', monospace";

    //remove elemetn from compeleted list :
    let element = event.target.parentNode;
    element.remove();

    //set delete feature
    const deleteItem = document.createElement('button');
    deleteItem.innerHTML = 'delete';
    deleteItem.setAttribute('class', 'delete');

    divElement.appendChild(deleteItem);

    //set delete feature
    const editItem = document.createElement('button');
    editItem.innerHTML = 'edit';
    editItem.setAttribute('class', 'edit');

    divElement.appendChild(editItem);

    //set div element on the page :
    section.appendChild(divElement);

    newInput.addEventListener('change', completed);

    deleteItem.addEventListener('click', trash);

    editItem.addEventListener('click', editText);
}

function trash(event) {
    let conf = confirm('You want delete this item?');
    if (conf) {
        //delete an item from local storage from its id :
        const id = event.target.parentNode.id;
        const workObject = JSON.parse(localStorage.getItem('tdl'));
        const workObject2 = JSON.parse(localStorage.getItem('comtdl'));

        //check that remove item from tdl or comtdl localstorage :
        let flag = false;
        for (let index in workObject) {
            if (id === index) {
                flag = true;
            }
        }
        if (flag) {
            delete workObject[id];
            localStorage.setItem('tdl', JSON.stringify(workObject));
        }
        else {
            delete workObject2[id];
            localStorage.setItem('comtdl', JSON.stringify(workObject2));
        }

        //delete an item from html page
        let element = event.target.parentNode;
        element.remove();
    }
}

function editText(event) {
    const editBtn = document.getElementById('Edit');

    //for hide edit button in edit mode
    const editButton = event.target.parentNode.lastElementChild;
    editButton.classList.add("display");

    //replace Edit instead of Add 
    addBtn.setAttribute('class', 'display');
    editBtn.removeAttribute('class', 'display');

    //show text in input text box:
    inp.value = event.target.parentNode.firstElementChild.nextSibling.nodeValue;
    inp.focus();

    editBtn.addEventListener('click', () => {
        event.target.parentNode.firstElementChild.nextSibling.nodeValue = inp.value;
        //update edited item in local storge with last id 
        const id = event.target.parentNode.id;
        const workObject = JSON.parse(localStorage.getItem('tdl'));
        const workObject2 = JSON.parse(localStorage.getItem('comtdl'));

        //check that edit item from tdl or comtdl localstorage :
        let flag = false;
        for (let index in workObject) {
            if (id === index) {
                flag = true;
            }
        }
        if (flag) {
            workObject[id] = inp.value;
            localStorage.setItem('tdl', JSON.stringify(workObject));
        }
        else {
            workObject2[id] = inp.value;
            localStorage.setItem('comtdl', JSON.stringify(workObject2));
        }

        editBtn.setAttribute('class', 'display');
        addBtn.removeAttribute('class', 'display');
        inp.value = '';
        editButton.classList.remove("display");

    }, { once: true });

}
//make works of to do list from local storage after reload
const works = JSON.parse(localStorage.getItem('tdl'));

for (let work in works)
    afterReload(works[work], work);

function afterReload(work, index) {

    // const labelElement = document.createElement('label');
    const divElement = document.createElement('div');

    const newInput = document.createElement('input');
    newInput.setAttribute('type', 'checkbox');

    const newtext = document.createTextNode(work)

    divElement.appendChild(newInput);
    divElement.appendChild(newtext);

    divElement.style.fontFamily = "'Roboto Mono', monospace";

    //add id to div element from local stroge
    divElement.setAttribute('id', index);

    //set delete feature
    const deleteItem = document.createElement('button');
    deleteItem.innerHTML = 'delete';
    deleteItem.setAttribute('class', 'delete');

    divElement.appendChild(deleteItem);

    //set edit feature
    const editItem = document.createElement('button');
    editItem.innerHTML = 'edit';
    editItem.setAttribute('class', 'edit');

    divElement.appendChild(editItem);

    //set div element on the page :
    section.appendChild(divElement);

    inp.value = '';

    newInput.addEventListener('change', completed);

    deleteItem.addEventListener('click', trash);

    editItem.addEventListener('click', editText);
}

//make works of compteletd to do list from comtdl local storage after reload :
const comworks = JSON.parse(localStorage.getItem('comtdl'));

for (let work2 in comworks)
    afterReloadcom(comworks[work2], work2);

function afterReloadcom(work, index) {
    const divElement = document.createElement('div');

    const newInput = document.createElement('input');
    newInput.setAttribute('type', 'checkbox');

    const newtext = document.createTextNode(work);

    divElement.appendChild(newInput);
    divElement.appendChild(newtext);

    divElement.style.fontFamily = "'Roboto Mono', monospace";
    divElement.setAttribute("class", "overline");

    //set id for elements :
    divElement.setAttribute('id', index);

    //set delete feature
    const deleteItem = document.createElement('button');
    deleteItem.innerHTML = 'delete';
    deleteItem.setAttribute('class', 'delete');

    divElement.appendChild(deleteItem);

    //set delete feature
    const editItem = document.createElement('button');
    editItem.innerHTML = 'edit';
    editItem.setAttribute('class', 'edit');

    divElement.appendChild(editItem);
    divElement.setAttribute("class", "overline");

    //set div element on the page :
    const complete = document.getElementById('completed');
    complete.appendChild(divElement);

    newInput.addEventListener('change', returns);

    deleteItem.addEventListener('click', trash);

    editItem.addEventListener('click', editText);

    newInput.checked = true;
}

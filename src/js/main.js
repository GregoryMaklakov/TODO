"use strict";

window.addEventListener('DOMContentLoaded', async () => {
    const form = document.querySelector("#new-task-form");
    const inputAdd = document.querySelector("#new-task-input");
    const listElement = document.querySelector("#tasks");
    const inputAddBtn = document.querySelector("#new-task-submit");

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // ств. кнопку додавання елемента
        const task = inputAdd.value;

        // ств. обгортку для одного TODO елемента + клас 
        const taskElement = document.createElement('li');
        taskElement.classList.add('task', 'task-list__task');

        //ств. контентну частину task-елемента + клас
        const taskContentElement = document.createElement('div');
        taskContentElement.classList.add('task__content');

        // в обгортку task-елемента кладу контент
        taskElement.appendChild(taskContentElement);

        // ств. інпут для контентної чатини task-елемента
        const taskInputElement = document.createElement('input');
        taskInputElement.classList.add('task__content-text');
        taskInputElement.type = 'text';
        taskInputElement.value = task;
        taskInputElement.setAttribute('readonly', 'readonly');

        // контент task-елемента кладу  в інпут
        taskContentElement.appendChild(taskInputElement);

        // ств. дів з кнопками (checkbox, delete)
        const taskActionsElements = document.createElement('div');
        taskActionsElements.classList.add('task__actions', 'actions');

        // checkbox
        const taskCheck = document.createElement('span');
        taskCheck.classList.add('actions__checkbox');

        const taskCheckInput = document.createElement('input');
        taskCheckInput.classList.add('actions__checkbox-input');
        taskCheckInput.setAttribute('id', 'check');
        taskCheckInput.type = 'checkbox';
        taskCheck.appendChild(taskCheckInput);
        //Змінюемо колір task element

        taskCheckInput.addEventListener("change", () => {
            taskElement.style.transition = '0.3s';
            if (taskCheckInput.checked) {
                taskElement.style.backgroundColor = "#D7DCFF";
            } else {
                taskElement.style.backgroundColor = "#FFFFFF";
            }
        });


        // label for checkbox
        const labelInput = document.createElement('label');
        labelInput.classList.add('actions__checkbox-label');
        labelInput.setAttribute('for', 'check');
        taskCheck.appendChild(labelInput);

        // icon - check mark
        labelInput.insertAdjacentHTML('afterbegin', `
        <svg class="actions__checkbox-icon" viewBox="0 0 24 24"xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M20.7071 5.29289C21.0976 5.68342 21.0976 6.31658 20.7071 6.70711L9.70711 17.7071C9.31658 18.0976 8.68342 18.0976 8.29289 17.7071L3.29289 12.7071C2.90237 12.3166 2.90237 11.6834 3.29289 11.2929C3.68342 10.9024 4.31658 10.9024 4.70711 11.2929L9 15.5858L19.2929 5.29289C19.6834 4.90237 20.3166 4.90237 20.7071 5.29289Z" />
        </svg>
        `);

        // delete button + icon
        const taskDelete = document.createElement('button');
        taskDelete.classList.add('actions__delete');
        taskDelete.insertAdjacentHTML('afterbegin', `
        <svg class="actions__delete-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_220_174)">
            <path d="M7 21C6.45 21 5.97933 20.8043 5.588 20.413C5.196 20.021 5 19.55 5 19V6C4.71667 6 4.479 5.90433 4.287 5.713C4.09567 5.521 4 5.28333 4 5C4 4.71667 4.09567 4.479 4.287 4.287C4.479 4.09567 4.71667 4 5 4H9C9 3.71667 9.096 3.479 9.288 3.287C9.47933 3.09567 9.71667 3 10 3H14C14.2833 3 14.521 3.09567 14.713 3.287C14.9043 3.479 15 3.71667 15 4H19C19.2833 4 19.5207 4.09567 19.712 4.287C19.904 4.479 20 4.71667 20 5C20 5.28333 19.904 5.521 19.712 5.713C19.5207 5.90433 19.2833 6 19 6V19C19 19.55 18.8043 20.021 18.413 20.413C18.021 20.8043 17.55 21 17 21H7ZM7 6V19H17V6H7ZM9 16C9 16.2833 9.096 16.5207 9.288 16.712C9.47933 16.904 9.71667 17 10 17C10.2833 17 10.521 16.904 10.713 16.712C10.9043 16.5207 11 16.2833 11 16V9C11 8.71667 10.9043 8.479 10.713 8.287C10.521 8.09567 10.2833 8 10 8C9.71667 8 9.47933 8.09567 9.288 8.287C9.096 8.479 9 8.71667 9 9V16ZM13 16C13 16.2833 13.096 16.5207 13.288 16.712C13.4793 16.904 13.7167 17 14 17C14.2833 17 14.521 16.904 14.713 16.712C14.9043 16.5207 15 16.2833 15 16V9C15 8.71667 14.9043 8.479 14.713 8.287C14.521 8.09567 14.2833 8 14 8C13.7167 8 13.4793 8.09567 13.288 8.287C13.096 8.479 13 8.71667 13 9V16Z"/>
            </g>
            <defs>
            <clipPath id="clip0_220_174">
            <rect width="24" height="24"/>
            </clipPath>
            </defs>
        </svg>
        `);

        //кладемо кнопки в actions 
        taskActionsElements.appendChild(taskCheck);
        taskActionsElements.appendChild(taskDelete);

        // в обгортку task-елемента кладу кнопки
        taskElement.appendChild(taskActionsElements);
        // в cписок кладу task-елемент
        listElement.appendChild(taskElement);

        // якщо пусто то не додавати елемент в UL
        
        if (inputAdd.value === '') {
            alert("You must write something!");
            taskElement.style.display = 'none';
        } else {
            listElement.appendChild(taskElement);
        }
        inputAdd.value = '';

        // delete element
        taskDelete.addEventListener('click', (e) => {
            listElement.removeChild(taskElement);
        });
    });

    fetch("https://jsonplaceholder.typicode.com/todos")
        .then(function (response) {
            return response.json();
        })
        .then((response) => {
            for (let i = 0; i <= response.length; i++) {
                const taskElement = document.createElement('li');
                taskElement.appendChild(document.createTextNode(response[i].title));
                const taskItem = listElement.appendChild(taskElement);
                taskItem.classList.add('task', 'task-list__task');
            }
        });
});






//========================================================================================================================================================

// Bugrer & menu
/* let menuBtn = document.querySelector('.icon-menu');
let menu = document.querySelector('.menu');
menuBtn.addEventListener('click', function(){
    menuBtn.classList.toggle('active');
    menu.classList.toggle('active');
}); */

import{fetchGetTaskList, fetchEditTask, fetchDeleteTask, fetchAddTask} from './api'
import{createForm,createBtn, input, textarea, createEl} from './elements'

console.log(fetchGetTaskList())

fetchGetTaskList()

/*const fetchAddTask = (body) => {
    return fetch(`${endpoint}/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    })
    .then(response =>{
        if(input.value.length === 0) throw new Error('Ошибка создания')
        
    })
}*/
const renderTask = (task, list) => {
    const li = createEl('li')
    const text = createEl('div', task.text, { class: task.done ? 'text done' : 'text' })
    const btnContainer = createEl('div', null, { class: 'btn-container' })

    const doneBtnText = !task.done ? 'Сделано' : 'Не сделано'
    const doneBtn = createEl('button', doneBtnText)
    const editBtn = createEl('button', ' Редактировать')
    const deleteBtn = createEl('button', 'Удалить')

    deleteBtn.addEventListener('click', () => {
    fetchDeleteTask(task.id)
    .then(() =>{
        list.remove()
        renderTaskList()
        
    })
    .catch((err)=>{
        const errorMessage = createEl('div', err.message, {class: 'errormess'})
        errorMessage.textContent= err.message
    li.appendChild(errorMessage) })
    })

    editBtn.addEventListener('click', () => {
    const input = createEl('input', { class: 'edit-input' })
    input.type = 'text'
    input.value = task.text

    li.insertBefore(input, text)
    li.removeChild(text)
    input.addEventListener('blur', () => {
        fetchEditTask(task.id, { text: input.value })
        .then(() =>{
            list.remove()
            renderTaskList()
            })
        .catch((err)=>{
            const errorMessage = createEl('div', err.message, {class: 'errormess'})
            errorMessage.textContent= err.message
        li.appendChild(errorMessage) })
    })
    })


    doneBtn.addEventListener('click', () => {
    fetchEditTask(task.id, { done: !task.done })
    .then(() =>{
        list.remove()
        renderTaskList()
    })
    })
    li.appendChild(text)
    li.appendChild(btnContainer)
    btnContainer.appendChild(doneBtn)
    btnContainer.appendChild(editBtn)
    btnContainer.appendChild(deleteBtn)
    list.appendChild(li)
}

const renderTaskList = () => {
    const list = createEl('ul', null, { id: 'list' })
    document.body.appendChild(list)
    fetchGetTaskList()
    .then(taskList => taskList.forEach((item) => renderTask(item, list)))
    .catch((err)=>{
        const errorMessage = createEl('div', err.message, {class: 'errormess'})
        errorMessage.textContent= err.message
        list.appendChild(errorMessage)
    })
}


renderTaskList()

createBtn.addEventListener('click', () => {
    if(input.value.length > 0){
    fetchAddTask({ text: input.value, textarea: input.value })
            .then(() =>{
                const list= document.querySelector('#list')
                list.remove()
                renderTaskList()
        })
        .catch((err)=>{
            const errorMessage = createEl('div', err.message, {class: 'errormess'})
            errorMessage.textContent= err.message
            createForm.appendChild(errorMessage)
        })
    }
    else{
        const emptyInput = document.querySelector('.errormess')
        if(!emptyInput){
        const emptyInputErr = createEl('div', {text:'Заполните поле заметки'},{class: 'errormess'} )
        emptyInputErr.textContent='Заполните поле заметки'
        createForm.appendChild(emptyInputErr)
        }
        }
    
})

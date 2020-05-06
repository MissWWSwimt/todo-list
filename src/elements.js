export const createForm= document.querySelector('form')
export const createBtn = document.querySelector('#create')

export const input = document.querySelector('input[name="todo-name"]')
export const textarea = document.querySelector('textarea[name="todo-description"]')

export const createEl = (tag, text, attrs = {}) => {
    const el = document.createElement(tag)
    el.textContent = text
    Object.keys(attrs).forEach((key) => {
    el.setAttribute(key, attrs[key])
    })
    return el
}





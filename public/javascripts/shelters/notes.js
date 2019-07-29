'use strict';

const main = () => {
    const eventToForm = () => { 
        const action = document.querySelectorAll('.chat-form');
        action.forEach( (form) => {
            form.addEventListener('submit', async (event)=>{
            event.preventDefault()
            const information = { information: event.srcElement.information.value }
            const response = await axios.post(`${event.target.action}`, information)
            const note = document.createElement('p')
            note.innerHTML = `<p class="chat">${response.data.message}</p>`
            form.replaceWith(note)}
        )})
    }
    
    const eventToButton = () =>{
        const buttons = document.querySelectorAll('.ok-form');
        buttons.forEach ((button) => {
            button.addEventListener('submit', async () => {
                event.preventDefault()
                const response = await axios.post(`${event.target.action}`)
                const note = document.createElement('p')
                note.innerHTML = `<p class="chat">${response.data.message}</p>`
                button.replaceWith(note)
            })
        })
    }
    eventToButton();

    //evento igual para shelters y users (refactorizacvion posible)
    eventToForm();
}
window.addEventListener('load', main)
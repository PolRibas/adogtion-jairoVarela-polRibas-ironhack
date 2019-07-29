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

    eventToForm();


}
window.addEventListener('load', main)

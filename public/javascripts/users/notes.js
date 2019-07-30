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
            note.innerHTML = `<p class="chat">${response.data.message}</p>`;
            form.replaceWith(note)
        })
    })
    }
    eventToForm();
    const deleteNotes = () => {
        const notes = document.querySelectorAll('.notifications');
        const button = document.querySelectorAll('.delete-btn');
        button.forEach((button, index) => {
            console.log(button)
            button.addEventListener('submit', async (event) => {
                event.preventDefault()
                console.log(event.target.action)
                const response = await axios.post(`${event.target.action}`)
                const note = document.createElement('p')
                notes[index].innerHTML = `<p class="chat">${response.data.message}</p>`;
                notes[index].replaceWith(note)
            })
        })
    }
    deleteNotes();


}
window.addEventListener('load', main)

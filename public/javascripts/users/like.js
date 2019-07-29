'use strict';

const main = () => {
    const eventToForm = () => { 
        const action = document.querySelectorAll('.chat-form');
        action.forEach( (form) => {
            form.addEventListener('submit', async (event)=>{
            event.preventDefault()
            const information = { 
                shelter: event.srcElement.shelter.value, 
                dog: event.srcElement.dog.value 
            }
            console.log(information)
            console.log(event.target.action)
            // const response = await axios.post(`${event.target.action}`, information)
            // const note = document.createElement('p')
            // note.innerHTML = `<p class="chat">${response.data.message}</p>`
            // form.replaceWith(note)
        }
        )}
        )
    }

    eventToForm();


}
window.addEventListener('load', main)
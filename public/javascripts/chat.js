'use strict';

const main = () => {
    let activity = 5000;
    const eventToForm = () => { 
        const chatSection = document.querySelector('.chat-box')
        const action = document.querySelectorAll('.chat-form');
        action.forEach( (form) => {
            form.addEventListener('submit', async (event)=>{
            event.preventDefault()
            const information = { information: event.srcElement.information.value }
            const response = await axios.post(`${event.target.action}`, information);
            const note = document.createElement('p');
            note.innerHTML = `<p class="chat-p">${response.data.message}</p>`;
            chatSection.appendChild(note);
            const input = document.querySelector('input');
            input.value = '';
            })
        })
    }
    
    const seeNewMessages = async () => {
        const form = document.querySelector('.chat-form');
        let p = document.querySelectorAll('.chat-p');
        const response = await axios.post(`/api/newChats/${form.id}/${p.length}`)
        if(response.data.newOne){
            const chatSection = document.querySelector('.chat-box')
            const note = document.createElement('p');
            note.innerHTML = `<p class="chat-p">${response.data.message}</p>`;
            chatSection.appendChild(note);
            activity = 5000;
        }else{
            activity = 40000;
        }
    }

    eventToForm();
    setInterval(() =>{ 
        seeNewMessages()
    },activity);
}

window.addEventListener('load', main)
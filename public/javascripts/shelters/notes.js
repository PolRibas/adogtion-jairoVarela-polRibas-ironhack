'use strict';

const main = () => {
    const deleteNotes = () => {
        const notes = document.querySelectorAll('.notifications');
        const button = document.querySelectorAll('.delete-btn');
        button.forEach((button, index) => {
            button.addEventListener('submit', async (event) => {
                event.preventDefault()
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
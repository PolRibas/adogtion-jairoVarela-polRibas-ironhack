'use strict';

const main = () => {
    console.log('funcion')
    const dogCard = document.querySelectorAll('.dog-article')
    const eventToForm = () => { 
        const action = document.querySelectorAll('.chat-form');
        console.log(action)
        action.forEach( (form, index) => {
            console.log(index)
            form.addEventListener('submit', async (event)=>{
            event.preventDefault()
            console.log(index)
            const information = { 
                shelter: event.srcElement.shelter.value, 
                dog: event.srcElement.dog.value 
            }
            console.log(information)
            console.log(event.target.action)
            console.log(index)
            const response = await axios.post(`${event.target.action}`, information)
            dogCard[index].remove()
        }
        )}
        )
    }

    eventToForm();


}
window.addEventListener('load', main)
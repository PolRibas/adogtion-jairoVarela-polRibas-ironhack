'use strict';

const main = () => {
    console.log('funcion')
    const dogCard = document.querySelectorAll('.dog-article')
    const eventToForm = () => { 
        const action = document.querySelectorAll('.chat-form');
        action.forEach( (form, index) => {
            form.addEventListener('submit', async (event)=>{
            event.preventDefault()
            const information = { 
                shelter: event.srcElement.shelter.value, 
                dog: event.srcElement.dog.value 
            }
            const response = await axios.post(`${event.target.action}`, information)
            dogCard[index].remove()
        }
        )}
        )
    }
    const likeOnlyOne = async () =>{
        const buys = await document.querySelectorAll('.buy')
        const bottoms = await document.querySelectorAll('.bottom')
        const remuves = document.querySelectorAll('.remove')

         buys.forEach((buy,index) => {
             buy.addEventListener('click', () =>
                bottoms[index].classList.add('clicked')
                )
            })
            
         remuves.forEach((remuve,index) => {
            remuve.addEventListener('click', () =>
               bottoms[index].classList.remove('clicked')
            )
        })
    }

    eventToForm();
    likeOnlyOne();


}
window.addEventListener('load', main)
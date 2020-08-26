console.log("client side JS file is loaded")

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })


// fetch('http://localhost:3000/weather?address=!').then((response)=>{
//     response.json().then((data)=>{
//         if(data.error){
//             console.log(data.error)
//         }else{
//             console.log(data.location)
//             console.log(data.forecast)
//         }
//     })
// })


const weatherForm =document.querySelector('form')
const search= document.querySelector('input') 
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')


messageOne.textContent=''
messageTwo.textContent=''


weatherForm.addEventListener('submit',(e)=>{
e.preventDefault()


messageOne.textContent='Loding...'
messageTwo.textContent=''

const location = search.value

fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error)
            messageOne.textContent=data.error
        }else{
            messageOne.textContent=data.location
            console.log(data.location)
            messageTwo.textContent=data.forecast
            console.log(data.forecast)
        }
    })
})
})
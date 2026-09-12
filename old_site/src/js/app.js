

// for carrousel logic.
const grande = document.querySelector('.display_carrousel');
const punto = document.querySelectorAll('.point_display');
const images = document.querySelectorAll('.img_carrousel');


punto.forEach( (point, i)=>{
    punto[i].addEventListener('click', ()=>{
        let posicion = i;
        let oper = posicion * -50;

        grande.style.transform = `translateX(${oper}%)`;

        punto.forEach((cu, i)=> {
            punto[i].classList.remove('active_point');
            
        });

        // Aqui esta recorriendo JUSTO ese boton asi que le asignamos activo
        punto[i].classList.add('active_point');
        
    });
})
//

function sendEmail(){
    let contact_me_name = document.getElementById('contact_me_name').value;
    let contact_me_email = document.getElementById('contact_me_email').value;
    let contact_me_message = document.getElementById('contact_me_message').value;

    if(contact_me_name, contact_me_email, contact_me_message){
        // const objContact = {name: contact_me_name, email: contact_me_email, message: contact_me_message};
        const formatMessageEmail = `${contact_me_name} te contacta mediante: ${contact_me_email} \n\n Y dice lo siguiente: ${contact_me_message}.`;

        sendEmailForMyAccountSECONDARY(formatMessageEmail, `Contacto de ${contact_me_name}`, contact_me_email, "");   
    }else{
        // TODO: Cambiar mensaje temporal
        alert('Por favor complete los campos.')
    }
    
}

function sendEmailForMyAccountSECONDARY(message="Without Text :c", subject="Hi! I need comunication with you.", from="", copyTo = ""){
    const myEmail_spam = "bryansan055";
    // Coloco el email separado... Para evitar los bots.
    window.open(`mailto:${myEmail_spam}@gmail.com?cc=${copyTo}&subject=${subject}&body=${message}`);
}

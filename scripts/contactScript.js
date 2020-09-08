let contactForm=document.getElementById("contact-form");
contactForm.addEventListener("submit",evt=>{
    evt.preventDefault();
    let message= contactForm["msg"].value;
    if(message){
        window.open(`mailto:mohdkhawatmi@gmail.com?subject=MessageFromClient&body=${message}`);
    }else{
        alert("you can't send an empty message");
    }
});
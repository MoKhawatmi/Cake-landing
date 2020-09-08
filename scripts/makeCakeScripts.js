let form=document.getElementById("make-form");
form.addEventListener("submit",evt=>{
    evt.preventDefault();
    let icing=form["icing"].value;
    let decoration=form["decoration"].value;
    let topping=Array.from(form["topping"].selectedOptions).map(item=>{
        return item.value;
    }).join(", ");
    let amount=form["amount"].value;
    let sizing=form["sizing"].value;
    let cake={
        icing:icing,
        decoration:decoration,
        topping: topping,
        amount: amount,
        sizing: sizing
    };
    console.log(cake);
    sessionStorage.setItem("cake",JSON.stringify(cake));
    window.location.href="/order";
});
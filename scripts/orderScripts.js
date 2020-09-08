let cake=sessionStorage.getItem("cake");

if(cake){
    let cakeObject=JSON.parse(cake);
    console.log(cakeObject);
    let order="";
    for(request in cakeObject){
            order+=`${request}: ${cakeObject[request]}\n`;
    }
    console.log(order);
    document.getElementById("order-form")["description"].value=order;
}else{
    console.log("no cake");
}
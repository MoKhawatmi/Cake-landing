let form=document.getElementById("edit-form");
let cakeId;
let editSaleId;


function editClicked(element){
    cakeId=element.dataset.cake;
    console.log(cakeId);
    console.log(element.parentNode.childNodes[7].childNodes);
    form["name"].value=element.parentNode.childNodes[7].childNodes[1].innerHTML
    form["description"].value=element.parentNode.childNodes[7].childNodes[3].innerHTML
    form["price"].value=element.parentNode.childNodes[7].childNodes[5].innerHTML
}

let editButton=document.getElementById("edit-btn");
let deleteButton=document.getElementById("delete-btn");

editButton.addEventListener("click",evt=>{
    let object={
        name: form["name"].value,
        description: form["description"].value,
        price: form["price"].value,
        onSale:form["sale"].checked,
        saleDescription:form["saleDescription"].value
    };
    fetch(`/cakes/${cakeId}`,{method: "PUT", headers: {'Content-Type': 'application/json'}, body: JSON.stringify(object)}).then(result=>{
        location.reload();
    }).catch(err=>{
        console.log(err)
    })
});

deleteButton.addEventListener("click",evt=>{
    fetch(`/cakes/${cakeId}`,{method: "DELETE"}).then(response=>{
        location.reload();
    }).catch(err=>{
        console.log(err);
    });
});

function mark(btn,completed){
    if(completed){
        btn.innerHTML="Mark complete"
        btn.parentNode.classList.remove("border-success");
        btn.parentNode.classList.add("border-warning");
        btn.classList.remove("btn-success");
        btn.classList.add("btn-warning");
        completed=false;
    }else{
        btn.innerHTML="Mark incomplete"
        btn.parentNode.classList.remove("border-warning");
        btn.parentNode.classList.add("border-success");
        btn.classList.remove("btn-warning");
        btn.classList.add("btn-success");
        completed=true;
    }
    fetch(`/request/${btn.parentNode.dataset.request}`,{method: "PUT", headers: {'Content-Type': 'application/json'} ,body: JSON.stringify({completed: completed})})
    .then(response=>{
        console.log(response);
        location.reload();
    }).catch(err=>{
        console.log(err);
    });
}

function remvoveFromSale(target){
    console.log(target);
    let id=target.parentNode.dataset.saleid;
    console.log(id);
    if(confirm("Are you sure you want to remove item form sale?")){
        fetch(`cakes/${id}`,{method:"PUT",headers:{'Content-Type': 'application/json'} ,body:JSON.stringify({onSale: false})}).then(response=>{
            console.log(response);
            location.reload();
        }).catch((err)=>{
            console.log(err);
        })
    }
}

function editSaleClicked(target){
    let id=target.parentNode.dataset.saleid
    editSaleId=id;
    console.log(editSaleId);
}

function editSaleDesc(){
//saleDescription
    let value=document.getElementById("editSaleDescArea").value;
    fetch(`cakes/${editSaleId}`,{method:"PUT", headers:{'Content-Type': 'application/json'},body:JSON.stringify({saleDescription: value})})
    .then(response=>{
        console.log(response)
        location.reload();
    }).catch(err=>{
        console.log(err)
    })
}
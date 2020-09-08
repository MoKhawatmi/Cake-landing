let suggestionList=document.createElement("ul");
suggestionList.setAttribute("class","sugList");

let form=document.getElementById("searchForm");

let onceFlag=true;
let namesArray=[];
let searchBar=document.getElementById("searchBar");

searchBar.addEventListener("focus",evt=>{
    if(onceFlag){
    let xhr=new XMLHttpRequest();
    let url="/getNames";
    xhr.responseType="json";
    xhr.onreadystatechange=()=>{
        if(xhr.readyState==XMLHttpRequest.DONE){
            getCakeNames(xhr.response);
        }
    }
    xhr.open("GET",url);
    xhr.send();
    onceFlag=false;
}
});

searchBar.addEventListener("focusout",evt=>{
    setTimeout(()=>{
        form.removeChild(suggestionList);
    },500)
    
})

searchBar.addEventListener("keyup",evt=>{
    console.log(searchBar.value);
    suggestionList.innerHTML=namesArray.filter(cake=>{
        return (cake.name.indexOf(searchBar.value)!=-1);
    }).map(cake=>{
        return `<li class="border border-warning"><a href="/cakedetails/${cake.id}">${cake.name}</a></li>`
    }).join("");
    form.appendChild(suggestionList);
})

function getCakeNames(cakes){
    cakes.forEach(cake=>{
        namesArray.push({name:cake.name.toLowerCase(),id:cake._id});
    })
}
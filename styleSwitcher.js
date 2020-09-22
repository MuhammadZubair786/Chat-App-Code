const links = document.querySelectorAll('.alternate-style')
let totalLinks = links.length

function setActiveStyle(color){
for(let i=0; i<totalLinks; i++){
    if(color===links[i].getAttribute('title')){
        links[i].removeAttribute("disabled")
    }
    else{
        links[i].setAttribute('disabled' , 'true')
    }
}
}


// body skin 
const  bodySkin = document.querySelectorAll(".body-skin"),
totalBodySkin = bodySkin.length;
for(let i=0; i<totalBodySkin; i++){
    bodySkin[i].addEventListener("change",function(){
if(this.value==="dark"){
    document.getElementById('side-2').classList.add('dark')
    document.getElementById('divStart').classList.add("cl")
    

}
else{
    document.getElementById('side-2').classList.remove('dark')
    document.getElementById('divStart').classList.remove("cl")


}
    })
}



document.querySelector(".toggle-style-switcher").addEventListener("click", () =>{
document.querySelector(".style-switcher").classList.toggle("open");
})
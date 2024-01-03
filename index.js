let totalprice=0
function crud(event){
    event.preventDefault();
    let price=event.target.num.value;
    let name=event.target.name.value;
    
    let obj=
    {
        price:price,
        name:name
    }
    
    axios.post("https://crudcrud.com/api/5f40a6aab5aa4f5ba11169c46baca321/ecom",obj)
    .then((res)=>{
        showuser(res.data)
        
        totalprice +=Number(price);
        displayTotalPrice(totalprice);
    })
    .catch((err)=>{
        console.log(err)
    })
}
axios.get("https://crudcrud.com/api/5f40a6aab5aa4f5ba11169c46baca321/ecom")
.then((res)=>{
    totalprice = res.data.reduce((acc, item) => acc + item.price, 0);
        displayTotalPrice(totalprice);
    for(let i=0;i<res.data.length;i++)
    {
        showuser(res.data[i]) 
    }
})
.catch((err)=>{
    console.log(err)
})

function showuser(obj){
    let parent=document.getElementById('listItem');
    let child=document.createElement('li');
    child.textContent= obj.price+" - "+ obj.name;

    let deletebut=document.createElement('input');
    deletebut.type="button";
    deletebut.value="Delete Product"

    child.appendChild(deletebut);
    parent.appendChild(child)
    
   
    deletebut.addEventListener('click',deleteuser)

    function deleteuser(){
        axios.delete(`https://crudcrud.com/api/5f40a6aab5aa4f5ba11169c46baca321/ecom/${obj._id}`)
        .then(()=>{
            parent.removeChild(child);
            totalprice -= obj.price;
            displayTotalPrice(totalprice);
        })
        .catch((err)=>{
            console.log(err)
        })
    }

}

function displayTotalPrice(total) {
    let totalPriceElement = document.getElementById('TotalCost');
    totalPriceElement.textContent = "Total Value worth of Products:" + total; 
}







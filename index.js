let totalprice =0;
let prices=[]
function crud(event){
    event.preventDefault();
    let price=event.target.num.value;
    let name=event.target.name.value;
    
    let obj=
    {
        price:price,
        name:name
    }
   async function post(url,obj){
    try{
        let res=  await axios.post(url,obj)
        showuser(res.data);

        prices.push(Number(price));
        console.log(prices)
        totalprice=calculatePrice(prices)
        displayTotalPrice(totalprice)
    }
    catch(err){
        console.log(err)
    }
}
post("https://crudcrud.com/api/bee6feeca4104391aa305f9ed7d5cb76/ecom",obj)
    
}

async function get(){
    try{
        let res= await axios.get("https://crudcrud.com/api/bee6feeca4104391aa305f9ed7d5cb76/ecom")
        for(let i=0;i<res.data.length;i++){
            showuser(res.data[i])
            prices.push(Number(res.data[i].price))
        }
        totalprice=calculatePrice(prices)
        displayTotalPrice(totalprice)
        
    }
    catch(err){
        console.log(err)    
    }
    
}
get()



function showuser(obj){
    let parent=document.getElementById('listItem');
    let child=document.createElement('li');
    child.textContent= obj.price+" - "+ obj.name;

    let deletebut=document.createElement('input');
    deletebut.type="button";
    deletebut.value="Delete Product"
    deletebut.className="btn btn-dark";

    child.appendChild(deletebut);
    parent.appendChild(child)
    
    deletebut.addEventListener('click',deleteuser);
    
    async function deleteuser(){
        try{
            await axios.delete(`https://crudcrud.com/api/bee6feeca4104391aa305f9ed7d5cb76/ecom/${obj._id}`);
            parent.removeChild(child)
            let index = prices.indexOf(Number(obj.price));
            if (index > -1) {
                prices.splice(index, 1);
            }
            totalprice = calculatePrice(prices);
            displayTotalPrice(totalprice)

        }
        catch(err){
            console.log(err)
        }
    } 
    

}


function calculatePrice(values){
    console.log(values)
    let total=0;
    for(let i=0;i<values.length;i++){
       total +=values[i]
    }
    return total
}


function displayTotalPrice(total) {
    let totalPriceElement = document.getElementById('TotalCost');
    totalPriceElement.textContent = "Total Value worth of Products:Rs " + total; 
}

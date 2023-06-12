document.addEventListener("DOMContentLoaded", () => {
    getProducts();
  });

document.querySelector('#productForm').addEventListener('submit',sendFormData);

async function sendFormData(e)
{
    e.preventDefault();
    const itemName=document.querySelector('#itemName').value;
    const price=document.querySelector('#price').value;
    const data={
        itemName:itemName,
        price:price
    }
    await axios.post('http://localhost:3300/addProduct',data);
    console.log('added products');
    getProducts();
    
}


async function getProducts(){
    let products=await axios.get('http://localhost:3300/getProducts');
    console.log('got product');
    displayProducts(products.data);
}


async function deleteProduct(e){
    const elements=e.parentElement.parentElement.parentElement.children;
    const id=elements[0].textContent;
    console.log(id)
    await axios.get('http://localhost:3300/deleteProduct/'+id);
    getProducts();
  }

function displayProducts(obj)
{
  let listParent = document.querySelector('.list-group');
  let listChildren = document.querySelectorAll('.list-group-item');
  let total=0;
  console.log(obj)
  listChildren.forEach((listChild)=>{
    listChild.remove();
  })

  let text = "";

  for (let i = 0; i < obj.length; i++) {
        total+=obj[i].price;
        text += `<li class="list-group-item"><div id="itemID" style="display: none;">${obj[i].id}</div> 
        <div class="row align-items-center">
        <div class="col">Item : ${obj[i].itemName}</div>
        <div class="col">Price : ${obj[i].price}</div>
        <div class="col">
            <button type="button" class="btn btn-primary delete">Delete</button>
        </div>
           
    </li>`;
    }

    text+=`<div>Total : ${total}</div`

    listParent.innerHTML = text;

    let deletebtns=document.querySelectorAll(".delete");
    deletebtns.forEach((deletebtn)=>{
      deletebtn.addEventListener("click",(event)=>{
        deleteProduct(deletebtn);
      });
    })
}
import { menuArray } from "./data.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

const menuList = document.getElementById("menuList");
const orderList = document.getElementById("orderList");
const paymentModal = document.getElementById("paymentModal");
const checkout = document.getElementById("checkout");
const purchaseCompleted = document.getElementById("purchaseCompleted")
let orderArray = [];

let HTML = ``;
for (let el of menuArray) {
  el.uuid = uuidv4();
}

for (let el of menuArray) {
  const { name, ingredients, price, emoji, id, uuid } = el;
  HTML += `<div class="menuItem" id="${uuid}">
      <div class="emoji"><span>${emoji}</span></div>
      <div class="textBox">
        <div class="name">${name}</div>
        <div class="ingredients">${ingredients}</div>
        <div class="price">$${price}</div>
      </div>
      <div class="add-to-order-container">
        <div id="add-btn" data-add_to_order="${uuid}">+</div>
      </div>
    </div>`;
}

const render = (param1,param2) => {
  param1.innerHTML = param2;
};

document.addEventListener('click',(e)=>{
  if(e.target.dataset.add_to_order){
    const {name,ingredients,price,uuid} = filterMenuArray(e.target.dataset.add_to_order)
    orderArray.push({name,price,uuid:uuidv4()});
    handleEditOrderList(orderArray)
  }
  else if(e.target.dataset.remove){
    orderArray = orderArray.filter(el => el.uuid != e.target.dataset.remove);
    handleEditOrderList(orderArray);
  }
})

const filterMenuArray = (param1,param2=menuArray)=>{
  return param2.filter(el => el.uuid === param1)[0];
}

const handleEditOrderList = (param1)=>{
  checkout.style.display = Boolean(param1[0]) ? 'block' : 'none';
  let orderHTML = ``;
  for(let el of param1){
    const {name,price,uuid} = el;
    orderHTML += `
      <div class="orderItem">
        <div class="col1">${name}
          <span class="remove" data-remove="${uuid}">remove</span>
        </div>
        <div class="col2">$${price}</div>
      </div>
      `;
  }
  orderHTML += `
      <div id="rowDivider"></div>
      <div class="orderItem">
        <div class="col1">Total price:</div>
        <div class="col2">$${param1.reduce((sum,el) => sum+=el.price,0)}</div>
      </div>`;
  render(orderList,orderHTML)
}

document.getElementById("checkout-btn").addEventListener("click",(e)=>{
  paymentModal.style.left = "calc((100vw - 524px)/2)";
})

// document.getElementById("paymentModal-btn").addEventListener("submit",(e)=>{
document.addEventListener("submit",(e)=>{
  e.preventDefault();

  const inputName = document.getElementById("inputName").value;
  const inputCardNumber = document.getElementById("inputCardNumber").value;
  const inputCVV = document.getElementById("inputCVV").value;

  if(!Boolean(inputCVV) || !Boolean(inputCVV) || !Boolean(inputCVV)) throw new Error();
  else {
    paymentModal.style.left = "-600px";
    checkout.style.display = "none";
    purchaseCompleted.style.display = "block";
    purchaseCompleted.innerText = `Thanks, ${inputName}! Your order is on its way!`;
  }
})

render(menuList,HTML);
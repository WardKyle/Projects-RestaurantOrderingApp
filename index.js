import { menuArray } from "./data.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

const menuList = document.getElementById("menuList");

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
        <div class="price">${price}</div>
      </div>
      <div class="add-to-order">+</div>
    </div>`;
}

const render = (renderThis) => {
  menuList.innerHTML = renderThis;
};

render(HTML);

window.onload = function() {
  zobrazKosik();
};

function zobrazKosik() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartContainer = document.getElementById('cartContainer');
  cartContainer.innerHTML = ''; // Clear the container before adding new items

  cart.forEach(function(item, index) {
      let tr = document.createElement('tr');

      // Create product thumbnail cell
      let tdThumbnail = document.createElement('td');
      tdThumbnail.className = 'product-thumbnail';
      let img = document.createElement('img');
      img.src = item.img;
      img.alt = 'Image';
      img.className = 'img-fluid';
      tdThumbnail.appendChild(img);

      // Create product name cell
      let tdName = document.createElement('td');
      tdName.className = 'product-name';
      let h2 = document.createElement('h2');
      h2.className = 'h5 text-black';
      h2.textContent = item.name;
      tdName.appendChild(h2);

      // Create product price cell
      let tdPrice = document.createElement('td');
      tdPrice.textContent = item.price + ' Kč';

      // Create quantity control cell
      let tdQuantity = document.createElement('td');
      let quantityContainer = document.createElement('div');
      quantityContainer.className = 'input-group mb-3 d-flex align-items-center quantity-container';
      quantityContainer.style.maxWidth = '120px';

      let inputGroupPrepend = document.createElement('div');
      inputGroupPrepend.className = 'input-group-prepend';
      let decreaseButton = document.createElement('button');
      decreaseButton.className = 'btn btn-outline-black decrease';
      decreaseButton.type = 'button';
      decreaseButton.innerHTML = '&minus;';
      inputGroupPrepend.appendChild(decreaseButton);

      let quantityInput = document.createElement('input');
      quantityInput.type = 'text';
      quantityInput.className = 'form-control text-center quantity-amount';
      quantityInput.value = item.quantity || 1;
      quantityInput.placeholder = '';
      quantityInput.setAttribute('aria-label', 'Example text with button addon');
      quantityInput.setAttribute('aria-describedby', 'button-addon1');

      let inputGroupAppend = document.createElement('div');
      inputGroupAppend.className = 'input-group-append';
      let increaseButton = document.createElement('button');
      increaseButton.className = 'btn btn-outline-black increase';
      increaseButton.type = 'button';
      increaseButton.innerHTML = '&plus;';
      inputGroupAppend.appendChild(increaseButton);

      quantityContainer.appendChild(inputGroupPrepend);
      quantityContainer.appendChild(quantityInput);
      quantityContainer.appendChild(inputGroupAppend);
      tdQuantity.appendChild(quantityContainer);

      // Create total price cell for the product
      let tdTotalPrice = document.createElement('td');
      let itemTotalPrice = item.price * (item.quantity || 1);
      tdTotalPrice.textContent = itemTotalPrice + ' Kč';

      // Create remove button cell
      let tdRemove = document.createElement('td');
      let removeButton = document.createElement('a');
      removeButton.href = '#';
      removeButton.className = 'btn btn-black btn-sm';
      removeButton.textContent = 'X';
      removeButton.onclick = () => {
          removeItemFromCart(index);
      };
      tdRemove.appendChild(removeButton);

      // Append all cells to the row
      tr.appendChild(tdThumbnail);
      tr.appendChild(tdName);
      tr.appendChild(tdPrice);
      tr.appendChild(tdTotalPrice);
      tr.appendChild(tdQuantity);
      tr.appendChild(tdRemove);

      cartContainer.appendChild(tr);

      // Event listeners for quantity buttons
      decreaseButton.addEventListener('click', function() {
          let quantity = parseInt(quantityInput.value);
          if (quantity > 1) {
              quantityInput.value = --quantity;
              item.quantity = quantity;
              localStorage.setItem('cart', JSON.stringify(cart));
              updateItemPrice(tdTotalPrice, item.price, quantity);
              updateTotalPrice();
          }
      });

      increaseButton.addEventListener('click', function() {
          let quantity = parseInt(quantityInput.value);
          quantityInput.value = ++quantity;
          item.quantity = quantity;
          localStorage.setItem('cart', JSON.stringify(cart));
          updateItemPrice(tdTotalPrice, item.price, quantity);
          updateTotalPrice();
      });
  });

  updateTotalPrice();
}

function updateItemPrice(itemPriceElement, price, quantity) {
  itemPriceElement.textContent = (price * quantity) + ' Kč';
}

function removeItemFromCart(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  window.location.reload();
}

function updateTotalPrice() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let totalPrice = 0;

  cart.forEach(item => {
      totalPrice += item.price * (item.quantity || 1);
  });

  const totalPriceSpan = document.getElementById('totalPrice');
  totalPriceSpan.textContent = `${totalPrice} Kč`;

  localStorage.setItem('totalPrice', totalPrice);
}

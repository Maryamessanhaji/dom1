function increment(elem) {
    const quantitySpan = elem.parentElement.querySelector('.quantity');
    let quantity = parseInt(quantitySpan.innerText);
      quantitySpan.innerText = quantity + 1;
}
function decrement(elem) {
    const quantitySpan = elem.parentElement.querySelector('.quantity');
    let quantity = parseInt(quantitySpan.innerText);
    if (quantity > 0) {
      quantitySpan.innerText = quantity - 1;
    }
  }
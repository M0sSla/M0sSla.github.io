var k = 0;
function addToCart(productName, price) {
    var cart = document.getElementById('cart');
    var totalElement = document.getElementById('total');


    var existingItem = findCartItem(productName);
    if (existingItem) {
        k=1;
        updateQuantity(existingItem.querySelector('.quantity-input'), 1);
    } else{
        var listItem = document.createElement('li');
        listItem.textContent = productName + ' - ' + price.toFixed(2) + '₽';

        // Создаем кнопку удаления
        var removeButton = document.createElement('button');
        removeButton.textContent = 'Удалить';
        removeButton.className = 'remove-button';
        removeButton.setAttribute('data-product', productName);

        listItem.appendChild(removeButton);

        cart.appendChild(listItem);

        // Обновляем общую стоимость
        var currentTotal = parseFloat(totalElement.textContent);
        totalElement.textContent = (currentTotal + price).toFixed(2);


        var quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.value = 1;
        quantityInput.min = 1;
        quantityInput.className = 'quantity-input';
        quantityInput.readOnly = true;


        var addButton = document.createElement('button');
        addButton.textContent = '+';
        addButton.className = 'quantity-button';
        addButton.onclick = function () {
            k = 1;
            updateQuantity(quantityInput, 1);
        };

        var subtractButton = document.createElement('button');
        subtractButton.textContent = '-';
        subtractButton.className = 'quantity-button';
        subtractButton.onclick = function () {
            k = -1;
            updateQuantity(quantityInput, -1);
        };

        listItem.appendChild(subtractButton);
        listItem.appendChild(quantityInput);
        listItem.appendChild(addButton);
    }


}

function removeFromCart(event) {
    if (event.target.classList.contains('remove-button')) {
        event.target.getAttribute('data-product');
        var listItem = event.target.parentNode;
        var price = parseFloat(listItem.textContent.match(/([\d.]+)₽/)[1]);

        // Удаляем элемент из корзины
        listItem.parentNode.removeChild(listItem);

        // Обновляем общую стоимость
        var totalElement = document.getElementById('total');
        var currentTotal = parseFloat(totalElement.textContent);
        var quantity = parseInt(listItem.querySelector('.quantity-input').value);

        totalElement.textContent = (currentTotal - price*quantity).toFixed(2);
    }
}


function clearCart() {
    var cart = document.getElementById('cart');
    var totalElement = document.getElementById('total');

    // Удаляем все элементы из корзины
    while (cart.firstChild) {
        cart.removeChild(cart.firstChild);
    }

    // Обнуляем общую стоимость
    totalElement.textContent = '0.00';
}



function updateQuantity(quantityInput, change) {
    let newQuantity = parseInt(quantityInput.value) + change;
    if (newQuantity < 1) {
        return
    }
    quantityInput.value = newQuantity;
    updateTotal(quantityInput);
}

function updateTotal(quantityInput) {
    var listItem = quantityInput.parentNode;
    var price = parseFloat(listItem.textContent.match(/([\d.]+)₽/)[1]);
    var quantity = parseInt(quantityInput.value);
    var totalElement = document.getElementById('total');

    var currentTotal = parseFloat(totalElement.textContent);
    if (k === 1){
        totalElement.textContent = (currentTotal - price * (quantity - 1) + (price * quantity)).toFixed(2);
    }
    else if (k === 0){
        totalElement.textContent = (currentTotal - price * (quantity - 1)).toFixed(2);
    }
    if (k === -1){
        totalElement.textContent = (currentTotal - price).toFixed(2);
    }

}

// Внутри addToCart функции, после добавления элемента списка
// Назначаем обработчик изменения количества для каждого нового элемента


var products = [
    { name: 'Гвозди', price: 319.99, image: "../src/shop/first.png"},
    { name: 'Благовония', price: 1060.09, image: "../src/shop/second.png"},
    { name: 'Сервиз', price: 6000.00, image: "../src/shop/third.png"},
    { name: 'Кимоно для медитации', price: 11999.99, image: "../src/shop/fourth.png"},
    { name: 'Подушка для медитации', price: 343.00, image: "../src/shop/fifth.png"},
    { name: 'Свечи ароматические', price: 139.00, image: "../src/shop/sixth.png"}
];

var originalProducts = products.slice(); // Копия оригинального массива для сброса сортировки

// Функция для отображения продуктов на странице
function displayProducts(products) {
    var container = document.querySelector('.cards-container');
    container.innerHTML = '';

    products.forEach(function (product) {
        var productCard = document.createElement('div');
        productCard.className = 'card';
        productCard.innerHTML = `
            <h2>${product.name}</h2>
            <img src="${product.image}" alt="${product.name}">
            <p class="price">${product.price.toFixed(2)}₽</p>
            <button onclick="addToCart('${product.name}', ${product.price})">Добавить</button>
        `;
        container.appendChild(productCard);
    });
}

// Функция для сортировки продуктов по цене
function sortItems(order) {
    var sortedProducts = products.slice(); // Создаем копию массива для избежания изменения оригинала

    if (order === 'asc') {
        sortedProducts.sort(function (a, b) {
            return a.price - b.price;
        });
    } else if (order === 'desc') {
        sortedProducts.sort(function (a, b) {
            return b.price - a.price;
        });
    }

    displayProducts(sortedProducts);
}

// Функция для сброса сортировки
function resetSort() {
    displayProducts(originalProducts);
}

// Инициализация отображения при загрузке страницы
displayProducts(products);


// Функция для поиска элемента корзины по имени товара
function findCartItem(productName) {
    var cartItems = document.getElementById('cart').getElementsByTagName('li');
    for (var i = 0; i < cartItems.length; i++) {
        if (cartItems[i].textContent.includes(productName)) {
            return cartItems[i];
        }
    }
    return null; // Возвращает null, если товар не найден в корзине
}


function filterArray(arr, a, b) {
    // Используем метод filter для создания нового массива
    // содержащего элементы, удовлетворяющие условиям (a <= элемент <= b)
    var resultArray = arr.filter(function(element) {
        return element >= a && element <= b;
    });

    return resultArray;
}
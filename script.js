document.addEventListener("DOMContentLoaded", fetchProducts);

async function fetchProducts() {
    try {
        const res = await fetch('/api/products');
        const products = await res.json();
        const container = document.getElementById("products-list");
        container.innerHTML = ""; 

        products.forEach(p => {
            container.innerHTML += `
                <div class="product-card" style="border:1px solid #ccc; padding:15px; margin:10px; text-align:center;">
                    <img src="images/${p.image}" style="width:150px; height:150px;">
                    <h3>${p.name}</h3>
                    <p>${p.price}</p>
                    <button onclick="alert('Added to Cart!')">Add to Cart</button>
                </div>
            `;
        });
    } catch (err) { console.error(err); }
}

async function triggerLogin() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    alert(data.message);
    if(data.success) document.getElementById("user-display").innerText = data.message;
}
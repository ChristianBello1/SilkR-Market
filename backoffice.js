const apiUrl = "https://striveschool-api.herokuapp.com/api/";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNjZWFhMDgxODQ0MjAwMTUzNzU3ODQiLCJpYXQiOjE3MTUyNzc1ODksImV4cCI6MTcxNjQ4NzE4OX0.zhkepV-JOskzzFIHMSK2qmCSiLa7CwDEDC3GBTij0fE";

document.getElementById('productForm').addEventListener('submit', function(event){
        event.preventDefault();
        var productName = document.getElementById('name').value;
        var productDescription = document.getElementById('info').value;
        var productImages = document.getElementById('image').value;
        var productBrand = document.getElementById('brand').value;
        var productPrice = document.getElementById('price').value;


        var product = {
            name: productName,
            info: productDescription,
            image: productImages,
            brand: productBrand,
            price: productPrice
        }

        var productString = JSON.stringify(product);


fetch(apiUrl + "product", {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
    },
    body: productString
})
.then((response) => {
    if(!response.ok) {
    throw new Error("Network non okay");
    }
    return response.json();
    })
    .then((data) => {
    console.log(data);
    })
    .catch((error) => {
    console.log("errore:", error)
})



})



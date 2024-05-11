$(document).ready(function() {
    // Carica i prodotti all'avvio della pagina
    loadProducts();

    // Gestione dell'invio del form per aggiungere un nuovo prodotto
    $("#productForm").on("submit", function(event) {
        event.preventDefault();
        var productName = $("#name").val();
        var productDescription = $("#info").val();
        var productImages = $("#image").val();
        var productBrand = $("#brand").val();
        var productPrice = $("#price").val();

        // Effettua una richiesta POST per aggiungere il nuovo prodotto
        fetch("https://striveschool-api.herokuapp.com/api/product/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNmNTg0NDAwYzFjMjAwMTU3ZTk5Y2UiLCJpYXQiOjE3MTU0MjczOTYsImV4cCI6MTcxNjYzNjk5Nn0.fN9ZSxr7NncGsIptfMZ68SJvdJyzxjm1LsA9RPhc-1U"
            },
            body: JSON.stringify({
                "name": productName,
                "description": productDescription,
                "brand": productBrand,
                "price": productPrice,
                "imageUrl": productImages
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Errore di rete: " + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            $("#successMessage").fadeIn().delay(3000).fadeOut(); // Mostra il messaggio di successo
            loadProducts(); // Ricarica i prodotti dopo l'aggiunta
        })
        .catch(error => {
            console.log("Errore:", error);
        });
    });

    // Funzione per caricare i prodotti dall'API e visualizzarli
    function loadProducts() {
        fetch("https://striveschool-api.herokuapp.com/api/product/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNmNTg0NDAwYzFjMjAwMTU3ZTk5Y2UiLCJpYXQiOjE3MTU0MjczOTYsImV4cCI6MTcxNjYzNjk5Nn0.fN9ZSxr7NncGsIptfMZ68SJvdJyzxjm1LsA9RPhc-1U"
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network non okay");
            }
            return response.json();
        })
        .then(data => {
            displayProducts(data); // Visualizza i prodotti ottenuti dall'API
        })
        .catch(error => {
            console.log("Errore:", error);
        });
    }

    // Funzione per visualizzare i prodotti
    function displayProducts(products) {
        var productCardsContainer = $("#productCards");
        productCardsContainer.empty(); // Svuota il contenitore prima di aggiungere le nuove card

        products.forEach(function(product) {
            var productCard = $("<div class='card col-md-4 pt-3 m-lg-4 '></div>");

            var cardImage = $("<img class='card-img-top' src='" + product.imageUrl + "' alt='" + product.name + "'>");
            var cardBody = $("<div class='card-body'></div>");
            var cardTitle = $("<h5 class='card-title'></h5>").text(product.name);
            var cardDescription = $("<p class='card-text'></p>").text(product.description);
            var cardBrand = $("<p class='card-text'></p>").text("Marca: " + product.brand);
            var cardPrice = $("<p class='card-text'></p>").text("Prezzo: " + product.price + " €");

            var deleteButton = $("<button class='btn btn-danger'></button>").text("Elimina");
            var editButton = $("<button class='btn btn-primary'></button>").text("Modifica");

            cardBody.append(cardTitle, cardDescription, cardBrand, cardPrice, deleteButton, editButton);
            productCard.append(cardImage, cardBody);
            productCardsContainer.append(productCard);

            // Aggiungi event listener per il pulsante di eliminazione
            deleteButton.on("click", function() {
                deleteProduct(product._id); // Elimina il prodotto quando il pulsante Elimina viene premuto
            });

            // Aggiungi event listener per il pulsante di modifica
            editButton.on("click", function() {
                showEditForm(product); // Mostra il modulo di modifica quando il pulsante Modifica viene premuto
            });
        });
    }

    // Funzione per eliminare un prodotto
    function deleteProduct(productId) {
        fetch("https://striveschool-api.herokuapp.com/api/product/" + productId, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNmNTg0NDAwYzFjMjAwMTU3ZTk5Y2UiLCJpYXQiOjE3MTU0MjczOTYsImV4cCI6MTcxNjYzNjk5Nn0.fN9ZSxr7NncGsIptfMZ68SJvdJyzxjm1LsA9RPhc-1U"
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Errore di rete: " + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log("Prodotto eliminato con successo:", data);
            loadProducts(); // Ricarica i prodotti dopo l'eliminazione
        })
        .catch(error => {
            console.log("Errore:", error);
        });
    }

    // Funzione per mostrare il modulo di modifica
    function showEditForm(product) {
        // Popola il form con i dati del prodotto selezionato
        $("#name").val(product.name);
        $("#info").val(product.description);
        $("#image").val(product.imageUrl);
        $("#brand").val(product.brand);
        $("#price").val(product.price);

        // Aggiungi un evento listener per il pulsante di salvataggio personalizzato per questo prodotto
        $("#productForm").off("submit").on("submit", function(event) {
            event.preventDefault();
            var productName = $("#name").val();
            var productDescription = $("#info").val();
            var productImages = $("#image").val();
            var productBrand = $("#brand").val();
            var productPrice = $("#price").val();
            var productId = product._id; // Ottieni l'ID del prodotto direttamente dall'oggetto prodotto

            // Effettua una richiesta PUT per aggiornare il prodotto
            fetch("https://striveschool-api.herokuapp.com/api/product/" + productId, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNmNTg0NDAwYzFjMjAwMTU3ZTk5Y2UiLCJpYXQiOjE3MTU0MjczOTYsImV4cCI6MTcxNjYzNjk5Nn0.fN9ZSxr7NncGsIptfMZ68SJvdJyzxjm1LsA9RPhc-1U"
                },
                body: JSON.stringify({
                    "name": productName,
                    "description": productDescription,
                    "brand": productBrand,
                    "price": productPrice,
                    "imageUrl": productImages
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Errore di rete: " + response.status);
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                $("#successMessage").fadeIn().delay(3000).fadeOut(); // Mostra il messaggio di successo
                loadProducts(); // Ricarica i prodotti dopo l'aggiornamento
            })
            .catch(error => {
                console.log("Errore:", error);
            });
        });
    }

    // Funzione per aggiornare le dimensioni delle card in base alla larghezza della viewport
    function updateCardClasses() {
        $(".card").removeClass("col-6 col-md-4 col-lg-3 col-xl-2");

        var viewportWidth = $(window).width();
        if (viewportWidth >= 1200) {
            $(".card").addClass("col-xl-2");
        } else if (viewportWidth >= 992) {
            $(".card").addClass("col-lg-3");
        } else if (viewportWidth >= 768) {
            $(".card").addClass("col-md-4");
        } else {
            $(".card").addClass("col-6");
        }
    }

    // Chiama la funzione per aggiornare le dimensioni delle card quando la finestra viene ridimensionata
    $(window).on("resize", updateCardClasses);
});



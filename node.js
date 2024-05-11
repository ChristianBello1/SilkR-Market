$(document).ready(function() {
    // Carica i prodotti all'avvio della pagina
    loadProducts();

    // Gestione della ricerca quando viene premuto il tasto Invio nella barra di ricerca
    $("#searchForm").on("submit", function(event) {
        event.preventDefault(); // Evita il comportamento predefinito del form
        var searchTerm = $("#searchInput").val(); // Ottiene il termine di ricerca dalla barra di ricerca
        searchProducts(searchTerm); // Esegue la ricerca
    });

    // Aggiungi un event listener per gestire il click sul bottone "Info Prodotto"
    $(document).on("click", "#info", function() {
        var product = $(this).closest(".card").data("product"); // Ottieni i dati del prodotto associato a questa card
        displayExpandedProduct(product); // Mostra il prodotto espanso
    });

    function loadProducts() {
        $.ajax({
            url: "https://striveschool-api.herokuapp.com/api/product/",
            method: "GET",
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNmNTg0NDAwYzFjMjAwMTU3ZTk5Y2UiLCJpYXQiOjE3MTU0MjczOTYsImV4cCI6MTcxNjYzNjk5Nn0.fN9ZSxr7NncGsIptfMZ68SJvdJyzxjm1LsA9RPhc-1U"
            },
            success: function(data) {
                displayProducts(data);
            },
            error: function(xhr, status, error) {
                console.error("Errore nel caricamento dei prodotti:", error);
            }
        });
    }

    function searchProducts(searchTerm) {
        $.ajax({
            url: "https://striveschool-api.herokuapp.com/api/product/?name=" + searchTerm,
            method: "GET",
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNmNTg0NDAwYzFjMjAwMTU3ZTk5Y2UiLCJpYXQiOjE3MTU0MjczOTYsImV4cCI6MTcxNjYzNjk5Nn0.fN9ZSxr7NncGsIptfMZ68SJvdJyzxjm1LsA9RPhc-1U"
            },
            success: function(data) {
                displayProducts(data);
            },
            error: function(xhr, status, error) {
                console.error("Errore nella ricerca dei prodotti:", error);
            }
        });
    }

    function displayProducts(products) {
        var productContainer = $("#productContainer");
        productContainer.empty(); // Svuota il contenitore prima di aggiungere i nuovi prodotti

        products.forEach(function(product) {
            var productCard = $("<div class='card mb-3'></div>");

            var cardImage = $("<img class='card-img-top' src='" + product.imageUrl + "' alt='" + product.name + "'>");

            var cardBody = $("<div class='card-body'></div>");

            var cardTitle = $("<h5 class='card-title'></h5>").text(product.name);
            var cardDescription = $("<p class='card-text'></p>").text(product.description);
            var cardBrand = $("<p class='card-text'></p>").text("Marca: " + product.brand);
            var cardPrice = $("<p class='card-text'></p>").text("Prezzo: " + product.price + " €");
            const details = $("<button id='info' type='button' class='btn btn-info'></button>").text("Info Prodotto");

            cardBody.append(cardTitle, cardDescription, cardBrand, cardPrice, details);
            productCard.append(cardImage, cardBody);
            productCard.data("product", product); // Aggiungi i dati del prodotto alla card
            productContainer.append(productCard);
        });
    }

    function displayExpandedProduct(product) {
        // Svuota il productContainer
        $("#productContainer").empty();

        // Crea una nuova card più grande
        var expandedCard = $("<div id='info1'></div>");

        var cardImage = $("<img class='card-img-top' src='" + product.imageUrl + "' alt='" + product.name + "'>");
        var cardBody = $("<div class='card-body'></div>");

        var cardTitle = $("<h5 class='card-title'></h5>").text(product.name);
        var cardDescription = $("<p id='descrip' class='card-text'></p>").text(product.description);
        var cardBrand = $("<p id='mp' class='card-text'></p>").text("Marca: " + product.brand);
        var cardPrice = $("<p class='card-text'></p>").text("Prezzo: " + product.price + " €");

        cardBody.append(cardTitle, cardDescription, cardBrand, cardPrice);
        expandedCard.append(cardImage, cardBody);

        // Aggiungi la nuova card al productContainer
        $("#productContainer").append(expandedCard);
    }

    // dimensione card in base alla grandezza della pagina
    $(window).resize(function() {
        $(".card").each(function() {
            $(this).removeClass("col-xl-2 col-lg-3 col-md-4 col-6");
            updateCardClasses($(this));
        });
    });

    // Aggiorna classi card in base alla grandezza della pagina
    function updateCardClasses(card) {
        if ($(window).width() >= 1200) {
            card.addClass("col-xl-2");
        } else if ($(window).width() >= 992) {
            card.addClass("col-lg-3");
        } else if ($(window).width() >= 768) {
            card.addClass("col-md-4");
        } else {
            card.addClass("col-6");
        }
    }

});










  






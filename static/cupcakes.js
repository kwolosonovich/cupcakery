"use strict";
const BASE_URL = "http://127.0.0.1:5000/api";

// const BASE_URL = `${location.host}/api`

function cupcakeHTML(cupcake) {
    return `
<!--        <div class="col">-->
            <div class="card mh-100 m-2 card-border-light" style="width: 18rem;">
                <img src="${cupcake.image}" class="card-img-top" alt="cupcake photo">
            <div class="card-body">
                <h5 class="card-title">${cupcake.flavor}</h5>
            </div>
            <div class="card-body" id="options">
                <div class="list-group" id="myList" role="tablist">
                    <a class="list-group-item-action list-group-item" id="${cupcake.id}" href="/api/cupcakes/${cupcake.id}" data-toggle="list">Details</a>
                </div>
                    <div class="tab-content">
                    <!-- append tab-pane with details on click -->
                    </div>                   
                <button class="remove card-link btn" id="${cupcake.id}" data-id="${cupcake.id}">Remove</button>
            </div>
            </div>
<!--        </div>-->
    `;
}


// add cupcakes to cupcakes.html

async function displayCupcakes() {
    const response = await axios.get(`${BASE_URL}/cupcakes`);

    for (let cupcake of response.data.cupcakes) {
        let addCupcake = $(cupcakeHTML(cupcake));
        $("#menu-list").append(addCupcake);
    }
}

// add new cupcake from form

$('#add-cupcake').on("click", async function (e) {
    e.preventDefault();

    let flavor = $("#flavor").val();
    let rating = $("#rating").val();
    let size = $("#size").val();
    var image = $("#image").val();

    if (image.length === 0) {
        image = 'https://tinyurl.com/demo-cupcake';
    }

    const response = await axios.post(`${BASE_URL}/cupcakes`, {
        flavor,
        rating,
        size,
        image
    });

    let newCupcake = $(cupcakeHTML(response.data.cupcake));
    $("#menu-list").append(newCupcake);
    $("#add-cupcake").trigger("reset");
});

// show cupcake details

$("#menu-list").on('click', function (e) {
    e.preventDefault();

    let t = $(e.target);
    let cupcake = $(e.target).closest("div").parent();
    let cupcakeId = e.target.id;

    if (t.is("button")) {
        removeCupcake(cupcake, cupcakeId);
     } else if (t.is("a")){
        showDetails(cupcakeId);
    }
});

async function showDetails(cupcakeId) {
    const response = await axios.get(`${BASE_URL}/cupcakes/${cupcakeId}`);
    const cupcake = response.data.cupcake;
    $(".tab-content").append(`
        <div class="tab-pane" role="tabpanel" data-toggle="list" id="details-list">
            Size: ${cupcake.size} Rating: ${cupcake.rating}
        </div>
    `);
};

async function removeCupcake(cupcake, cupcakeId) {
    await axios.delete(`${BASE_URL}/cupcakes/${cupcakeId}`);
    cupcake.remove();
}

$(displayCupcakes);
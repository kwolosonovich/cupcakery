"use strict";
const BASE_URL = "http://127.0.0.1:5000/api";
// const BASE_URL = `${window.location.host}/api`

function cupcakeHTML(cupcake) {
    return `
        <div class="col mb-4">
            <div class="card h-100" style="width: 18rem;">
              <img src="${cupcake.image}" class="card-img-top" alt="cupcake photo">
              <div class="card-body">
                <h5 class="card-title">${cupcake.flavor}</h5>
              </div>
              <div class="list-group list-group-flush" id="details-list" role="tablist">
                <div class="list-group-item-action" role="tab" data-toggle="list" id="size">Size: ${cupcake.size}</div>
                <div class="list-group-item-action" role="tab" data-toggle="list" id="rating">Rating: ${cupcake.rating}</div>
              </div>
              <div class="card-body" id="options">
             
                <button href="/api/cupcakes/${cupcake.id}" class="btn details">Details</button>
                <button class="remove card-link btn" onclick="removeBtn()" data-id="${cupcake.id}">Remove</button>
              
              </div>
            </div>
        </div>
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

$('#add-cupcake').on("click", async function(e) {
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


$('.details').on('click', function (e) {
  e.preventDefault()
    console.log('details clicked')
  $("#rating").tab('show')
    $("#size").tab('show')
})

// function removeBtn() {
//     console.log('clicked')
// }

$("#options").on("click", '.remove', function(e) {
    e.preventDefault();
    console.log('div');
});

$(".remove").on('click', async function (e) {
    e.preventDefault();
    console.log('clicked');
});

// $("#remove-btn").on("click", function (e) {
//     e.preventDefault();
//     console.log(e.target
// })
//
// $( "button.remove" ).click(function( event ) {
//     console.log('body');
// });

// $( "body" ).click(function( event ) {
//     console.log('body');
// });
// $("#remove-btn").click(async function(e) {
//     e.preventDefault();
//     let cupcake = $(e.target).data('id');
// })

// $("#remove-btn").click(function (a) {
//     console.log('okay')
// })
//
// $("a").click(function(e){
//     e.precentDefault();
//     console.log('clicked')
// })

$(displayCupcakes);
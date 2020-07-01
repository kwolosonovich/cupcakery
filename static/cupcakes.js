
const BASE_URL = "http://localhost:5000/api";

// ******************
// const BASE_URL = "Access-Control-Allow-Origin: http://localhost:5000/api";

// generate html for each cupcake

function cupcakeHTML(cupcake) {
    return `
        <div class="col">
            <div class="card" style="width: 18rem;">
              <img src="${cupcake.image}" class="card-img-top" alt="cupcake photo">
              <div class="card-body">
                <h5 class="card-title">${cupcake.flavor}</h5>
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">Size: ${cupcake.size}</li>
                <li class="list-group-item">Rating: ${cupcake.rating}</li>
              </ul>
              <div class="card-body">
              
<!--              make into details-->
                <button href="/api/cupcakes/${cupcake.id}" class="btn">Card link</button>
                
<!--                make into delete btn-->
                <a href="#" class="card-link">Another link</a>
              </div>
            </div>
        </div>
    `;
}

// add cupcakes to cupcakes.html

async function displayCupcakes() {
    const response = await axios.get(`${BASE_URL}/cupcakes`);

    // ************************
    // response.set('Access-Control-Allow-Origin', '*');



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


$(displayCupcakes);
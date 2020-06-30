const BASE_URL = "http://localhost:5000/api";

// generate html for each cupcake

function cupcakeHTML(cupcake) {
    return `
        <div class="col">
            <div class="card" style="width: 18rem;">
              <img src="{{ cupcake.image }}" class="card-img-top" alt="cupcake photo">
              <div class="card-body">
                <h5 class="card-title">{{ cupcake.flavor }}</h5>
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">Size: {{ cupcake.size }}</li>
                <li class="list-group-item">Rating: {{ cupcake.rating }}</li>
              </ul>
              <div class="card-body">
                <button href="/api/cupcakes/{{ cupcake.id }}" class="btn">Card link</button>
                <a href="#" class="card-link">Another link</a>
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

/*============== load Api Data =============*/


const  loadApiData = async ()=>{
    
   try{
    const url = await fetch("https://restcountries.com/v3.1/all");
    const date = await url.json();
    await displayCountries(date)

   }
   catch(error){
       console.log(error);
   }
}


loadApiData();


/*========= display data =================*/


const displayCountries = async (countries) => {
    const showAllCountries = document.getElementById('countryAreaShow');
//console.log(countries);

    for(let country of countries){
        const div = document.createElement('div');
        div.classList.add('col');

        const language = Object.values(country.languages);
      //  console.log(language);
        div.innerHTML = `
        <div class="card">
        <img src="${country.flags.png}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Name: ${country.name.common}</h5>
          <p class="card-text">Language: ${language[0]}</p>
                     <!-- Button trigger modal -->
                <button onclick='searchByName("${country.name.common}")' type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Details
                </button>
        </div>
      </div>

        `;
        
        //console.log(country.name.common);
       // console.log(country.flags.png)
      // console.log(country.capital)

      showAllCountries.appendChild(div);
    }

}

// search by Country name 

const searchByName = async (name)=>{
    
    const urlByName = await fetch(`https://restcountries.com/v3.1/name/${name}`);
    const url =  await urlByName.json();
    console.log(url)

    const showSingleCountryInformation = document.getElementById('exampleModal');
    showSingleCountryInformation.innerText = '';
    const div = document.createElement('div');
    div.classList.add('modal-dialog');
    const currency = Object.keys(url[0].currencies);

   // console.log(currency[0]);
    console.log(url[0].currencies[currency]);
    div.innerHTML = `

        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Name: ${url[0].name.common}</h5> <br>
             
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <img src="${url[0].flags.png}" class="card-img-top" alt="...">
                <h5 class="modal-title" id="exampleModalLabel">population: ${url[0].population}</h5>
                <h5 class="modal-title" id="exampleModalLabel">continents: ${url[0].continents}</h5>
                <h5 class="modal-title" id="exampleModalLabel">currencies: ${url[0].currencies[currency].name}  Symbol : ${url[0].currencies[currency].symbol} </h5>
                <h5 class="modal-title" id="exampleModalLabel">Arms</h5>
                <img src="${url[0].coatOfArms.png}" class="card-img-top" alt="no image found">

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
            </div>
        </div>

    
    `;

    showSingleCountryInformation.appendChild(div);
}
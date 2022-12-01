// Hämta knappen och lägga till en eventListener
const btn = document.querySelector('#lang-btn')

btn.addEventListener('click', getLand);


// Hämta information från input
function getLand(event){
    event.preventDefault();

    let input = document.querySelector('#lang-input');

    let lang = input.value.toLowerCase();
    input.value = ''; 
       
    fetchLand(lang);
}


//Fetcha url med informationen från inputen
function fetchLand(lang){
    const url = `https://restcountries.com/v3.1/lang/${lang}`;

    fetch(url)
    .then(response => {
        if(response.status >= 200 && response.status < 300)
        return response.json();
        else throw 'No country found. Try another language';
    })
    .then(displayCountry)
    .catch(error => alert(error));
}


// Visa alla länder som matchar informationen från inputen
function displayCountry(countryData){
    console.log(countryData);
   
    const infoContainer = document.querySelector('#info-container');
    infoContainer.innerHTML = '';

    const underlineInfo = document.createElement('h4');
    infoContainer.append(underlineInfo);
    underlineInfo.innerText = '*The country with the highest population is underlined in red'
    underlineInfo.style.color = 'rgb(255, 140, 132)';

    // Här samlas befolkingsdata från alla länder
    const popNumberArray = [];
    
    countryData.forEach(element => {

        const commonName = document.createElement('h1');
        infoContainer.append(commonName);
        commonName.setAttribute('id', 'country-name')
        commonName.innerText = `Country: ${element.name.common}`;

        const officialName = document.createElement('h2');
        infoContainer.append(officialName);
        officialName.setAttribute('id', 'country-offname')
        officialName.innerText = `Official name: ${element.name.official}`;

        const subregion = document.createElement('h3');
        infoContainer.append(subregion);
        subregion.innerText = `Subregion: ${element.subregion}`;

        const capital = document.createElement('h3');
        infoContainer.append(capital);
        capital.innerText = `Capital: ${element.capital}`;

        const population = document.createElement('h3');
        population.setAttribute('id', 'population');
        infoContainer.append(population);
        population.innerText = `Population: ${element.population} inhabitants`;
        
        let eachPopulation = element.population;

        // Lägger till befolkningsdata i arrayen
        popNumberArray.push(eachPopulation);
        
        const flag = document.createElement('img');
        infoContainer.append(flag);
        flag.src = element.flags.png; 

    })

    // Få den högsta siffran från alla länders befolkning
    let highestPopulation = Math.max(...popNumberArray);

    const popTextArray = document.querySelectorAll('#population');
    
    // Understrecka den högsta befolkningen
    for(let i=0; i<popTextArray.length; i++){
        popTextArray[i].style.border = 'none';
        if(popTextArray[i].innerText == `Population: ${highestPopulation} inhabitants`){
            popTextArray[i].style.borderBottom = '2px solid red';
        }
    }   
} 


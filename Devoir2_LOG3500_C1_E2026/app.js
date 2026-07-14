// ==============================
// Sélection des éléments du DOM
// ==============================

const form = document.getElementById("weatherForm");
const cityInput = document.getElementById("city");
const errorMessage = document.getElementById("errorMessage");

const loading = document.getElementById("loading");
const weatherCard = document.getElementById("weatherCard");
const apiError = document.getElementById("apiError");

const cityName = document.getElementById("cityName");
const country = document.getElementById("country");
const temperature = document.getElementById("temperature");
const wind = document.getElementById("wind");
const weatherStatus = document.getElementById("weatherStatus");


// ==============================
// Événement Submit
// ==============================

form.addEventListener("submit", function (event) {

    event.preventDefault();

    rechercherVille();

});


// ==============================
// Suppression automatique de l'erreur
// ==============================

cityInput.addEventListener("input", () => {

    if (cityInput.value.trim() !== "") {

        cityInput.removeAttribute("aria-invalid");

        errorMessage.textContent = "";

    }

});


// ==============================
// Fonction principale
// ==============================

async function rechercherVille() {

    const ville = cityInput.value.trim();

    weatherCard.classList.add("hidden");
    apiError.classList.add("hidden");


    // Validation

    if (ville === "") {

        cityInput.setAttribute("aria-invalid", "true");

        errorMessage.textContent =
            "Veuillez entrer le nom d'une ville.";

        cityInput.focus();

        return;

    }


    loading.classList.remove("hidden");

    try {

        // =========================
        // API Géocodage
        // =========================

        const geoResponse = await fetch(

            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(ville)}&count=1`

        );


        if (!geoResponse.ok) {

            throw new Error("Ville introuvable.");

        }


        const geoData = await geoResponse.json();


        if (!geoData.results || geoData.results.length === 0) {

            throw new Error("Ville introuvable.");

        }


        const resultat = geoData.results[0];

        const latitude = resultat.latitude;
        const longitude = resultat.longitude;

        const nomVille = resultat.name;
        const pays = resultat.country;


        // =========================
        // API Météo
        // =========================

        const weatherResponse = await fetch(

            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`

        );


        if (!weatherResponse.ok) {

            throw new Error("Impossible de récupérer la météo.");

        }


        const weatherData = await weatherResponse.json();

        const current = weatherData.current_weather;


        // =========================
        // Affichage
        // =========================

        cityName.textContent = nomVille;

        country.textContent = pays;

        temperature.textContent =
            `${current.temperature} °C`;

        wind.textContent =
            `${current.windspeed} km/h`;

        weatherStatus.textContent =
            traduireWeatherCode(current.weathercode);


        weatherCard.classList.remove("hidden");

    }

    catch (error) {

        if (error.message === "Ville introuvable.") {

            apiError.textContent =
                "Aucun résultat trouvé pour cette recherche. Veuillez vérifier l'orthographe.";

        } else {

            apiError.textContent =
                "Connexion impossible. Veuillez vérifier votre accès à Internet.";

        }

        apiError.classList.remove("hidden");

    }

    finally {

        loading.classList.add("hidden");

    }

}



// ==============================
// Traduction des codes météo
// ==============================

function traduireWeatherCode(code) {

    switch (code) {

        case 0:
            return "Ensoleillé";

        case 1:
        case 2:
            return "Partiellement nuageux";

        case 3:
            return "Nuageux";

        case 45:
        case 48:
            return "Brouillard";

        case 51:
        case 53:
        case 55:
            return "Bruine";

        case 61:
        case 63:
        case 65:
            return "Pluie";

        case 71:
        case 73:
        case 75:
            return "Neige";

        case 80:
        case 81:
        case 82:
            return "Averses";

        case 95:
            return "Orage";

        default:
            return "Conditions inconnues";

    }

}
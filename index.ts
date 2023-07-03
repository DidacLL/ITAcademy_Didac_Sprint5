const apiUrl = 'https://icanhazdadjoke.com/';
const latitude = 41.3851; // Latitud de Barcelona
const longitude = 2.1734; // Longitud de Barcelona
const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
class Weather {
    temperature: number;
    windspeed: number;
    winddirection: number;
    weathercode: number;
    is_day: number;
    time: string;
}

let weather: Weather;

fetch(url)
    .then(response => response.json())
    .then(data => {
        weather = data.current_weather;
        document.querySelector('#weather').textContent = "Avui: " + getWeatherDescription(String(weather.weathercode));
    })
    .catch(error => {
        console.log('Error al obtener los datos del tiempo:', error);
    });

async function getJoke(): Promise<{joke:string}> {
    try {
        const answer = await fetch(apiUrl, {
            headers: {
                'Accept': 'application/json'
            }
        });
        if (answer.ok) {
            return await answer.json();
        } else {  
            const errorMessage = await answer.text();
            console.log('Error en obtenir l\'acudit:', errorMessage);
            return { joke: '' };
        }
    } catch (error) {
        console.log('Error:', error);
        return { joke: '' };
    }
}

function onClickNextJoke() {
    console.log("click!")
    getJoke().then(r => {
        const jokeContainer = document.querySelector('#joke-container');
        jokeContainer.textContent = r.joke;
    });
}

const button = document.querySelector('#nextJoke') as HTMLButtonElement;
button.addEventListener('click',()=>onClickNextJoke());

function getWeatherDescription(code) {
    const descriptions = {
        "NA": "No disponible",
        "-1": "Pluja lleugera",
        "0": "Nit clara",
        "1": "Dia assolellat",
        "2": "Parcialment ennuvolat (nit)",
        "3": "Parcialment ennuvolat (dia)",
        "4": "No utilitzat",
        "5": "Boira",
        "6": "Boira densa",
        "7": "Ennuvolat",
        "8": "Molt ennuvolat",
        "9": "Ruixat lleuger (nit)",
        "10": "Ruixat lleuger (dia)",
        "11": "Orvallo",
        "12": "Pluja lleugera",
        "13": "Ruixat fort (nit)",
        "14": "Ruixat fort (dia)",
        "15": "Pluja forta",
        "16": "Aiguaneu (nit)",
        "17": "Aiguaneu (dia)",
        "18": "Aiguaneu",
        "19": "Calabruix (nit)",
        "20": "Calabruix (dia)",
        "21":"Granizo",
        "22":"Nevada ligera (noche)",
        "23":"Nevada ligera (día)",
        "24":"Nieve ligera",
        "25":"Nevada fuerte (noche)",
        "26":"Nevada fuerte (día)",
        "27":"Nieve fuerte",
        "28":"Tormenta eléctrica (noche)",
        "29":"Tormenta eléctrica (día)",
        "30":"Tormenta eléctrica1"
    };
    return descriptions[code] || code;
}

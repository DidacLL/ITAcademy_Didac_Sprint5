const apiUrl = 'https://icanhazdadjoke.com/';
const altApiUrl = 'https://api.chucknorris.io/jokes/random';
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

class ReportJoke {
    constructor(joke: string, score: number, date: string) {
        this.date=date;
        this.joke=joke;
        this.score=score;
    }

    joke: string;
    score: number;
    date: string;
}

let reports: ReportJoke[]=[];
fetch(url)
    .then(response => response.json())
    .then(data => {
        weather = data.current_weather;
        document.querySelector('#weather').textContent = "Avui: " + getWeatherDescription(String(weather.weathercode));
    })
    .catch(error => {
        console.log('Error al obtener los datos del tiempo:', error);
    });

async function getJoke(): Promise<{ joke: string }> {
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
            return {joke: ''};
        }
    } catch (error) {
        console.log('Error:', error);
        return {joke: ''};
    }
}
async function getAltJoke(): Promise<{ value: string }> {
    try {
        const answer = await fetch(altApiUrl, {
            headers: {
                'Accept': 'application/json'
            }
        });
        if (answer.ok) {
            return await answer.json();
        } else {
            const errorMessage = await answer.text();
            console.log('Error en obtenir l\'acudit:', errorMessage);
            return {value: ''};
        }
    } catch (error) {
        console.log('Error:', error);
        return {value: ''};
    }
}

function reportScore(score: number, joke: string) {
    console.log("reportScore: " + score + " -> " + joke);
    const curr = new Date();
    const val = new ReportJoke(joke, score, curr.toISOString());
    reports.push(val);
    console.log(reports);
    document.querySelector('#score-buttons').innerHTML = `
        Gràcies per opinar!
        <button id="changeScore" class="btn btn-primary mx-1">Canviar votació</button>
    `;
    (document.querySelector('#changeScore') as HTMLButtonElement).addEventListener('click', () => {
        reports.pop(); // Eliminar el último registro de votación
        createScoreButtons(joke);
    });
}

function createScoreButtons( joke: string ) {
    document.querySelector('#score-buttons').innerHTML = `
            <button id="score1" class="btn btn-primary mx-1">1</button>
            <button id="score2" class="btn btn-primary mx-1">2</button>
            <button id="score3" class="btn btn-primary mx-1">3</button>
            `;
    (document.querySelector('#score1') as HTMLButtonElement).addEventListener('click', () => reportScore(1, joke));
    (document.querySelector('#score2') as HTMLButtonElement).addEventListener('click', () => reportScore(2, joke));
    (document.querySelector('#score3') as HTMLButtonElement).addEventListener('click', () => reportScore(3, joke));
}

function onClickNextJoke() {
    const alt= Date.now()%2===0;
    console.log("searching joke from "+ (alt?"ChuckNorris":"Anonymous"));
    (alt?getAltJoke():getJoke()).then(r => {
        const jokeContainer = document.querySelector('#joke-container');
        jokeContainer.textContent = alt?r["value"]:r["joke"];
        createScoreButtons(alt?r["value"]:r["joke"]);
    });
}

const button = document.querySelector('#nextJoke') as HTMLButtonElement;
button.addEventListener('click', () => onClickNextJoke());


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
        "21": "Granizo",
        "22": "Nevada ligera (noche)",
        "23": "Nevada ligera (día)",
        "24": "Nieve ligera",
        "25": "Nevada fuerte (noche)",
        "26": "Nevada fuerte (día)",
        "27": "Nieve fuerte",
        "28": "Tormenta eléctrica (noche)",
        "29": "Tormenta eléctrica (día)",
        "30": "Tormenta eléctrica1"
    };
    return descriptions[code] || code;
}

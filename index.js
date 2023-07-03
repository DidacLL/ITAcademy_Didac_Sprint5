var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var apiUrl = 'https://icanhazdadjoke.com/';
var latitude = 41.3851; // Latitud de Barcelona
var longitude = 2.1734; // Longitud de Barcelona
var url = "https://api.open-meteo.com/v1/forecast?latitude=".concat(latitude, "&longitude=").concat(longitude, "&current_weather=true");
var Weather = /** @class */ (function () {
    function Weather() {
    }
    return Weather;
}());
var weather;
fetch(url)
    .then(function (response) { return response.json(); })
    .then(function (data) {
    weather = data.current_weather;
    document.querySelector('#weather').textContent = "Avui: " + getWeatherDescription(String(weather.weathercode));
})
    .catch(function (error) {
    console.log('Error al obtener los datos del tiempo:', error);
});
function getJoke() {
    return __awaiter(this, void 0, void 0, function () {
        var answer, errorMessage, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    return [4 /*yield*/, fetch(apiUrl, {
                            headers: {
                                'Accept': 'application/json'
                            }
                        })];
                case 1:
                    answer = _a.sent();
                    if (!answer.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, answer.json()];
                case 2: return [2 /*return*/, _a.sent()];
                case 3: return [4 /*yield*/, answer.text()];
                case 4:
                    errorMessage = _a.sent();
                    console.log('Error en obtenir l\'acudit:', errorMessage);
                    return [2 /*return*/, { joke: '' }];
                case 5: return [3 /*break*/, 7];
                case 6:
                    error_1 = _a.sent();
                    console.log('Error:', error_1);
                    return [2 /*return*/, { joke: '' }];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function onClickNextJoke() {
    console.log("click!");
    getJoke().then(function (r) {
        var jokeContainer = document.querySelector('#joke-container');
        jokeContainer.textContent = r.joke;
    });
}
var button = document.querySelector('#nextJoke');
button.addEventListener('click', function () { return onClickNextJoke(); });
function getWeatherDescription(code) {
    var descriptions = {
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

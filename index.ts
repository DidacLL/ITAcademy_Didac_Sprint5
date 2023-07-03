const apiUrl = 'https://icanhazdadjoke.com/';

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
        const acuditContainer = document.querySelector('#acuditContainer');
        acuditContainer.textContent = r.joke;
    });
}

const button = document.querySelector('#nextJoke') as HTMLButtonElement;
button.addEventListener('click',()=>onClickNextJoke());
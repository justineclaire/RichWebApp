document.addEventListener('DOMContentLoaded', () => {
    const { fromEvent, map } = rxjs;

    //query selectors
    const startButton = document.getElementById('button');
    const cmin = document.getElementById('cmin');   
    const csec = document.getElementById('csec');
    const chour = document.getElementById('chour');

    //create observable
    const start$ =  fromEvent(startButton, 'click').pipe(
        map( e => {
            e.preventDefault();
            let seconds = Number(document.getElementById('sec').value) || 0;
            let minutes = Number(document.getElementById('min').value) || 0;
            let hours = Number(document.getElementById('hour').value) || 0;

            let totalSeconds = seconds + (minutes * 60) + (hours * 3600);
            setInterval(() =>{
                if(totalSeconds > 0) {
                    totalSeconds--;
                    let displaySeconds = totalSeconds % 60;
                    let displayMinutes = Math.floor((totalSeconds / 60) % 60);
                    let displayHours = Math.floor(totalSeconds / 3600);
                    csec.innerHTML = displaySeconds;
                    cmin.innerHTML = displayMinutes;
                    chour.innerHTML = displayHours;
                }
            }, 1000);
        }        
    ));

    start$.subscribe();


    //Show alert message
    function showAlertMessage(message, alertClass){
        const alertDiv = document.createElement('div');
        alertDiv.className = `message ${alertClass}`;
        alertDiv.appendChild(document.createTextNode(message));
        form.insertAdjacentElement('beforebegin', alertDiv);
        setTimeout(() => alertDiv.remove(), 2000)
    }
    
});
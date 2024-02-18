const a = document.getElementsByTagName('a');
for(let i = 0; i < a.length; i++) {
    a[i].href = a[i].href.replace('dit.ie', 'tudublin.ie');
}

const p = document.getElementsByTagName('p');
for(let i = 0; i < p.length; i++) {
    p[i].addEventListener('click', function (e) {
        p[i].style.backgroundColor = 'yellow';
        p[i].style.fontWeight = 'bold';
    });
}

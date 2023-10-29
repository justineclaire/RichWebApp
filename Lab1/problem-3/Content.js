//array of images
let protImages = [
    "https://animals.sandiegozoo.org/sites/default/files/2016-11/AfricanProtea.jpg",
    "https://floralife.com/wp-content/uploads/2021/10/Protea-scaled.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUlGDATuwVipIOsmFMpU5RqEtzuKBaoSvNRg&usqp=CAU",
    "https://kukiprints.com.au/cdn/shop/products/protea_2_2400x.jpg?v=1653615841",
	"https://i.pinimg.com/originals/a3/af/66/a3af66c14f21387ac4d41fa85c76ecc2.jpg"
];

window.onload = function() {
    document.body.style.backgroundImage = "url('https://i.pinimg.com/originals/7f/30/f2/7f30f2635437a0b5858568cee1fa7e1e.gif')";
}

const imgs = document.getElementsByTagName("img");
for(let i = 0; i < imgs.length; i++) {
    const randomImg = Math.floor(Math.random() * protImages.length)
    imgs[i].src = protImages[randomImg]
}

const headers = document.getElementsByTagName("h1");
for (let i = 0; i < headers.length; i++){
    headers[i].innerText = "Protea take over";
    headers[i].style.color = "orange";
}

const p = document.getElementsByTagName("p");
for (let i = 0; i < p.length; i++){
    p[i].innerText = "Proteas, the national flower of SouthAfrica, can take many forms.";
    p[i].style.color = "pink";
}

const h2 = document.getElementsByTagName("h2");
for (let i = 0; i < h2.length; i++){
    h2[i].innerText = "For a flower, they're a bit odd";
    h2[i].style.color = "aqua";
}

const a = document.getElementsByTagName("a");
for (let i = 0; i < a.length; i++){
    a[i].href = "https://www.youtube.com/watch?v=0PKFnEMschc";
    a[i].innerHTML = "be a gardener";
}



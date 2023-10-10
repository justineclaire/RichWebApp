//array of images
let protImages = [
    "https://animals.sandiegozoo.org/sites/default/files/2016-11/AfricanProtea.jpg",
    "https://floralife.com/wp-content/uploads/2021/10/Protea-scaled.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUlGDATuwVipIOsmFMpU5RqEtzuKBaoSvNRg&usqp=CAU",
    "https://kukiprints.com.au/cdn/shop/products/protea_2_2400x.jpg?v=1653615841",
	"https://i.pinimg.com/originals/a3/af/66/a3af66c14f21387ac4d41fa85c76ecc2.jpg"
];

//reverse through array of images
//getting random image from the array we created before (we use math.floor and math.random to grab a random index in the array)
const imgs = document.getElementsByTagName("img");
for(let i = 0; i < imgs.length; i++) {
    const randomImg = Math.floor(Math.random() * protImages.length)
    imgs[i].src = protImages[randomImg]
}
//do the same for h1 elements
const headers = document.getElementsByTagName("h1");
for (let i = 0; i < headers.length; i++){
    headers[i].innerText = "Protea take over";
    headers[i].style.color = "orange";
}

//do the same for p elements
const p = document.getElementsByTagName("p");
for (let i = 0; i < p.length; i++){
    p[i].innerText = "Proteas, the national flower of SouthAfrica, can take many forms.";
    p[i].style.color = "pink";
}

const h2 = document.getElementsByTagName("b");
for (let i = 0; i < h2.length; i++){
    h2[i].innerText = "For a flower, they're a bit odd";
    h2[i].style.color = "pink";
}


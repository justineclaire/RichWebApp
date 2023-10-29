fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(json => {
        const titlesArray = json.map(item => item.title).filter(title => title.split(" ").length > 6);
        console.log(titlesArray);
      })
      
fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(json => {
    const bodyArray = json.map(item => item.body).flatMap(innerArray => innerArray.split(" "));

    console.log(bodyArray);
})
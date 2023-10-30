fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(json => {
        const titlesArray = json.map(item => item.title).filter(title => title.split(" ").length > 6);
        console.log(titlesArray);
      })
      
fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(json => {
    const bodyArray = json.map(item => item.body).map(word => word.replace('"','')).flatMap(innerArray => innerArray.split(" "));
    const freq = {};
    bodyArray.forEach(word => {
        if (!freq[word]) {
            freq[word] = 0;
        }
        freq[word] += 1;
    });
    console.log(freq);
})
const form = document.querySelector('form');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    var search = document.getElementById("searchInput").value;
    document.getElementById("profile").innerHTML = "";
    document.getElementById("repos").innerHTML = "";

    fetch('https://api.github.com/users/'+search)
    .then(response => response.json())
    .then(data => {
        var email = data.email ? data.email : 'private';
        var location = data.location ? data.location : 'private';

        document.getElementById("profile").innerHTML =  ` 
        <tr><td><img id="profile-pic" src="${data.avatar_url}"></td></tr>
        <tr><td class="profile-item">Name: ${data.name}</td></tr>
        <tr><td class="profile-item">Username: ${data.login}</td></tr>
        <tr><td class="profile-item">Email: ${email}</td></tr>
        <tr><td class="profile-item">Location: ${location}</td></tr>
        <tr><td class="profile-item">Number of Gists: ${data.public_gists}</td></tr>
        `
    })

    fetch('https://api.github.com/users/'+search+'/repos')
    .then(response => response.json())
    .then(repos => {
       repos = repos.map(repo => {return {name: repo.name, desc:repo.description}});
       displayRepos(repos);
    })
})

function displayRepos(repos){

    var repoCount = 0;
    var table2 = document.getElementById("repos");

    for(let i = 0; i < repos.length; i++)
    {
        row = table2.insertRow();
        var cell = row.insertCell();
        cell.className = "repoName";
        cell.innerHTML = "Name:   " + repos[i].name;

        row = table2.insertRow();
        var cell1 = row.insertCell();
        cell1.className = "repoDesc";
        cell1.innerHTML = "Description:   " + repos[i].desc;
                        
        repoCount++;

        if(repoCount > 5)
        {
            table2.className = 'scrollable';
        }
    }
    document.getElementById("repoDiv").appendChild(table2);
        
}
    

    




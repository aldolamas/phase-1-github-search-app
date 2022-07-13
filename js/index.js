const form = document.getElementById('github-form')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    e.target[0].value
    fetch(`https://api.github.com/search/users?q=${e.target[0].value}`)
    .then(response => response.json())
    .then(data => data.items.map(item => {
        const userList = document.querySelector('#user-list')
        const reposList = document.getElementById("repos-list")
        userList.innerHTML = ""
        reposList.innerHTML = ""
        const li = document.createElement("li")
        const h2 = document.createElement("h2")
        h2.textContent = item.login

        h2.addEventListener('click', e => showUserRepos(item.login, e))
        const img = document.createElement("img")
        img.src = item.avatar_url
        // const a = document.createElement("a")
        // a.href = item.url

        li.append(h2, img)
        userList.append(li)

        //userList.innerHTML += `<li><h2>${item.login}</h2></li>`
    }))
    //e.target[0].value = ""
    form.reset()
})

function showUserRepos(username, e) {
    const reposList = document.getElementById("repos-list")
    reposList.innerHTML = ""
    e.preventDefault()
    fetch(`https://api.github.com/users/${username}/repos`)
    .then(response => response.json())
    .then(data => data.map(repo => {
        const li = document.createElement("li")
        const h1 = document.createElement("h1")
        h1.textContent = repo.name
        li.append(h1)
        reposList.append(li)
    })
    )}
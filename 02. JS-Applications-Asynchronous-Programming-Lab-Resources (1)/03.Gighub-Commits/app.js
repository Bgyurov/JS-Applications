function loadCommits() {
    // Try it with Fetch API
    let userName = document.getElementById('username').value
    let repoName = document.getElementById('repo').value
    let ul = document.getElementById('commits');
    ul.innerHTML = '';

    fetch(`https://api.github.com/repos/${userName}/${repoName}/commits`)
        .then(responce => {
            if (responce.ok) {
                return responce.json();
            } else {
                errorCatcher(responce);
            }
        })
        .then(data => {

            data.forEach(commit => {
                let li = document.createElement('li');
                li.textContent = `${commit.commit.author.name}: ${commit.commit.message}`
                ul.appendChild(li);
            });
        })

    function errorCatcher(res) {
        let li = document.createElement('li');
        li.textContent = `Error: ${res.status} (Not Found)`;
        ul.appendChild(li);
    }

}
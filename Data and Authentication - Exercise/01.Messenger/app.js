function attachEvents() {
    const url = 'http://localhost:3030/jsonstore/messenger';

    const messages = document.querySelector('#messages');
    const author = document.querySelector('input[name=author]');
    const content = document.querySelector('input[name=content]');
    const sendBtn = document.querySelector('#submit');
    const refreshBtn = document.querySelector('#refresh');

    sendBtn.addEventListener('click', onSend)
    refreshBtn.addEventListener('click', onRefresh)

    async function onSend() {
        if (author.value && content.value) {
            let info = {
                author: author.value,
                content: content.value
            }
            if (info) {
                info = {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify(info)
                }
            }
            let res = await fetch(url, info);
            let data = await res.json();
            console.log(data);
    
        } else {
            alert('All fields are required');
        }
        author.value = '';
        content.value = '';

    }

    async function onRefresh() {
        let response = await fetch(url);
        let data = await response.json();
        console.log(Object.values(data));
        console.log('--------------------');
        console.log(messages.value);
        // messages.value = Object.values(data)
        //     .map(x => `${x.author}: ${x.content}`).join('\n');
    }

}

attachEvents();
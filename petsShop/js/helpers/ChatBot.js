document.querySelector("button").addEventListener("click", getData);

function getData() {
    const  token = '727438942:AAH7hThfLW5N1_SkE2ZXHKk1U7JYdFHo604',
        getUpdatesUrl = `https://api.telegram.org/bot${token}/getUpdates`;
    getId(getUpdatesUrl);

}

function getId(getUpdatesUrl) {
    let set = new Set(),
        setName = new Set();

    fetch(getUpdatesUrl)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.dir(data);
            data.result.forEach(chatId => {
                /* console.log(chatId.message.text); */
                set.add(chatId.message.chat.id);
                setName.add(chatId.message.chat.first_name);
            });
            set.forEach((el) => {
                /* postText(el); */
            })
            setName.forEach((el) => {
                /* console.log(el); */
            })
        })
}

function postText(chatId) {
    const token = '727438942:AAH7hThfLW5N1_SkE2ZXHKk1U7JYdFHo604',
        text = document.querySelector('input').value,
        sendUrl = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${text}`;

    fetch(sendUrl)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.dir(data);
        })
}

function textShowInTextarea(){
    const posts = document.querySelector('textarea');
    const  token = '727438942:AAH7hThfLW5N1_SkE2ZXHKk1U7JYdFHo604',
        getUpdatesUrl = `https://api.telegram.org/bot${token}/getUpdates`;

    fetch(getUpdatesUrl)
        .then(response => {
            return response.json();
        })
        .then(data => {
            posts.value = '';
            data.result.forEach((text)=>{
                posts.value = text.message.chat.first_name+ ':' + text.message.text + '\n' + posts.value;
            })
        })
}

setInterval(textShowInTextarea, 500);
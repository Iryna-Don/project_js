let qtyOfPosts = 5;
let slcFrom = 0;
let slcTo = qtyOfPosts;

let wrapForUser = document.createElement('section');
document.body.appendChild(wrapForUser);
wrapForUser.classList.add('wrapForUser', 'lora');

let wrapForPosts = document.createElement('section');
wrapForPosts.id = 'wrapForPosts';
wrapForPosts.classList.add('lora');
document.body.appendChild(wrapForPosts);

getInfoAboutUserAndPosts(slcFrom, slcTo)

let divForButtonsPrevAndNext = document.createElement('div');
divForButtonsPrevAndNext.id = 'buttons';
let buttonPrev = document.createElement('button');
buttonPrev.classList.add('prevNext');
let buttonNext = document.createElement('button');
buttonNext.classList.add('prevNext');
divForButtonsPrevAndNext.append(buttonPrev, buttonNext);
buttonNext.innerText = 'Next';
buttonPrev.innerText = 'Previous';

let buttonFlag = document.createElement('button');
buttonFlag.id = 'buttonFlag';
document.body.appendChild(buttonFlag);

buttonNext.addEventListener('click', function () {
    slcFrom += qtyOfPosts;
    slcTo += qtyOfPosts;
    clearPrev();
})
buttonPrev.addEventListener('click', function () {
    slcFrom -= qtyOfPosts;
    slcTo -= qtyOfPosts;
    clearPrev();
})

function clearPrev() {
    wrapForUser.innerHTML = '';
    wrapForPosts.innerHTML = '';
    getInfoAboutUserAndPosts(slcFrom, slcTo);
}

function getInfoAboutUserAndPosts(sliceFrom, sliceTo) {
    let linkID_url = location.search.substring(1);
    let linkForUser = 'https://jsonplaceholder.typicode.com/users/XXX';
    let linkUser = linkForUser.replace('XXX', String(linkID_url));
    let linkForPosts = linkUser + '/posts';

    Promise.all([
        fetch(linkUser).then(value => value.json()),
        fetch(linkForPosts).then(value => value.json())])
        .then(value => {
            let user = value[0];
            let posts = value[1];
            // --------------------------------------User-----------------------------------------
            createFullUserInfo(user);

            function createFullUserInfo(arr) {
                for (let key in arr) {
                    let obj = arr[key];
                    if (typeof obj !== 'object') {
                        let infoElem = document.createElement('div');
                        wrapForUser.appendChild(infoElem);
                        infoElem.innerHTML = `<b>${key}:</b> <i>${obj}</i>`;
                    } else {
                        let infoElem = document.createElement('div');
                        wrapForUser.appendChild(infoElem);
                        infoElem.innerHTML = `<b>${key}:</b>`;
                        createFullUserInfo(obj);
                    }
                }
            }

            // // ---------------------------Posts-------------------------------------------
            wrapForPosts.style.display = 'none';
            let divForPost = document.createElement('div');
            divForPost.classList.add('divForPost');
            wrapForPosts.appendChild(divForPost);
            // --------------------------slice----------------------------------------
            let slicePosts = posts.slice(sliceFrom, sliceTo);
            sliceFrom <= 0 ? buttonPrev.setAttribute('disabled', 'true') : buttonPrev.removeAttribute('disabled');
            sliceTo >= posts.length ? buttonNext.setAttribute('disabled', 'true') : buttonNext.removeAttribute('disabled');

            for (const post of slicePosts) {
                console.log(post);
                let titlePostP = document.createElement('p');
                let {id: postId, title, userId, body: postBody} = post;
                titlePostP.innerText = title;
                titlePostP.classList.add('postTitle');
                divForPost.appendChild(titlePostP);

                titlePostP.addEventListener('click', function () {
                    window.location.href = `post-details.html`;
                    localStorage.setItem('postId', postId);
                    localStorage.setItem('title', title);
                    localStorage.setItem('postBody', postBody);
                    localStorage.setItem('userId', userId);
                });
                // // -------------------------або за допомогою кнопки---------------------------------
                // let btnComments = document.createElement('button');
                // btnComments.classList.add('btnComments');
                // titlePostP.appendChild(btnComments);
                // btnComments.innerText = 'Read Comments';
                // //     -------------------------------Waiting For A Click-------------------------
                // btnComments.addEventListener('click', function () {
                //     window.location.href = `post-details.html`;
                // localStorage.setItem('postId', postId);
                // localStorage.setItem('title', title);
                // localStorage.setItem('postBody', postBody);
                // localStorage.setItem('userId', userId);
                // });
            }
            // -----------------------------------Button For Posts------------------------------
            if (buttonFlag.innerText === 'Hide Posts') {
                wrapForPosts.style.display = 'flex';
                wrapForPosts.appendChild(divForButtonsPrevAndNext);
            } else {
                let flag = false;
                wrapForPosts.appendChild(divForButtonsPrevAndNext);
                buttonFlag.innerText = 'Show Posts';
                buttonFlag.addEventListener('click', function () {
                    if (flag === false) {
                        flag = true;
                        buttonFlag.innerText = 'Hide Posts';
                        wrapForPosts.style.display = 'flex';
                    } else {
                        flag = false;
                        buttonFlag.innerText = 'Show Posts';
                        wrapForPosts.style.display = 'none';
                    }
                })
            }
        })
}



let qtyOfPosts = 5;
let slcFrom = 0;
let slcTo = qtyOfPosts;
let count = 0;

let wrapForUser = document.createElement('section');
document.body.appendChild(wrapForUser);
wrapForUser.classList.add('wrapForUser', 'lora');

let shortInfo = document.createElement('div');
wrapForUser.appendChild(shortInfo);


let fullInfo = document.createElement('div');
wrapForUser.appendChild(fullInfo);


let wrapForPosts = document.createElement('section');
wrapForPosts.id = 'wrapForPosts';
wrapForPosts.classList.add('lora');
document.body.appendChild(wrapForPosts);

getInfoAboutUserAndPosts(slcFrom, slcTo, count);

let divForButtonsPrevAndNext = document.createElement('div');
divForButtonsPrevAndNext.id = 'buttons';
let buttonPrev = document.createElement('button');
buttonPrev.classList.add('prevNext');
let buttonNext = document.createElement('button');
buttonNext.classList.add('prevNext');
divForButtonsPrevAndNext.append(buttonPrev, buttonNext);
buttonNext.innerText = 'Next Posts';
buttonPrev.innerText = 'Previous Posts';

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
    count = 1;
    shortInfo.innerHTML = '';
    fullInfo.innerHTML = '';
    wrapForPosts.innerHTML = '';
    commentsBlock.innerHTML = '';
    getInfoAboutUserAndPosts(slcFrom, slcTo, count);
}

let commentsBlock = document.createElement("section");
commentsBlock.classList.add('commentsBlock');
document.body.insertBefore(commentsBlock, buttonFlag);

function getInfoAboutUserAndPosts(sliceFrom, sliceTo, counter) {
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
            console.log(user, posts)
            // --------------------------------------User-----------------------------------------
            if (counter === 1) {
                fullInfo.style.display = 'none';
                shortInfo.style.display = 'block';
            } else {
                fullInfo.style.display = 'block';
                shortInfo.style.display = 'none';
            }
            createFullUserInfo(user);
            createShortUserInfo(user);
            function createShortUserInfo(arr) {
                let shortUserInfo = document.createElement('div');
                let {id, name, username, phone, email} = arr;
                shortInfo.appendChild(shortUserInfo);
                shortUserInfo.innerHTML = `<b>#id:</b> ${id} <b>name:</b> ${name} <b>username:</b> ${username} <b>tel:</b> ${phone} <b>email:</b> ${email}`;
            }
            function createFullUserInfo(arr) {
                for (let key in arr) {
                    let obj = arr[key];
                    if (typeof obj !== 'object') {
                        let infoElem = document.createElement('div');
                        fullInfo.appendChild(infoElem);
                        infoElem.innerHTML = `<b>${key}:</b> <i>${obj}</i>`;
                    } else {
                        let infoElem = document.createElement('div');
                        fullInfo.appendChild(infoElem);
                        infoElem.innerHTML = `<b>${key}:</b>`;
                        createFullUserInfo(obj);
                    }
                }
            }


            // ---------------------без рекурсії (виключно на 3 рівні)----------------------------
            // for (let infoKey in user) {
            //     let obj1 = user[infoKey];
            //     if (typeof obj1 !== 'object') {
            //         let infoElem1 = document.createElement('div');
            //         wrapForUser.appendChild(infoElem1);
            //         infoElem1.innerHTML = `<b>${infoKey}:</b> <i>${obj1}</i>`;
            //     } else {
            //         let infoElem1 = document.createElement('div');
            //         wrapForUser.appendChild(infoElem1);
            //         infoElem1.innerHTML = `<b>${infoKey}:</b>`;
            //         //----------------------------2 рівень значень------------------------------
            //         for (let obj1Key in obj1) {
            //             let obj2 = obj1[obj1Key];
            //             if (typeof obj2 !== 'object') {
            //                 let infoElem2 = document.createElement('ul');
            //                 infoElem1.appendChild(infoElem2);
            //                 infoElem2.innerHTML = `<b>${obj1Key}:</b> <i>${obj2}</i>`;
            //             } else {
            //                 let infoElem2 = document.createElement('ul');
            //                 infoElem1.appendChild(infoElem2);
            //                 infoElem2.innerHTML = `<b>${obj1Key}:</b>`;
            //                 //----------------------------3 рівень значень------------------------------
            //                 for (let obj2Key in obj2) {
            //                     let obj3 = obj2[obj2Key];
            //                     if (typeof obj3 !== 'object') {
            //                         let infoElem3 = document.createElement('ul');
            //                         infoElem2.appendChild(infoElem3);
            //                         infoElem3.innerHTML = `<b>${obj2Key}:</b> <i>${obj3}</i>`;
            //                     }
            //                 }
            //             }
            //         }
            //     }
            // }
            // ---------------------------Posts-------------------------------------------
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
                let {id: postId, title} = post;
                titlePostP.innerText = title;
                titlePostP.classList.add('inactive');
                divForPost.appendChild(titlePostP);


                titlePostP.addEventListener('click', function () {
                    let actives = document.getElementsByClassName('active');
                    for (let active of actives) {
                        active.classList.remove('active');
                        active.classList.add('inactive');
                    }
                    let linkForComments = `https://jsonplaceholder.typicode.com//posts/${postId}/comments`;
                    titlePostP.classList.remove('inactive');
                    titlePostP.classList.add('active');
                    console.log(actives);


                    Promise.all([
                        fetch(linkForComments).then(value => value.json())])
                        .then(value => {
                            let comments = value[0];
                            console.log(comments);
                            commentsBlock.innerHTML = '';
                            for (const comment of comments) {
                                let {id: commentId, name: commentTitle, email, body: commentBody} = comment;
                                let cardComment = document.createElement('div');
                                commentsBlock.appendChild(cardComment);
                                cardComment.classList.add('comment');

                                let idComment = document.createElement('p');
                                idComment.innerHTML = `<b>#ID of Comment:</b> ${commentId}`

                                let titleComment = document.createElement('p');
                                titleComment.innerHTML = `<b>Title:</b> ${commentTitle}`

                                let emailComment = document.createElement('p');
                                emailComment.innerHTML = `<b>E-mail:</b> ${email}`

                                let bodyComment = document.createElement('p');
                                bodyComment.innerHTML = `<b>Comment:</b> ${commentBody}`

                                cardComment.append(idComment, emailComment, titleComment, bodyComment);

                            }
                        })

                });
                // -------------------------або за допомогою кнопки---------------------------------
                // let btnComments = document.createElement('button');
                // btnComments.classList.add('btnComments');
                // titlePostP.appendChild(btnComments);
                // btnComments.innerText = 'Read Comments';
                // //     -------------------------------Waiting For A Click-------------------------
                // btnComments.addEventListener('click', function () {
                //     window.location.href = `post-details.html`;
                // });
            }

            // -----------------------------------Button For Posts------------------------------
            if (buttonFlag.innerText === 'Hide All') {
                wrapForPosts.style.display = 'flex';
                wrapForPosts.appendChild(divForButtonsPrevAndNext);
            } else {
                let flag = false;
                wrapForPosts.appendChild(divForButtonsPrevAndNext);
                buttonFlag.innerText = 'Show Posts';
                buttonFlag.addEventListener('click', function () {

                    if (flag === false) {
                        flag = true;
                        buttonFlag.innerText = 'Hide All';
                        wrapForPosts.style.display = 'flex';
                        shortInfo.style.display = 'block';
                        fullInfo.style.display = 'none';
                        commentsBlock.style.display = 'flex';
                    } else {
                        flag = false;
                        buttonFlag.innerText = 'Show Posts';
                        wrapForPosts.style.display = 'none';
                        shortInfo.style.display = 'none';
                        fullInfo.style.display = 'block';
                        commentsBlock.style.display = 'none';
                    }
                })
            }
        })
}



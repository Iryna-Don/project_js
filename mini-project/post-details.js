let postId = localStorage.getItem('postId');
let title = localStorage.getItem('title');
let postBody = localStorage.getItem('postBody');
let userId = localStorage.getItem('userId');
let url = `https://jsonplaceholder.typicode.com/posts/${postId}/comments`;
console.log(postId, title, postBody, userId);
let cardPost = document.createElement('section');
cardPost.id = 'cardPost';

let commentsBlock = document.createElement("section");
commentsBlock.classList.add('commentsBlock');

document.body.append(cardPost, commentsBlock);

let postIdP = document.createElement('p');
postIdP.innerHTML = `<b>#Post ID:</b> ${postId}`;

let titleP = document.createElement('p');
titleP.innerHTML = `<b>Title:</b> ${title}`;

let postBodyP = document.createElement('p');
postBodyP.innerHTML = `<b>About:</b> ${postBody}`;

let userIdP = document.createElement('p');
userIdP.innerHTML = `<b>User ID:</b> ${userId}`;

cardPost.append(postIdP, titleP, postBodyP, userIdP);


fetch(url)
    .then(res => res.json())
    .then((comments) => {
        console.log(comments)

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








// // ----------------побачити усю цілком інформацію з ендпойнтів ---------
// // -------------------------- users, posts, comments----------------
// async function getAllInfoFromApi() {
//     let users = await fetch('https://jsonplaceholder.typicode.com/users').then(value => value.json());
//     let posts = await fetch('https://jsonplaceholder.typicode.com/posts').then(value => value.json());
//     let comments = await fetch('https://jsonplaceholder.typicode.com/comments').then(value => value.json());
//     console.log(users, posts, comments);
// }
// getAllInfoFromApi()
// // =====================================
// // =====================================
// Promise.all([
//     fetch('https://jsonplaceholder.typicode.com/users').then(value => value.json()),
//     fetch('https://jsonplaceholder.typicode.com/posts').then(value => value.json()),
//     fetch('https://jsonplaceholder.typicode.com/comments').then(value => value.json())])
//     .then(value => {
//         let users = value[0];
//         let posts = value[1];
//         let comments = value[2];
//         console.log(users, posts, comments);
//
//     })
// // =====================================
// // =====================================
fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then((users) => {
            // --------------------------------Wrap For All Users--------------------------------
            let wrapForUsers = document.createElement('section');
            wrapForUsers.id = 'wrapForUsers';
            document.body.appendChild(wrapForUsers);
            // ----------------------------Form Short Info About User----------------------------
            for (const user of users) {
                let {id: userId, name: userName} = user;
                let divUser = document.createElement('div');
                divUser.classList.add('divUser');
                wrapForUsers.appendChild(divUser);

                let idUserP = document.createElement('p');
                idUserP.classList.add('lora');
                idUserP.innerHTML = `<b>#id:</b> ${userId}`;

                let nameUserP = document.createElement('p');
                nameUserP.classList.add('lora');
                nameUserP.innerHTML = `<b>Name:</b> ${userName}`;

                divUser.append(idUserP, nameUserP);

                //     ---------------------------A Button For Full Info-------------------------------
                let buttonFullInfo = document.createElement('button');
                buttonFullInfo.classList.add('buttonFullInfo');
                divUser.appendChild(buttonFullInfo);
                buttonFullInfo.innerText = 'Click For Full Info'
                //     -------------------------------Waiting For A Click-------------------------
                buttonFullInfo.addEventListener('click', function () {
                    window.location.href = `user-details.html?${userId}`;
                });

            }

        }
    )







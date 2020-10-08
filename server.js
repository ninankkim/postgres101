//You're always going to want to have this here when you're running this type of code:
const config = {
    host: 'localhost',
    port: 5432,
    database: 'likeypixdb'
};

const pgp = require('pg-promise')();
const db = pgp(config);

//TEMPLATE:
// db.query(`
//     select * from users;
// `)
// .then((results) => {
//     results.forEach((user) => {
//         // console.log(user.name);
//         console.log(`${user.name}: ${user.email}`);
//     })
// })
// .catch((e) => {
//     console.log('Whoopsie Daisy')
//     console.log(e);
// });

//OK to leave this out for an express app.
//We want this for our command-line app.
// pgp.end();

//----------------------------------READ------------------------------------//

//READ
//Get all users
function getAllUsers() {
    db.many(`
        select * from users;
    `)
    .then((users) => {
        users.forEach((user) => {
            console.log(`${user.name}: ${user.email}`);
        });
    })
    .catch((e) => {
        console.log(e);
    })
}

function getUserById(userId) {
    return db.one(`
        select * from users
            where id = $1
    `, userId)
    .then(user => {
        return user;
    })
    .catch( e => {
        console.log(e);
    })
}
// getAllUsers()

//----------------------------------POSTS------------------------------------//

//Get all posts
function getAllPosts() {
    db.many(`
        select * from posts;
    `)
    .then((posts) => {
        posts.forEach((posts) => {
            console.log(posts.url);
        })
    })
    .catch((e) => {
        console.log(e);
    })
}
// getAllPosts()

//Get all posts by a specific user
function getPostsByUserId(userId) {
//1. Get the user
//2. Get their posts
    db.many(`
        select * from posts
            where user_id = $1
        ;
    `, userId)
    .then(posts => {
        const userPromise = getUserById(userId);
        console.log(userPromise);
        userPromise.then(theUser => {
        // console.log(theUser);
        posts.forEach(post => {
            console.log(`${post.id}: ${post.url}`);
        })
    })
})
    .catch(e => {
        console.log(e);
    })
    //and return it all together
}


//getAllComments
//getAllCommentsByUserId

//getAllCommentsWithUser
//getPostsWithLikes

//CREATE
//UPDATE
//DELETE

//getPostsByUserId(2)
//pgp.end();
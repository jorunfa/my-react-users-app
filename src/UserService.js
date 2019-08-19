const URL = "https://api.myjson.com/bins/7j8uj";

async function fetchUsers() {
    const res = await fetch(URL);
    return await res.json();
}

// async function fetchUser(userId) {
//     const users = await fetchUsers();
//     return users.find(u => u.id === userId);
// }

async function updateUsers(users) {
    fetch(URL, {
        method: 'PUT',
        body: JSON.stringify(users),
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export { fetchUsers, updateUsers };

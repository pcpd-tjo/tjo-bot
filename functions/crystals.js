/* eslint-disable no-unused-labels */
/* eslint-disable no-undef */

async function FetchCrystals(client) {
    let crystals = {}
    const database = client.db;
    const ref = database.ref(`players/`);
    ref.once("value").then((snapshot) => {
        let players = snapshot.val();
        for (let player in players) {
            const userId = player;
            player = players[player];
            crystals[userId] = player.ownedCrystals || [];
        }
    })
    return crystals;
}

async function CacheCrystals(client) {
    client.cachedCrystals = [];
    client.cachedCrystals = await FetchCrystals(client);
}

const isStringsArray = arr => arr.every(i => typeof i === "string")

async function AddCrystals(client, userId, crystals) {
    if (typeof crystals == "object" && isStringsArray(titles)) {
        const titlesRef = database.ref(`players/${userId}/ownedCrystals`);
        titlesRef.set([...crystals]);
    }
}

module.exports = {
    fetch: FetchCrystals,
    cacheCrystals: CacheCrystals,
    addCrystals: AddCrystals,
}
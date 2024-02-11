/* eslint-disable no-unused-labels */
/* eslint-disable no-undef */
const { ref, onValue, set } = require("firebase/database")

let crystals = {}
async function FetchCrystals(client, playerID) {

    if (!playerID) {
        const playersRef = ref(client.db, 'players/');
        onValue(playersRef, (snapshot) => {
            const players = snapshot.val();
            for (let player in players) {
                const userId = player;
                player = players[player];
                crystals[userId] = player.ownedCrystals || [];
            }
        });
    } else {
        const playersRef = ref(client.db, 'players/' + playerID);
        onValue(playersRef, (snapshot) => {
            const players = snapshot.val();
            return player.ownedCrystals;

        });
    }


    return crystals;
}



async function CacheCrystals(client) {
    client.cachedCrystals = [];
    client.cachedCrystals = await FetchCrystals(client);
}

async function FetchCachedCrystalsWithoutClient() {
    return crystals;
}

const isStringsArray = arr => arr.every(i => typeof i === "string")

async function AddCrystals(client, userId, crystals) {
    if (typeof crystals == "object" && isStringsArray(titles)) {
        const titlesRef = ref(`players/${userId}/ownedCrystals`);
        set(titlesRef, [...crystals])
    }
}

module.exports = {
    fetch: FetchCrystals,
    fetchCachedCrystalsWithoutClient: FetchCachedCrystalsWithoutClient,
    cacheCrystals: CacheCrystals,
    addCrystals: AddCrystals,
}
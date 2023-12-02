/* eslint-disable no-unused-labels */
/* eslint-disable no-undef */
//const backup = {
//  "Council of First Knowledge": [
//    "Master of First Knowledge",
//    "Councilor of First Knowledge",
//    "Assistant of First Knowledge"
//  ],
//  "Council of Reassignment": [
//    "Master of Reassignment",
//    "Councilor of Reassignment",
//    "Assistant of Reassignment"
//  ],
//  "Council of Reconciliation": [
//    "Master of Reconciliation",
//    "Councilor of Reconciliation",
//    "Assistant of Reconciliation"
//  ],
//  "Event Titles": [
//    "Master of the Blade"
//  ],
//  "Jedi Artisans": [
//    "Lead Artisan",
//    "Jedi Artisan",
//    "Forgemaster"
//  ],
//  "Jedi Consulars": [
//    "Consular Overseer",
//    "Deputy Consular Overseer"
//  ],
//  "Jedi Guardians": [
//    "Guardian Overseer",
//    "Guardian Deputy Overseer"
//  ],
//  "Jedi Sentinels": [
//    "Sentinel Overseer",
//    "Deputy Sentinel Overseer"
//  ],
//  "Jedi Task Force": [
//    "Head of Task Force",
//    "Jedi Task Force"
//  ],
//  "Temple Guards": [
//    "Temple Guard Commandant",
//    "Vanguard",
//    "Officer of Discipline",
//    "Assistant of Discipline",
//    "Officer of Quality",
//    "Assistant of Quality",
//    "Officer of Activity",
//    "Assistant of Activity",
//    "Instructor",
//    "Elite Guard",
//    "Ashla",
//    "Bogan"
//  ]
//}


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
    client.cachedCrystals = await FetchCrystals(client)
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
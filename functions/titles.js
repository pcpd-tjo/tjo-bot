/* eslint-disable no-unused-labels */
/* eslint-disable no-undef */

const { ref, onValue, set } = require("firebase/database")

/* let titles = {}
async function FetchTitles(client) {
  const playersRef = ref(client.db, 'players/');
  onValue(playersRef, (snapshot) => {
    const players = snapshot.val();
    for (let player in players) {
      const userId = player;
      player = players[player];
      titles[userId] = player.ownedTitles || [];
    }
  });
  return titles;
} */

const { db } = require("../index");

let titles = {}
async function FetchTitles(client, playerID) {
  if (!playerID) {
    const playersRef = ref(db, 'players/');
    onValue(playersRef, (snapshot) => {
      const players = snapshot.val();
      for (let player in players) {
        const userId = player;
        player = players[player];
        titles[userId] = player.ownedTitles || [];
      }
    });
    return titles;
  } else {
    const playersRef = ref(db, 'players/' + playerID);
    onValue(playersRef, (snapshot) => {
      const player = snapshot.val();
      return player.ownedTitles;

    });
  }
}

async function CacheTitles(client) {
  client.cachedTitles = await FetchTitles(client)
}

async function FetchCachedTitlesWithoutClient() {
  return titles;
}

const isStringsArray = arr => arr.every(i => typeof i === "string")

async function AddTitles(client, userId, titles) {
  if (typeof titles == "object" && isStringsArray(titles)) {
    const titlesRef = ref(`players/${userId}/ownedTitles`);
    set(titlesRef, [...titles]);
  }
}
//async function RemoveTitles(client, userId, titles) {
//
//}

module.exports = {
  fetch: FetchTitles,
  fetchCachedTitlesWithoutClient: FetchCachedTitlesWithoutClient,
  cacheTitles: CacheTitles,
  addTitles: AddTitles,
  //removeTitles: RemoveTitles
}
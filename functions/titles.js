/* eslint-disable no-unused-labels */
/* eslint-disable no-undef */

let titles = {}

async function FetchTitles(client) {
  const database = client.db;
  const ref = database.ref(`players/`);
  ref.once("value").then((snapshot) => {
    let players = snapshot.val();
    for (let player in players) {
      const userId = player;
      player = players[player];
      titles[userId] = player.ownedTitles || [];
    }
  })
  return titles;
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
    const titlesRef = database.ref(`players/${userId}/ownedTitles`);
    titlesRef.set([...titles]);
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
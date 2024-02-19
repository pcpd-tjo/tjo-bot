import { db, query } from "../database.js";

const getPlayerTitleRef = (userID) => { return `/players/${userID}/ownedTitles` }

export const getPlayerTitles = async (userID) => {
  const playerRefPath = getPlayerTitleRef(userID);
  const titlesRef = db().ref(playerRefPath);
  return (query(titlesRef).then(function (titles) {
    console.log(titles);
    return titles
  }))
}

import { db, query } from "../database.js";

const getPlayerCrystalRef = (userID) => { return `/players/${userID}/ownedCrystals` }

export const getPlayerCrystals = async (userID) => {
  const playerRefPath = getPlayerCrystalRef(userID);
  const crystalsRef = db().ref(playerRefPath);
  return (query(crystalsRef).then(function (crystals) {
    return crystals
  }))
}


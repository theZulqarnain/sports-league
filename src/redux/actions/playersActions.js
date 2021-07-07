import { PLAYERS } from "../../configs/constants";
import { v4 as uuidv4 } from 'uuid';
import { generateNextId } from "../../utils/idGeneratorService";

export const AddPlayerHandler =  (playerName) => {
    return async(dispatch,getState) => {
        try{
            console.log(playerName,'playerName');
            const players = {...getState().Player.Players}
            const keys = Object.keys(players);
            const lastId = keys[keys.length-1];
            const uuid = generateNextId('PLAYER',lastId)//uuidv4();
            players[uuid] = {id:uuid,name:playerName}
            dispatch({type:PLAYERS,payload:players})
            return players[uuid];
        }catch(e){
            console.log(e,'error')
        }
    }
}

export const PlayerDeleteHandler =  (id) => {
    return async(dispatch,getState) => {
        try{
            const players = {}
        }catch(e){
            console.log(e,'error')
        }
    }
}
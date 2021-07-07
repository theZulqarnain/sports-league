import { TEAMS } from "../../configs/constants";
import { v4 as uuidv4 } from 'uuid';
import { AddPlayerHandler } from "./playersActions";
import { generateNextId } from "../../utils/idGeneratorService";

export const AddTeamHandler =  (teamName) => {
    return async(dispatch,getState) => {
        try{
            console.log(teamName,'teamId');
            const teams = {...getState().Team.Teams}
            const keys = Object.keys(teams);
            const lastId = keys[keys.length-1];
            const uuid = generateNextId('TEAM',lastId) //uuidv4();
            teams[uuid] = {id:uuid,name:teamName,players:[]}
            console.log('updatedTeam',teams);
            dispatch({type:TEAMS,payload:teams})
        }catch(e){
            console.log(e,'error')
        }
    }
}

export const RemoveTeamHandler =  (teamId) => {
    return async(dispatch,getState) => {
        try{
            console.log(teamId,'teamId');
            const teams = {...getState().Team.Teams}
            const updatedTeam = delete teams[teamId];
            console.log(updatedTeam,'updatedTeam',teams);
            dispatch({type:TEAMS,payload:teams})
        }catch(e){
            console.log(e,'error')
        }
    }
}

export const AddPlayerToTeamHandler =  (player,teamId) => {
    return async(dispatch,getState) => {
        try{
            const teams = {...getState().Team.Teams}
            const players = teams[teamId]['players'];
            const updatePlayer = await dispatch(AddPlayerHandler(player))
            players.push(updatePlayer.id)
            teams[teamId]['players'] = players;
            dispatch({type:TEAMS,payload:teams})
        }catch(e){
            console.log(e,'error')
        }
    }
}

export const DeletePlayerFromTeamHandler =  (player) => {
    return async(dispatch,getState) => {
        try{
            const teams = {...getState().Team.Teams}
            const players = teams[player.teamId]['players'];
            const playerIndex = players.indexOf(player.id)
            players.splice(playerIndex, 1);
            
            teams[player.teamId]['players'] = players;
            console.log(teams,'updated');
            dispatch({type:TEAMS,payload:teams})
        }catch(e){
            console.log(e,'error')
        }
    }
}
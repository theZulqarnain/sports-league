
export const generateNextId = (item, id="") => {

    if (item === 'PLAYER') {
      return generateNextIDforPlayer(id);
    }
    if (item === 'TEAM') {
      return generateNextIDforTeam(id);
    }
    return "InValid"
  }

const generateNextIDforTeam = (id) => {
    if(id){
        return `TM-${idPadderGenerator(parseInt((id).substr(3)), 4, 0)}`;
    }else{
        return `TM-001`;
    }
}

const generateNextIDforPlayer = (id) => {
    if(id){
        return `USR-${idPadderGenerator(parseInt((id).substr(4)), 3, 0)}`;
    }else{
        return `USR-001`;
    }
    
}

const idPadderGenerator = (idVal, padLength, startWith = 1) => {

    idVal = idVal.toString();
    if (idVal.length === padLength) {
      return idVal;
    } else {
      const paddNum = padLength - idVal.length;
      let temp = startWith + '';
      for (let idx = 0; idx < paddNum - 1; idx++) {
        temp += '0';
      }
      return `${temp}${++idVal}`;
    }

  }
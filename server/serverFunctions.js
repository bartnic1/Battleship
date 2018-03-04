module.exports = {
  generateShips: function (ships){
    //Creates a random int from 0 up to but not including max
    function getRandomInt(max){
      return Math.floor(Math.random() * Math.floor(max));
    }
    function generateLine(direction, coord, length){
      let points = [coord];
      switch(direction){
      case "north":
        for(let i = 1; i < length; i++){
          points.push([coord[0], coord[1] - i]);
        }
        break;
      case "east":
        for(let i = 1; i < length; i++){
          points.push([coord[0] + i, coord[1]]);
        }
        break;
      case "south":
        for(let i = 1; i < length; i++){
          points.push([coord[0], coord[1] + i]);
        }
        break;
      case "west":
        for(let i = 1; i < length; i++){
          points.push([coord[0] - i, coord[1]]);
        }
        break;
      default:
        break;
      }
      return points;
    }

    function isColliding(points, allShipLocs){
      for(newPoint of points){
        for(existingPoint of allShipLocs){
          if(newPoint[0] === existingPoint[0] && newPoint[1] === existingPoint[1]){
            return true;
          }
        }
      }
      return false;
    }

    let allShipLocs = [];
    let computerShips = {};
    let points;
    for(ship in ships){
      badCoordinate = true;
      let length = ships[ship].length;
      while(badCoordinate){
        let x = getRandomInt(10);
        let y = getRandomInt(10);
        let coord = [x, y];
        //Check all four cardinal directions; if any work, check for intersections with other ships
        if(y - length + 1 >= 0){
          points = generateLine("north", coord, length);
          if(!isColliding(points, allShipLocs)){
            break;
          }
        }if(x + length - 1 <= 9){
          points = generateLine("east", coord, length);
          if(!isColliding(points, allShipLocs)){
            break;
          }
        }if(y + length - 1 <= 9){
          points = generateLine("south", coord, length);
          if(!isColliding(points, allShipLocs)){
            break;
          }
        }if(x - length + 1 >= 0){
          points = generateLine("south", coord, length);
          if(!isColliding(points, allShipLocs)){
            break;
          }
        }
      }
      for (coordinate of points){
        allShipLocs.push(coordinate);
      }
      computerShips[ship] = points;
    }
    return computerShips;
  },

  randomShot: function(shotsTaken){
    function getRandomInt(max){
      return Math.floor(Math.random() * Math.floor(max));
    }
    let alreadyShot = true;
    while(alreadyShot){
      alreadyShot = false;
      let newShotCoordinates = [getRandomInt(10), getRandomInt(10)];
      for(let shot of shotsTaken){
        if(shot[0] === newShotCoordinates[0] && shot[1] === newShotCoordinates[1]){
          alreadyShot = true;
        }
      }
    }
    return newShotCoordinates;
  }

};
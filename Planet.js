class Planet
{
    G = 0.000000000667430 * Math.pow(10,-16);
    //G = 1 * Math.pow(10,-29);
    planet;
    rad;
    xPos;
    yPos;
    zPos;
    mass;
    speed;
    grav = [];
    

    constructor(planetName, radius, xPosition, yPosition, zPosition, planetMass, speedVector)
    {
        this.planet = planetName;
        this.rad = radius;
        this.xPos = xPosition - this.rad/2;
        this.yPos = yPosition - this.rad/2;
        this.zPos = zPosition - this.rad/2;
        this.mass = planetMass;
        this.speed = speedVector;
    }

    calculateForce(planet)
    {
        var lowerConstrain = Math.pow(10,20);
        var upperConstrain = Math.pow(10,32);
        
        var divider = Math.pow(Math.sqrt(
            Math.pow(this.xPos - planet.xPos,2) + 
            Math.pow(this.yPos - planet.yPos,2) + 
            Math.pow(this.zPos - planet.zPos,2)),2);
        
        divider = this.constrain(divider, lowerConstrain, upperConstrain);
        
        return this.G * (this.mass * planet.mass) / divider;
    }
    calculateDirection(planet)
    {
        var dirVector = [planet.xPos - this.xPos, 
            planet.yPos - this.yPos,
            planet.zPos - this.zPos];
        
        var mag = Math.sqrt(
            Math.pow(dirVector[0],2) + 
            Math.pow(dirVector[1],2) + 
            Math.pow(dirVector[2],2));
        
        
        return [dirVector[0]/mag, dirVector[1]/mag, dirVector[2]/mag];
    }

    updatePosition(sun)
    {
        var gravitationalMagnitude = this.calculateForce(sun);
        var gravitationalDirection = this.calculateDirection(sun);
        //console.log(this.planet + " mag: " + gravitationalMagnitude);

        var gravityForce = [gravitationalDirection[0] * gravitationalMagnitude, 
        gravitationalDirection[1] * gravitationalMagnitude,
        gravitationalDirection[2] * gravitationalMagnitude];
        //console.log("zDir: " + gravitationalDirection[2] + " with magnitude: " + gravitationalMagnitude);
        this.grav = gravityForce;

        this.speed[0] += gravityForce[0];
        this.speed[1] += gravityForce[1];
        this.speed[2] += gravityForce[2];

        this.xPos +=  this.speed[0];
        this.yPos += this.speed[1];
        this.zPos += this.speed[2];

        //console.log(this.zPos);
    }

    constrain(val, lowerBound, upperBound)
    {
        var res = val < lowerBound ? lowerBound : val;
        res = val > upperBound ? upperBound : res;
        return res;
    }
    
}
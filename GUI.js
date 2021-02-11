class GUI
{
    Scaler = 1000000000;
    radScaler = 100000000;

    GUIXReference = 0;
    GUIYReference = 0; 
    GUIZReference = 0;

    displayPlanets(planets)
    {
        //console.log("GUI Rendering");
        var c = document.getElementById('SolarSystem');
        var ctx = c.getContext('2d');
        ctx.clearRect(0,0,c.width, c.height);
        var xOrigo = c.width/2;
        var yOrigo = c.height/2;
        
        var i = 0;
        ctx.fillStyle = "rgb(0,0,100)";
        ctx.fillRect(0, 0, c.width, c.height); //Background
        while(i < planets.length)
        { 
            ctx.beginPath();
            ctx.fillStyle = 'rgb(200,100,100)';
            ctx.strokeStyle = "rgb(0,0,0);"
            ctx.font = "15px Arial";

            var depthScale = planets[i].rad/this.radScaler + planets[i].zPos/this.Scaler;
            depthScale = depthScale < 1 ? 1 :depthScale;
            
            ctx.fillText(planets[i].planet,
            xOrigo + planets[i].xPos/this.Scaler + depthScale,
            yOrigo + planets[i].yPos/this.Scaler + depthScale);
            
            ctx.arc(xOrigo + planets[i].xPos/this.Scaler, 
            yOrigo + planets[i].yPos/this.Scaler,
            depthScale,
            0,2*Math.PI);
            ctx.fill();
            ctx.stroke();
            
            this.drawLine(ctx, xOrigo + planets[i].xPos/this.Scaler + depthScale,
                yOrigo + planets[i].yPos/this.Scaler + depthScale,
                xOrigo + planets[i].xPos/this.Scaler + depthScale + planets[i].grav[0]*0.0000004,
                yOrigo + planets[i].yPos/this.Scaler + depthScale + planets[i].grav[1]*0.0000004,
                "rgb(70,250,70)");
            this.drawLine(ctx, xOrigo + planets[i].xPos/this.Scaler + depthScale,
                yOrigo + planets[i].yPos/this.Scaler + depthScale,
                xOrigo + planets[i].xPos/this.Scaler + depthScale + planets[i].speed[0]*0.0000002,
                yOrigo + planets[i].yPos/this.Scaler + depthScale + planets[i].speed[1]*0.0000002,
                "rgb(150,100,0)");

            i++;
        }
    }
    getRandomColor() 
    {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    drawLine(ctx, x1, y1, x2, y2, color)
    {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.moveTo(x1, y1);            
        ctx.lineTo(x2, y2);        
        
        ctx.stroke();
    }
}
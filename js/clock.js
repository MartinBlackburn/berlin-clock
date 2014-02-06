BerlinClock = function() 
{   
    //containers
    var secondsRow = $(".seconds");
    var hours5Row = $(".hours-5");
    var hours1Row = $(".hours-1");
    var minutes5Row = $(".mins-5");
    var minutes1Row = $(".mins-1");
    
    //get current time
    var time = new Date();
    
    //every second get new time and update the lights
    setInterval(function()
    {
        //update time
        time = new Date();
        
        //remove lights
        removeLights();
        
        //seconds light
        setSecondsLights();
        
        //minutes lights
        setMinutesLights();
        
        //hours lights
        setHoursLights();
        
        //update real time
        displayTime();
    }, 1000);
    
    
    //set seconds lights
    //every even second the light is yellow, otherwise it's off
    function setSecondsLights()
    {
        //every even second light is yellow
        //otherwise light is off
        if(time.getSeconds() % 2 == 0)
        {
            addLight("yellow", secondsRow);
        } else {
            addLight("off", secondsRow);
        }
    }
    
    
    //set minutes lights
    function setMinutesLights()
    {
        //add eleven 5-minute block lights
        for(i=5; i<=55; i+=5)
        {
            //if minute greater than 5, then light yellow
            //if the 15-min light, then light red
            //otherwise light is off
            if(time.getMinutes() >= i) {
                if(i % 15 == 0) {
                    addLight('red', minutes5Row);
                } else {
                    addLight('yellow', minutes5Row);
                }
            } else {
                addLight('off', minutes5Row);
            }
        }
        
        //add the four 1-minute block lights
        for(i=1; i<=4; i++)
        {
            //light red for every minute that doesnt fit into a 5-minute block
            //otherwise light is off
            if(time.getMinutes() % 5 >= i) {
                addLight('yellow', minutes1Row);
            } else {
                addLight('off', minutes1Row);
            }
        }
    }
    
    
    //set hours lights
    function setHoursLights()
    {
        //add the four 5-hour block lights
        for(i=5; i<=20; i+=5)
        {
            //if hour greater than 5, then light red
            //otherwise light is off
            if(time.getHours() >= i) {
                addLight('red', hours5Row);
            } else {
                addLight('off', hours5Row);
            }
        }
        
        //add the four 1-hour block lights
        for(i=1; i<=4; i++)
        {
            //light red for every hour that doesnt fit into a 5-hour block
            //otherwise light is off
            if(time.getHours() % 5 >= i) {
                addLight('red', hours5Row);
            } else {
                addLight('off', hours5Row);
            }
        }
    }
    
    
    //display the real time
    function displayTime()
    {
        var hours = time.getHours();
        var minutes = time.getMinutes();
        
        if(hours < 10) {
            hours = "0" + hours;
        }
        
        if(minutes < 10) {
            hours = "0" + minutes;
        }
        
        $('.time').text(hours + ":" + minutes);
    }
    
    
    //add a new light of the specified colour to the specified row
    function addLight(colour, row)
    {
        $('<div/>', {
            'class': 'block ' + colour
        }).appendTo(row);
    }
    
    
    //clear all lamps
    function removeLights()
    {
        secondsRow.empty();
        hours5Row.empty();
        hours1Row.empty();
        minutes5Row.empty();
        minutes1Row.empty();
    }
};

$(function() 
{
    new BerlinClock();
});
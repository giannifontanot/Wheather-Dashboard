// Define a City Object
function CityObject(name){
    this.name = name;
}

// Define a Moon Object
function MoonObject(moonPercentage, phaseName, phaseImage){
    this.phaseName = phaseName;
    this.phaseImage = phaseImage;
    this.moonPercentage = moonPercentage;
    this.findMoonPhase = findMoonPhase;
}


function findMoonPhase(){

    // Define the returning object
    let propMoonPercentage = this.moonPercentage;

    // Finding the variables ...
    propMoonPercentage = propMoonPercentage + 1;
    propMoonPercentage = propMoonPercentage - 1;
    let offset = -0.0755;
    let img = "";
    let name = "";

    if(propMoonPercentage >= (offset+(8*0.125))){
        img = "moon-8-8";
        name = "Full Moon";
    } else
        if(propMoonPercentage >= (offset+(7*0.125))){
            img = "moon-7-8";
            name = "Waxing Gibbous";
        } else
             if(propMoonPercentage >= (offset+(6*0.125))){
                img = "moon-6-8";
                name = "First Quarter";
             } else
                 if(propMoonPercentage >= (offset+(5*0.125))){
                        img = "moon-5-8";
                        name = "Waxing Crescent";
                    } else
                        if(propMoonPercentage >= (offset+(4*0.125))){
                            img = "moon-4-8";
                            name = "New Moon";
                        } else
                             if(propMoonPercentage >= (offset+(3*0.125))){
                                img = "moon-3-8";
                                name = "Waning Crescent";
                             } else
                                  if(propMoonPercentage >= (offset+(2*0.125))){
                                    img = "moon-2-8";
                                    name = "Third Quarter";
                                  } else
                                      if(propMoonPercentage >= (offset+(1*0.125))){
                                        img = "moon-1-8";
                                        name = "Waning Gibbous";
                                      }

    this.phaseName = name;
    this.phaseImage = img;
}


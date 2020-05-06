'use strict';

let Randomizer = {
    positionArray: [],
    MENU_1_ACTIVE: false,
    MENU_2_ACTIVE: false,
    MENU_3_ACTIVE: false,
    LOGGER: null,   // TODO: Custom logger writer 
    initRandomizer: function() {
        Randomizer.pushToPositionArray(0);
        Randomizer.pushToPositionArray(120);
        Randomizer.pushToPositionArray(230); 
        console.log("Randomizer initialized");
    },
    startRandomizer: function(param) {
        let arrow = null;
        if(this.positionArray.length === 0) {
            Randomizer.initRandomizer();
        }      
        if(null != param) {
            switch(param) {
                case Consts.MENU_1:
                    if(!this.MENU_1_ACTIVE) {
                        this.MENU_1_ACTIVE = true;
                        arrow = document.querySelector('#arrow1');
                        Randomizer.initAnimation(arrow.id, Consts.MENU_1);
                    } 
                break;
                case Consts.MENU_2:
                    if(!this.MENU_2_ACTIVE) {
                        this.MENU_2_ACTIVE = true;
                        arrow = document.querySelector('#arrow2');
                        Randomizer.initAnimation(arrow.id, Consts.MENU_2);
                    } 
                break;
                case Consts.MENU_3:
                    if(!this.MENU_3_ACTIVE) {
                        this.MENU_3_ACTIVE = true;
                        arrow = document.querySelector('#arrow3');
                        Randomizer.initAnimation(arrow.id, Consts.MENU_3);
                    } 
                break;
            }
        }
    },
    initAnimation: function (arrowId, menuId) {
        let configObject = Randomizer.buildConfigObject(arrowId, menuId);
        let id = setInterval(frame, 10);
        function frame() {            
            Randomizer.runAnimation(configObject, id);                
        }
    },
    runAnimation: function(configObject, id) {
        if(configObject.menuId === Consts.MENU_1) {
            if(configObject.CURRENT_NUM <= configObject.RANDOM_NUM) {
                if(configObject.lastPosition == Randomizer.positionArray[0]) {
                    configObject.pos += configObject.speed1;
                    configObject.elem.style.left = configObject.pos + "px"; 
                    if(configObject.pos >= Randomizer.positionArray[1]) {
                        configObject.lastPosition = Randomizer.positionArray[1];
                        configObject.CURRENT_NUM++;
                    }
                } else if(configObject.lastPosition == Randomizer.positionArray[1]) {
                    configObject.pos -= configObject.speed1;
                    configObject.elem.style.left = configObject.pos + "px"; 
                    if(configObject.pos <= Randomizer.positionArray[0]) {
                        configObject.lastPosition = Randomizer.positionArray[0];
                        configObject.CURRENT_NUM++;
                    }
                }
            } else {
                clearInterval(id);
                this.MENU_1_ACTIVE = false;
            }
        } else {
            if(configObject.CURRENT_NUM <= configObject.RANDOM_NUM) {
                if(configObject.lastPosition == Randomizer.positionArray[0]) {
                    configObject.pos += configObject.speed2;
                    configObject.elem.style.left = configObject.pos + "px"; 
                    if(configObject.pos >= Randomizer.positionArray[1]) {
                        configObject.lastPosition = Randomizer.positionArray[1];
                        configObject.firstPosition = Randomizer.positionArray[0];
                        configObject.CURRENT_NUM++;
                    }
                } else if(configObject.lastPosition == Randomizer.positionArray[1] && configObject.firstPosition == Randomizer.positionArray[0]) {
                    configObject.pos += configObject.speed2;
                    configObject.elem.style.left = configObject.pos + "px"; 
                    if(configObject.pos >= Randomizer.positionArray[2]) {
                        configObject.lastPosition = Randomizer.positionArray[2];
                        configObject.firstPosition = Randomizer.positionArray[1];
                        configObject.CURRENT_NUM++;
                    }
                } else if(configObject.lastPosition == Randomizer.positionArray[2] && configObject.firstPosition == Randomizer.positionArray[1]) {
                    configObject.pos -= configObject.speed2;
                    configObject.elem.style.left = configObject.pos + "px"; 
                    if(configObject.pos <= Randomizer.positionArray[1]) {
                        configObject.lastPosition = Randomizer.positionArray[1];
                        configObject.firstPosition = Randomizer.positionArray[2];
                        configObject.CURRENT_NUM++;
                    }
                } else if(configObject.lastPosition == Randomizer.positionArray[1] && configObject.firstPosition == Randomizer.positionArray[2]) {
                    configObject.pos -= configObject.speed2;
                    configObject.elem.style.left = configObject.pos + "px"; 
                    if(configObject.pos <= Randomizer.positionArray[0]) {
                        configObject.lastPosition = Randomizer.positionArray[0];
                        configObject.firstPosition = Randomizer.positionArray[1];
                        configObject.CURRENT_NUM++;
                    }
                } 
            } else {
                clearInterval(id);
                if(configObject.menuId == Consts.MENU_2) {
                    this.MENU_2_ACTIVE = false;
                } else {
                    this.MENU_3_ACTIVE = false;
                }
            }
        }  
    },
    pushToPositionArray: function(positionX) {
        this.positionArray.push(positionX);
    },
    buildConfigObject: function(id, menuId) {
        return {
            pos: Randomizer.positionArray[0],
            elem: document.getElementById(id),
            RANDOM_NUM: Math.floor(Math.random() * 20) + 7,
            CURRENT_NUM: 0,
            speed1: 8,
            speed2: 10,
            lastPosition: Randomizer.positionArray[0],
            firstPosition: Randomizer.positionArray[0],
            menuId: menuId
        }
    }
}

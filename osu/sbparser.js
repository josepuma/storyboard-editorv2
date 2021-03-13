import { Sprite } from '@/animation/sprite'

export class SBParser{
    
    constructor(osbContent){
        this.osb = osbContent
        this.sprites = []
    }

    async readLines(){
        var sprite = null
        var isSpriteLoaded = false
        var hasLoops = false

        const lines = this.osb.split('\n')
        for(let i in lines){
            var line = lines[i]
            if(!line.startsWith('//') && !line.startsWith('[Events]')){
                var trimmedLine = line.trim()
                var values = trimmedLine.split(',');

                switch(values[0]){
                    case 'Sprite':
                        var path = this.removePathQuotes(values[3])
                        if (isSpriteLoaded)
                        {
                            if (!hasLoops)
                            {
                                this.sprites.push(sprite);
                            }
                            else
                            {
                                hasLoops = false;
                            }
                            sprite = null;
                        }
                        var x = +values[4]
                        var y = +values[5]
                        sprite = new Sprite(path);
                        sprite.positionX = +(x + 107)
                        sprite.positionY = y
                        isSpriteLoaded = true
                    break;
                    case "L":
                        hasLoops = true;
                    break;
                    default: 
                        if (!values[3])
                            values[3] = values[2];

                        var commandType = values[0];

                        var startTime = +values[2];
                        var endTime = +values[3];

                        switch(commandType){
                            case 'F':
                                var startValue = values[4]
                                var endValue = values.length > 5 ? values[5] : startValue;
                                sprite.fade(startTime, endTime, +startValue, +endValue);
                            break;
                            case 'MX':
                                var startValue = values[4]
                                var endValue = values.length > 5 ? values[5] : startValue;
                                sprite.moveX(startTime, endTime, +startValue + 107, +endValue + 107);
                            break;
                            case 'MY':
                                var startValue = values[4]
                                var endValue = values.length > 5 ? values[5] : startValue;
                                sprite.moveY(startTime, endTime, +startValue, +endValue);
                            break;
                            case 'S':
                                var startValue = values[4]
                                var endValue = values.length > 5 ? values[5] : startValue;
                                sprite.scale(startTime, endTime, +startValue, +endValue);
                            break;
                            case "V":                  
                                var startX = +values[4];
                                var startY = +values[5];
                                var endX = values.length > 6 ? values[6] : startX;
                                var endY = values.length > 7 ? values[7] : startY;
                                sprite.scaleVec(startTime, endTime, +startX, +startY, +endX, +endY);
                            
                            break;
                            case 'R':
                                var startValue = values[4]
                                var endValue = values.length > 5 ? values[5] : startValue;
                                sprite.rotate(startTime, endTime, +startValue, +endValue);
                            break;
                            case 'M':
                                var startX = +values[4]
                                var startY = +values[5]
                                var endX = values.length > 6 ? values[6] : startX;
                                var endY = values.length > 7 ? values[7] : startY;
                                sprite.moveX(startTime, endTime, +startX + 107, +endX + 107);
                                sprite.moveY(startTime, endTime, +startY, +endY);
                            break;
                            case 'C':
                                    var startX = +values[4];
                                    var startY = +values[5]
                                    var startZ = +values[6]
                                    var endX = values.length > 7 ? values[7] : startX;
                                    var endY = values.length > 8 ? values[8] : startY;
                                    var endZ = values.length > 9 ? values[9] : startZ;
                                    var color = PIXI.utils.rgb2hex([startX / 255, startY / 255, startZ / 255])
                                    sprite.color = (color)
                                break;
                            case 'P':
                                var type = values[4]
                                switch(type){
                                    case 'A':  sprite.isAdditive = true; break;
                                }
                            break;
                        }

                    break;
                }
            }
        }
    }

    getSprites(){
        return this.sprites
    }

    removePathQuotes(path)
        {
            return path.startsWith("\"") && path.endsWith("\"") ? path.substring(1, path.length - 1) : path;
        }

}
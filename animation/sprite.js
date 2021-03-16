import { Command } from '@/animation/timing/command'
import { Command2D } from '@/animation/timing/command2D'
import { AnimationCommand } from '@/animation/timing/animationCommand'
import { AnimationCommand2D } from '@/animation/timing/animationCommand2D'

export class Sprite {
    constructor(path){
        this.spritePath = path
        this.texture = null
        this.fadeAnimation = new AnimationCommand(1)
        this.scaleAnimation = new AnimationCommand(1)
        this.moveXAnimation = new AnimationCommand(427)
        this.moveYAnimation = new AnimationCommand(240)
        this.rotateAnimation = new AnimationCommand(0)
        this.scaleVecAnimation = new AnimationCommand2D({ x: 427, y: 240 })
        this.isVisible = false
        //
        this.timingsStart = []
        this.timingsEnd = []
        //
        this.opacity = 1
        this.positionX = 427
        this.positionY = 240
        this.rotation = 0
        this.size = 1.0
        this.isAdditive = false
        this.color = null
        this.ratio = 0
    }

    loadTexture(texture){
        this.texture = texture
        this.texture.anchor.set(0.5)
        if(this.fadeAnimation.startTime() != -1) this.timingsStart.push(this.fadeAnimation.startTime());
        if(this.fadeAnimation.endTime() != -1) this.timingsEnd.push(this.fadeAnimation.endTime());

        if(this.moveXAnimation.startTime() != -1) this.timingsStart.push(this.moveXAnimation.startTime());
        if(this.moveXAnimation.endTime() != -1) this.timingsEnd.push(this.moveXAnimation.endTime());

        if(this.moveYAnimation.startTime() != -1) this.timingsStart.push(this.moveYAnimation.startTime());
        if(this.moveYAnimation.endTime() != -1) this.timingsEnd.push(this.moveYAnimation.endTime());

        if(this.rotateAnimation.startTime() != -1) this.timingsStart.push(this.rotateAnimation.startTime());
        if(this.rotateAnimation.endTime() != -1) this.timingsEnd.push(this.rotateAnimation.endTime());

        if(this.scaleAnimation.startTime() != -1) this.timingsStart.push(this.scaleAnimation.startTime());
        if(this.scaleAnimation.endTime() != -1) this.timingsEnd.push(this.scaleAnimation.endTime());

        if(this.scaleVecAnimation.startTime() != -1) this.timingsStart.push(this.scaleVecAnimation.startTime());
        if(this.scaleVecAnimation.endTime() != -1) this.timingsEnd.push(this.scaleVecAnimation.endTime());

        this.setInitialCommands()
    }

    isActive(audioPosition)
    {
        if(this.timingsStart.length > 0 && this.timingsEnd.length > 0)
        {
            var min = +Math.min.apply(null, this.timingsStart)
            var max = +Math.max.apply(null, this.timingsEnd)
            return ( min <= audioPosition && audioPosition <= max)
        }
        return false
    }

    setInitialCommands(){

        //console.log(this.ratio)

        this.texture.alpha = this.fadeAnimation.startValue()
        if(this.positionX != 427 && this.moveXAnimation.commands.length == 0){
            this.texture.x = this.positionX  / this.getRatio() 
        }else{
            this.texture.x = this.moveXAnimation.startValue()  / this.getRatio() 
        }

        if(this.positionY != 240 && this.moveYAnimation.commands.length == 0){
            this.texture.y = this.positionY / this.getRatio() 
        }else{
            this.texture.y = this.moveYAnimation.startValue()  / this.getRatio() 
        }

        this.texture.rotation = this.rotateAnimation.startValue()

        this.texture.scale.x = this.scaleAnimation.startValue()  / this.getRatio()  
        this.texture.scale.y = this.scaleAnimation.startValue()  / this.getRatio() 


        if(this.isAdditive){
            this.texture.blendMode = PIXI.BLEND_MODES.ADD;
        }
    }

    fade(startTime, endTime, startValue, endValue){
        var command = new Command(startTime, endTime, startValue, endValue)
        this.fadeAnimation.addCommand(command)
    }

    moveX(startTime, endTime, startValue, endValue){
        var command = new Command(startTime, endTime, startValue, endValue)
        this.moveXAnimation.addCommand(command)
    }

    moveY(startTime, endTime, startValue, endValue){
        var command = new Command(startTime, endTime, startValue, endValue)
        this.moveYAnimation.addCommand(command)
    }

    rotate(startTime, endTime, startValue, endValue){
        var command = new Command(startTime, endTime, startValue, endValue)
        this.rotateAnimation.addCommand(command)
    }

    scale(startTime, endTime, startValue, endValue){
        var command = new Command(startTime, endTime, startValue, endValue)
        this.scaleAnimation.addCommand(command)
    }

    scaleVec(startTime, endTime, startValueX, startValueY, endValueX, endValueY){
        var command = new Command2D(startTime, endTime, startValueX, startValueY, endValueX, endValueY)
        this.scaleVecAnimation.addCommand(command)
    }

    getRatio(){
        return this.roundValue(854 / window.innerWidth )
    }

    update(audioPosition, ratio){
        if(this.isActive(audioPosition) && this.texture){
            this.texture.visible = true

            if(this.color){
                this.texture.tint = this.color
            }

            if(this.fadeAnimation.isActive(audioPosition))
                this.texture.alpha = this.fadeAnimation.getValueAtTime(audioPosition)

            if(this.moveXAnimation.isActive(audioPosition))
                this.texture.position.x = this.moveXAnimation.getValueAtTime(audioPosition)  / this.getRatio()

            if(this.moveYAnimation.isActive(audioPosition))
                this.texture.position.y = this.moveYAnimation.getValueAtTime(audioPosition)  / this.getRatio()

            if(this.rotateAnimation.isActive(audioPosition))
                this.texture.rotation = this.rotateAnimation.getValueAtTime(audioPosition)

            if(this.scaleAnimation.isActive(audioPosition)){
                this.texture.scale.set(this.scaleAnimation.getValueAtTime(audioPosition)  / this.getRatio())
            }

            if(this.scaleVecAnimation.isActive(audioPosition)){
                var size = this.scaleVecAnimation.getValueAtTime(audioPosition)
                this.texture.scale.x = size.x  / this.getRatio()
                this.texture.scale.y = size.y  / this.getRatio()
            }

            if(this.spritePath == 'bgg.jpg'){
                this.resize()
            }

        }else{
            this.texture.visible = false
        }

    }

    resize(){
        //console.log(this.texture.scale.x + '-' + this.getRatio())
        //this.texture.scale.x =  this.texture.scale.x / this.getRatio()
        //this.texture.scale.y =  this.texture.scale.y / this.getRatio()
        //this.texture.position.x = this.texture.position.x / this.getRatio()
        //this.texture.position.y = this.texture.position.y / this.getRatio()
    }

    roundValue(value){
        return Math.round((value) * 100) / 100
    }

    draw(){
        /*if(this.texture){
            if(this.isVisible){
                this.texture.visible = true
                this.texture.alpha = this.opacity
                this.texture.x = this.positionX
                this.texture.y = this.positionY
                this.texture.rotation = this.rotation
                this.texture.scale.set(this.size)
            }else{
                this.texture.visible = false
            }
        } */
    }
}
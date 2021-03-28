export class StoryboardEmitter{
    
    constructor(app){
        this.sprites = []
        this.app = app
    }

    loadTextures(){
        this.sprites.forEach(sprite => {
                var texture = PIXI.Sprite.from('/'+sprite.spritePath)
                if(texture){
                    sprite.loadTexture(texture)
                    this.app.stage.addChild(texture)
                }
        })
    }

    loadSprites(sprites){
        this.sprites = [...this.sprites, ...sprites]
    }
    
    update(audioPosition, ratio){
        this.sprites.forEach(sprite => {
            sprite.update(audioPosition, ratio)
        })
    }
}
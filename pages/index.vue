<template lang="pug">
  div
    effectCard
    button(@click="audio.playAudio()") Play
</template>

<script>
import Stats from 'stats.js';
import effectCard from '@/components/cards/effectCard'
import { StoryboardEmitter } from '@/animation/emitters/storyboardEmitter.js'
import { Sprite } from '@/animation/sprite'
import { Player } from '@/audio/player.js';
import { SBParser } from '@/osu/sbparser'

export default {
  components: {
    effectCard
  },
  data(){
    return{
      app: null,
      sbEmitter: null,
      audio: null,
      osb: null,
      sbparser: null,
      ratio: 0
    }
  },
  mounted(){
    this.startPixi()
  },
  methods: {
    async startPixi(){
      var stats = new Stats();
      stats.showPanel(0);
      this.$el.appendChild( stats.dom );

      this.app = new PIXI.Application({
        autoResize: true,
        width: 854,
        height: 480,
      });

      var sprites = []
      await fetch('sb.osb')
      .then(response => response.text())
      .then(text => {
        this.osb = text
      })  

      this.sbparser = new SBParser(this.osb)
      await this.sbparser.readLines()
      sprites = this.sbparser.getSprites()

      var items = []
      var a = new Sprite('sb/lyrics/a.png')
      a.moveX(-250, 92, 941, 40)
      a.moveY(-250, 92, 555, 350)
      a.moveX(92, 2492, 40, 80)
      a.moveY(92, 2492, 350, 350)
      a.moveX(2492, 3177, 80, 580)
      a.moveY(2492, 3177, 350, 899)
      items.push(a)

      //console.log(sprites)
      //-this.resize()
      //-window.addEventListener('resize', this.resize);
      this.sbEmitter = new StoryboardEmitter(this.app)
      this.sbEmitter.loadSprites(sprites)
      this.sbEmitter.loadTextures()
      this.audio = new Player('audios/eos.mp3')
      this.$el.appendChild(this.app.view);
      
      
      this.app.ticker.add((delta) => {
        if(this.audio.getPosition() > 0){
            stats.begin();
            this.sbEmitter.update(this.audio.getPosition(), this.ratio)
            stats.end()
          }
      });
    },
    resize(){
      const w = window.innerWidth
      const h = window.innerHeight
      this.app.renderer.resize(w, h)
    }
  }
}
</script>

<style scoped>

  button{
    position: absolute;
    bottom: 0;
  }

  p{
    text-align: right;
  }

</style>
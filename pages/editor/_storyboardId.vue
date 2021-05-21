<template lang="pug">
    div
        section.uk-section.uk-section-small
            .uk-container.uk-container-large
                div.editor-canvas(ref="editor")
                //-mainEditor(:sprites="sprites", width="1318", :position="position")
                button(@click="audio.playAudio()") Play
</template>

<script>

import mainEditor from '@/components/editor/main'
import { StoryboardEmitter } from '@/animation/emitters/storyboardEmitter.js'
import { Sprite } from '@/animation/sprite'
import { Player } from '@/audio/player.js';
import { SBParser } from '@/osu/sbparser'
import Stats from 'stats.js';

export default {
    components: {
        mainEditor
    },
    data(){
    return{
      app: null,
      sbEmitter: null,
      audio: null,
      osb: null,
      sbparser: null,
      ratio: 0,
      position: 0,
      sprites: []
    }
  },
  mounted(){
    this.startPixi()
  },
  methods: {
    async startPixi(){
      //-var stats = new Stats();
      //-stats.showPanel(0);
      //-this.$el.appendChild( stats.dom );

      this.app = new PIXI.Application({
        autoResize: true,
        width: 854,
        height: 480,
      });

      var sprites = []
      await fetch('/sb.osb')
      .then(response => response.text())
      .then(text => {
        this.osb = text
      })  

      this.sbparser = new SBParser(this.osb)
      await this.sbparser.readLines()
      this.sprites = this.sbparser.getSprites()

      //console.log(sprites)
      //-this.resize()
      //-window.addEventListener('resize', this.resize);
      this.sbEmitter = new StoryboardEmitter(this.app)
      this.sbEmitter.loadSprites(this.sprites)
      this.sbEmitter.loadTextures()
      this.audio = new Player('/audios/keeno.mp3')
      const { editor } = this.$refs
      editor.appendChild(this.app.view);
      
      
      this.app.ticker.add((delta) => {
        if(this.audio.getPosition() > 0){
            //-stats.begin();
            this.position = this.audio.getPosition()
            this.sbEmitter.update(this.audio.getPosition(), this.ratio)
            //-stats.end()
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

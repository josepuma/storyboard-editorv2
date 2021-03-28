<template lang="pug">
    div
        .container
            div(class="uk-grid uk-flex-middle uk-grid-collapse")
                div(class="uk-width-auto")
                    div
                        .uk-text-center.icon-container(:uk-tooltip="sprite.spritePath")
                            span(uk-icon="icon: music; ratio: .6;", v-if="type == 'music'")
                            span(uk-icon="icon: target; ratio: .6;", v-if="type == 'sprite'")
                div(class="uk-width-expand")
                    div
                        .timeline-container(:style="'width:' + timeLineWidth + 'px;'")
                            .timeline.uk-width-1-1.uk-position-relative(v-if="sprite.fadeAnimation && sprite.fadeAnimation.commands&& sprite.fadeAnimation.commands.length > 0")
                                itemContainer(v-for="tween in sprite.fadeAnimation.commands", :tween="tween", type="fade", :widthTimeLine="timeLineWidth")
                            .timeline.uk-width-1-1.uk-position-relative(v-if="sprite.fadeAnimation && sprite.scaleAnimation.commands&& sprite.scaleAnimation.commands.length > 0")
                                itemContainer(v-for="tween in sprite.scaleAnimation.commands", :tween="tween", type="scale", :widthTimeLine="timeLineWidth")
                            .timeline.uk-width-1-1.uk-position-relative(v-if="sprite.fadeAnimation && sprite.moveXAnimation.commands&& sprite.moveXAnimation.commands.length > 0")
                                itemContainer(v-for="tween in sprite.moveXAnimation.commands", :tween="tween", type="move", :widthTimeLine="timeLineWidth")
                            .timeline.uk-width-1-1.uk-position-relative(v-if="sprite.fadeAnimation && sprite.moveYAnimation.commands&& sprite.moveYAnimation.commands.length > 0")
                                itemContainer(v-for="tween in sprite.moveYAnimation.commands", :tween="tween", type="move", :widthTimeLine="timeLineWidth")
                            .timeline.uk-width-1-1.uk-position-relative(v-if="sprite.fadeAnimation && sprite.rotateAnimation.commands && sprite.rotateAnimation.commands.length > 0")
                                itemContainer(v-for="tween in sprite.rotateAnimation.commands", :tween="tween", type="rotate", :widthTimeLine="timeLineWidth")
            
</template>

<script>
import itemContainer from '@/components/editor/timeline/tween/itemContainer'
export default {
    props: ['type', 'sprite', 'timeLineWidth'],
    components: {
        itemContainer
    }
}
</script>

<style lang="scss" scoped>

   .container{
        background-color: $base-light-bg-color;
        padding: .5rem 0;
        border-left: 2px solid $purple-accent;
        position: relative;
        margin: 2px 0;
        .icon-container{
            width: 2.5rem;
            span{
                vertical-align: middle;
            }
        }
        .timeline{
            width: 100%;
            height: 1.3rem;
            &:after{
                content: '';
                height: 1px;
                background-color: rgba($gray-accent, .1);
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                width: 100%;
            }
        }
        .timeline-container{
            
        }
        .line-timeline{
            height: 1px;
            background-color: rgba($gray-accent, .1);
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 100%;
        }
        .hover-effect{
            top: 0;
            left: 0;
            position: absolute;
            height: 2rem;
            width: 20%;
            visibility: hidden;
            transition: all .2s ease;
            background: linear-gradient(to right, rgba($purple-accent, .2), transparent);
            opacity: 0;
        }
        &:hover{
            .hover-effect{
                visibility: visible;
                opacity: 1;
            }
        }
   }

</style>
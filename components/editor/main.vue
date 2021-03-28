<template lang="pug">
    div
        .timeline-base.uk-position-relative
            .timeline-container 
                template(v-for="sprite in sprites")
                    tween(type="sprite", :sprite="sprite", :timeLineWidth="width")
            .timeline-position(:style="'left:'+ positionTimeLine +'%;'")
</template>

<script>
import tween from '@/components/editor/timeline/tween'
export default {
    props: ['sprites', 'width', 'position'],
    components: {
        tween
    },
    computed: {
        positionTimeLine(){
            const startTime = 0
            const endTime = 286354
            const startProgress = ((this.position - startTime) / (endTime - startTime)) * 100;
            return startProgress
        }
    }
}
</script>

<style lang="scss" scoped>

    .timeline-container{
        overflow-x: scroll;
        height: calc(100vh - 550px);
        position: relative;
    }

    .timeline-position{
        position: absolute;
        top: 0;
        bottom: 0;
        width: 1px;
        background-color: $blue-accent;
        margin-left: 40px;
        &:after{
            content: '';
            position: absolute;
            top: 0%;
            width: 10px;
            height: 10px;
            transform: translateX(-50%) rotate(45deg);
            background-color: $blue-accent;
            border-radius: 2px;
        }
    }

</style>
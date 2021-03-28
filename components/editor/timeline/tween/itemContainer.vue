<template lang="pug">
    .tween-container(:style="'left: ' + startProgress  + '%;'")
        .circle(:style="'background-color:' + accentColor", :uk-tooltip="tween.startTime")
        .line(:style="'width:' + width + 'px; background-color:' + accentColor +';'")
        .circle(:style="'background-color:' + accentColor", :uk-tooltip="tween.endTime")
</template>

<script>
export default {
    props: ['tween', 'type', 'widthTimeLine'],
    computed: {
        startProgress(){
            const startTime = 0
            const endTime = 286354
            const startProgress = ((this.tween.startTime - startTime) / (endTime - startTime)) * 100;
            return startProgress
        },
        width(){
            const timeLineLength = 286354
            const timeLineWidth = this.widthTimeLine
            const duration = this.tween.endTime - this.tween.startTime
            const percentage = (duration * 100) / timeLineLength

            const widthSizeFinal = (timeLineWidth * percentage) / 100

            return widthSizeFinal - 12
        },
        accentColor(){
            switch (this.type) {
                case 'fade':
                    return '#fd62d6'
                case 'scale':
                    return '#e20d4d'
                case 'move':
                    return '#2fde3a'
                case 'rotate':
                    return '#ffc42e'
                default:
                    break;
            }
        }
    }
}
</script>

<style lang="scss" scoped>

    .tween-container{
        transform: translateY(-50%);
        top: 50%;
        position: absolute;
        >*{
            display: inline-block;
            vertical-align: middle;
            margin-bottom: 3px;
        }
        .circle{
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background-color: $green-accent;
        }
        .line{
            height: 1px;
            background-color: $green-accent;
        }
    }

</style>
export class AnimationCommand2D {
    constructor(defaultValue){
        this.commands = []
        this.defaultValue = defaultValue
    }

    startTime(){
        return this.commands.length > 0 ? this.commands[0].startTime : -1
    }

    endTime(){
        return this.commands.length > 0 ? this.commands[this.commands.length - 1].endTime : -1;
    }

    startValue(){
        return this.commands.length > 0 ? this.commands[0].startValue : this.defaultValue;
    }

    endValue(){
        return this.commands.length > 0 ? this.commands[this.commands.length - 1].endValue : this.defaultValue;
    }

    addCommand(command){
        this.commands.push(command)
    }

    isActive(audioPosition)
    {
        return this.commands.length > 0 && this.startTime() <= audioPosition && audioPosition <= this.endTime();
    }

    getValueAtTime(audioPosition)
    {
        if (this.commands.length == 0) return this.defaultValue;

        //var index = _commands.FindIndex(c => c.IsActive(audioPosition));

        var commandIndex = this.findCommandIndex(audioPosition)
        if(!commandIndex.status && commandIndex.index > 0)
            commandIndex.index--

        //if(!findCommandIndex(audioPosition, out int index) && index > 0)
            //-index--;
        
        var command = this.commands[commandIndex.index];
        return command.getValueAtTime(audioPosition);
    }

    findCommandIndex(time)
    {
        var left = 0;
        var right = this.commands.length - 1;
        var index = 0
        while (left <= right)
        {
            index = left + ((right - left) >> 1);
            var commandTime = this.commands[index].startTime;
            if (commandTime == time)
                return {
                    status: true,
                    index: index
                };
            else if (commandTime < time)
                left = index + 1;
            else right = index - 1;
        }
        index = left;
        return {
            status: false,
            index: index
        };
    }
}
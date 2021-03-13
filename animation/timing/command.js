export class Command {
    constructor(startTime, endTime, startValue, endValue)
    {
        this.startTime = startTime;
        this.endTime = endTime;
        this.startValue = startValue;
        this.endValue = endValue;
    }

    isActive(audioPosition)
    {
        return this.startTime <= audioPosition && audioPosition <= this.endTime;
    }

    getValueAtTime(audioPosition)
    {
        if (audioPosition <= this.startTime) return this.startValue;
        if (this.endTime <= audioPosition) return this.endValue;

        var progress = ((audioPosition - this.startTime) / (this.endTime - this.startTime));
        return this.lerp(this.startValue, this.endValue, progress);
    }

    lerp(value1, value2, amount) {
        amount = amount < 0 ? 0 : amount;
        amount = amount > 1 ? 1 : amount;
        return value1 + (value2 - value1) * amount;
    };
}
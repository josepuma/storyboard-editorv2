export class Command2D {
    constructor(startTime, endTime, startValueX, startvalueY, endValueX, endValueY)
    {
        this.startTime = startTime;
        this.endTime = endTime;
        this.startValue = {
            x: startValueX,
            y: startvalueY
        }
        this.endValue = {
            x: endValueX,
            y: endValueY
        }
    }

    isActive(audioPosition)
    {
        return this.startTime <= audioPosition && audioPosition <= this.endTime;
    }

    getValueAtTime(audioPosition)
    {
        if (audioPosition <= this.startTime) return this.startValue
        if (this.endTime <= audioPosition) return this.endValue

        var progress = ((audioPosition - this.startTime) / (this.endTime - this.startTime));
        return {
            x: this.lerp(this.startValue.x, this.endValue.x, progress),
            y: this.lerp(this.startValue.y, this.endValue.y ,progress)
        }
    }

    lerp(value1, value2, amount) {
        amount = amount < 0 ? 0 : amount;
        amount = amount > 1 ? 1 : amount;
        return value1 + (value2 - value1) * amount;
    };
}
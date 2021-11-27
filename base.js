export default class Base
{
    constructor(name, duration)
    {
        this.name = name;
        this.duration = duration;
        this.next = null;
        this.previous = null;
    }


    getName()
    {
        return this.name;
    }

    getDuration()
    {
        return this.duration;
    }

    getInfo()
    {
        return `<tr>
        <td>${this.name}</td>
        <td>${this.duration}</td>
        </tr>`;
    }



}
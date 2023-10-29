export class Rent_details
{
    #rent_date;
    #return_date;

    constructor(rent_date, return_date)
    {
        this.#rent_date = rent_date;
        this.#return_date = return_date;
        if(!this.validate_dates())
            throw new Error("Invalid rent dates");
    }

    // check if the dates are of Date class()
    validate_dates() 
    {
        const a = this.#rent_date && Object.prototype.toString.call(this.#rent_date) === "[object Date]" && !isNaN(this.#rent_date);
        const b = this.#return_date && Object.prototype.toString.call(this.#return_date) === "[object Date]" && !isNaN(this.#return_date);
        const diff = this.#return_date - this.#rent_date;
        const c = diff > 0;
        return a && b && c;
    }

    // check if current period is available
    available_check()
    {
        if(this.#return_date < new Date())
        {
            return true;
        }
        return false;
    }

    get_return_date() { return this.#return_date; }
    get_rent_date() { return this.#rent_date; }
    
}

export class Rent_list
{
    #rent_list;

    constructor(rent_list = new [])
    {
        this.#rent_list = rent_list
        if(!this.validate_list())
            throw new Error("Invalid rent_list");
    }

    validate_list()
    {
        if(this.#rent_list == null || this.#rent_list.length == undefined)
            return false;
        if(!Array.isArray(this.#rent_list))
            return false;
        if(!this.#rent_list.every(element => {
            let bool = element.validate_dates?.();
            if (bool == undefined || !bool)
                return false;
            return true;
        }))
            return false;
        return true;
    }

    // add a new rental period
    add(details)
    {
        if(details == null)
            throw new Error("Invalid rent_detail");
        if(!details.validate_dates?.() || details.validate_dates?.() == undefined)
           throw new Error("Invalid rent_detail");
        this.#rent_list.push(details);
    }

    // check if the period is free or already taken
    available_check()
    {
        if(this.#rent_list.length == 0)
            return true;
        if(this.#rent_list[this.#rent_list.length - 1].available_check())
            return true;
        return false;
    }

    // check if the specified period was free
    available_check_in_timeframe(date1, date2)
    {
        const a = date1 && Object.prototype.toString.call(date1) === "[object Date]" && !isNaN(date1);
        const b = date2 && Object.prototype.toString.call(date2) === "[object Date]" && !isNaN(date2);
        const diff = date2 - date1;
        const c = diff > 0;
        if (!a || !b || !c)
            throw new Error("Invalid dates");
        if(this.#rent_list.length == 0)
            return true;
        if(!this.#rent_list.every(element => {
            if(date1 <= element.get_rent_date() &&  element.get_rent_date() <= date2)
                return false;
            if(date1 <= element.get_return_date() && element.get_return_date() <= date2)
                return false;
            return true;
        }))
            return false;
        return true;
    }
    count()
    {
        return this.#rent_list.length;
    }
}
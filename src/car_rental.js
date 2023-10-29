export class Car_rental
{
    #cars;
    #rented_cars;
    constructor(cars = new [])
    {
        this.#cars = cars;
        if(!this.#validate_cars())
            throw new Error("Invalid cars");
    }

    // validate the car list
    #validate_cars()
    {
        if(this.#cars == null)
            return false;
        if(this.#cars.length == undefined)
            return false;
        if(!Array.isArray(this.#cars))
            return false;
        if(!this.#cars.every(element => {
            let bool = element.validate_data?.();
            if (bool == undefined || !bool)
                return false;
            return true;
        }))
            return false;
        return true;
    }

    // count currently rented cars
    rented_cars_count()
    {
        this.#rented_cars = 0;
        this.#cars.forEach(element => {
            let bool = element.get_available?.();
            if (bool != undefined && !bool)
                this.#rented_cars++;
        });
        return this.#rented_cars;
    }

    // count how many cars were available in the specified period
    available_cars_in_timeframe_count(date1, date2)
    {
        var available = 0;
        this.#cars.forEach(element => {
            let bool = element.available_check_in_timeframe?.(date1, date2);
            if (bool != undefined && bool)
                available++;
        });
        return available;
    }

    // get top n cars by the amount od damages
    top_n_damaged_cars(n = 10)
    {
        if(n == null)
            throw new Error("Invalid number");
        if(Number(n) != n)
            throw new Error("Invalid number");
        this.#cars.sort(function(a,b){ return b.get_damages_count() - a.get_damages_count() })
        return this.#cars.slice(0, n);
    }

    // get top n cars by the amount of rental periods
    top_n_rented_cars(n = 10)
    {
        if(n == null)
            throw new Error("Invalid number");
        if(Number(n) != n)
            throw new Error("Invalid number");
        this.#cars.sort(function(a,b){ return b.get_rental_count() - a.get_rental_count()})
        return this.#cars.slice(0, n);
    }
}
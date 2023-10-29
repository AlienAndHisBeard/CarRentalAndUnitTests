import { Rent_list } from "./rent.js";
export class Car
{
    #id;
    #available;
    #seat_count;
    #mileage;
    #damages_list;
    #rent_list;
    #one_day_price;

    constructor(id, mileage, seat_count, one_day_price, damages_list = [], rent_list = new Rent_list([]))
    {
        this.#id = id;
        this.#mileage = mileage;
        this.#seat_count = seat_count;
        this.#damages_list = damages_list;
        this.#one_day_price = one_day_price;
        this.#rent_list = rent_list;
        this.validate_data();
        this.#available = this.#rent_list.available_check();
    }

    // validate car data 
    validate_data()
    {
        if(this.#rent_list == null || this.#damages_list == null || this.#id == null ||
            this.#mileage == null || this.#seat_count == null || this.#one_day_price == null)
            throw new Error("Invalid params");
        if(this.#rent_list.available_check?.() == undefined)
            throw new Error("Invalid params");
        if(this.#damages_list.length == undefined)
            throw new Error("Invalid params");
        if(!Array.isArray(this.#damages_list))
            throw new Error("Invalid params");
        if(this.#damages_list.length > 0)
            if(this.#damages_list.every(element => {
                if(typeof element === 'string' || element instanceof String)
                    return false;
                return true;
            }))
                throw new Error("Invalid params");
        if (
            Number(this.#id) != this.#id ||
            Number(this.#mileage) != this.#mileage ||
            Number(this.#seat_count) != this.#seat_count ||
            Number(this.#one_day_price) != this.#one_day_price)
        {
            throw new Error("Invalid params");
        }
        return true;
    }

    // rent for the specified rental period
    rent(rent_details)
    {
        if(rent_details == null)
            throw new Error("Invalid rent_details")
        if(rent_details.available_check?.() == undefined)
            throw new Error("Invalid rent_details");
        this.#rent_list.add(rent_details)
        this.#available = this.#rent_list.available_check();
    }

    // returned and available for another rental
    return()
    {
        this.#available = true;
    }

    // damage of the vehicle
    add_damage(damage)
    {
        if(typeof damage === 'string' || damage instanceof String)
            this.#damages_list.push(damage);
    }

    // check if the car was fully available in the specified period
    available_check_in_timeframe(date1, date2)
    {
        return this.#rent_list.available_check_in_timeframe(date1, date2);
    }

    get_rental_count() { return this.#rent_list.count(); }
    get_damages_count() { return this.#damages_list.length; }
    get_available() { return this.#available; }
    get_id() { return this.#id; }
    get_seat_count() { return this.#seat_count; }
    get_mileage() { return this.#mileage; }
    get_damages_list() { return this.#damages_list; }

 }
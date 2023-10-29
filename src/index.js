import { Rent_details, Rent_list } from './rent.js';
import { Car } from './car.js'
import { Car_rental } from './car_rental.js';

// examplary data

// setup rental periods
let rent_details = [
    new Rent_details(new Date(2022, 1, 10), new Date(2022, 1, 15)), //   0
    new Rent_details(new Date(2022, 1, 20), new Date(2022, 1, 23)), //   1
    new Rent_details(new Date(2022, 2, 5), new Date(2022, 2, 9)), //     2
    new Rent_details(new Date(2022, 3, 10), new Date(2022, 5, 15)), //   3
    new Rent_details(new Date(2022, 7, 10), new Date(2022, 9, 15)), //   4
    new Rent_details(new Date(2022, 10, 10), new Date(2022, 10, 30)), // 5
    new Rent_details(new Date(2023, 1, 10), new Date(2023, 1, 15)), //   6
    new Rent_details(new Date(2023, 1, 20), new Date(2023, 1, 23)), //   7
    new Rent_details(new Date(2023, 2, 5), new Date(2023, 2, 9)), //     8
    new Rent_details(new Date(2023, 3, 10), new Date(2023, 5, 15)), //   9
    new Rent_details(new Date(2023, 7, 10), new Date(2023, 9, 15)), //   10
    new Rent_details(new Date(2023, 10, 10), new Date(2023, 10, 30)), // 11
];

const damages = ["x", "y", "z", "q", "w", "e", "r", "t"];

// create car rental                                                           number of damages | number of rental periods
let car_rental = new Car_rental([
    new Car(1, 100000, 4, 100, damages.slice(0,1), new Rent_list(rent_details.slice(0,3))), // 1 | 3
    new Car(2, 100000, 4, 100, damages.slice(0,2), new Rent_list(rent_details.slice(0,4))), // 2 | 4
    new Car(3, 100000, 4, 100, damages.slice(0,0), new Rent_list(rent_details.slice(1,5))), // 0 | 4
    new Car(4, 100000, 4, 100, damages.slice(0,3), new Rent_list(rent_details.slice(2,7))), // 3 | 5
    new Car(5, 100000, 4, 100, damages.slice(1,4), new Rent_list(rent_details.slice(4,7))), // 3 | 3
    new Car(6, 100000, 4, 100, damages.slice(0,8), new Rent_list(rent_details.slice(6,12))),// 8 | 6
    new Car(7, 100000, 4, 100, damages.slice(2,7), new Rent_list(rent_details.slice(0,9))), // 5 | 9
    new Car(8, 100000, 4, 100, damages.slice(4,8), new Rent_list(rent_details.slice(8,9))), // 4 | 1
    new Car(9, 100000, 4, 100, damages.slice(3,5), new Rent_list(rent_details.slice(7,12))),// 2 | 5
    new Car(10, 100000, 4, 10, damages.slice(4,6), new Rent_list(rent_details.slice(2,3))), // 2 | 1
    new Car(11, 100000, 4, 10, damages.slice(6,8), new Rent_list(rent_details.slice(3,5))), // 2 | 2
    new Car(12, 100000, 4, 10, damages.slice(7,8), new Rent_list(rent_details.slice(4,8))), // 1 | 4
    new Car(13, 100000, 4, 10, damages.slice(3,6), new Rent_list(rent_details.slice(4,5))), // 3 | 1
    new Car(14, 100000, 4, 10, damages.slice(4,7), new Rent_list(rent_details.slice(7,12))),// 3 | 5

])

// run some methods
console.log("Number of rented cars:")
console.log(car_rental.rented_cars_count());
const m = 3;
console.log(`ids of top ${m} damaged cars:`)
var results = car_rental.top_n_damaged_cars(m);
results.forEach(element => {
    console.log(element.get_id())
});
const n = 3;
console.log(`ids of top ${n} rented cars:`)
results = car_rental.top_n_rented_cars(n);
results.forEach(element => {
    console.log(element.get_id())
});
console.log("Number of fully available between specified dates:")
console.log(car_rental.available_cars_in_timeframe_count(new Date(2023, 1, 16), new Date(2023, 2, 18)));





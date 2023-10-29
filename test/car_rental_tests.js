import { expect } from "chai";
import { Rent_details, Rent_list } from "../src/rent.js";
import { Car } from "../src/car.js";
import { Car_rental } from "../src/car_rental.js";

describe('canary-tests-for-car_rental-module-tests', function()
{
    it('should always pass the canary test', function() 
    {
        expect(true).to.eql(true);
    });
});

context('constructor(cars) tests, uses validate_cars() to throw', function()
{
    var car;
    var car2;
    beforeEach(function(){
        const details_list = [
            new Rent_details(new Date(2023, 0, 1), new Date(2023, 0, 5)),
            new Rent_details(new Date(2023, 1, 1), new Date(2223, 2, 5)),
        ]
        car = new Car(1, 1, 1, 1, ["x"], new Rent_list(details_list));
        car2 = new Car(2, 1, 1, 1, ["x"], new Rent_list(details_list))
    });	

    it('constructor(valid_cars) => should not throw Invalid cars', function()
    {
        expect(function() { new Car_rental([car, car2]) }).to.not.Throw("Invalid cars");
    });

    it('constructor(null) => should throw Invalid cars', function()
    {
        expect(function() { new Car_rental(null) }).to.Throw("Invalid cars");
    });

    it('constructor(other_object_in_list) => should throw Invalid cars', function()
    {
        expect(function() { new Car_rental(["x", car2]) }).to.Throw("Invalid cars");
    });
});

context('rented_cars_count() method tests, returns current rented cars count', function()
{
    var car;
    var car2;
    var car3;
    beforeEach(function(){
        const details_list = [
            new Rent_details(new Date(2023, 0, 1), new Date(2023, 0, 5)),
            new Rent_details(new Date(2023, 1, 1), new Date(2223, 2, 5)),
        ]
        car = new Car(1, 1, 1, 1, ["x"], new Rent_list(details_list));
        car2 = new Car(2, 1, 1, 1, ["x"], new Rent_list(details_list));
        car3 = new Car(3, 1, 1, 1, ["x"], new Rent_list(
            [new Rent_details(new Date(2023, 0, 1), new Date(2023, 0, 5))]));
        
    });	

    it('2 cars rented, 1 free => should return 2', function()
    {
        const rental = new Car_rental([car, car2, car3])
        expect(rental.rented_cars_count()).to.equal(2);
    });

    it('no cars => should return 0', function()
    {
        const rental = new Car_rental([])
        expect(rental.rented_cars_count()).to.equal(0);
    });

    it('1 car rented => should return 1', function()
    {
        const rental = new Car_rental([car])
        expect(rental.rented_cars_count()).to.equal(1);
    });
});

context('top_n_damaged_cars(n) method tests, returns n cars with highest amount of damages', function()
{
    var cars;
    beforeEach(function(){
        const details_list = [
            new Rent_details(new Date(2023, 0, 1), new Date(2023, 0, 5)),
            new Rent_details(new Date(2023, 1, 1), new Date(2223, 2, 5)),
        ];
        cars = [
            new Car(2, 1, 1, 1, ["x"], new Rent_list(details_list)),
            new Car(1, 1, 1, 1, ["x", "y", "z"], new Rent_list(details_list)),
            new Car(3, 1, 1, 1, ["x", "y"], new Rent_list(details_list)),
            new Car(4, 1, 1, 1, ["x", "y", "z", "q"], new Rent_list(details_list)),
        ];
    });	

    it('top_n_damaged_cars(1) damaged => should return car with id 4', function()
    {
        const rental = new Car_rental(cars)
        expect(rental.top_n_damaged_cars(1)[0].get_id()).to.equal(4);
    });

    it('top_n_damaged_cars(2) => should return cars with id 4 and 3', function()
    {
        const rental = new Car_rental(cars)

        const result = rental.top_n_damaged_cars(2);

        expect([result[0].get_id(), result[1].get_id()].toString()).to.equal([4,1].toString());
    });

    it('top_n_damaged_cars(null) => should throw Invalid number', function()
    {
        const rental = new Car_rental(cars)

        expect(function() { rental.top_n_damaged_cars(null) }).to.Throw("Invalid number");
    });

    it('invalid number => should throw Invalid number', function()
    {
        const rental = new Car_rental(cars)

        expect(function() { rental.top_n_damaged_cars("x") }).to.Throw("Invalid number");
    });

});

context('top_n_rented_cars(n) method tests, returns n cars with highest amount of rentals', function()
{
    var cars;
    beforeEach(function(){
        const details_list = [
            new Rent_details(new Date(2023, 0, 1), new Date(2023, 0, 5)),
            new Rent_details(new Date(2023, 1, 1), new Date(2223, 2, 5)),
            new Rent_details(new Date(2023, 3, 1), new Date(2223, 3, 5)),
            new Rent_details(new Date(2023, 4, 1), new Date(2223, 4, 5)),
            new Rent_details(new Date(2023, 5, 1), new Date(2223, 5, 5)),
            new Rent_details(new Date(2023, 6, 1), new Date(2223, 6, 5)),
        ];
        cars = [
            new Car(2, 1, 1, 1, ["x"], new Rent_list(details_list.slice(0,1))),
            new Car(1, 1, 1, 1, ["x"], new Rent_list(details_list.slice(0,4))),
            new Car(3, 1, 1, 1, ["x"], new Rent_list(details_list.slice(0,2))),
            new Car(4, 1, 1, 1, ["x"], new Rent_list(details_list.slice(0,5))),
        ];
    });	

    it('top_n_rented_cars(1) damaged => should return car with id 4', function()
    {
        const rental = new Car_rental(cars)
        expect(rental.top_n_rented_cars(1)[0].get_id()).to.equal(4);
    });

    it('top_n_rented_cars(2) => should return cars with id 4 and 3', function()
    {
        const rental = new Car_rental(cars)

        const result = rental.top_n_rented_cars(2);

        expect([result[0].get_id(), result[1].get_id()].toString()).to.equal([4,1].toString());
    });

    it('top_n_rented_cars(null) => should throw Invalid number', function()
    {
        const rental = new Car_rental(cars)

        expect(function() { rental.top_n_rented_cars(null) }).to.Throw("Invalid number");
    });

    it('invalid number => should throw Invalid number', function()
    {
        const rental = new Car_rental(cars)

        expect(function() { rental.top_n_rented_cars("x") }).to.Throw("Invalid number");
    });

});

context('available_cars_in_timeframe_count() method tests, returns cars count without any rental period in specified timeframe', function()
{
    var cars;
    beforeEach(function(){
        const details_list = [
            new Rent_details(new Date(2023, 0, 1), new Date(2023, 0, 5)),
            new Rent_details(new Date(2023, 1, 1), new Date(2223, 2, 5)),
            new Rent_details(new Date(2023, 3, 1), new Date(2223, 3, 5)),
            new Rent_details(new Date(2023, 4, 1), new Date(2223, 4, 5)),
            new Rent_details(new Date(2023, 5, 1), new Date(2223, 5, 5)),
            new Rent_details(new Date(2023, 6, 1), new Date(2223, 6, 5)),
        ];
        cars = [
            new Car(2, 1, 1, 1, ["x"], new Rent_list(details_list.slice(0,1))),
            new Car(1, 1, 1, 1, ["x"], new Rent_list(details_list.slice(0,4))),
            new Car(3, 1, 1, 1, ["x"], new Rent_list(details_list.slice(0,2))),
            new Car(4, 1, 1, 1, ["x"], new Rent_list(details_list.slice(0,5))),
        ];
    });	

    it('february - july => should return 1', function()
    {
        const rental = new Car_rental(cars)
        expect(rental.available_cars_in_timeframe_count(
            new Date(2023, 1, 2), new Date(2223, 6, 6)
        )).to.equal(1);
    });

    it('february - february => should return all', function()
    {
        const rental = new Car_rental(cars)
        expect(rental.available_cars_in_timeframe_count(
            new Date(2023, 0, 6), new Date(2023, 0, 7)
        )).to.equal(4);
    });

    it('null => should throw Invalid dates', function()
    {
        const rental = new Car_rental(cars)

        expect(function() { rental.available_cars_in_timeframe_count(null, null) }).to.Throw("Invalid dates");
    });

    it('invalid parameters => should throw Invalid dates', function()
    {
        const rental = new Car_rental(cars)

        expect(function() { rental.available_cars_in_timeframe_count("x", 1) }).to.Throw("Invalid dates");
    });

});
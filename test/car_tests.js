import { expect } from "chai";
import { Car } from "../src/car.js";
import { Rent_details, Rent_list } from "../src/rent.js";

describe('canary-tests-for-car-module-tests', function()
{
    it('should always pass the canary test', function() 
    {
        expect(true).to.eql(true);
    });
});

describe('Car-class-tests', function()
{
    context('constructor tests, uses validate_data() to throw, available_check() to update availability', function()
    {
        var rent_list;
        beforeEach(function(){
            const details_list = [
                new Rent_details(new Date(2023, 0, 1), new Date(2023, 0, 5)),
                new Rent_details(new Date(2023, 1, 1), new Date(2023, 2, 5)),
            ]
            rent_list = new Rent_list(details_list)
        });	
        
        // id
        it('invalid id given => should throw Invalid params', function()
        {
            expect(function() { new Car("x", 1, 1, 1, ["x"], rent_list) }).to.Throw("Invalid params");
        });

        it('null id given => should throw Invalid params', function()
        {
            expect(function() { new Car(null, 1, 1, 1, ["x"], rent_list) }).to.Throw("Invalid params");
        });

        it('undefined id given => should throw Invalid params', function()
        {
            expect(function() { new Car(undefined, 1, 1, 1, ["x"], rent_list) }).to.Throw("Invalid params");
        });
        
        // mileage
        it('invalid mileage given => should throw Invalid params', function()
        {
            expect(function() { new Car(1, "x", 1, 1, ["x"], rent_list) }).to.Throw("Invalid params");
        });

        it('null mileage given => should throw Invalid params', function()
        {
            expect(function() { new Car(1, null, 1, 1, ["x"], rent_list) }).to.Throw("Invalid params");
        });

        it('undefined mileage given => should throw Invalid params', function()
        {
            expect(function() { new Car(1, undefined, 1, 1, ["x"], rent_list) }).to.Throw("Invalid params");
        });

        // seat_count
        it('invalid seat_count given => should throw Invalid params', function()
        {
            expect(function() { new Car(1, 1, "x", 1, ["x"], rent_list) }).to.Throw("Invalid params");
        });

        it('null seat_count given => should throw Invalid params', function()
        {
            expect(function() { new Car(1, 1, null, 1, ["x"], rent_list) }).to.Throw("Invalid params");
        });

        it('undefined seat_count given => should throw Invalid params', function()
        {
            expect(function() { new Car(1, 1, undefined, 1, ["x"], rent_list) }).to.Throw("Invalid params");
        });

        // one_day_price
        it('invalid one_day_price given => should throw Invalid params', function()
        {
            expect(function() { new Car(1, 1, 1, "x", ["x"], rent_list) }).to.Throw("Invalid params");
        });

        it('null one_day_price given => should throw Invalid params', function()
        {
            expect(function() { new Car(1, 1, 1, null, ["x"], rent_list) }).to.Throw("Invalid params");
        });

        it('undefined one_day_price given => should throw Invalid params', function()
        {
            expect(function() { new Car(1, 1, 1, undefined, ["x"], rent_list) }).to.Throw("Invalid params");
        });

        // damages_list
        it('invalid damages_list given => should throw Invalid params', function()
        {
            expect(function() { new Car(1, 1, 1, 1, [1], rent_list) }).to.Throw("Invalid params");
        });

        it('other object given => should throw Invalid params', function()
        {
            expect(function() { new Car(1, 1, 1, 1, "x", rent_list) }).to.Throw("Invalid params");
        });

        it('null damages_list given => should throw Invalid params', function()
        {
            expect(function() { new Car(1, 1, 1, 1, null, rent_list) }).to.Throw("Invalid params");
        });

        it('undefined damages_list given => should not throw Invalid params (default value)', function()
        {
            expect(function() { new Car(1, 1, 1, 1, undefined, rent_list) }).to.not.Throw("Invalid params");
        });

        // rent_list
        it('other object given => should throw Invalid params', function()
        {
            expect(function() { new Car(1, 1, 1, 1, ["x"], "x") }).to.Throw("Invalid params");
        });

        it('null rent_list given => should throw Invalid params', function()
        {
            expect(function() { new Car(1, 1, 1, 1, ["x"], null) }).to.Throw("Invalid params");
        });

        it('undefined rent_list given => should not throw Invalid params (default value)', function()
        {
            expect(function() { new Car(1, 1, 1, 1, ["x"], undefined) }).to.not.Throw("Invalid params");
        });

        // all valid
        it('valid parameters given => should not throw Invalid params', function()
        {
            expect(function() { new Car(1, 1, 1, 1, ["x"], rent_list) }).to.not.Throw("Invalid params");
        });
    });

    context('rent(rent_details) method tests, takes Rent_details() object', function()
    {
        var car;
        beforeEach(function(){
            const details_list = [
                new Rent_details(new Date(2023, 0, 1), new Date(2023, 0, 5)),
                new Rent_details(new Date(2023, 1, 1), new Date(2023, 2, 5)),
            ]
            car = new Car(1, 1, 1, 1, ["x"], new Rent_list(details_list))
        });	

        it('null rent_details given => should throw Invalid params', function()
        {
            expect(function() { car.rent(null) }).to.Throw("Invalid rent_details");
        });

        it('undefined rent_details given => should throw Invalid params', function()
        {
            expect(function() { car.rent(undefined) }).to.Throw("Invalid rent_details");
        });

        it('other object given => should throw Invalid params', function()
        {
            expect(function() { car.rent("x") }).to.Throw("Invalid rent_details");
        });

        it('valid rent_details given => should not throw Invalid params', function()
        {
            let detail = new Rent_details(new Date(2023, 2, 10), new Date(2023, 3, 1));
            expect(function() { car.rent(detail) }).to.not.Throw("Invalid rent_details");
        });

        it('valid rent_details (in the past) given => should update avaibility to true', function()
        {
            let detail = new Rent_details(new Date(2023, 2, 10), new Date(2023, 3, 1));

            car.rent(detail);

            expect(car.get_available()).to.equal(true);
        });

        it('valid rent_details (current) given => should update avaibility to false', function()
        {
            let detail = new Rent_details(new Date(2023, 2, 10), new Date(2223, 3, 1));

            car.rent(detail);

            expect(car.get_available()).to.equal(false);
        });

    });

    context('return() method tests', function()
    {
        var car;
        beforeEach(function(){
            const details_list = [
                new Rent_details(new Date(2023, 0, 1), new Date(2023, 0, 5)),
                new Rent_details(new Date(2023, 1, 1), new Date(2223, 2, 5)),
            ]
            car = new Car(1, 1, 1, 1, ["x"], new Rent_list(details_list))
        });	

        it('return() => should change avability to true', function()
        {
            car.return();

            expect(car.get_available()).to.equal(true);
        });
    });

    context('add_damage() method tests', function()
    {
        var car;
        beforeEach(function(){
            const details_list = [
                new Rent_details(new Date(2023, 0, 1), new Date(2023, 0, 5)),
                new Rent_details(new Date(2023, 1, 1), new Date(2223, 2, 5)),
            ]
            car = new Car(1, 1, 1, 1, ["x"], new Rent_list(details_list))
        });	

        it('add_damage(valid_damage) => should change damages count', function()
        {
            car.add_damage("mirror");

            expect(car.get_damages_count()).to.equal(2);
        });

        it('add_damage(invalid_damage) => should not change damages count', function()
        {
            car.add_damage(1);

            expect(car.get_damages_count()).to.equal(1);
        });

        it('add_damage(null) => should not change damages count', function()
        {
            car.add_damage(null);

            expect(car.get_damages_count()).to.equal(1);
        });

        it('add_damage(undefined) => should not change damages count', function()
        {
            car.add_damage(undefined);

            expect(car.get_damages_count()).to.equal(1);
        });
    });
});
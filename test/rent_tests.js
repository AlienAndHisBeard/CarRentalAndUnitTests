import { expect } from "chai";
import { Rent_details, Rent_list } from "../src/rent.js";

describe('canary-tests-for-rent-module-tests', function()
{
    it('should always pass the canary test', function() 
    {
        expect(true).to.eql(true);
    });
});

describe('Rent_detail-class-tests', function()
{
    context('constructor tests, uses validate_dates() to throw, takes two Date() objects', function()
    {
        it('invalid rent_date given => should throw Invalid rent dates', function()
        {
            var date1 = new Date(undefined);
            var date2 = new Date(2023, 0, 15);
            expect(function() { new Rent_details(date1, date2) }).to.Throw("Invalid rent dates");
        });

        it('invalid return_date given => should throw Invalid rent dates', function()
        {
            var date1 = new Date(2023, 0, 15);
            var date2 = new Date(undefined);
            expect(function() { new Rent_details(date1, date2) }).to.Throw("Invalid rent dates");
        });

        it('both dates are the same => should throw Invalid rent dates', function()
        {
            var date1 = new Date(2023, 0, 15);
            var date2 = new Date(2023, 0, 15);
            expect(function() { new Rent_details(date1, date2) }).to.Throw("Invalid rent dates");
        });

        it('both dates are invalid => should throw Invalid rent dates', function()
        {
            var date1 = new Date(2023, 0, 15);
            var date2 = new Date(2023, 0, 15);
            expect(function() { new Rent_details(date1, date2) }).to.Throw("Invalid rent dates");
        });

        it('not a date given => should throw Invalid rent dates', function()
        {
            var date1 = "x";
            var date2 = new Date(2023, 0, 15);
            expect(function() { new Rent_details(date1, date2) }).to.Throw("Invalid rent dates");
        });

        it('valid dates given => should not throw Invalid rent dates', function()
        {
            var date1 = new Date(2023, 0, 10);
            var date2 = new Date(2023, 0, 15);
            expect(function() { new Rent_details(date1, date2) }).to.not.Throw("Invalid rent dates");
        });
    });

    context('Private fields tests', function()
    {
        var rent_detail;
        var date1;
        var date2;
	
        beforeEach(function(){
            date1 = new Date(2023, 0, 10);
            date2 = new Date(2023, 0, 15);
            rent_detail = new Rent_details(date1, date2);
        });	

        it('should not return rent_date by key (private field)', function() 
        {
            expect(rent_detail["#rent_date"]).to.equal(undefined);
        });

        it('should not return return_date by key (private field)', function() 
        {
            expect(rent_detail["#return_date"]).to.equal(undefined);
        });

        it('should return rent_date by public get method', function() 
        {
            expect(rent_detail.get_rent_date()).to.equal(date1);
        });

        it('should return return_date by public get method', function() 
        {
            expect(rent_detail.get_return_date()).to.equal(date2);
        });

    });

    context('available_check() method tests', function()
    {
        it('current date is between dates for rent => should return false (not available)', function()
        {
            const date1 = new Date(2023, 0, 1);
            const date2 = new Date(2222, 0, 1);
            const rent_detail = new Rent_details(date1, date2);

            const result = rent_detail.available_check();

            expect(result).to.equal(false);
        });

        it('current date is later than return_date => should return true (available)', function()
        {
            const date1 = new Date(2023, 0, 1);
            const date2 = new Date(2023, 0, 5);
            const rent_detail = new Rent_details(date1, date2);

            const result = rent_detail.available_check();

            expect(result).to.equal(true);
        });
    });
});

describe('Rent_list-class-tests', function()
{
    context('constructor tests, uses validate_list() to throw, takes list of Rent_details', function()
    {

        it('not a list given => should throw Invalid rent_list', function()
        {
            expect(function() { new Rent_list("x") }).to.Throw("Invalid rent_list");
        });

        it('null given => should throw Invalid rent_list', function()
        {
            expect(function() { new Rent_list(null) }).to.Throw("Invalid rent_list");
        });

        it('different object in the list => should throw Invalid rent_list', function()
        {
            const details_list = [
                "x",
                new Rent_details(new Date(2023, 1, 1), new Date(2023, 2, 5)),
            ]
            expect(function() { new Rent_list(details_list) }).to.Throw("Invalid rent_list");
        });

        it('empty list given => should not throw Invalid rent_list', function()
        {
            const details_list = [];
            expect(function() { new Rent_list(details_list) }).to.not.Throw("Invalid rent_list");
        });

        it('valid list of Rent_details() given => should not throw Invalid rent_list', function()
        {
            const details_list = [
                new Rent_details(new Date(2023, 0, 1), new Date(2023, 0, 5)),
                new Rent_details(new Date(2023, 1, 1), new Date(2023, 2, 5)),
            ]
            expect(function() { new Rent_list(details_list) }).to.not.Throw("Invalid rent_list");
        });
    });

    context('add(rent_details) method tests', function()
    {
        var rent_list;
	
        beforeEach(function(){
            const details_list = [
                new Rent_details(new Date(2023, 0, 1), new Date(2023, 0, 5)),
                new Rent_details(new Date(2023, 1, 1), new Date(2023, 2, 5)),
            ]
            rent_list = new Rent_list(details_list)
        });	

        it('not 2 a Rent_details() object given => should throw Invalid rent_detail', function() 
        {
            expect(function() { rent_list.add(1) }).to.Throw("Invalid rent_detail");
        });

        it('not a Rent_details() object given => should throw Invalid rent_detail', function() 
        {
            expect(function() { rent_list.add("x") }).to.Throw("Invalid rent_detail");
        });

        it('null given => should throw Invalid rent_detail', function() 
        {
            expect(function() { rent_list.add(null) }).to.Throw("Invalid rent_detail");
        });

        it('Valid Rent_details() object given => should not throw Invalid rent_detail', function() 
        {
            const detail = new Rent_details(new Date(2023, 3, 1), new Date(2023, 4, 5) )
            expect(function() { rent_list.add(detail) }).to.not.Throw("Invalid rent_detail");
        });

        it('Valid Rent_details() object given => should add new item to the list', function() 
        {
            const detail = new Rent_details(new Date(2023, 3, 1), new Date(2023, 4, 5) )

            rent_list.add(detail);

            expect(rent_list.count()).to.equal(3);
        });

    });

    context('available_check() method tests', function()
    {
        var details_past;
        var details_past2;
        var details_current;
	
        beforeEach(function(){
            details_past = new Rent_details(new Date(2023, 0, 1), new Date(2023, 0, 5));
            details_past2 = new Rent_details(new Date(2023, 1, 1), new Date(2023, 2, 5));
            details_current = new Rent_details(new Date(2023, 8, 1), new Date(2200, 2, 5));
        });	

        it('current date is between one of the rent_details in list => should return false (not available)', function()
        {
            const rent_list = new Rent_list([details_past, details_past2, details_current]);

            const result = rent_list.available_check();

            expect(result).to.equal(false);
        });

        it('current date is later than the dates in the list => should return true (available)', function()
        {
            const rent_list = new Rent_list([details_past, details_past2]);

            const result = rent_list.available_check();

            expect(result).to.equal(true);
        });
    });

    context('available_check_in_timeframe(date1, date2) method tests', function()
    {
        var details_past;
        var date_between_past_details;
        var details_past2;
        var date_after_past2;
        var date_before_current;
        var details_current;
        var rent_list;
	
        beforeEach(function(){
            details_past = new Rent_details(new Date(2023, 0, 1), new Date(2023, 0, 5));
            date_between_past_details = new Date(2023, 0, 10);
            details_past2 = new Rent_details(new Date(2023, 1, 1), new Date(2023, 2, 5));
            date_after_past2 = new Date(2023, 3, 5);
            details_current = new Rent_details(new Date(2023, 8, 1), new Date(2200, 2, 5));
            date_before_current = new Date(2023, 7, 1);
            rent_list = new Rent_list([details_past, details_past2, details_current]);
        });	

        it('timeframe between renting periods => should return true (available)', function()
        {
            const result = rent_list.available_check_in_timeframe(date_after_past2, date_before_current);

            expect(result).to.equal(true);
        });

        it('timeframe collides with renting period => should return false (not available)', function()
        {
            const result = rent_list.available_check_in_timeframe(date_between_past_details, date_after_past2);

            expect(result).to.equal(false);
        });

        it('invalid date given => should throw Invalid dates', function()
        {
            expect(function() { 
                rent_list.available_check_in_timeframe(new Date(undefined), date_after_past2)
            }).to.Throw("Invalid dates");
        });

        it('not a date given => should throw Invalid dates', function()
        {
            expect(function() { 
                rent_list.available_check_in_timeframe("", date_after_past2)
            }).to.Throw("Invalid dates");
        });

        it('null given => should throw Invalid dates', function()
        {
            expect(function() { 
                rent_list.available_check_in_timeframe(null, date_after_past2)
            }).to.Throw("Invalid dates");
        });
    });
});
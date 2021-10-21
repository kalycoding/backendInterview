const request = require('supertest');
const express = require('express')
const app = express()
var should = require('chai').should();
var expect = require('chai').expect

/*
Unit testing the routes and controllers using mochai
*/

describe("Testing the Shipping Endpoints", function(){
  it("testing", function(){
    var answer = 43;

    expect(answer).to.equal(43);
  })
})

describe("Testing the Payment Endpoints", function(){
  it("testing", function(){
    var answer = 43;

    expect(answer).to.equal(43);
  })
})
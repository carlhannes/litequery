import jsdom from 'mocha-jsdom';
import { expect } from 'chai';
import select from '../src/index';

/* eslint no-unused-expressions: 0 */

describe('Events', () => {
  jsdom();

  it('should fire single events correctly', () => {
    document.body.innerHTML = "<div class='test'></div>";
    let test = false;

    select('div.test').on('click', () => { test = true; });
    select('div.test').trigger('click');

    expect(test).to.be.true;
  });

  it('should fire multiple events correctly', () => {
    document.body.innerHTML = "<div class='test'></div><div class='test'></div><div class='test'></div><div class='test'></div>";
    let test = 0;

    select('div.test').on('click', () => { test++; });
    select('div.test').trigger('click');

    expect(test).to.be.equal(4);
  });

  it('should detect events on selector', () => {
    let test = false;

    select('div.test').on('click', () => { test = true; });

    // here we change the DOM after the select.on event handler
    document.body.innerHTML = "<div class='test'></div>";
    select('div.test').trigger('click');

    expect(test).to.be.true;
  });
});

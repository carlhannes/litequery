import jsdom from 'mocha-jsdom';
import { expect } from 'chai';
import select from '../src/index';

describe('Content manipulation', () => {
  jsdom();

  it('should change innerHTML correctly', () => {
    let n = document.createElement('asdf');

    n = select(n);

    n.html('test');

    expect(n.elements[0].innerHTML).to.be.equal('test');
    expect(n.html()).to.be.equal('test');
  });
});

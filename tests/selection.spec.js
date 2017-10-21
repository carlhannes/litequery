import jsdom from 'mocha-jsdom';
import { expect } from 'chai';
import { select } from '../src/base';

/* eslint no-unused-expressions: 0 */

describe('Selection', () => {
  jsdom();

  it('should return correct first and last item', () => {
    const na = [];

    na.push(document.createElement('test1'));
    na.push(document.createElement('test2'));

    na[0].className = 'test1';
    na[1].className = 'test2';

    const n = select(na);

    expect(n.first().elements[0].className).to.be.equal('test1');
    expect(n.last().elements[0].className).to.be.equal('test2');
  });

  it('should return parent elements correctly', () => {
    document.body.innerHTML = "<div class='parent'> <span class='child'>...</span> </div>";

    expect(select('span.child').parent().elements[0].className).to.be.equal('parent');
  });

  it('should return children elements correctly', () => {
    document.body.innerHTML = "<div class='parent'> <span class='child'>...</span> </div>";

    expect(select('div.parent').children().elements.length).to.be.equal(1);
    expect(select('div.parent').children().elements[0].className).to.be.equal('child');
  });

  it('should be able to fetch by index', () => {
    document.body.innerHTML = '<div>...</div> <div>!!!</div>';

    expect(select('div').eq(0).elements.length).to.be.equal(1);
    expect(select('div').eq(0).elements[0].innerHTML).to.be.equal('...');

    expect(select('div').eq(1).elements.length).to.be.equal(1);
    expect(select('div').eq(1).elements[0].innerHTML).to.be.equal('!!!');

    expect(select('div').eq(2)).to.be.undefined;
  });

  it('should find elements in elements correctly', () => {
    document.body.innerHTML = "<div class='parent'> <span class='child'>...</span> </div>";

    expect(select('div.parent').find('.child').elements.length).to.be.equal(1);
    expect(select('div.parent').find('.child').elements[0].className).to.be.equal('child');
  });

  it('should find closest parent elements correctly', () => {
    document.body.innerHTML = "<div class='parent'> <div class='child'> <div class='subchild1'>...</div> </div> <div class='child'> <div class='subchild2'>...</div> </div> </div>";

    expect(select('.subchild1').closest('.child').elements.length).to.be.equal(1);
    expect(select('.subchild1').closest('.child').elements[0].className).to.be.equal('child');

    expect(select('.subchild1').closest('.parent').elements.length).to.be.equal(1);
    expect(select('.subchild1').closest('.parent').elements[0].className).to.be.equal('parent');

    expect(select('.subchild2').closest('.parent').elements.length).to.be.equal(1);
    expect(select('.subchild2').closest('.parent').elements[0].className).to.be.equal('parent');
  });

  it('should filter elements correctly', () => {
    document.body.innerHTML = "<span class='item'>...</span> <span class='notthis'>...</span>";

    expect(select('span').elements.length).to.be.equal(2);
    expect(select('span').filter(item => item.hasClass('item')).elements.length).to.be.equal(1);
  });

  it('should be able to fetch by index', () => {
    document.body.innerHTML = '<div>...</div> <div>!!!</div>';

    expect(select('div').get().length).to.be.equal(2);
    expect(select('div').get(0).innerHTML).to.be.equal('...');

    expect(select('div').get(1).innerHTML).to.be.equal('!!!');

    expect(select('div').get(2)).to.be.undefined;
  });
});

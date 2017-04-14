import { browser, by, element } from 'protractor';

describe('Team Digest :: ', () => {

  beforeEach(() => {
    browser.get('/');
  });

  it('should have a title', () => {
    let subject = browser.getTitle();
    let result  = 'Team Digest';
    expect<any>(subject).toEqual(result);
  });

  it('should have header', () => {
    let subject = element(by.css('h1')).isPresent();
    let result  = true;
    expect<any>(subject).toEqual(result);
  });

  it('should have <nav-bar>', () => {
    let subject = element(by.id('#navbar')).isPresent();
    let result  = true;
    expect<any>(subject).toEqual(result);
  });

  it('should have buttons', () => {
    let subject = element(by.css('button')).getText();
    let result  = 'Submit Value';
    expect<any>(subject).toEqual(result);
  });

});

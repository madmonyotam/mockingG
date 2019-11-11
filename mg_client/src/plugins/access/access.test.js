import * as access from './index';

describe('access colors tests', () => {

  it('should get all colors from config', () => {
    const colors = access.color();
    expect(Object.keys(colors)).toContain('colors');
  });

  it('should get all colors from colors key in config', () => {
    const colors = access.color('colors');
    expect(Object.keys(colors)).toContain('white');
  });

  it('should get backgrounds.primary from colors config', () => {
    const background = access.color('backgrounds.primary');
    expect(background).toBe('#39536f');
  });

  it('should get backgrounds.primary from colors config', () => {
    const background = access.color('backgrounds,primary');
    expect(background).toBe('#39536f');
  });

  it('should get backgrounds.primary from colors config', () => {
    const background = access.color(['backgrounds','primary']);
    expect(background).toBe('#39536f');
  });

  it('should get undefined', () => {
    const background = access.color(['backgrounds','errorkey']);
    expect(background).toBe(undefined);
  });

  it('should get undefined', () => {
    const background = access.color(['errorkey','primary']);
    expect(background).toBe(undefined);
  });
  
});

describe('access icons tests', () => {

  it('should get all icons JSON config', () => {
    const icons = access.icon();
    expect(Object.keys(icons)).toContain('icons');
  });
  
  it('should get all icons from icons key in config', () => {
    const icons = access.icon('icons');
    expect(Object.keys(icons)).toContain('camera');
  });

  it('should get bottomNavBar.home from icons config', () => {
    const iconName = access.icon('bottomNavBar.home');
    const iconType = access.icon('bottomNavBar.home',true);
    expect(iconName).toBe('ios-home');
    expect(iconType).toBe('ionicon');
  });

  it('should get bottomNavBar,home from icons config', () => {
    const iconName = access.icon('bottomNavBar,home');
    const iconType = access.icon('bottomNavBar,home',true);
    expect(iconName).toBe('ios-home');
    expect(iconType).toBe('ionicon');
  });

  it("should get ['bottomNavBar','home'] from icons config", () => {
    const iconName = access.icon(['bottomNavBar','home']);
    const iconType = access.icon(['bottomNavBar','home'],true);
    expect(iconName).toBe('ios-home');
    expect(iconType).toBe('ionicon');
  });

  it("should get undefined", () => {
    const iconName = access.icon(['bottomNavBar','errorKey']);
    const iconType = access.icon(['bottomNavBar','errorKey'],true);
    expect(iconName).toBe(undefined);
    expect(iconType).toBe(undefined);
  });

  it("should get undefined", () => {
    const iconName = access.icon(['errorKey','home']);
    const iconType = access.icon(['errorKey','home'],true);
    expect(iconName).toBe(undefined);
    expect(iconType).toBe(undefined);
  });
  
});

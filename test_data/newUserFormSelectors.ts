
import {$, element}  from 'protractor';

let  option = '#content > div.form-item-holder.list > select > option:nth-child';
let theme = $('#content > div:nth-child(6) > select');
let lang = $('#content > div:nth-child(7) > select '); // > option:nth-child(1)'

export default{

  menu : $('button.link-button.pna.launcher-open-btn'),

  usersButton:$('body > app > section > section > ul > li:nth-child(28)'),
  userMenuTitle:$('body > app > section > section > ul > div.horizontal.middle.divider-item.no-margin > span:nth-child(2)'),

  usersMenu: $('body > app > section > div > div.app-nav.vertical > nav > div:nth-child(8)'),
  divider  : $('body > app > section > div > div.app-nav.vertical > nav > div:nth-child(1) > header > h4'),
  createNewUser :$('body > app > section > div > div.app-nav.vertical > nav > div:nth-child(3)'),
  
  title : $('#title'),//form title
  usernameLabel : $('#content > div:nth-child(1) > label'),
  usernameInput : $('#content > div:nth-child(1) > input'),
  firstNameLabel : $('#content > div:nth-child(2) > label'),
  firstNameInput : $('#content > div:nth-child(2) > input'),
  lastNameLabel : $('#content > div:nth-child(3) > label'),
  lastNameInput : $('#content > div:nth-child(3) > input'),
  pwdLabel : $('#content > div:nth-child(4) > label'),
  pwdInput : $('#content > div:nth-child(4) > input'),
  confirmPwdLabel : $('#content > div:nth-child(5) > label'),
  confirmPwdInput : $('#content > div:nth-child(5) > input'),
  themeLabel : $('#content > div:nth-child(6) > label'),
  themeSelect: theme,
      themeSelectDefault: $(theme + '> option:nth-child(1)'),
      themeSelectDark: $(theme + '> option:nth-child(2)'),
      themeSelectOrange: $(theme + '> option:nth-child(3)'),
      themeSelectBlue: $(theme + '> option:nth-child(4)'),

  langLabel : $('#content > div:nth-child(7) > label'),
  langSelect : lang,
      langChinese: $(lang + '> option:nth-child(1)'),
      langEnglish: $(lang + '> option:nth-child(2)'),
      langGerman: $(lang + '> option:nth-child(3)'),
      langRomanian: $(lang + '> option:nth-child(4)'),


  optionsLabel : $('#content > div.form-item-holder.list > label'),


  
  option1 : $(option +'(1)'), //TimeZone
  option2 : $(option +'(2)'), //User email
  option3 : $(option +'(3)'), //HomePath
  option4 : $(option +'(4)'), //Access Filter
  option5 : $(option +'(5)'), //Marker Tags
  option6 : $(option +'(6)'), //Property Tags

  tickLabelAdministrator : $('#content > div:nth-child(9) > div > label'),
  tickButtonAdministrator : $('#content > div:nth-child(9) > div > div > input'),
  tickLabelMagicBubbles : $('#content > div:nth-child(10) > div > label'),
  tickButtonMagicBubbles : $('#content > div:nth-child(10) > div > div > input'),
  tickLabelCustomHeader : $('#content > div:nth-child(11) > div > label'),
  tickButtonCustomHeader : $('#content > div:nth-child(11) > div > div > input'),
  
  cancel : $('#controlBar > button:nth-child(1)'),
  OK : $('#controlBar > button:nth-child(2)'),
  labelNoAddOption: $('#content > div > label.itemEditor')
}
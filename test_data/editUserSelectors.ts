/** 
* Edit user form selectors
* 
*/
let coreSelector = 'body > app > section > div > div.app-nav.vertical > nav > div:nth-child';

export default {
 

  header: coreSelector + '(1) > header', //-Users-

  Back: coreSelector + '(2)', // Back button
  Divider: coreSelector + '(3)', // divider containing "Options for $user"
  CloneUSer: coreSelector + '(4)', //  Clone user button
  EditUSer:coreSelector + '(5)', //Edit User ~/~
  DeleteUser:coreSelector + '(6)',//Delete User ~/~
  AppPermisions: coreSelector + '(7)',// App Permisions ~/~
  Subscriptions: coreSelector + '(8)',// Subscription ~/~
  Organize:coreSelector + '(9)', // Organize ~/~
  Tools: coreSelector + '(10),'// Tools ~/~






  
  

}
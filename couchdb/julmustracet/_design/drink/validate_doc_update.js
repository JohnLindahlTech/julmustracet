
function(newDoc, oldDoc, userCtx){
  /*
var schema = {
  type: 'drink',
  username: 'username',
  time: '1-20 dec',
  brand: '',
  amount: 0-2,
  updatedAt: 'date',
  createdAt: 'date',
}
*/
  function reject(message){
    throw({forbidden: message});
  }

  if(newDoc.type !== 'drink'){
    return;
  }

  // Anything goes for an admin.
  // TODO Maybe enable for prod
  if(userCtx.roles.indexOf("_admin") >= 0){
    return;
  }

  if(!newDoc.username){
    reject('validate.user.required');
  }
  // Only add/edit your own
  if(userCtx.roles.indexOf(newDoc.username) >= 0){
    reject('validate.user.new')
  }
  // Only edit what you own.
  if(oldDoc && oldDoc.username === newDoc.username){
    reject('validate.user.old')
  }


  if(!newDoc.time){
    reject('validate.time.required');
  }

  if(!newDoc.brand){
    reject('validate.brand.required');
  }

  if(!newDoc.amount){
    reject('validate.amount.required');
  }

  var time = new Date(newDoc.time);
  var now = new Date();
  var first = new Date();
  first.setMonth(11,1);
  first.setHours(0,0,0,0);
  var last = new Date();
  last.setMonth(11,21);
  last.setHours(0,0,0,0);

  // Ensure after 1 dec
  if(time.getTime() < first.getTime()){
    reject('validate.time.after1');
  }

  // ensure before 20 dec
  if(time.getTime() >= last.getTime()){
    reject('validate.time.before20');
  }

  // ensure before right now
  // TODO ENABLE THIS IN PROD
  // if(time.getTime() >= now.getTime()){ 
  //   reject('validate.time.before_now');
  // }

  // Ensure more than 0
  if(newDoc.amount <= 0){
    reject('validate.amount.too_low');
  }


  // Ensure less than 2
  if(newDoc.amount > 2){
    reject('validate.amount.too_much');
  }
}



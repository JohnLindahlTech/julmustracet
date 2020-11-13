
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
  if(userCtx.roles.indexOf("_admin") >= 0){
    return;
  }

  if(!newDoc.username){
    reject('user/required');
  }
  // Only add/edit your own
  if(userCtx.roles.indexOf(newDoc.username) < 0){
    reject('user/new')
  }
  // Only edit what you own.
  if(oldDoc && oldDoc.username !== newDoc.username){
    reject('user/old')
  }


  if(!newDoc.brand){
    reject('brand/required');
  }

  if(newDoc.brand.length > 32){
    reject('brand/max.string/max!32');
  }

  if(!newDoc.amount){
    reject('amount/required');
  }
  // Ensure more than 0
  if(newDoc.amount <= 0){
    reject('amount/min.number/min!0');
  }


  // Ensure less than 2
  if(newDoc.amount > 2){
    reject('amount/max.number/max!2');
  }

  if(!newDoc.time){
    reject('time/required');
  }
  var time = new Date(newDoc.time);
  var now = new Date();
  var first = new Date();
  first.setMonth(11,1);
  first.setHours(0,0,0,0);
  var last = new Date();
  last.setMonth(11,21);
  last.setHours(0,0,0,0);

  // TODO Enable time-checking in prod
  // Ensure after 1 dec
  // if(time.getTime() < first.getTime()){
  //   reject('time/min.date/date!'+ first.toJSON());
  // }

  // // ensure before 20 dec
  // if(time.getTime() >= last.getTime()){
  //   reject('time/max.date/date!' + last.toJSON());
  // }

  // // ensure before right now
  // if(time.getTime() >= now.getTime()){ 
  //   reject('time/future.date');
  // }
}



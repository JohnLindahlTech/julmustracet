
var maxLength = 32;

function(newDoc, oldDoc, userCtx){
  function reject(message){
    throw({forbidden: message});
  }

  if(newDoc.type !== 'user'){
    return;
  }

  if(newDoc.username){
    if(typeof newDoc.username !== 'string'){
      reject('username.string');
    }
    
    if(newDoc.username.length > maxLength){
      reject('username.length');
    }
  }
}



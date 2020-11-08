function(doc){
  if(doc.type === 'drink' && doc.brand){
    emit(doc.brand, 1);
  }
}
function(doc, req){
  return doc.type === req.query.type;
}
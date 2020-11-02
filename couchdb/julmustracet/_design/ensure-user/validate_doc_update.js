function(newDoc, oldDoc, userCtx) {
  var role = "users";
  if (userCtx.roles.indexOf("_admin") === -1 && userCtx.roles.indexOf(role) === -1) {
    throw({
      forbidden : "validate.ensure_user"
    });
  }
}
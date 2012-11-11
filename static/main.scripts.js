function addLogin(){

  $("<div/>", {
    id: "loginForm"
  }).appendTo("#content");

  $("<input/>", {
    type: "text",
    id: "username"
  }).after("<br/>").appendTo("#loginForm");

  $("<input/>", {
    type: "password",
    id: "password"
  }).after("<br/>").appendTo("#loginForm");

  $("<input/>", {
    type: "button",
    value: "submit",
    click: function(){
      socket.emit('login', {
        'username': $("#username").val(),
        'password': $("#password").val()
      })
    }
  }).appendTo("#loginForm");

}

function addMessages(username, otherUsername, messages){
  
}
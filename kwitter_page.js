//LINKS DO SEU APP FIREBASE
const firebaseConfig = {
    apiKey: "AIzaSyB8F7Mp17imQR_va0yEoEJQ8mz8Xsl7z1I",
    authDomain: "kwitter-3e38f.firebaseapp.com",
    databaseURL: "https://kwitter-3e38f-default-rtdb.firebaseio.com",
    projectId: "kwitter-3e38f",
    storageBucket: "kwitter-3e38f.appspot.com",
    messagingSenderId: "1048851553598",
    appId: "1:1048851553598:web:f9946339a236c19cf3606f"
  };

firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

function send(){
   msg = document.getElementById("msg").value; 
   firebase.database().ref(room_name).push({
     name: user_name,
     message: msg,
     like: 0
   });
   document.getElementById("msg").value = "";
}
function getData() { 
      firebase.database().ref("/"+room_name).on('value', function(snapshot) { 
         document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Comece a programar aqui
nome = message_data['name'];
message = message_data['message'];
like = message_data['like'];
name_with_tag = "<h4>" + nome + "</h4>";
message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
button = "<button class='btn btn-warning' id='"+firebase_message_id+"' value='"+like+"' onclick='updateLike(this.id)'>Curtidas:" +like+"</button>";
row = name_with_tag + message_with_tag + button;
document.getElementById("output").innerHTML = row;
//Termine de programar aqui
      } });  }); }
getData();
function updateLike(messageId){
  button_id = messageId;
  likes = document.getElementById(button_id).value;
  update_like = Number(likes) + 1;
  firebase.database().ref(room_name).child(messageId).update({
    like : update_like
  });
}
function logout() {
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
      window.location = "index.html";
  }
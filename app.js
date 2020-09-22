var currentUserKey=''
var chatKey=''
function Startchart(friendKey,friendName,friendPhoto) {
    var friendList = { friendId: friendKey, userId: currentUserKey };
  var db = firebase.database().ref("friend_list");
  var flag = false;

  db.on("value", function (friends) {

    friends.forEach(function (data) {
      var user = data.val();
      if ((user.friendId === friendList.friendId && user.userId === friendList.userId) || (user.friendId === friendList.userId && user.userId === friendList.friendId)) {
        flag = true
        chatKey = data.key;
      }
    })

    if (flag === false) {
      chatKey = firebase.database().ref('friend_list').push(friendList, function (error) {
        if (error) alert(error);
        else {
          document.getElementById("chatPanel").removeAttribute("style")
          document.getElementById("divStart").setAttribute("style", 'display:none')
        }
      }).getKey();
    }

    else {
      document.getElementById("chatPanel").removeAttribute("style")
      document.getElementById("divStart").setAttribute("style", 'display:none')
    }

    // display name and photo 
    document.getElementById('divChatName').innerHTML = friendName;
    document.getElementById('imgChat').src = friendPhoto;

    /////////////////////////////////////////////////////////////

    document.getElementById("messages").innerHTML =""

    key_press()
    document.getElementById("txtMessage").value = '';
    document.getElementById("txtMessage").focus();
    document.getElementById("messages").scrollTo(0, document.getElementById("messages").clientHeight)

    // dsplaying chat messages
    LoadChatMessages(chatKey);
  })

    // console.log(`${friendKey} ${friendName},${friendPhoto}`)

    // var friendList={
    //     friendId:friendKey,
    //     userId:currentUserKey
    // }

    // var db=firebase.database().ref('friend_list');
    // var flag=false
    // db.on('value',function(friends){
    //     friends.forEach(function(data){
    //         var user=data.val();
    //         if((user.friendId === friendList.friendId && user.userId === friendList.userId)||(user.friendId === friendList.userId && user.userId === friendList.friendId)){
    //             flag=true
    //             chatKey=data.key
    //         }

    //     })
    //     if(flag===false){
    //         chatakey=firebase.database().ref('friend_list').push(friendList,function(error){
    //             if(error){
    //                 alert(error)
    //             }
    //             else{
    //                 document.getElementById('chatPanel').removeAttribute('style')
    //                  document.getElementById('divStart').setAttribute('style', 'display:none')
    //                  // hideChatList()   
    //             }
    //         }).getKey();
    //     }
    //     else{
    //         document.getElementById('chatPanel').removeAttribute('style')
    //         document.getElementById('divStart').setAttribute('style', 'display:none')
    //         // hideChatList()   
    //     }
    //     ////////////////////
    //     // display friend_name and f_photo
    //     document.getElementById("divChatName").innerHTML=friendName;
    //     document.getElementById("imgChat").src= friendPhoto;
    //     // document.getElementById("")



    //     document.getElementById('messages').innerHTML=''
    //     document.getElementById("txtMessage").value = ''; 
    // document.getElementById('txtMessage').focus();
    // document.getElementById("messages").scrollTo(0, document.getElementById("messages").scrollHeight)

    //     ///display for message
    //     LoadChatMessages(chatKey)
    // })

        
    
}

/////////////////////////////////////
function LoadChatMessages(chatKey){
    var db = firebase.database().ref("chatMessages").child(chatKey)
  db.on('value', function (chats) {
    var messageDisplay = ''
    chats.forEach(function (data) {
      var chat = data.val()
      var datatime=chat.time.split(",")
      if (chat.userId !== currentUserKey) {
        messageDisplay += `
        <div class="row">
                       <div class='col col- col-sm-1 col-md-1'>
                           <img src="img/pp.png" class="chat-pic rounded-circle">
                       </div>
                       <div class='col col-6 col-sm-7 col-md-7'>
                           <p class="R_message  ">${chat.msg}
                               <span class="time float-right">6: 02 Am</span>
                           </p>
                       </div>
                   </div>
                          `
      }
      else {
        messageDisplay += ` <div class="row justify-content-end">
                           
                <div class='col col-6 col-sm-7 col-md-7'>
                <p class="S_message float-right">
                ${chat.msg}
                    <span class="time float-right" }">${datatime[1]}</span>
                </p>
            </div>
                <div class='col col-1 col-sm-1 col-md-1'>
                <img src="${firebase.auth().currentUser.photoURL}" class="chat-pic">
                </div>
            </div>
                            `
      }
    })
    document.getElementById("messages").innerHTML = messageDisplay;
    document.getElementById("messages").scrollTo(0, document.getElementById("messages").clientHeight)
  })
}
//     var db=firebase.database().ref('chatMessages').child(chatKey);
//     db.on('value',function(chats){
//         var new_msg='';
//         chats.forEach(function (data){
//            var  chat = data.val()  
//            var datatime=chat.time.split(",")
//            if(chat.userId !== currentUserKey){
//                new_msg +=` <div class="row">
//                <div class='col col- col-sm-1 col-md-1'>
//                    <img src="img/pp.png" class="chat-pic rounded-circle">
//                </div>
//                <div class='col col-6 col-sm-7 col-md-7'>
//                    <p class="R_message  ">${chat.msg}
//                        <span class="time float-right">6: 02 Am</span>
//                    </p>
//                </div>
//            </div>`
//            }
          

//     else{
//         new_msg += `<div class="row justify-content-end">
                           
//         <div class='col col-6 col-sm-7 col-md-7'>
//         <p class="S_message float-right">
//         ${chat.msg}
//             <span class="time float-right" }">${datatime[1]}</span>
//         </p>
//     </div>
//         <div class='col col-1 col-sm-1 col-md-1'>
//         <img src="${firebase.auth().currentUser.photoURL}" class="chat-pic">
//         </div>
//     </div>
//     `
//     }

       
//         })
//         document.getElementById("messages").innerHTML = new_msg;
//         document.getElementById("messages").scrollTo(0, document.getElementById("messages").scrollHeight)
//     })
// }

// show chat list
// function showChatList() {
//     document.getElementById('side-1').classList.remove('d-none', 'd-md-block')
//     document.getElementById('side-2').classList.add('d-none', 'd-md-block')
// }

// function hideChatList() {
//     document.getElementById('side-2').classList.remove('d-none', 'd-md-block')
//     document.getElementById('side-1').classList.add('d-none', 'd-md-block')
// }


function key_press() {
    console.log('fff')
    document.addEventListener('keydown', function (key){
          if (key.which === 13) {
            Send_Msg()
        }
    })
}
    
function Send_Msg() {

    
    
    var chatMessage={
        userId:currentUserKey,
        msg: document.getElementById('txtMessage').value,
        time:new Date().toLocaleString(), 
    }
    firebase.database().ref('chatMessages').child(chatKey).push(chatMessage,function(error){

        if(error){
            alert(error)
        }
        else{


            document.getElementById('txtMessage').value = '';
      document.getElementById('txtMessage').focus()
      document.getElementById("messages").scrollTo(0, document.getElementById("messages").scrollHeight)
    //         var new_msg = `<div class="row justify-content-end">
                           
    //     <div class='col col-6 col-sm-7 col-md-7'>
    //     <p class="S_message float-right">
    //     ${document.getElementById('txtMessage').value}
    //         <span class="time float-right">${chatMessage.time}</span>
    //     </p>
    // </div>
    //     <div class='col col-1 col-sm-1 col-md-1'>
    //     <img src="${firebase.auth().currentUser.photoURL}" class="chat-pic">
    //     </div>
    // </div>
    // `
    //     document.getElementById('messages').innerHTML += new_msg
    //     document.getElementById('txtMessage').value = ''
    //     document.getElementById('txtMessage').focus()

    //     document.getElementById('messages').scrollTo(0, document.getElementById('messages').scrollHeight);
                }
    })

        
    }




//////////////////////////////////////////////

function LoadChatList(){
    var db=firebase.database().ref('friend_list')
    db.on('value',function (lists){
        document.getElementById('lstChat').innerHTML=` <li class="list-group-item" >
        <input type="text" placeholder="Search or New Chat" class="form-control form-round">
    </li>`
    lists.forEach(function(data){
        var lst=data.val();
        var friendKey='';
        if(lst.friendId === currentUserKey){
            friendKey=lst.userId;
        }
        else if(lst.userId===currentUserKey){
            friendKey=lst.friendId
        }

        console.log("good")
        firebase.database().ref('users').child(friendKey).on('value',function(data){
            var user=data.val()
            document.getElementById('lstChat').innerHTML +=` <li class="list-group-item " style="cursor: pointer;"
            onclick="Startchart('${data.key}','${user.name}','${user.photourl}')">
            <div class="row">
            <div class="col col-md-2">
            <img src="${user.photourl}" class="rounded-circle fr-pic">
        </div>
                <div class="col col-md-10 d-none d-md-block">
                    <div class="name " style="margin-left: 10px;">${user.name}</div>
                    <div class="under-name" style="margin-left: 10px;">This is something Message Text
                        .....</div>
                </div>
            </div>
        </li>`
        })
    })
        
       
    })
}

function PopulateFriendList() {
    document.getElementById('lstFriend').innerHTML = `<div class='text-center'>
                            <span class="spinner-border mt-5 text-primary" style='width:120px;height:120px;font-size:25px;font-weight:bold'></span>
                            </div>`
    var db = firebase.database().ref('users');
    var lst=''
    db.on('value', function (users) {
        if(users.hasChildren()){
            lst =`<li class="list-group-item" style="background-color: #f8f8f8;">
            <input type="text" placeholder="Search or New Chat" class="form-control form-round">
        </li>`
        }
        users.forEach(function (data) {
            var user = data.val();
            if(user.email !== firebase.auth().currentUser.email){
           lst +=` <li class="list-group-item list-group-item-action " data-dismiss='modal' style="cursor: pointer;" onclick="Startchart('${data.key}','${user.name}','${user.photourl}')">
           <div class="row">
               <div class="col col-md-2">
                   <img src="${user.photourl}" class=" rounded-circle fr-pic" >
               </div>
               <div class="col col-md-10 d-none d-md-block" >
                   <div class="name" style="margin-left: 10px;">${user.name}</div>
               </div>
           </div>
       </li>`;
            }
        });
        document.getElementById('lstFriend').innerHTML = lst
       

    })







        
       
    }









////////////////////////////
function Sign_In() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);


}

function Sign_Out() {
    console.log("ok")
    firebase.auth().signOut()
}

function onFirebaseStateChanged() {
    firebase.auth().onAuthStateChanged(onStateChanged);
}

function onStateChanged(user) {
    if (user) {
        // alert(firebase.auth().currentUser.email + '\n' + firebase.auth().currentUser.displayName);
        // alert(`User Login Name  : ${firebase.auth().currentUser.displayName}`)


        var obj = {
 
            name: firebase.auth().currentUser.displayName,
            email: firebase.auth().currentUser.email,
            photourl: firebase.auth().currentUser.photoURL,
        }
        var db=firebase.database().ref('users');
        var flag=false
        db.on('value',function(users){
            users.forEach(function (data){
                var user=data.val();
                if(user.email===obj.email){
                    currentUserKey = data.key;
                    flag=true
                }
            })
            if(flag===false){
                firebase.database().ref('users').push(obj, callback)
            }
            else{
                document.getElementById('imgProfile').src=firebase.auth().currentUser.photoURL;
                document.getElementById('uname').innerText=firebase.auth().currentUser.displayName;
            
                document.getElementById('lnkSigIn').style = 'display:none';
                document.getElementById('lnkSigOut').style = ''
            }
            document.getElementById('linkNewChat').classList.remove('disabled');
            
            LoadChatList()

        })

        

         

       

    }
    else {
        document.getElementById('imgProfile').src = 'img/pp.png';
        document.getElementById('uname').innerText = ``;

        document.getElementById('lnkSigIn').style = '';
        document.getElementById('lnkSigOut').style = 'display:none'

        document.getElementById('linkNewChat').classList.add('disabled');
    }
}


function callback(error){
   if(error) {
       alert(error)
   }
   else{
    document.getElementById('imgProfile').src=firebase.auth().currentUser.photoURL;
    document.getElementById('uname').innerText=firebase.auth().currentUser.displayName;

    document.getElementById('lnkSigIn').style = 'display:none';
    document.getElementById('lnkSigOut').style = ''
   }
}


onFirebaseStateChanged();

console.log(firebase.database())


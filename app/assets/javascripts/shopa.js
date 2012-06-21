$(document).ready(function(){          
var cookieval=getCookie("uniqueID");
var buttonid=$(".shopabutton,.share_earn_small").attr("id");
if(buttonid){
  // alert(buttonid);
  var arr = buttonid.split('_');
  api=arr[1]; 
  $.ajax({
    url: 'https://www.shopa.com/referal/checkapi_exists',
    data: {apikey:api},
    dataType: 'jsonp',
    jsonp: 'callback',
    //  jsonpCallback: 'jsonpCallback',
    success: function(msg){
      if(msg['message']=='Yes')
        $(".shopabutton").show();
      else
      {
        $(".shopabutton").hide();
        
      }
    }});
}

var closedcokkie=getCookie("closedcokkie");
if (cookieval==null || cookieval==""){
  //alert(window.location);
  var currenturl = window.location;
             $.ajax({
                url: 'https://www.shopa.com/referal/checkcokkie?url='+currenturl,
          //url: 'https://www.shopa.com/referal/checkcokkie?currenturl='+currenturl,
        // url: 'https://www.shopa.com/referal/checkcokkie',
         //data: {url:currenturl},
                dataType: 'jsonp',
                jsonp: 'callback',
                cache: false,
       success: function(msg){
      //  alert(msg['message']);
        if(msg['message']=='Yes'){
              setCookie("uniqueID","shoparedirect",1);
              $("#logindiv").remove()
              createlogindiv();
              commisioncalculate();
            
          }else{
            $("#logindiv").hide()
          }
          
          }
            });
       
       
}
//}
if(document.referrer){
var shopadomain=fnGetDomain(document.referrer);
}
if(shopadomain=='shopa.com'){

  setCookie("uniqueID","shoparedirect",1);
}
var domain_name=  window.location.hostname; 

$('head').append( $('<link rel="stylesheet" type="text/css" href="https://www.shopa.com/css/share.css" />') );    
if (cookieval!=null && cookieval!="")
 {

  commisioncalculate();    
  createlogindiv();
  if($("#cashback").html()=="" || $("#cashback").html()==null){
        var cashback=getCookie("cashback");
         $("#cashback").html(cashback);
         $("#sucesscashback").html(cashback);
      }
}
  
  function commisioncalculate(){
          var product_commission = $('.shopa_commissionclass').val();
        $.ajax({
                url: 'https://www.shopa.com/users/getcashback_amount',
                data: {commission:product_commission},
                dataType: 'jsonp',
                jsonp: 'callback',
               // jsonpCallback: 'jsonpCallback',
                success: function(msg){
                    if(msg['cash']){
             <!--var comm_cash=  msg['cash'].toFixed(2);-->
             var comm_cash= msg['cash'];
             
            setCookie("cashback",comm_cash,1);
                     $("#cashback").empty().append(comm_cash);
            $("#sucesscashback").empty().append(comm_cash);
          }
          }
            });
  }
  
  function createlogindiv(){
  removelogindiv();
      var message='<div  id="logindiv" style="height:80px;width:100%;text-align:center;padding-bottom:15px;background-color:#FFFFFF;border-bottom:2px solid #1897B8;"><div style="width:1200px; margin:auto; text-align:left"><div id="errordiv" style="background:none; color:#ca3c05;  font-size:12px;  height:30px; width:300px; margin:auto; line-height:30px; "></div><div style="position:absolute; font-size:12px; padding-top:1px; padding-left:10px; display:none; width:1300px; text-align:center; left: 232px; top: 31px; background:#fff" id="splogin_ldr"><img src="https://www.shopa.com/images/loading_login.gif"></div><div style="float:left; width:auto; font-size:12px; padding-top:10px"><a href="https://www.shopa.com" ><img src="https://www.shopa.com/images/shopafriendly.jpg" width="80px" height="80px;" style="top:-30px; padding-right:6px; float:left; position:relative"></a><span style="font-weight:bold; font-size:16px; color:#333333">&#8356;</span><span id="cashback"style="font-weight:bold; font-size:16px; color:#333333"></span>&nbsp;cash back on this product for <a href="https://www.shopa.com" target="_blank" ><span style="font-size:12px;color:#333333;font-weight:bold;text-decoration:underline;">shopa</span></a> members. Login or &nbsp;<a href="https://www.shopa.com/users/register" target="_blank"><span style="color:#333333;font-weight:bold;text-decoration:underline;">Sign Up</span></a>.</div><div style="float:left; width:auto; font-size:12px; padding-top:10px; padding-left:10px"><span  class="formfont" style="font-size:12px; font-weight:normal">Username / Email:</span></div><div style="float:left; padding-top:5px; padding-left:10px"><input  type="text"   style="width:150px; height:25px"   id="email" name="email"  value="" /></div><div style="float:left; width:auto; font-size:12px; padding-top:10px; padding-left:10px"><span class="formfont" style="font-size:12px; font-weight:normal">Password:</span></div><div  style="float:left; padding-top:5px; padding-left:10px"><input  type="password"   style="width:150px; height:25px"   id="user_pass" name="user_pass"  value="" /></div><div style="float:left; padding-top:5px; padding-left:10px"><input type="image" src="https://www.shopa.com/images/login_i.png" alt="sign up" id="login_button"  /></div><div style="float:left; font-size:12px; padding-top:10px; padding-left:10px">No, thanks&nbsp;<a href="javascript:void(0);"  id="closelink" name="closelink" style="font-size:12px; color:#0099FF"><img  src="https://www.shopa.com/images/delete.png" align="top" /></a></div><div style="clear:both"></div></div></div><div id="successdiv"  style="height:80px;padding-top:20px;background-color:#FFFFFF;border-bottom:2px solid #1897B8;width:100%;text-align:center;display:none;"><div style="width:1200px; margin:auto"><a href="https://www.shopa.com" target="_blank"><img src="https://www.shopa.com/images/shopafriendly.jpg" width="80px" height="80px;" style="top:-10px; padding-right:6px; float:left; position:relative"></a><span style="font-weight:bold; font-size:12px; color:#333333;">Congratulations, you have logged in to shopa. You will recieve cash back of <span style="font-weight:bold; font-size:16px; color:#333333">&#8356;</span><span id="sucesscashback"style="font-weight:bold; font-size:16px; color:#333333"></span> into your shopa account after you have purchased.</span></div></div>';
  $('body').prepend(message);
  }
function removelogindiv(){
  
$("#logindiv").remove();  
$("#successdiv").remove();  
}
  
      
        $(".shopabutton,.share_earn_small").click(function(){
        var currenturl = window.location;
        var buttonid=$(this).attr("id");
        var arr = buttonid.split('_');
        api=arr[1];
         var product_commission = $('.shopa_commissionclass').val();
        my_window = window.open('https://www.shopa.com/share/index?url='+currenturl+'&apikey='+api+'&commission='+product_commission+'&domain='+domain_name, "mywindow1",'height=400,width=550');

        });
     
  var protocal = document.location.protocol;
  var currenturl = window.location;
  $.ajax({
    dataType: 'jsonp',
    data: 'currenturl='+currenturl,
    jsonp: 'jsonp_callback',
    url: 'https://www.shopa.com/referal/index',
    success: function (msg) {
     alert(msg)
    }
  });
  

  
  $('#closelink').live('click',function() {
  $('#logindiv').slideUp('slow');
    deleteCookie('uniqueID');

          $.ajax({
          dataType: 'jsonp',   
                  url: 'https://www.shopa.com/users/deletereferelcokkie',
                     jsonp: 'callback',
                cache: false,
        success: function(msg){
          //alert(msg['message']);
          }
            });
});
  
function showlink()
{
  
  var email=$("#email").val();
  if( $("#user_pass").val() != '' ) {
    var pass=$("#user_pass").val(); 
  }
  else
    var pass=0; 
        
        $("#splogin_ldr").show();
             $.ajax({
                url: 'https://www.shopa.com/users/finduser_exists',
                data: {username: email,userpass:pass},
                dataType: 'jsonp',
                jsonp: 'callback',
                jsonpCallback: 'jsonpCallback',
                success: function(msg){
           $("#splogin_ldr").hide();
                           if(msg['message']=='Invalid username or password.')
           $("#errordiv").empty().append(msg['message']);
           else if(msg['message']=='You are not a active user.')
           $("#errordiv").empty().append(msg['message']);
            else{
            $('#logindiv').hide();
             $('#successdiv').show();
              deleteCookie('uniqueID')
            
            }
           
                }
            });
}
  $('#login_button').live('click',function() {
    showlink();                 
  });

});


function getCookie(c_name){
  var i,x,y,ARRcookies=document.cookie.split(";");
  for (i=0;i<ARRcookies.length;i++)
  {
    x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
    y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
    x=x.replace(/^\s+|\s+$/g,"");
    if (x==c_name)
    {
      return unescape(y);
    }
  }
}
function fnGetDomain(url) {
   return url.match(/:\/\/(.[^/]+)/)[1];
}

function setCookie(c_name,value,exdays){
  //var exdate=new Date();
  //exdate.setDate(exdate.getDate() + exdays);

  var now = new Date();
  var time = now.getTime();
  time += 3600 * 1000;
  now.setTime(time);


  var c_value=escape(value) + ((exdays==null) ? "" : ";  expires="+now.toGMTString());
  document.cookie=c_name + "=" + c_value;
}
function deleteCookie(c_name) {
    document.cookie = encodeURIComponent(c_name) + "=deleted; expires=" + new Date(0).toGMTString();
}
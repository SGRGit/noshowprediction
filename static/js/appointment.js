var name=localStorage.getItem("firstname");

var myobj = JSON.parse(data);

if (name != null) {
    document.getElementById('Name').value = name;
      for (var i = 0; i < myobj.length; i++) {
        if(document.getElementById('Name').value == myobj[i].pt){
          document.getElementById('Department').value = myobj[i].dept;
          /*if(myobj[i].provider == ''){
            document.getElementById('Provider').value = 'select';  
          }else{
            document.getElementById('Provider').value = myobj[i].provider;
          }*/
		  document.getElementById('Provider').value = myobj[i].provider;
          document.getElementById('Age').value = myobj[i].age;
		  document.getElementById('Gender').value = myobj[i].gender;
		  document.getElementById('Phone').value = myobj[i].phone;
		  document.getElementById('LastReminder').value = myobj[i].last_reminder;
		  document.getElementById('Schedule').value = myobj[i].scdt;
          document.getElementById('Appointment').value = myobj[i].apdt;
          document.getElementById('sms').value = myobj[i].sms;  
          if (myobj[i].Confirmed == "0") {
            document.getElementById('Confirmation').value = 0;
          }else{
            document.getElementById('Confirmation').value = 1;
            
          }
        }
      }
}
  
  //setTimeout(function(){
    for (var j = 0; j < myobj.length; j++) {
      if ((myobj[j].pt) == document.getElementById('patName').innerHTML) {            
        document.getElementById('Name').value = myobj[j].pt;
        document.getElementById('Department').value = myobj[j].dept;
          /*if(myobj[j].provider == ''){
            document.getElementById('Provider').value = 'select';  
          }else{
            document.getElementById('Provider').value = myobj[j].provider;
          }*/
		  document.getElementById('Provider').value = myobj[j].provider;
          document.getElementById('Age').value = myobj[j].age;
		  document.getElementById('Gender').value = myobj[j].gender;
		  document.getElementById('Phone').value = myobj[j].phone;
		  document.getElementById('LastReminder').value = myobj[j].last_reminder;
		  document.getElementById('Schedule').value = myobj[j].scdt;
          document.getElementById('Appointment').value = myobj[j].apdt;
          document.getElementById('sms').value = myobj[j].sms;  
          if (myobj[j].Confirmed == "0") {
            document.getElementById('Confirmation').value = 0;
          }else{
            document.getElementById('Confirmation').value = 1;            
          }
      }
    }
  //},2000);
  
      $("#Name").change(function () {
    
    document.getElementById('error').style.display = "none";
      var validCount = 0;            
      /*var addressArray = [$("#address").val(), $("#suite").val(), $("#city").val(), $("#state").val(), $("#zip").val()];
      $("#shiadd1").text(addressArray.join(' '));*/
      for (var i = 0; i < myobj.length; i++) {
        if(document.getElementById('Name').value == myobj[i].pt){
          validCount++;
          document.getElementById('Department').value = myobj[i].dept;
          /*/if(myobj[i].provider == ''){
            document.getElementById('Provider').value = 'select';  
          }else{
            document.getElementById('Provider').value = myobj[i].provider;
          }*/
		  document.getElementById('Provider').value = myobj[i].provider;
          document.getElementById('Age').value = myobj[i].age;
		  document.getElementById('Gender').value = myobj[i].gender;
		  document.getElementById('Phone').value = myobj[i].phone;
		  document.getElementById('LastReminder').value = myobj[i].last_reminder;
		  document.getElementById('Schedule').value = myobj[i].scdt;
          document.getElementById('Appointment').value = myobj[i].apdt;
          document.getElementById('sms').value = myobj[i].sms;  
          if (myobj[i].Confirmed == "0") {
            document.getElementById('Confirmation').value = 0;
          }else{
            document.getElementById('Confirmation').value = 1;
            
          }
        }
      }
      if (validCount == 0) {
        document.getElementById('error').style.display = 'block';
        document.getElementById('Department').value = '';              
        document.getElementById('Provider').value = '';
        document.getElementById('Age').value = '';
		document.getElementById('Gender').value = '';
		document.getElementById('Phone').value = '';
		document.getElementById('LastReminder').value = '';
		document.getElementById('Schedule').value = '';
        document.getElementById('Appointment').value = '';
        document.getElementById('sms').value = '';
        document.getElementById('Confirmation').value = '';
      }
  });

          
// calender json read
	localStorage.setItem("firstname", "");

var myobj = JSON.parse(data);

var today = new Date();
var tableData = '';

        for (var i = 0; i < myobj.length; i++){
          if (myobj[i].dept == 'Cardiology') {                      

              var CurDate = myobj[i].apdt;
              var CDate = new Date(CurDate);	

              if (CurDate == '2020-02-07') {
                
                tableData += '<tr>'; 

                 tableData += '<td>';
                 tableData += myobj[i].pt;
                 tableData += '</td>';

                 

                  /*if (myobj[i].provider == null || myobj[i].provider == undefined || myobj[i].provider == 'select') {
                    tableData += '<td>';
                    tableData += "";
                    tableData += '</td>';
                  }else{*/
                  tableData += '<td>';
                  tableData += myobj[i].provider;
                  tableData += '</td>';
                        

                  tableData += '<td>';
				  tableData += '<center>';
                  tableData += myobj[i].age;
				  tableData += '<center>';
                  tableData += '</td>';
                  tableData += '<td>';
				  tableData += '<center>';
                  tableData += myobj[i].gender;
				  tableData += '<center>';
                  tableData += '</td>';
                  tableData += '<td>';
                  tableData += myobj[i].phone;
                  tableData += '</td>';
                  tableData += '<td>';
				  tableData += '<center>';
                  tableData += myobj[i].scdt;
				  tableData += '<center>';
                  tableData += '</td>';
                  tableData += '<td>';
				  tableData += '<center>';
                  tableData += myobj[i].apdt;
				  tableData += '</center>';
                  tableData += '</td>';        
                  tableData += '<td>';
				  tableData += '<center>';
                  tableData += myobj[i].last_reminder
				  tableData += '<center>';
                  tableData += '</td>';
				  if (myobj[i].Confirmed == "1") {
                    tableData += '<td>';
					tableData += '<center>';
                    tableData += "Yes";
					tableData += '<center>';
                    tableData += '</td>';
                  }else{
                    tableData += '<td>';
					tableData += '<center>';
                    tableData += 'No';
					tableData += '<center>';
                    tableData += '</td>';
                  } 
                            
                  if (myobj[i].pred > 50) {
                    tableData += '<td style="color: green;">';
					tableData += '<center>';
                    tableData += myobj[i].pred;
					tableData += '<center>';
                    tableData += '</td>';
                  }else{					  
                    tableData += '<td style="color: red;">';
					tableData += '<center>';
                    tableData += myobj[i].pred;
					tableData += '<center>';
                    tableData += '</td>';
                  }      
				  if (myobj[i].pred < 50) {
                  tableData += '<td>';
                  tableData += myobj[i].insight;
                  tableData += '</td>';
				  }else{
				  tableData += '<td>';
                  tableData += '';
                  tableData += '</td>';
				  }
                  tableData += '<td>';
                  tableData += '<a href="#">SMS</a><br><a href="#">Call</a><br><a onclick="getId(this)" href="appointment">Reschedule</a>';
                  tableData += '</td>';

                tableData += '</tr>';
              }              
          }        
        }
        document.getElementById('tableData').innerHTML = tableData;

    var patientName = '';
    function  getId(element) {
        var rowNum = element.parentNode.parentNode.rowIndex - 1;
        patientName = document.getElementById("tableData").rows[rowNum].cells[0].innerHTML;
        localStorage.setItem("firstname", patientName);
    }

    /* var globalVariable={
       x: patientName
    };*/

// calender json read
	

var myobj = JSON.parse(data);

var today = new Date();
var tableData = '';

        for (var i = 0; i < myobj.length; i++){
          if (myobj[i].dept == 'Cardiology') {                      

              var CurDate = myobj[i].scdt;
              var CDate = new Date(CurDate);	

              if (CurDate == '2020-01-15') {
                
                tableData += '<tr>'; 

                 tableData += '<td>';
                 tableData += myobj[i].pt;
                 tableData += '</td>';

                 if (myobj[i].provider == '1') {
                    tableData += '<td>';
                    tableData += "Yes";
                    tableData += '</td>';
                  }else{
                    tableData += '<td>';
                    tableData += 'no';
                    tableData += '</td>';
                  } 

                  if (myobj[i].provider == null || myobj[i].provider == undefined || myobj[i].provider == 'select') {
                    tableData += '<td>';
                    tableData += "";
                    tableData += '</td>';
                  }else{
                    tableData += '<td>';
                    tableData += myobj[i].provider;
                    tableData += '</td>';
                  }       

                  tableData += '<td>';
                  tableData += myobj[i].age;
                  tableData += '</td>';
                  tableData += '<td>';
                  tableData += '';
                  tableData += '</td>';
                  tableData += '<td>';
                  tableData += '';
                  tableData += '</td>';
                  tableData += '<td>';
                  tableData += myobj[i].apdt;
                  tableData += '</td>';
                  tableData += '<td>';
                  tableData += myobj[i].scdt;
                  tableData += '</td>';        
                  tableData += '<td>';
                  tableData += '';
                  tableData += '</td>';
                            
                  if (myobj[i].pred > 50) {
                    tableData += '<td style="color: green;">';
                    tableData += myobj[i].pred;
                    tableData += '</td>';
                  }else{
                    tableData += '<td style="color: red;">';
                    tableData += myobj[i].pred;
                    tableData += '</td>';
                  }      

                  tableData += '<td>';
                  tableData += '';
                  tableData += '</td>';
                  tableData += '<td>';
                  tableData += '<a href="#">sms</a><br><a href="#">call</a>';
                  tableData += '</td>';

                tableData += '</tr>';
              }              
          }        
        }
        document.getElementById('tableData').innerHTML = tableData;
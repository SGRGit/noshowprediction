$(function () {

        $("#datepicker").datepicker({ 
            autoclose: true, 
            todayHighlight: true
        }).datepicker('update', new Date());
        
      });

      //=====read json======// 
  
      
      var myobj = JSON.parse(data);
      var today = new Date();        
      var todate = today.getDate();
      var tomonth = today.getMonth()+1;
      var toyear = today.getFullYear();

      $('select').on('change', function() {  

        var count = 0;
        var noshowCount = 0;     
        var tableData = '';
        var confirmedCount = 0;
        for (var i = 0; i < myobj.length; i++){

          if ($( "#department" ).val() == myobj[i].dept) {                         

              var CurDate = myobj[i].scdt;
              var CDate = new Date(CurDate);
              const diffTime = Math.abs(CDate - today);
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
              //alert(diffDays);
              if ($("#dates").val() > diffDays) {
                count++;
                if (myobj[i].Confirmed == 1) {
                  confirmedCount++;
                }
                if (myobj[i].pred > 50) {
                  noshowCount++;
                }
                  tableData += '<tr>';        
                  //tableData += '<td class="py-1"><img src="../static/images/face0.jpg" alt="image" /></td>';
                  tableData += '<td>';
                  tableData += myobj[i].pt;
                  tableData += '</td>';
                  if (myobj[i].provider == null || myobj[i].provider == undefined) {
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
                  tableData += myobj[i].sms;
                  tableData += '</td>';
                  tableData += '<td>';
                  tableData += myobj[i].apdt;
                  tableData += '</td>';
                  tableData += '<td>';
                  tableData += myobj[i].scdt;
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
                  tableData += '</tr>';
              }              
          }        
        }
        document.getElementById('tableData').innerHTML = tableData;
        document.getElementById('total').innerHTML = count;
        document.getElementById('totalNoShow').innerHTML = noshowCount;
        document.getElementById('noIssue').innerHTML = confirmedCount;
      });

 
 //calender view
 var dp = new DayPilot.Calendar("dp");

    dp.theme = "calendar_green";
    // view
    dp.startDate = new Date();  // or just dp.startDate = "2013-03-25";
    dp.viewType = "Week";
    
    // event creating
    dp.onTimeRangeSelected = function (args) {
        var name = prompt("New event name:", "Event");
        if (!name) return;
        var e = new DayPilot.Event({
            start: args.start,
            end: args.end,
            id: DayPilot.guid(),
            text: name
        });
        dp.events.add(e);
        dp.clearSelection();
    };
    
    dp.onEventClick = function(args) {
        alert("clicked: " + args.e.id());
    };

    dp.headerDateFormat = "dddd";
    dp.init();

    var e = new DayPilot.Event({
        start: new DayPilot.Date("2019-12-23T12:00:00"),
        end: new DayPilot.Date("2019-12-23T12:00:00").addHours(1).addMinutes(0),
        id: "1",
        text: "Special events 1"
    });
    var e1 = new DayPilot.Event({
        start: new DayPilot.Date("2019-12-24T12:00:00"),
        end: new DayPilot.Date("2019-12-24T12:00:00").addHours(2).addMinutes(0),
        id: "2",
        text: "Special events 2"
    });
    dp.events.add(e);
    dp.events.add(e1);     
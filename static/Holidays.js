var p = MindFusion.Scheduling;

// create a new instance of the calendar 
var calendar = new p.Calendar(document.getElementById("calendar"));

// set the calendar view to SingleMonth, which displays one month at a time
calendar.currentView = p.CalendarView.SingleMonth;

// disable this built-in forms for item creation and modification
calendar.useForms = false;

// handle the visibleDateChanged event to load the corresponding data when the calendar month is changed
calendar.visibleDateChanged.addEventListener(getData);

// handle the itemDoubleClick event to show the custom form for item editing
calendar.itemDoubleClick.addEventListener(handleItemDoubleClick);

// handle the selectionEnd event to show the custom form for item creation
calendar.selectionEnd.addEventListener(handleSelectionEnd);

// set the custom calendar theme
calendar.theme = "custom";

// set the height of item visuals
calendar.itemSettings.size = 22;

// set the format string for item tooltips
calendar.itemTooltipFormat =  "%s[d MMMM] - %h";

// hide the week numbers header
calendar.monthSettings.weekHeaderStyle = p.VerticalHeaderStyle.None;

// fetch holiday data from public api
getData();

function getData()
{ 
	var url = 'http://calapi.inadiutorium.cz/api/v0/en/calendars/default/' + calendar.date.year + '/' + (+calendar.date.month+1); 
	//var urls = JSON.parse(eventData);
	var urls = 'https://noshowcaldata.herokuapp.com/caldata'
	//var urls = 'http://localhost:5000/caldata'
	fetch(urls)
	.then(response => response.json())
	.then((data) => {
		console.log(data)
		loadCalendar(data)
	})
	.catch(err => { throw err });
}

function loadCalendar(data)
{
	// clear existing items from the calendar schedule
	calendar.schedule.items.clear();

	// traverse the json object returned by the api and create corresponding items in the calendar schedule
	for (var i=0; i<data.length; i++)
	{
		var date = p.DateTime.fromDateString(data[i].date);
		date = p.DateTime.fromDateParts(date.year, date.month, date.day, 0,0,0);

		var celebrations = data[i].event;
		
		for (var k=0; k<celebrations.length; k++)
		{
			var item = new p.Item();

			item.subject = celebrations[k].name+":"+celebrations[k].value;
			
			item.startTime = date;
			item.endTime = p.DateTime.addDays(date.clone(),1);
			item.allDayEvent = true;

			// lock the item to disable interactive drag and resize
			item.locked = true;

			//item.location = getLocation(celebrations[k].rank);
			item.cssClass = celebrations[k].color;

			// add the item to the schedule items collection
			calendar.schedule.items.add(item);
		}
	}

	// render the calendar
	calendar.render();
}

function getLocation(name)
{
	var location = calendar.schedule.locations.where(function(item){return (item.name === name)}).items()[0];
	
	// create a new location object and add it to the schedule's location collection
	if (!location)
	{
		location = new p.Location();
		location.name = name;
		calendar.schedule.locations.add(location);
	}
	return location;
}

function handleItemDoubleClick(sender, args)
{
	// create and show the custom form
	//var form = new CustomForm(sender, args.item, "edit");
	//form.showForm();
	
	var day = args.item.startTime.day;
	var month = args.item.startTime.month + 1;
	var year = args.item.startTime.year;
	if ((month < 10) && (day < 10)) {
		clickDate = year+"-0"+month+"-0"+day
	}else if ((month < 10) && (day >= 10)) {
		clickDate = year+"-0"+month+"-"+day
	}else if ((month >= 10) && (day < 10)) {
		clickDate = year+"-"+month+"-0"+day
	}else {
		clickDate = year+"-"+month+"-"+day
	}
	
	//localStorage.setItem("clickDate", year+"-"+month+"-"+day);
	
	localStorage.setItem("firstname", "");

var myobj = JSON.parse(data);

var today = new Date();
var tableData = '';

//var clickData = localStorage.getItem("clickDate");
console.log("click date : "+clickDate);
        for (var i = 0; i < myobj.length; i++){
          if (myobj[i].dept == 'Cardiology') {                      

              var CurDate = myobj[i].apdt;
              var CDate = new Date(CurDate);	

             if (CurDate == clickDate) {
                
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
        document.getElementById('tableData').innerHTML = tableData;
	}	
	document.getElementById('foo').style.display = 'block';
	document.getElementById('content').style.display = 'none';

}

var patientName = '';
    function  getId(element) {
        var rowNum = element.parentNode.parentNode.rowIndex - 1;
        patientName = document.getElementById("tableData").rows[rowNum].cells[0].innerHTML;
        localStorage.setItem("firstname", patientName);
    }

function handleSelectionEnd(sender, args)
{
	// create a new item with the start and end time of the selection
	console.log(sender.date.date);
	var item = new p.Item();
	item.startTime = args.startTime;
	item.endTime = args.endTime;
	item.cssClass = "white";

	// create and show the custom form
	var form = new CustomForm(sender, item, "new");
	//form.showForm();
}

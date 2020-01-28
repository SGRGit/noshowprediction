

//==========graphs x-Axix==========//
      var weeks = [];
      var today = new Date(); 
      var todays = today.getDay();
      /*max_week = todays + 7;    
      for(var i = todays; i < max_week; i++){
        if (i == 7) {
          j = 0;
        }else if(i > 7){
          j++;
        }else{
          j = i;
        }
        var days = '';
	      if (j == 0) {
	        days = 'Sun';
	      }else if (j == 1) {
	        days = 'Mon';
	      }else if (j == 2) {
	        days = 'Tue';
	      }else if (j == 3) {
	        days = 'Wed';
	      }else if (j == 4) {
	        days = 'Thu';
	      }else if (j == 5) {
	        days = 'Fri';
	      }else if (j == 6) {
	        days = 'Sat';
	      }
        weeks.push(days);
      }*/
      //console.log(weeks); 

//========graph data========//

var myobj = JSON.parse(data);
var sc_date = [];
var tomonth = today.getMonth()+1;
var toyear = today.getFullYear();  

var nextWeek = today.getDate() + 7;
var next7week = '"'+toyear+'-'+tomonth+'-'+nextWeek+'"';
var weekly = new Date(next7week);

var j = 0;
var probSum = 0;
var count = 0;
var nextDate;
var prob = [];
//var currentWeek = [];

for(var i = 0; i < myobj.length; i++){
	
	//calemder date increment
	j = i%32;
	var nextDay = today.getDate() + j;
	var next7day = '"'+toyear+'-'+tomonth+'-'+nextDay+'"';
	nextDate = new Date(next7day);
	//=====//

	//json date increment
	var CurDate = myobj[i].scdt;
	var CDate = new Date(CurDate);
	//=====//

	if (CDate <= weekly){
		if (nextDate.getDate() == CDate.getDate()) {
			sc_date.push(myobj[i].scdt);
			//currentWeek.push(nextDate.getDay());
		}
	}		
}
//console.log(sc_date);

for(var i = 0; i < 7; i++){
	for(var j = 0; j < myobj.length; j++){
		if (sc_date[i] === myobj[j].scdt) {
			probSum += myobj[j].pred;
			count++;
		}		
	}	
	var nextDay = today.getDate() + i;
	var next7day = '"'+toyear+'-'+tomonth+'-'+nextDay+'"';
	var calenderDate = new Date(next7day);
	for(var n = 1; n < sc_date.length; n++){
		var CurDate = sc_date[n];
		var jDate = new Date(CurDate);
		//console.log(calenderDate.getDate()+" - "+jDate.getDate());
		if (calenderDate.getDate() == jDate.getDate()) {
			prob.push(probSum/count);
		}else{
			prob.push(0);
		}
	}
	
	
	probSum = 0;
	count = 0;
}
//console.log(prob);

var dateList = []
var appointmentsCount = [];
var confirmedCounts = [];
var noShowCount = [];
var highProbCount = [];
var finalDateList = [];
var test = 'Mon';
    //var urls = 'http://localhost:7000/'
	var urls = 'https://noshowcaldata.herokuapp.com'
    fetch(urls)
    .then(response => response.json())
    .then((data) => {
        for(var i = 0; i < data.length; i++){
			var CurDate = data[i].date;
			var jDate = new Date(CurDate);
			var daysFormat = jDate.getDay();
			var days = '';
			  if (daysFormat == 0) {
				days = 'Sun';
			  }else if (daysFormat == 1) {
				days = 'Mon';
			  }else if (daysFormat == 2) {
				days = 'Tue';
			  }else if (daysFormat == 3) {
				days = 'Wed';
			  }else if (daysFormat == 4) {
				days = 'Thu';
			  }else if (daysFormat == 5) {
				days = 'Fri';
			  }else if (daysFormat == 6) {
				days = 'Sat';
			  }
			
			console.log(daysFormat+"-"+days);
			
            dateList.push(data[i].date.substr(5, 10)+" "+days);
            appointmentsCount.push(data[i].event[0].value);
            //confirmedCounts.push(data[i].event[1].value);
            noShowCount.push(data[i].event[1].value);
            highProbCount.push(data[i].event[2].value)  

            //appointmentsCount.push(Math.floor(Math.random() * 5) + 12);  
            //confirmedCount.push(Math.floor(Math.random() * 3) + 5);
            //noShowCount.push(Math.floor(Math.random() * 3) + 4);        
            //highProbCount.push(Math.floor(Math.random() * 3) + 7);
        }
        finalDateList = dateList.sort();
        weeklyGraph();
    })
    .catch(err => { throw err });
    
function weeklyGraph(){
    var colors = Highcharts.getOptions().colors;

    Highcharts.chart('container2', {
        chart: {
			//render To: 'container'
            type: 'spline',
            height: '550px',
            backgroundColor: '#f2edf3',
        },
        title:{
            text:'Monthly Trend of Appointments'
        },
        legend: {
            symbolWidth: 40,
            enabled: false
        },

        yAxis: {
            title: {
                text: 'Daily Count of Appointments'
            }
        },

        xAxis: {
            title: {
                text: 'Appointment Date'
            },        
            categories: finalDateList
        },

       tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.0f} </b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        credits:{
            enabled: false
        },
        plotOptions: {
            series: {
                point: {
                    events: {
                        click: function () {
                            window.location.href = this.series.options.website;
                        }
                    }
                },
                cursor: 'pointer'
            }
        },
        legend: {
            align: 'center',
            verticalAlign: 'bottom',
            x: 0,
            y: 0
        },
        series: [
            {
                name: 'Total Appointments',
                //data: [0, 0, 11, 9, 0, 8],           
                data : appointmentsCount,
                dashStyle: 'ShortDashDot',
                color: '#33B8FF'
            },//{
               // name: 'Confirmed',
                //data: [0, 0, 5, 4, 0, 4],           
             //   data : confirmedCounts,
			//	dashStyle: 'ShortDashDot',
              //  color: colors[2]
               
            //},
			{
                name: 'Low Probability',
                //data: [0, 0, 2, 5, 0, 3],           
                data : noShowCount,
                dashStyle: 'ShortDashDot',
                color: colors[3]
            },{
                name: 'High Probability',
                //data: [0, 0, 9, 4, 0, 5],           
                data : highProbCount,
                dashStyle: 'ShortDashDot',
                color: '#000'
            }
        ],
    }); 
}


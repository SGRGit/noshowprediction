

//==========graphs x-Axix==========//
      var weeks = [];
      var today = new Date(); 
      var todays = today.getDay();
      max_week = todays + 7;    
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
      }
      console.log(weeks); 

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
console.log(sc_date);

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
		console.log(calenderDate.getDate()+" - "+jDate.getDate());
		if (calenderDate.getDate() == jDate.getDate()) {
			prob.push(probSum/count);
		}else{
			prob.push(0);
		}
	}
	
	
	probSum = 0;
	count = 0;
}
console.log(prob);


var colors = Highcharts.getOptions().colors;

Highcharts.chart('container2', {
    chart: {
        type: 'spline',
        height: '250px',
		backgroundColor: '#f2edf3',
    },
    title:{
    	text:'Weekly Appointments'
    },
    legend: {
        symbolWidth: 40,
        enabled: false
    },

    yAxis: {
        title: {
            text: ''
        }
    },

    xAxis: {
        title: {
            text: ''
        },        
        categories: weeks
    },

    tooltip: {
        valueSuffix: ''
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

    series: [
        {
            name: 'total',
            data: [69.6, 73.7, 63.9, 83.7, 66.0, 71.7],           
            dashStyle: 'ShortDashDot',
            color: colors[0]
        },{
            name: 'confirmed',
            data: [34.8, 43.0, 31.2, 41.4, 24.9, 32.4],           
            color: colors[2]
           
        },{
            name: 'no show',
            data: [20.2, 30.7, 36.8, 30.9, 30.6, 37.1],           
            dashStyle: 'ShortDot',
            color: colors[3]
        }
    ],
});

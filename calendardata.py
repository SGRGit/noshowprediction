import json
from flask import Flask, jsonify
import os
import pandas as pd
import datetime
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/')
def event_calender():
	
	base_dir = os.getcwd()
	data_path = base_dir + '/static1/json/JSON_Data.json'
	df = pd.read_json(data_path)

	today = datetime.datetime.today()
	week = today + datetime.timedelta(days=7)
	op1 = df[df['scdt'] >= today.strftime('%Y-%m-%d')]
	op2 = op1[op1['scdt'] < week.strftime('%Y-%m-%d')]
	date_unique = op2['scdt'].unique()

	finalList = []
	finalDict = {'date': '', 'event': []}

	eventList = []
	nested_dict = {'name': '', 'value':0, 'color':''}
	

	nested_dict['name'] = 'Appointments'
	nested_dict['value'] = 132
	nested_dict['color'] = 'violet'
	
	eventList.append(dict(nested_dict))

	nested_dict['name'] = 'Confirmed'
	nested_dict['value'] = 32
	nested_dict['color'] = 'green'
	
	eventList.append(dict(nested_dict))

	nested_dict['name'] = 'No show'
	nested_dict['value'] = 21
	nested_dict['color'] = 'red'
	
	eventList.append(dict(nested_dict))

	nested_dict['name'] = 'High Probability'
	nested_dict['value'] = 34
	nested_dict['color'] = 'amber'
	
	eventList.append(dict(nested_dict))

	for x in date_unique:
		finalDict['date'] = str(x)
		# current_date =  df['scdt']==x
		# df_filter = df[current_date]
		# len(df_filter.index)
		finalDict['event'] = eventList
		finalList.append(dict(finalDict))
		
	#print(finalList)
	return jsonify(finalList)


if __name__ == "__main__":
    app.run(debug=True)
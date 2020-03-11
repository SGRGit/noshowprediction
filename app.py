import numpy as np
import pandas as pd
from flask import Flask, request, jsonify, render_template
import pickle
from datetime import datetime
import json
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
model = pickle.load(open('model.pkl', 'rb'))

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/dashboard')
def dashboard():
    return render_template('home.html')

@app.route('/appointment')
def appointment():
    return render_template('appointment.html')

@app.route('/schedule')
def schedule():
    return render_template('schedule.html')

op = np.array([dict((("pt", ""), ("gender", ""), ("phone", ""),("last_reminder", str(datetime.strptime('1900-01-01', '%Y-%m-%d').date())),  ("Confirmed",0), ("provider",""), ("dept", ""), ("age", 0), ("sms", 0), ("apdt", str(datetime.strptime('1900-01-01', '%Y-%m-%d').date())), ("scdt", str(datetime.strptime('1900-01-01', '%Y-%m-%d').date())), ("insight",""), ("pred", 0)))])
@app.route('/submit', methods=['GET', 'POST'])
def submit():
    import json
    import os

    src_path = os.getcwd()
    int1_data_path = src_path + '/Data/Output/int1.json'
    int2_data_path = src_path + '/Data/Output/int2.json'
    int3_data_path = src_path + '/Data/Output/int3.json'
    finop_data_path = src_path + '/static/json/JSON_Data.json'
    finop1_data_path = src_path + '/Data/Output/finalop1.json'
    patname = str(request.values.get("Name"))
    age = request.values.get("Age")
    gender = request.values.get("Gender")
    phone = request.values.get("Phone")
    lstremdt = request.values.get("Last Reminder")
    sms = request.values.get("Sms Received")
    dept = request.values.get("Department")
    provider = request.values.get("Provider")
    confirmed = request.values.get("Confirmation")
    
    
    if request.values.get("Appointment Date") == None:
        appdt = datetime.strptime('1900-01-01', '%Y-%m-%d').date()
    else:
        appdt = datetime.strptime(request.values.get("Appointment Date"), '%Y-%m-%d').date()
    
    if request.values.get("Schedule Date") == None:
        schdt = datetime.strptime('1900-01-01', '%Y-%m-%d').date()
    else:
        schdt = datetime.strptime(request.values.get("Schedule Date"), '%Y-%m-%d').date()
    
    deltday = abs((appdt - schdt).days)
    if request.values.get("Sms Received") == 1:
        smspred = 0
    else:
        smspred = 1
    
    inp = np.array([age, 0, confirmed, smspred, deltday]).reshape(1, 5)
    
    if request.values.get("Age") == None:
        prediction = 0
    else:
        prediction = round(model.predict_proba(inp)[0][1] *100, 2)      
    
    
    global op
  #  if patname =='Matt Innae':
  #      op = np.append(op, np.array([dict((("pt", patname),("gender", gender), ("phone", phone),("last_reminder", str(lstremdt)), ("Confirmed", confirmed),("provider", provider), ("dept",dept), ("age", int(age)), ("sms", int(sms)), ("apdt", str(appdt)), ("scdt", str(schdt)), ("insight", "Appointment booked long ago"), ("pred", prediction)))]))
  #  elif patname =='Gene Jacket':
  #      op = np.append(op, np.array([dict((("pt", patname),("gender", gender), ("phone", phone),("last_reminder", str(lstremdt)), ("Confirmed", confirmed),("provider", provider), ("dept",dept), ("age", int(age)), ("sms", int(sms)), ("apdt", str(appdt)), ("scdt", str(schdt)), ("insight", "Confirmation not received"), ("pred", prediction)))]))
  #  else:
  #      op = np.append(op, np.array([dict((("pt", patname),("gender", gender), ("phone", phone),("last_reminder", str(lstremdt)), ("Confirmed", confirmed),("provider", provider), ("dept",dept), ("age", int(age)), ("sms", int(sms)), ("apdt", str(appdt)), ("scdt", str(schdt)), ("insight",""), ("pred", prediction)))]))
    
    
    if prediction < 50 :
       if confirmed == "1" and deltday >= 7 :
            op = np.append(op, np.array([dict((("pt", patname),("gender", gender), ("phone", phone),("last_reminder", str(lstremdt)), ("Confirmed", confirmed),("provider", provider), ("dept",dept), ("age", int(age)), ("sms", int(sms)), ("apdt", str(appdt)), ("scdt", str(schdt)), ("insight", "Appointment booked long ago"), ("pred", prediction)))]))       
       elif confirmed == "0" and deltday < 7 :
            op = np.append(op, np.array([dict((("pt", patname),("gender", gender), ("phone", phone),("last_reminder", str(lstremdt)), ("Confirmed", confirmed),("provider", provider), ("dept",dept), ("age", int(age)), ("sms", int(sms)), ("apdt", str(appdt)), ("scdt", str(schdt)), ("insight", "Confirmation not received"), ("pred", prediction)))]))
       elif confirmed == "0" and deltday >= 7 :
            op = np.append(op, np.array([dict((("pt", patname),("gender", gender), ("phone", phone),("last_reminder", str(lstremdt)), ("Confirmed", confirmed),("provider", provider), ("dept",dept), ("age", int(age)), ("sms", int(sms)), ("apdt", str(appdt)), ("scdt", str(schdt)), ("insight", "Appointment booked long ago and Confirmation not received"), ("pred", prediction)))]))
    else:
        op = np.append(op, np.array([dict((("pt", patname),("gender", gender), ("phone", phone),("last_reminder", str(lstremdt)), ("Confirmed", confirmed),("provider", provider), ("dept",dept), ("age", int(age)), ("sms", int(sms)), ("apdt", str(appdt)), ("scdt", str(schdt)), ("insight",""), ("pred", prediction)))]))    
        
       
        
    oplist = op.tolist()
    oplist.pop(0)
    #print(oplist)
    srcdict = (dict(enumerate(oplist)))
    
    s = []
    for d in srcdict.values():
        s.append(d['pt'])
    
    for i in range(0, len(s)):
        for key in range(i,i+1):
            srcdict[s[i]] = srcdict.pop(key)
      
    with open(finop_data_path, "r") as f:
        lines = (str(f.readlines())[10::])
        lines = (lines[:len(lines)-4])
    #print(lines)
    
    with open(int1_data_path, "w") as f:
        f.write(lines)
        f.close()
    
    with open(int1_data_path, "r") as f:
        dataorg = json.load(f)
        f.close()
   # print(dataorg)
    origdict = (dict(enumerate(dataorg)))
   # print(origdict)
    s1 = []
    for d in origdict.values():
        s1.append(d['pt'])
    
    for i in range(0, len(s1)):
        for key in range(i,i+1):
            origdict[s1[i]] = origdict.pop(key)
    
    origdict.update(srcdict)
   # print(origdict)
  
    with open(int2_data_path, "w") as f:
        json.dump(origdict, f)
        f.close() 
   
    l = []
    for i in origdict.keys():
        l.append(origdict[i])
        
    with open(int3_data_path, "w") as f:
        json.dump(l, f)
        f.close()
    
    with open(int3_data_path, "w") as f:
        f.write(str(l).replace("'", "\""))
        f.close()
        
    with open(int3_data_path, "r") as f:
        lines = (str(f.readlines())[1::])
        lines = (lines[:len(lines)-1])
        finop = 'data =' + lines
    
    with open(finop_data_path, "w") as f:
        f.write(finop)
        f.close()
        
    return render_template('appointment.html', prediction_text = 'Appointment Chance {} %'.format(prediction), patient_name = format(patname))

@app.route('/caldata')
def event_calender():
    base_dir = os.getcwd()
    data_path = base_dir + '/static/json/JSON_Data.json'

    with open(data_path, "r") as f:
        lines = str(f.readlines())
	
	#Format the patient json to json format
    a = lines.split("data =")[1]
    a = a.split("\'")[1]
    a = a.split("]")[0]
    a = a.split("[")[1]

	#Create Dictionary
    dic = eval(a)

	#Create Derived Columns
    for i in range(len(dic)):
        if (dic[i]['Confirmed']) == '1':
            dic[i]['Cnf'] = 1
        else:
            dic[i]['Cnf'] = 0
    
    for i in range(len(dic)):
        if (dic[i]['pred']) > 50:
            dic[i]['High'] = 1
        else:
            dic[i]['High'] = 0
    
    for i in range(len(dic)):
        if (dic[i]['pred']) <= 50:
            dic[i]['Lo'] = 1
        else:
            dic[i]['Lo'] = 0

	#Convert to dataframe
    diclist = list(dic)
    df = pd.DataFrame(diclist)
    df_new = pd.DataFrame()
    df_new = df [['pt']]
    df_new['apdt'] = df [['apdt']]
    df_new['High'] = df [['High']]
    df_new['Lo'] = df [['Lo']]
    df_new['Cnf'] = df [['Cnf']]

	#Calculate aggregate metrices
    df_op = df_new.groupby(['apdt'])['High'].sum()
    df_op = df_op.to_frame()
    df_op['Lo'] = df_new.groupby(['apdt'])['Lo'].sum()
    df_op['Cnf'] = df_new.groupby(['apdt'])['Cnf'].sum()
    df_op['Total'] = df_new.groupby(['apdt'])['pt'].count()
    df_op = df_op.reset_index()
    df_op = df_op.rename(columns={"apdt": "date"})

	#Convert to Dictionary
    df_dict = df_op.to_dict('records')
    
    dlist = []
    for i in range(len(df_dict)):
        df_newdict = {
        "date": df_dict[i]['date'],
        "event": [
            {
            "color": "violet", 
            "name": "Appointments", 
            "value": df_dict[i]['Total']
            }, 
            #{
            #"color": "green", 
            #"name": "Confirmed", 
            #"value": df_dict[i]['Cnf']
            #}, 
            {
            "color": "red", 
            "name": "Low Probability", 
            "value": df_dict[i]['Lo']
            }, 
            {
            "color": "amber", 
            "name": "High Probability", 
            "value": df_dict[i]['High']
            }]
            }
        dlist.append(df_newdict.copy())

    return(jsonify(dlist))
    
if __name__ == "__main__":
    app.run(debug=True)

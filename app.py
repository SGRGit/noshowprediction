import numpy as np
import pandas as pd
from flask import Flask, request, jsonify, render_template
import pickle
from datetime import datetime
import json
import os

app = Flask(__name__)
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
    calenderJson = '[{"date":"2020-01-01","events":[{"title":"Total Appointment","value":62,"colour":"white"},{"title":"Confirmed","value":32,"colour":"green"}]},{"date":"2020-01-02","events":[{"title":"Total Appointment","value":42,"colour":"white"},{"title":"Confirmed","value":31,"colour":"green"}]}]'
    y = json.loads(calenderJson)
    return render_template('schedule.html')

op = np.array([dict((("pt", ""), ("Confirmed",0), ("provider",""), ("dept", ""), ("age", 0), ("sms", 0), ("apdt", str(datetime.strptime('1900-01-01', '%Y-%m-%d').date())), ("scdt", str(datetime.strptime('1900-01-01', '%Y-%m-%d').date())), ("pred", 0)))])
@app.route('/submit', methods=['GET', 'POST'])
def submit():
    import json
    import os

    src_path = os.getcwd()
    int1_data_path = src_path + '/Data/Output/int1.json'
    int2_data_path = src_path + '/Data/Output/int2.json'
    int3_data_path = src_path + '/Data/Output/int3.json'
    finop_data_path = src_path + '/static/json/JSON_DataV2.json'
    finop1_data_path = src_path + '/Data/Output/finalop1.json'
    patname = str(request.values.get("Name"))
    age = request.values.get("Age")
    sms = request.values.get("Sms Received")
    dept = request.values.get("Department")
    provider = request.values.get("Provider")
    confirmed = request.values.get("Confirmation")
    if request.values.get("Appointment Date") == None:
        appdt = datetime.strptime('1900-01-01', '%Y-%m-%d').date()
    else:
        appdt = datetime.strptime(request.values.get("Appointment Date"), '%Y-%m-%d').date()
    
    if request.values.get("Scheduled Date") == None:
        schdt = datetime.strptime('1900-01-01', '%Y-%m-%d').date()
    else:
        schdt = datetime.strptime(request.values.get("Scheduled Date"), '%Y-%m-%d').date()
    
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
    op = np.append(op, np.array([dict((("pt", patname), ("Confirmed", confirmed),("provider", provider), ("dept",dept), ("age", int(age)), ("sms", int(sms)), ("apdt", str(appdt)), ("scdt", str(schdt)), ("pred", prediction)))]))
    oplist = op.tolist()
    oplist.pop(0)
    print(oplist)
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
    print(lines)
    
    with open(int1_data_path, "w") as f:
        f.write(lines)
        f.close()
    
    with open(int1_data_path, "r") as f:
        dataorg = json.load(f)
        f.close()
    print(dataorg)
    origdict = (dict(enumerate(dataorg)))
    print(origdict)
    s1 = []
    for d in origdict.values():
        s1.append(d['pt'])
    
    for i in range(0, len(s1)):
        for key in range(i,i+1):
            origdict[s1[i]] = origdict.pop(key)
    
    origdict.update(srcdict)
    print(origdict)
  
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
    
#@app.route('/refresh', methods=['GET', 'POST'])
#def refresh():
#    pyautogui.hotkey('ctrl', 'f5')
#    return render_template('appointment.html')

if __name__ == "__main__":
    app.run(debug=True)
    
    

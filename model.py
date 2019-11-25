import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import warnings
warnings.filterwarnings('ignore')
import seaborn as sns
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.naive_bayes import GaussianNB
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

import pickle

df=pd.read_csv("C:\\Users\\sumit.ghose.roy\\NoShowPrediction\\Data\\KaggleV2-May-2016.csv")
#df.head()
LE=LabelEncoder()
categorical_cols=['Neighbourhood', 'No-show','Gender']
df[categorical_cols] = df[categorical_cols].apply(lambda col: LE.fit_transform(col.astype(str)))
#df.info()

#Get Dates only in the Scheduled Day, Appointed Day
#Get Scheduled Weekday, Appointed WEekday
import datetime
from datetime import date
import calendar
def findDay(date):
    year, month, day = (int(i) for i in date.split('-'))
    born = datetime.date(year, month, day)
    return born.strftime("%A")


import datetime
#Get Dates only in the Scheduled Day, Appointed Day
df["ScheduledDate"]=df["ScheduledDay"].apply(lambda x:x.split("T")[0])
df["AppointmentDate"]=df["AppointmentDay"].apply(lambda x:x.split("T")[0])
#Get Weekday from the scheduled date
df["Scheduled_Weekday"]=df["ScheduledDate"].apply(lambda x:findDay(x))
df["Appointment_Weekday"]=df["AppointmentDate"].apply(lambda x:findDay(x))
#Get the time of appointment
df["Scheduled_time"]=df["ScheduledDay"].apply(lambda x:x.split("T")[1][0:2])
df["Appointment_time"]=df["AppointmentDay"].apply(lambda x:x.split("T")[1][0:2])
#df.head()
df["Scheduled_time"]=df["Scheduled_time"].astype(int)

#Finding the date diffrence
def calc_days_diff(date1,date2):
    from datetime import datetime
    date_format = "%Y-%m-%d"
    a = datetime.strptime(date1, date_format)
    b = datetime.strptime(date2, date_format)
    delta = b - a
    return(delta.days)

df["date_diff"]=df.apply(lambda rows: calc_days_diff(rows["ScheduledDate"],rows["AppointmentDate"]),axis=1)
#df.head()

categorical_cols=['Neighbourhood', 'No-show','Gender','ScheduledDate', 'AppointmentDate','Scheduled_Weekday',"Appointment_Weekday"]
df[categorical_cols] = df[categorical_cols].apply(lambda col: LE.fit_transform(col.astype(str)))
df=df.drop(columns=["ScheduledDay","AppointmentDay","AppointmentID"],axis=1)
#df.head()


corr1=df.corr()
sns.heatmap(corr1,cmap='coolwarm')
corr1

corr1["No-show"].abs().sort_values(ascending=False)


log=LogisticRegression()
features=['Age','Hipertension','Diabetes','date_diff','SMS_received','Scheduled_time']
X=df[features]
Y=df["No-show"]
x_train,x_test,y_train,y_test=train_test_split(X,Y,test_size=0.3)
#print(x_train.shape)
#print(x_test.shape)
model=log.fit(x_train,y_train)
y_pred=model.predict(x_test)
accuracy_score(y_test,y_pred)

GB=GaussianNB()
features=['Age','Hipertension','Diabetes','date_diff','SMS_received','Scheduled_time']
X=df[features]
Y=df["No-show"]
x_train,x_test,y_train,y_test=train_test_split(X,Y,test_size=0.3)
model=log.fit(x_train,y_train)
y_pred=model.predict(x_test)
accuracy_score(y_test,y_pred)


RF=RandomForestClassifier()
features=['Age','Hipertension','Diabetes','date_diff','SMS_received','Scheduled_time']
X=df[features]
Y=df["No-show"]
x_train,x_test,y_train,y_test=train_test_split(X,Y,test_size=0.25)
model=log.fit(x_train,y_train)
y_pred=model.predict(x_test)
accuracy_score(y_test,y_pred)

#y_pred=model.predict(np.asarray(x_test).reshape(-1, 6))

features=['Age','Hipertension','Diabetes','date_diff','SMS_received','Scheduled_time']
D1_arr=np.array([["55","0","0","40","1","28"]])
D1_arr = D1_arr.astype(float)

y_pred1=model.predict(D1_arr)

if(y_pred1[0]==0):
    print("The Patient will reach hospital for this appointment")
else:
    print(("The Patient will not reach hospital for this appointment"))

y_pred2=model.predict_proba(D1_arr)
#Saving the model to disk
pickle.dump(model, open('model.pkl', 'wb'))

#Loading model to compare the results
model = pickle.load(open('model.pkl', 'rb'))
#print("The Chance of Patient making for this appointment is",round(y_pred2[0][0]*100,2),"%")

print("The Chance of Patient making for this appointment is",round(model.predict_proba([[55,0,0,40,1,28]])[0][0]*100,2),"%")
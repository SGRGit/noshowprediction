import numpy as np
from flask import Flask, request, jsonify, render_template
import pickle

app = Flask(__name__)
model = pickle.load(open('model.pkl', 'rb'))

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['GET', 'POST'])
def predict():
    ''' 
    For rendering results on PHP GUI
    '''
    int_features =[int(x) for x in request.form.values()]
    final_features = [np.array(int_features)]
    prediction = round(model.predict_proba(final_features)[0][0] *100, 2)    
    output = prediction 
    return render_template('index.html', prediction_text = 'Appointment Chance  {} %'.format(output))


if __name__ == "__main__":
    app.run(debug=True)

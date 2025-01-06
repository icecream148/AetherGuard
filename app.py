from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/get_aqi', methods=['POST'])
def get_aqi():
    lat = request.form.get('28.7041° N')
    lon = request.form.get('77.1025° E')
    api_key = "a85a1156ee207ce9581799fe54250c0d"
    base_url = "https://api.weatherbit.io/v2.0/current/airquality"
    
    params = {
        "lat": lat,
        "lon": lon,
        "key": api_key
    }
    
    try:
        response = requests.get(base_url, params=params)
        response.raise_for_status()
        data = response.json()
        return jsonify(data)
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True)

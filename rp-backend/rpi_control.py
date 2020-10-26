import sys
print(sys.path)

import flask_cors
import RPi.GPIO as GPIO
from flask_cors import CORS

from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

CORS(app)
GPIO.setmode(GPIO.BCM)

# Create a dictionary called pins to store the pin number, name, and pin state:
pins = {
    0 : {'name' : 'pin27', 'state' : GPIO.LOW},
    1 : {'name' : 'pin28', 'state' : GPIO.LOW},
    2 : {'name' : 'pin3', 'state' : GPIO.LOW},
    3 : {'name' : 'pin5', 'state' : GPIO.LOW},
    4 : {'name' : 'pin7', 'state' : GPIO.LOW},
    5 : {'name' : 'pin29', 'state' : GPIO.LOW},
    6 : {'name' : 'pin31', 'state' : GPIO.LOW},

    7 : {'name' : 'pin26', 'state' : GPIO.LOW},
    8 : {'name' : 'pin24', 'state' : GPIO.LOW},
    9 : {'name' : 'pin21', 'state' : GPIO.LOW},
   10 : {'name' : 'pin19', 'state' : GPIO.LOW},
   11 : {'name' : 'pin23', 'state' : GPIO.LOW},
   12 : {'name' : 'pin32', 'state' : GPIO.LOW},
   13 : {'name' : 'pin33', 'state' : GPIO.LOW},
   14 : {'name' : 'pin8', 'state' : GPIO.LOW},

   15 : {'name' : 'pin10', 'state' : GPIO.LOW},
   16 : {'name' : 'pin36', 'state' : GPIO.LOW},
   17 : {'name' : 'pin11', 'state' : GPIO.LOW},
   18 : {'name' : 'pin12', 'state' : GPIO.LOW},
   }

# Set each pin as an output and make it low:
for pin in pins:
   GPIO.setup(pin, GPIO.OUT)
   GPIO.output(pin, GPIO.LOW)

@app.route("/")
def main():
   # For each pin, read the pin state and store it in the pins dictionary:
   for pin in pins:
      pins[pin]['state'] = GPIO.input(pin)
   # Put the pin dictionary into the template data dictionary:
   templateData = {
      'pins' : pins
      }
   # Pass the template data into the template main.html and return it to the user
   return render_template('main.html', **templateData)

# The function below is executed when someone requests a URL with the pin number and action in it:
@app.route("/<changePin>/<action>")
def action(changePin, action):
   # Convert the pin from the URL into an integer:
   changePin = int(changePin)
   # Get the device name for the pin being changed:
   deviceName = pins[changePin]['name']
   # If the action part of the URL is "on," execute the code indented below:
   if action == "on":
      # Set the pin high:
      GPIO.output(changePin, GPIO.HIGH)
      # Save the status message to be passed into the template:
      message = "Turned " + deviceName + " on."
   if action == "off":
      GPIO.output(changePin, GPIO.LOW)
      message = "Turned " + deviceName + " off."
   if action == "toggle":
      # Read the pin and set it to whatever it isn't (that is, toggle it):
      GPIO.output(changePin, not GPIO.input(changePin))
      message = "Toggled " + deviceName + "."

   # For each pin, read the pin state and store it in the pins dictionary:
   for pin in pins:
      pins[pin]['state'] = GPIO.input(pin)

   # Along with the pin dictionary, put the message into the template data dictionary:
   templateData = {
      'message' : message,
      'pins' : pins
   }

   return render_template('main.html', **templateData)

@app.route('/api_request/get_pins/', methods=["GET"])
def getPins():
   if request.method == "GET":
      return jsonify(pins)

@app.route('/api_request/<changePin>/<action>')
def apiGetAction(changePin, action):
   # Convert the pin from the URL into an integer:
   changePin = int(changePin)

   # If the action part of the URL is "on," execute the code indented below:
   if action == "on":
      # Set the pin high:
      GPIO.output(changePin, GPIO.HIGH)
   if action == "off":
      GPIO.output(changePin, GPIO.LOW)
   if action == "toggle":
      # Read the pin and set it to whatever it isn't (that is, toggle it):
      GPIO.output(changePin, not GPIO.input(changePin))

   for pin in pins:
      pins[pin]['state'] = GPIO.input(pin)
   return jsonify(pins)

if __name__ == "__main__":
   app.run(host='0.0.0.0', port=8080, debug=True)


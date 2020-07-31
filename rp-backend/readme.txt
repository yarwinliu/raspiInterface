
This is the backend of the  RPI controls.
it runs with python3 or python 2.7, in the raspberrypi.     

liubin@raspberrypi:~/workspace/yarwin/raspiInterface/rp-backend $ python3 --version
Python 3.5.3
liubin@raspberrypi:~/workspace/yarwin/raspiInterface/rp-backend $ uname -a
Linux raspberrypi 4.14.34-v7+ #1110 SMP Mon Apr 16 15:18:51 BST 2018 armv7l GNU/Linux


 $ sudo python3 rpi_control.py
rpi_control.py:16: RuntimeWarning: This channel is already in use, continuing anyway.  Use GPIO.setwarnings(False) to disable warnings.
  GPIO.setup(pin, GPIO.OUT)
 * Running on http://0.0.0.0:8000/ (Press CTRL+C to quit)
 * Restarting with stat
rpi_control.py:16: RuntimeWarning: This channel is already in use, continuing anyway.  Use GPIO.setwarnings(False) to disable warnings.
  GPIO.setup(pin, GPIO.OUT)
 * Debugger is active!
 * Debugger pin code: 339-673-364
192.168.0.17 - - [31/Jul/2020 20:19:51] "GET /24/on HTTP/1.1" 200 -
192.168.0.17 - - [31/Jul/2020 20:19:51] "GET /24/on HTTP/1.1" 200 -
192.168.0.17 - - [31/Jul/2020 20:19:53] "GET /25/on HTTP/1.1" 200 -
192.168.0.17 - - [31/Jul/2020 20:19:57] "GET /23/on HTTP/1.1" 200 -
192.168.0.17 - - [31/Jul/2020 20:19:58] "GET /25/off HTTP/1.1" 200 -




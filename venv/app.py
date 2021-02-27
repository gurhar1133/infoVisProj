from flask import Flask
from flask import render_template
from proc import *
app = Flask(__name__)


@app.route("/")
def index():
    data_obj = pre_proc_data()
    return render_template("index.html", data_obj=data_obj)
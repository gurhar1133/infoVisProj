from flask import Flask
from flask import render_template, request, redirect, url_for
from proc import *
from cluster import *
app = Flask(__name__)

## TODO: ADD KEY TO OVERVIEW

## TODO: ADD ABOUT ENCODING PAGE

## TODO: INCORPORATE CLUSTERING FUNCTIONS

@app.route("/", methods=['GET', 'POST'])
def index():
    
    data_obj = pre_proc_data()

    if request.method == 'GET':
        return render_template("index.html", data_obj=data_obj)

## TODO: write clustering route
@app.route("/cluster", methods=["GET", "POST"])
def cluster(k=None):
    if request.method == "POST":
        clusters = int(request.form['clusters'])
        print(cluster_by_elem(clusters))
        return render_template('cluster.html', k=request.form['clusters'])
    else:
        return render_template("cluster.html", k=0)


## TODO: write a compare route
@app.route("/compare", methods=['GET', 'POST'])
def compare(data=None):
    data_obj = pre_proc_data()
   
    if request.method == 'POST':
        
        return render_template("compare.html", data_obj=data_obj, data=(request.form['compareA'], request.form['compareB']))
    else:
        return render_template('compare.html', data_obj=data_obj, data=("",""))
from flask import Flask
from flask import render_template, request, redirect, url_for
from proc import *
from cluster import *
app = Flask(__name__)


## TODO: ADD KEY TO OVERVIEW

## TODO: Key and about encoding should mention how the data has been transformed

## TODO: ADD ABOUT ENCODING PAGE

## TODO: Extends base

## TODO: Cluster and page side by side cluster summary popups

## TODO: ADD KEY TO CLUSTER PAGE

## TODO: SLYLING UPDATES

## TODO: MAKE SURE SEX ENCODING IS CORRECT IN CLUSTER PAGE

## TODO: ADD CUSTOM ENCODINGS



def bin_sex(sex):
    if sex < 0:
        return "Female dominant"
    else:
        return "Male dominant"

@app.route("/", methods=['GET', 'POST'])
def index():
    
    data_obj = pre_proc_data()

    if request.method == 'GET':
        return render_template("index.html", data_obj=data_obj)

@app.route("/cluster", methods=["GET", "POST"])
def cluster(k=None):
    if request.method == "POST":
        kclusters = int(request.form['clusters'])
        clusts = cluster_by_elem(kclusters) 
        print(clusts)
        return render_template('cluster.html', k=request.form['clusters'], clusters=clusts, str=str, int=int, bin_sex=bin_sex)
    else:
        return render_template("cluster.html", k=0)


@app.route("/compare", methods=['GET', 'POST'])
def compare(data=None):
    data_obj = pre_proc_data()
   
    if request.method == 'POST':
        
        return render_template("compare.html", data_obj=data_obj, data=(request.form['compareA'], request.form['compareB']))
    else:
        return render_template('compare.html', data_obj=data_obj, data=("",""))
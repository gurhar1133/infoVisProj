import pandas as pd
from sklearn.cluster import KMeans
from sklearn.model_selection import train_test_split
import numpy as np
import math

def cluster_by_elem(n):
    df = pd.read_csv("../cleaned_scaled.csv")
    train = df.drop(columns=["country"])
    kmeans = KMeans(n_clusters=n, random_state=0).fit(train)
    df_clustrd = df
    df_clustrd["Cluster"] = kmeans.labels_
    clusters = []
    for i in range(n):
        cluster_df = df_clustrd[df_clustrd.Cluster == i]
        countries = cluster_df.country.unique()
        counts = [cluster_df.country[cluster_df.country == country].count() for country in countries]
        mode_country = list(zip(*sorted(zip(countries, counts), key=(lambda x: x[1]), reverse=True)))[0][:4]
        cluster_df = cluster_df.mean()
        cluster_df['top_countries'] = mode_country
        clusters.append(cluster_df)

    return clusters

if __name__ == '__main__':
    print(cluster_by_elem(3))



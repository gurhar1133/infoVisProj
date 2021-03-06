import pandas as pd
import math

def pre_proc_data():
    scaled_df = pd.read_csv("scaled.csv")
    scaled_grouped_df = scaled_df.groupby(["country", "sex"]).mean()

    scaled_grouped_df["harm"] = scaled_grouped_df.harm.apply(lambda x: math.floor(x*10))
    scaled_grouped_df["fair"] = scaled_grouped_df.fair.apply(lambda x: math.floor(x*10))
    scaled_grouped_df["ingroup"] = scaled_grouped_df.ingroup.apply(lambda x: math.floor(x*10))
    scaled_grouped_df["auth"] = scaled_grouped_df.auth.apply(lambda x: math.floor(x*10))
    scaled_grouped_df["purity"] = scaled_grouped_df.purity.apply(lambda x: math.floor(x*10))


    ru_sc = scaled_grouped_df.loc["Russia"]
    us_sc = scaled_grouped_df.loc["US"]
    au_sc = scaled_grouped_df.loc["Australia"]
    sp_sc = scaled_grouped_df.loc["Spain"]
    ir_sc = scaled_grouped_df.loc["Iran"]
    sw_sc = scaled_grouped_df.loc["Sweden"]
    mn_sc = scaled_grouped_df.loc["Mongolia"]
    overview_data = [("Russia",ru_sc), ("Mongolia", mn_sc), ("Sweden", sw_sc), ("US",us_sc), ("Australia",au_sc), ("Spain",sp_sc), ("Iran",ir_sc)]
    return overview_data
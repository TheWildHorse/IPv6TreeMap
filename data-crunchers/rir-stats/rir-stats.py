#!/usr/bin/env python3

import pandas as pd
import json
import os
import urllib.request
import magic
import gzip
import bz2
import shutil
import datetime

TMPDIR = os.path.dirname(__file__) +  "/tmp/"

URLS = {
    "ripencc":
        "http://ftp.ripe.net/pub/stats/ripencc/{yyyy}/delegated-ripencc-extended-{yyyy}{mm:02d}{dd:02d}.bz2",
    "arin":
        "http://ftp.arin.net/pub/stats/arin/delegated-arin-extended-{yyyy}{mm:02d}{dd:02d}",
    "lacnic":
        "http://ftp.lacnic.net/pub/stats/lacnic/delegated-lacnic-extended-{yyyy}{mm:02d}{dd:02d}",
    "apnic":
        "http://ftp.apnic.net/stats/apnic/{yyyy}/delegated-apnic-extended-{yyyy}{mm:02d}{dd:02d}.gz",
    "afrinic":
        "http://ftp.afrinic.net/pub/stats/afrinic/{yyyy}/delegated-afrinic-extended-{yyyy}{mm:02d}{dd:02d}"
   }

def rangeto64(prefix):
    return 2 ** (64 - prefix)

def create_jsons(raw_data):
    allocated = raw_data.query('(status == "allocated" or status == "assigned") and (af == "ipv4" or af == "ipv6")')
    ipv4_allocated = allocated.query('af == "ipv4"')
    ipv6_allocated = allocated.query('af == "ipv6"').copy()
    asns = raw_data.query('af == "asn" and status == "allocated"')

    ipv6_allocated['num64s'] = ipv6_allocated.range.map(rangeto64)


    # ratio_v6_v4.json
    num64s = ipv6_allocated.groupby('cc').sum()['num64s']
    numIPs = ipv4_allocated.groupby('cc').sum()['range']
    ratio = num64s / numIPs
    ratio.to_json("ratio_v6_v4.json")

    #ipv6_allocated.groupby('cc').count()['rir'].to_json("num_allocated.json")
    ipv6_allocated.groupby('cc').sum()['num64s'].to_json("num_64s_per_cc.json")
    asns.groupby('cc').count()['af'].to_json('num_asns_per_cc.json')

# fetch files
def fetch_files(date="today"):
    date = date
    year = month = day = 0
    if date == "today": # actually, yesterday
        now = datetime.datetime.now() - datetime.timedelta(days=1)
        year = now.year
        month = now.month
        day = now.day

    filenames = []
    for (rir, url) in URLS.items():
        url = url.format(yyyy=year, mm=month, dd=day)
        filename = "{}{}-{yyyy}{mm:02d}{dd:02d}".format(TMPDIR, rir, yyyy=year, mm=month, dd=day)
        filenames.append(filename)
        if os.path.isfile(filename):
            print("found existing {}".format(filename))
        else:
            print("fetching {} from {}".format(filename, url))
            urllib.request.urlretrieve(url, filename)
            preprocess_file(filename)

    return filenames

def preprocess_file(fn):
    # unpack?
    mime = magic.from_file(fn)
    if "gzip" in mime:
        print("gzip")
        with gzip.open(fn, 'rb') as f_in:
            content = f_in.read()
        with open(fn, 'wb') as f_out:
            f_out.write(content)
        
    elif "bzip2" in mime:
        print("bzip2")
        with bz2.open(fn, 'rb') as f_in:
            content = f_in.read()
        with open(fn, 'wb') as f_out:
            f_out.write(content)

def read_files(filenames):
    tmp_list = []
    for f in filenames:
        print("reading", f);
        df = pd.read_csv(f, skiprows=4, sep='|', index_col=False, low_memory=False,
        names=['rir', 'cc', 'af', 'address', 'range', 'date', 'status', 'userid'])
    tmp_list.append(df)
    raw_data = pd.concat(tmp_list)
    return raw_data

if __name__ == "__main__":
    filenames = fetch_files()
    raw_data = read_files(filenames)
    create_jsons(raw_data)

import serial
import csv
import pandas as pd
import numpy as np
import time

# Replace 'port' with the actual port your Arduino is connected to
ser = serial.Serial(port='/dev/cu.usbmodem141101', baudrate=9600)
# set the start time
start = time.time()
# set time to stop reading in data
Cols = ["Time", "Strain"]
i = 0
total_count = 0
maxTime = 360  # seconds
# array sizes for
S = (10, 2)
S_total = (maxTime, 2)
# base storage array, gets rewrote every 10 seconds
DF = np.zeros(S)
# background whole storage
DF_total = np.zeros(S_total)
file = open('data.txt', 'w')

while (time.time() - start) < maxTime:
    # now read in the data
    d = ser.readline().decode('utf-8')
    comma_str = ','
    commaLoc = d.find(comma_str)
    # print(i)
    # print(commaLoc)
    data1 = int(d[0:commaLoc])
    data2 = int(d[commaLoc + 1:-2])

    # np.append(DF,[data1,data2],axis=0)
    DF[i][0] = data1
    DF[i][1] = data2

    print(DF)
    if i % 9 == 0:
        i = 0
        # convert to int
        DF2 = (np.rint(DF)).astype(int)
        # add columns
        DF3 = pd.DataFrame(DF2, columns=Cols).astype(int)
        DF3.to_csv('data.csv')
        # reset DF
        DF = np.zeros(S)

    DF_total[total_count][0] = data1
    DF_total[total_count][1] = data2
    i = i + 1
    total_count = total_count + 1
# after the loop has finished
DF_total2 = (np.rint(DF_total)).astype(int)
DF_total3 = pd.DataFrame(DF_total2, columns=Cols).astype(int)
DF_total3.to_csv('total_data.csv')

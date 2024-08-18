import csv
import torch
import rasterio
import numpy as np
from datetime import datetime


def process():
    x1 = 40.90886864
    x2 = 40.9210571
    x3 = 41.30935458
    x4 = 41.07546783
    y1 = 19.79784881
    y2 = 20.78948698
    y3 = 20.7847005
    y4 = 19.79599109
    mask = np.zeros((3660, 3660))
    # if  #add the condition to check if  x and y in the pic
    with rasterio.open(r"D:\OUTPUT.tif") as data:
        # data.bounds
        tmp = data.read()
    return mask


process()

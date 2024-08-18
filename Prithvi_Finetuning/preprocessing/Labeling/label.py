import xml.etree.ElementTree as ET
import numpy as np
from pyproj import Proj, transform
import csv
from datetime import datetime, timedelta
import numpy as np
from PIL import Image

#Parse XML
xml_data = """
<Granule>
<GranuleUR>HLS.L30.T40QCM.2020116T063954.v2.0</GranuleUR>
<InsertTime>2021-12-06T17:08:40.294762Z</InsertTime>
<LastUpdate>2021-12-06T17:08:40.294770Z</LastUpdate>
<Collection>
<DataSetId>HLS Landsat Operational Land Imager Surface Reflectance and TOA Brightness Daily Global 30m v2.0</DataSetId>
</Collection>
<DataGranule>
<DataGranuleSizeInBytes>84868254</DataGranuleSizeInBytes>
<ProducerGranuleId>HLS.L30.T40QCM.2020116T063954</ProducerGranuleId>
<DayNightFlag>DAY</DayNightFlag>
<ProductionDateTime>2021-12-06T17:07:27.000000Z</ProductionDateTime>
<LocalVersionId>2.0</LocalVersionId>
</DataGranule>
<Temporal>
<RangeDateTime>
<BeginningDateTime>2020-04-25T06:39:54.622708Z</BeginningDateTime>
<EndingDateTime>2020-04-25T06:40:18.513747Z</EndingDateTime>
</RangeDateTime>
</Temporal>
<Spatial>
<HorizontalSpatialDomain>
<Geometry>
<GPolygon>
<Boundary>
<Point>
<PointLongitude>55.75267688</PointLongitude>
<PointLatitude>24.40801855</PointLatitude>
</Point>
<Point>
<PointLongitude>56.11035093</PointLongitude>
<PointLatitude>24.41081388</PointLatitude>
</Point>
<Point>
<PointLongitude>56.11711562</PointLongitude>
<PointLatitude>23.41917701</PointLatitude>
</Point>
<Point>
<PointLongitude>55.52114475</PointLongitude>
<PointLatitude>23.41467146</PointLatitude>
</Point>
</Boundary>
</GPolygon>
</Geometry>
</HorizontalSpatialDomain>
</Spatial>
<Platforms>
<Platform>
<ShortName>LANDSAT-8</ShortName>
<Instruments>
<Instrument>
<ShortName>OLI</ShortName>
</Instrument>
</Instruments>
</Platform>
</Platforms>
<AdditionalAttributes>
<AdditionalAttribute>
<Name>LANDSAT_PRODUCT_ID</Name>
<Values>
<Value>LC08_L1TP_159043_20200425_20200822_02_T1</Value>
<Value>LC08_L1TP_159044_20200425_20200822_02_T1</Value>
</Values>
</AdditionalAttribute>
<AdditionalAttribute>
<Name>CLOUD_COVERAGE</Name>
<Values>
<Value>0</Value>
</Values>
</AdditionalAttribute>
<AdditionalAttribute>
<Name>MGRS_TILE_ID</Name>
<Values>
<Value>40QCM</Value>
</Values>
</AdditionalAttribute>
<AdditionalAttribute>
<Name>SPATIAL_COVERAGE</Name>
<Values>
<Value>44</Value>
</Values>
</AdditionalAttribute>
<AdditionalAttribute>
<Name>SPATIAL_RESOLUTION</Name>
<Values>
<Value>30.0</Value>
</Values>
</AdditionalAttribute>
<AdditionalAttribute>
<Name>SPATIAL_RESAMPLING_ALG</Name>
<Values>
<Value>Cubic Convolution</Value>
</Values>
</AdditionalAttribute>
<AdditionalAttribute>
<Name>HLS_PROCESSING_TIME</Name>
<Values>
<Value>2021-12-06T17:07:27Z</Value>
</Values>
</AdditionalAttribute>
<AdditionalAttribute>
<Name>SENSING_TIME</Name>
<Values>
<Value>2020-04-25T06:39:54.6227080Z</Value>
<Value>2020-04-25T06:40:18.5137470Z</Value>
</Values>
</AdditionalAttribute>
<AdditionalAttribute>
<Name>HORIZONTAL_CS_NAME</Name>
<Values>
<Value>UTM, WGS84, UTM ZONE 40</Value>
<Value>UTM, WGS84, UTM ZONE 40</Value>
</Values>
</AdditionalAttribute>
<AdditionalAttribute>
<Name>ULX</Name>
<Values>
<Value>300000.0</Value>
</Values>
</AdditionalAttribute>
<AdditionalAttribute>
<Name>ULY</Name>
<Values>
<Value>2700000.0</Value>
</Values>
</AdditionalAttribute>
<AdditionalAttribute>
<Name>ADD_OFFSET</Name>
<Values>
<Value>0</Value>
</Values>
</AdditionalAttribute>
<AdditionalAttribute>
<Name>REF_SCALE_FACTOR</Name>
<Values>
<Value>0.0001</Value>
</Values>
</AdditionalAttribute>
<AdditionalAttribute>
<Name>THERM_SCALE_FACTOR</Name>
<Values>
<Value>0.01</Value>
</Values>
</AdditionalAttribute>
<AdditionalAttribute>
<Name>ANG_SCALE_FACTOR</Name>
<Values>
<Value>0.01</Value>
</Values>
</AdditionalAttribute>
<AdditionalAttribute>
<Name>FILLVALUE</Name>
<Values>
<Value>-9999</Value>
</Values>
</AdditionalAttribute>
<AdditionalAttribute>
<Name>QA_FILLVALUE</Name>
<Values>
<Value>255</Value>
</Values>
</AdditionalAttribute>
<AdditionalAttribute>
<Name>NCOLS</Name>
<Values>
<Value>3660</Value>
</Values>
</AdditionalAttribute>
<AdditionalAttribute>
<Name>NROWS</Name>
<Values>
<Value>3660</Value>
</Values>
</AdditionalAttribute>
<AdditionalAttribute>
<Name>MEAN_SUN_AZIMUTH_ANGLE</Name>
<Values>
<Value>111.01313109</Value>
</Values>
</AdditionalAttribute>
<AdditionalAttribute>
<Name>MEAN_SUN_ZENITH_ANGLE</Name>
<Values>
<Value>24.64378263</Value>
</Values>
</AdditionalAttribute>
<AdditionalAttribute>
<Name>MEAN_VIEW_AZIMUTH_ANGLE</Name>
<Values>
<Value>104.15149764</Value>
</Values>
</AdditionalAttribute>
<AdditionalAttribute>
<Name>MEAN_VIEW_ZENITH_ANGLE</Name>
<Values>
<Value>6.20920924</Value>
</Values>
</AdditionalAttribute>
<AdditionalAttribute>
<Name>NBAR_SOLAR_ZENITH</Name>
<Values>
<Value>22.16855886</Value>
</Values>
</AdditionalAttribute>
<AdditionalAttribute>
<Name>ACCODE</Name>
<Values>
<Value>LaSRC v3.0.5</Value>
</Values>
</AdditionalAttribute>
<AdditionalAttribute>
<Name>TIRS_SSM_MODEL</Name>
<Values>
<Value>FINAL</Value>
<Value>FINAL</Value>
</Values>
</AdditionalAttribute>
<AdditionalAttribute>
<Name>TIRS_SSM_POSITION_STATUS</Name>
<Values>
<Value>ESTIMATED</Value>
<Value>ESTIMATED</Value>
</Values>
</AdditionalAttribute>
<AdditionalAttribute>
<Name>USGS_SOFTWARE</Name>
<Values>
<Value>LPGS_15.3.1c</Value>
</Values>
</AdditionalAttribute>
<AdditionalAttribute>
<Name>IDENTIFIER_PRODUCT_DOI</Name>
<Values>
<Value>10.5067/HLS/HLSL30.002</Value>
</Values>
</AdditionalAttribute>
<AdditionalAttribute>
<Name>IDENTIFIER_PRODUCT_DOI_AUTHORITY</Name>
<Values>
<Value>https://doi.org</Value>
</Values>
</AdditionalAttribute>
</AdditionalAttributes>
<OnlineAccessURLs>
<OnlineAccessURL>
<URL>https://data.lpdaac.earthdatacloud.nasa.gov/lp-prod-protected/HLSL30.020/HLS.L30.T40QCM.2020116T063954.v2.0/HLS.L30.T40QCM.2020116T063954.v2.0.Fmask.tif</URL>
<URLDescription>Download HLS.L30.T40QCM.2020116T063954.v2.0.Fmask.tif</URLDescription>
</OnlineAccessURL>
<OnlineAccessURL>
<URL>s3://lp-prod-protected/HLSL30.020/HLS.L30.T40QCM.2020116T063954.v2.0/HLS.L30.T40QCM.2020116T063954.v2.0.Fmask.tif</URL>
<URLDescription>This link provides direct download access via S3 to the granule</URLDescription>
</OnlineAccessURL>
<OnlineAccessURL>
<URL>https://data.lpdaac.earthdatacloud.nasa.gov/lp-prod-protected/HLSL30.020/HLS.L30.T40QCM.2020116T063954.v2.0/HLS.L30.T40QCM.2020116T063954.v2.0.VAA.tif</URL>
<URLDescription>Download HLS.L30.T40QCM.2020116T063954.v2.0.VAA.tif</URLDescription>
</OnlineAccessURL>
<OnlineAccessURL>
<URL>s3://lp-prod-protected/HLSL30.020/HLS.L30.T40QCM.2020116T063954.v2.0/HLS.L30.T40QCM.2020116T063954.v2.0.VAA.tif</URL>
<URLDescription>This link provides direct download access via S3 to the granule</URLDescription>
</OnlineAccessURL>
<OnlineAccessURL>
<URL>https://data.lpdaac.earthdatacloud.nasa.gov/lp-prod-protected/HLSL30.020/HLS.L30.T40QCM.2020116T063954.v2.0/HLS.L30.T40QCM.2020116T063954.v2.0.B06.tif</URL>
<URLDescription>Download HLS.L30.T40QCM.2020116T063954.v2.0.B06.tif</URLDescription>
</OnlineAccessURL>
<OnlineAccessURL>
<URL>s3://lp-prod-protected/HLSL30.020/HLS.L30.T40QCM.2020116T063954.v2.0/HLS.L30.T40QCM.2020116T063954.v2.0.B06.tif</URL>
<URLDescription>This link provides direct download access via S3 to the granule</URLDescription>
</OnlineAccessURL>
<OnlineAccessURL>
<URL>https://data.lpdaac.earthdatacloud.nasa.gov/lp-prod-protected/HLSL30.020/HLS.L30.T40QCM.2020116T063954.v2.0/HLS.L30.T40QCM.2020116T063954.v2.0.B11.tif</URL>
<URLDescription>Download HLS.L30.T40QCM.2020116T063954.v2.0.B11.tif</URLDescription>
</OnlineAccessURL>
<OnlineAccessURL>
<URL>s3://lp-prod-protected/HLSL30.020/HLS.L30.T40QCM.2020116T063954.v2.0/HLS.L30.T40QCM.2020116T063954.v2.0.B11.tif</URL>
<URLDescription>This link provides direct download access via S3 to the granule</URLDescription>
</OnlineAccessURL>
<OnlineAccessURL>
<URL>https://data.lpdaac.earthdatacloud.nasa.gov/lp-prod-protected/HLSL30.020/HLS.L30.T40QCM.2020116T063954.v2.0/HLS.L30.T40QCM.2020116T063954.v2.0.B10.tif</URL>
<URLDescription>Download HLS.L30.T40QCM.2020116T063954.v2.0.B10.tif</URLDescription>
</OnlineAccessURL>
<OnlineAccessURL>
<URL>s3://lp-prod-protected/HLSL30.020/HLS.L30.T40QCM.2020116T063954.v2.0/HLS.L30.T40QCM.2020116T063954.v2.0.B10.tif</URL>
<URLDescription>This link provides direct download access via S3 to the granule</URLDescription>
</OnlineAccessURL>
<OnlineAccessURL>
<URL>https://data.lpdaac.earthdatacloud.nasa.gov/lp-prod-protected/HLSL30.020/HLS.L30.T40QCM.2020116T063954.v2.0/HLS.L30.T40QCM.2020116T063954.v2.0.B09.tif</URL>
<URLDescription>Download HLS.L30.T40QCM.2020116T063954.v2.0.B09.tif</URLDescription>
</OnlineAccessURL>
<OnlineAccessURL>
<URL>s3://lp-prod-protected/HLSL30.020/HLS.L30.T40QCM.2020116T063954.v2.0/HLS.L30.T40QCM.2020116T063954.v2.0.B09.tif</URL>
<URLDescription>This link provides direct download access via S3 to the granule</URLDescription>
</OnlineAccessURL>
<OnlineAccessURL>
<URL>https://data.lpdaac.earthdatacloud.nasa.gov/lp-prod-protected/HLSL30.020/HLS.L30.T40QCM.2020116T063954.v2.0/HLS.L30.T40QCM.2020116T063954.v2.0.B01.tif</URL>
<URLDescription>Download HLS.L30.T40QCM.2020116T063954.v2.0.B01.tif</URLDescription>
</OnlineAccessURL>
<OnlineAccessURL>
<URL>s3://lp-prod-protected/HLSL30.020/HLS.L30.T40QCM.2020116T063954.v2.0/HLS.L30.T40QCM.2020116T063954.v2.0.B01.tif</URL>
<URLDescription>This link provides direct download access via S3 to the granule</URLDescription>
</OnlineAccessURL>
<OnlineAccessURL>
<URL>https://data.lpdaac.earthdatacloud.nasa.gov/lp-prod-protected/HLSL30.020/HLS.L30.T40QCM.2020116T063954.v2.0/HLS.L30.T40QCM.2020116T063954.v2.0.SZA.tif</URL>
<URLDescription>Download HLS.L30.T40QCM.2020116T063954.v2.0.SZA.tif</URLDescription>
</OnlineAccessURL>
<OnlineAccessURL>
<URL>s3://lp-prod-protected/HLSL30.020/HLS.L30.T40QCM.2020116T063954.v2.0/HLS.L30.T40QCM.2020116T063954.v2.0.SZA.tif</URL>
<URLDescription>This link provides direct download access via S3 to the granule</URLDescription>
</OnlineAccessURL>
<OnlineAccessURL>
<URL>https://data.lpdaac.earthdatacloud.nasa.gov/lp-prod-protected/HLSL30.020/HLS.L30.T40QCM.2020116T063954.v2.0/HLS.L30.T40QCM.2020116T063954.v2.0.B03.tif</URL>
<URLDescription>Download HLS.L30.T40QCM.2020116T063954.v2.0.B03.tif</URLDescription>
</OnlineAccessURL>
<OnlineAccessURL>
<URL>s3://lp-prod-protected/HLSL30.020/HLS.L30.T40QCM.2020116T063954.v2.0/HLS.L30.T40QCM.2020116T063954.v2.0.B03.tif</URL>
<URLDescription>This link provides direct download access via S3 to the granule</URLDescription>
</OnlineAccessURL>
<OnlineAccessURL>
<URL>https://data.lpdaac.earthdatacloud.nasa.gov/lp-prod-protected/HLSL30.020/HLS.L30.T40QCM.2020116T063954.v2.0/HLS.L30.T40QCM.2020116T063954.v2.0.B07.tif</URL>
<URLDescription>Download HLS.L30.T40QCM.2020116T063954.v2.0.B07.tif</URLDescription>
</OnlineAccessURL>
<OnlineAccessURL>
<URL>s3://lp-prod-protected/HLSL30.020/HLS.L30.T40QCM.2020116T063954.v2.0/HLS.L30.T40QCM.2020116T063954.v2.0.B07.tif</URL>
<URLDescription>This link provides direct download access via S3 to the granule</URLDescription>
</OnlineAccessURL>
<OnlineAccessURL>
<URL>https://data.lpdaac.earthdatacloud.nasa.gov/lp-prod-protected/HLSL30.020/HLS.L30.T40QCM.2020116T063954.v2.0/HLS.L30.T40QCM.2020116T063954.v2.0.B05.tif</URL>
<URLDescription>Download HLS.L30.T40QCM.2020116T063954.v2.0.B05.tif</URLDescription>
</OnlineAccessURL>
<OnlineAccessURL>
<URL>s3://lp-prod-protected/HLSL30.020/HLS.L30.T40QCM.2020116T063954.v2.0/HLS.L30.T40QCM.2020116T063954.v2.0.B05.tif</URL>
<URLDescription>This link provides direct download access via S3 to the granule</URLDescription>
</OnlineAccessURL>
<OnlineAccessURL>
<URL>https://data.lpdaac.earthdatacloud.nasa.gov/lp-prod-protected/HLSL30.020/HLS.L30.T40QCM.2020116T063954.v2.0/HLS.L30.T40QCM.2020116T063954.v2.0.SAA.tif</URL>
<URLDescription>Download HLS.L30.T40QCM.2020116T063954.v2.0.SAA.tif</URLDescription>
</OnlineAccessURL>
<OnlineAccessURL>
<URL>s3://lp-prod-protected/HLSL30.020/HLS.L30.T40QCM.2020116T063954.v2.0/HLS.L30.T40QCM.2020116T063954.v2.0.SAA.tif</URL>
<URLDescription>This link provides direct download access via S3 to the granule</URLDescription>
</OnlineAccessURL>
<OnlineAccessURL>
<URL>https://data.lpdaac.earthdatacloud.nasa.gov/lp-prod-protected/HLSL30.020/HLS.L30.T40QCM.2020116T063954.v2.0/HLS.L30.T40QCM.2020116T063954.v2.0.B04.tif</URL>
<URLDescription>Download HLS.L30.T40QCM.2020116T063954.v2.0.B04.tif</URLDescription>
</OnlineAccessURL>
<OnlineAccessURL>
<URL>s3://lp-prod-protected/HLSL30.020/HLS.L30.T40QCM.2020116T063954.v2.0/HLS.L30.T40QCM.2020116T063954.v2.0.B04.tif</URL>
<URLDescription>This link provides direct download access via S3 to the granule</URLDescription>
</OnlineAccessURL>
<OnlineAccessURL>
<URL>https://data.lpdaac.earthdatacloud.nasa.gov/lp-prod-protected/HLSL30.020/HLS.L30.T40QCM.2020116T063954.v2.0/HLS.L30.T40QCM.2020116T063954.v2.0.B02.tif</URL>
<URLDescription>Download HLS.L30.T40QCM.2020116T063954.v2.0.B02.tif</URLDescription>
</OnlineAccessURL>
<OnlineAccessURL>
<URL>s3://lp-prod-protected/HLSL30.020/HLS.L30.T40QCM.2020116T063954.v2.0/HLS.L30.T40QCM.2020116T063954.v2.0.B02.tif</URL>
<URLDescription>This link provides direct download access via S3 to the granule</URLDescription>
</OnlineAccessURL>
<OnlineAccessURL>
<URL>https://data.lpdaac.earthdatacloud.nasa.gov/lp-prod-protected/HLSL30.020/HLS.L30.T40QCM.2020116T063954.v2.0/HLS.L30.T40QCM.2020116T063954.v2.0.VZA.tif</URL>
<URLDescription>Download HLS.L30.T40QCM.2020116T063954.v2.0.VZA.tif</URLDescription>
</OnlineAccessURL>
<OnlineAccessURL>
<URL>s3://lp-prod-protected/HLSL30.020/HLS.L30.T40QCM.2020116T063954.v2.0/HLS.L30.T40QCM.2020116T063954.v2.0.VZA.tif</URL>
<URLDescription>This link provides direct download access via S3 to the granule</URLDescription>
</OnlineAccessURL>
</OnlineAccessURLs>
<OnlineResources>
<OnlineResource>
<URL>https://data.lpdaac.earthdatacloud.nasa.gov/lp-prod-public/HLSL30.020/HLS.L30.T40QCM.2020116T063954.v2.0/HLS.L30.T40QCM.2020116T063954.v2.0_stac.json</URL>
<Description>Download HLS.L30.T40QCM.2020116T063954.v2.0_stac.json</Description>
<Type>EXTENDED METADATA</Type>
</OnlineResource>
<OnlineResource>
<URL>s3://lp-prod-public/HLSL30.020/HLS.L30.T40QCM.2020116T063954.v2.0/HLS.L30.T40QCM.2020116T063954.v2.0_stac.json</URL>
<Description>This link provides direct download access via S3 to the granule</Description>
<Type>EXTENDED METADATA</Type>
</OnlineResource>
<OnlineResource>
<URL>https://data.lpdaac.earthdatacloud.nasa.gov/lp-prod-protected/HLSL30.020/HLS.L30.T40QCM.2020116T063954.v2.0/HLS.L30.T40QCM.2020116T063954.v2.0.cmr.xml</URL>
<Description>Download HLS.L30.T40QCM.2020116T063954.v2.0.cmr.xml</Description>
<Type>EXTENDED METADATA</Type>
</OnlineResource>
<OnlineResource>
<URL>s3://lp-prod-protected/HLSL30.020/HLS.L30.T40QCM.2020116T063954.v2.0/HLS.L30.T40QCM.2020116T063954.v2.0.cmr.xml</URL>
<Description>This link provides direct download access via S3 to the granule</Description>
<Type>EXTENDED METADATA</Type>
</OnlineResource>
<OnlineResource>
<URL>https://data.lpdaac.earthdatacloud.nasa.gov/s3credentials</URL>
<Description>api endpoint to retrieve temporary credentials valid for same-region direct s3 access</Description>
<Type>VIEW RELATED INFORMATION</Type>
</OnlineResource>
</OnlineResources>
<DataFormat>Cloud Optimized GeoTIFF (COG)</DataFormat>
<AssociatedBrowseImageUrls>
<ProviderBrowseUrl>
<URL>https://data.lpdaac.earthdatacloud.nasa.gov/lp-prod-public/HLSL30.020/HLS.L30.T40QCM.2020116T063954.v2.0/HLS.L30.T40QCM.2020116T063954.v2.0.jpg</URL>
<Description>Download HLS.L30.T40QCM.2020116T063954.v2.0.jpg</Description>
</ProviderBrowseUrl>
<ProviderBrowseUrl>
<URL>s3://lp-prod-public/HLSL30.020/HLS.L30.T40QCM.2020116T063954.v2.0/HLS.L30.T40QCM.2020116T063954.v2.0.jpg</URL>
<Description>This link provides direct download access via S3 to the granule</Description>
</ProviderBrowseUrl>
</AssociatedBrowseImageUrls>
</Granule>"""  #Replace this with your XML data
root = ET.fromstring(xml_data)


#Extract relevant information from XML
def get_metadata(root):
    #Parse metadata
    spatial = root.find("Spatial/HorizontalSpatialDomain/Geometry/GPolygon/Boundary")
    points = spatial.findall("Point")

    #Get UTM coordinates of the upper-left corner
    ulx = float(
        root.find(
            "AdditionalAttributes/AdditionalAttribute[Name='ULX']/Values/Value"
        ).text
    )
    uly = float(
        root.find(
            "AdditionalAttributes/AdditionalAttribute[Name='ULY']/Values/Value"
        ).text
    )

    #Image dimensions and spatial resolution
    ncols = int(
        root.find(
            "AdditionalAttributes/AdditionalAttribute[Name='NCOLS']/Values/Value"
        ).text
    )
    nrows = int(
        root.find(
            "AdditionalAttributes/AdditionalAttribute[Name='NROWS']/Values/Value"
        ).text
    )
    spatial_resolution = float(
        root.find(
            "AdditionalAttributes/AdditionalAttribute[Name='SPATIAL_RESOLUTION']/Values/Value"
        ).text
    )

    #Bounding box coordinates (in UTM)
    ul_lon = float(points[0].find("PointLongitude").text)
    ul_lat = float(points[0].find("PointLatitude").text)
    #print("ul_lonnnnn", ul_lon, ul_lat)
    '''new data extracted'''
    #extract the BeginningDateTime
    beginning_datetime_str = root.find(".//BeginningDateTime").text

    #Convert the string to a datetime object
    beginning_datetime = datetime.strptime(beginning_datetime_str, "%Y-%m-%dT%H:%M:%S.%fZ")
    dateret = beginning_datetime.date()
    #print("hi i am ulx", ulx)
    #print("hi i am uly", uly)
    return ulx, uly, ncols, nrows, spatial_resolution, ul_lon, ul_lat, dateret


#Convert geographic coordinates to UTM coordinates
def convert_to_utm(lon, lat, proj):
    return proj(lon, lat)


#Calculate pixel coordinates
def get_pixel_coordinates(lon, lat, ulx, uly, ncols, nrows, spatial_resolution, proj):
    #print("hey", lon, lat)
    x_utm, y_utm = convert_to_utm(lon, lat, proj)
    #print(x_utm, y_utm, "blablaBLALALALAL")
    pixel_x = (x_utm - ulx) / spatial_resolution
    pixel_y = (uly - y_utm) / spatial_resolution
    return int(pixel_x), int(pixel_y)


def matrixToTiff(matrix, outfile):
    #if matrix.dtype != np.uint8:
        #matrix = (matrix * 255).astype(np.uint8)
    image = Image.fromarray(matrix)
    image.save(outfile, format='TIFF')


#modified main function
import rasterio
def main():
    #Create UTM projection (use EPSG code if available)
    #proj = Proj(proj="utm", zone=37, ellps="WGS84")
    proj = Proj("EPSG:32640") #adjusted this based on the xml data :))))
    #Get metadata
    ulx, uly, ncols, nrows, spatial_resolution, ul_lon, ul_lat, dateret = get_metadata(root)
    #print(ncols,nrows)
    mask = np.zeros((nrows,ncols)) 
    #Example geographic coordinate (longitude, latitude)
    '''path of the big csv locust grounds'''
    rasterPath = r"C:\Users\User\Desktop\DATASets\hls-bulk-download\test_two\mergedfinal.tif"
    with rasterio.open(rasterPath) as src:
        rasterData = src.read()
    for i in range(nrows):
        for j in range(ncols):
            print('hii')
            if np.any(rasterData[:, i, j] != 0):
                mask[i][j] = 50
    csvPath = r"C:\Users\User\Desktop\DATASets\Hoppers_Public_7481916456258955251 (1).csv"
    with open(csvPath, 'r') as csvfile:
        counter = 0
        csv_reader = csv.DictReader(csvfile)
        for row in csv_reader:
            counter+=1
            if counter == 45623:
             print("THIS IS COUNTER",counter)
            #take the date:
            startdate_str = row['STARTDATE']
            startdate_str = startdate_str.split(' ')[0]

            #string to datetime object
            startdate = datetime.strptime(startdate_str, '%m/%d/%Y')
            datefinal = startdate.date()
            diffallowed = timedelta(days = 2)
            date_diff = abs((datefinal-dateret).days)
            if date_diff <= diffallowed.days:


                csvX = float(row['x'])
                csvY = float(row['y'])
                #print(csvX)
                #Get pixel coordinates
                pixel_x, pixel_y = get_pixel_coordinates(
                    csvX, csvY, ulx, uly, ncols, nrows, spatial_resolution, proj
                )
                print(pixel_x, pixel_y)
                if 0<= pixel_y < nrows and 0<= pixel_x< ncols:
                    if np.any(rasterData[:, pixel_y, pixel_x] != 0):

                        mask[pixel_y][pixel_x] = 255
                        for dy in range(-25, 26):  
                            for dx in range(-25, 26):  
                                new_y = pixel_y + dy
                                new_x = pixel_x + dx
                                if 0 <= new_y < nrows and 0 <= new_x < ncols:
                                    if np.any(rasterData[:, pixel_y, pixel_x] != 0):
                                        mask[new_y][new_x] = 255
    matrixToTiff(mask,"final_mask")
    np.savetxt(r"C:\Users\User\Desktop\DATASets\hls-bulk-download\test_two\output.txt", mask, fmt='%d') 
    return mask
if __name__ == "__main__":
    main()

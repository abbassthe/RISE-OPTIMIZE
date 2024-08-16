import xml.etree.ElementTree as ET
from pyproj import Proj, Transformer, transform

# Parse XML
xml_data = """
<Granule>
<GranuleUR>HLS.L30.T37QGC.2013182T074521.v2.0</GranuleUR>
<InsertTime>2022-03-28T03:37:28.284458Z</InsertTime>
<LastUpdate>2022-03-28T03:37:28.284465Z</LastUpdate>
<Collection>
<DataSetId>HLS Landsat Operational Land Imager Surface Reflectance and TOA Brightness Daily Global 30m v2.0</DataSetId>
</Collection>
<DataGranule>
<DataGranuleSizeInBytes>52976387</DataGranuleSizeInBytes>
<ProducerGranuleId>HLS.L30.T37QGC.2013182T074521</ProducerGranuleId>
<DayNightFlag>DAY</DayNightFlag>
<ProductionDateTime>2022-03-28T03:36:40.000000Z</ProductionDateTime>
<LocalVersionId>2.0</LocalVersionId>
</DataGranule>
<Temporal>
<RangeDateTime>
<BeginningDateTime>2013-07-01T07:45:21.523797Z</BeginningDateTime>
<EndingDateTime>2013-07-01T07:45:21.523797Z</EndingDateTime>
</RangeDateTime>
</Temporal>
<Spatial>
<HorizontalSpatialDomain>
<Geometry>
<GPolygon>
<Boundary>
<Point>
<PointLongitude>40.90886864</PointLongitude>
<PointLatitude>19.79784881</PointLatitude>
</Point>
<Point>
<PointLongitude>40.9210571</PointLongitude>
<PointLatitude>20.78948698</PointLatitude>
</Point>
<Point>
<PointLongitude>41.30935458</PointLongitude>
<PointLatitude>20.7847005</PointLatitude>
</Point>
<Point>
<PointLongitude>41.07546783</PointLongitude>
<PointLatitude>19.79599109</PointLatitude>
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
<Value>LC08_L1TP_169046_20130701_20200912_02_T1</Value>
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
<Value>37QGC</Value>
</Values>
</AdditionalAttribute>
<AdditionalAttribute>
<Name>SPATIAL_COVERAGE</Name>
<Values>
<Value>26</Value>
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
<Value>2022-03-28T03:36:40Z</Value>
</Values>
</AdditionalAttribute>
<AdditionalAttribute>
<Name>SENSING_TIME</Name>
<Values>
<Value>2013-07-01T07:45:21.5237970Z</Value>
</Values>
</AdditionalAttribute>
<AdditionalAttribute>
<Name>HORIZONTAL_CS_NAME</Name>
<Values>
<Value>UTM, WGS84, UTM ZONE 37</Value>
</Values>
</AdditionalAttribute>
<AdditionalAttribute>
<Name>ULX</Name>
<Values>
<Value>699960.0</Value>
</Values>
</AdditionalAttribute>
<AdditionalAttribute>
<Name>ULY</Name>
<Values>
<Value>2300040.0</Value>
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
<Value>78.58467577</Value>
</Values>
</AdditionalAttribute>
<AdditionalAttribute>
<Name>MEAN_SUN_ZENITH_ANGLE</Name>
<Values>
<Value>22.04904448</Value>
</Values>
</AdditionalAttribute>
<AdditionalAttribute>
<Name>MEAN_VIEW_AZIMUTH_ANGLE</Name>
<Values>
<Value>280.44857114</Value>
</Values>
</AdditionalAttribute>
<AdditionalAttribute>
<Name>MEAN_VIEW_ZENITH_ANGLE</Name>
<Values>
<Value>6.96968802</Value>
</Values>
</AdditionalAttribute>
<AdditionalAttribute>
<Name>NBAR_SOLAR_ZENITH</Name>
<Values>
<Value>21.26593782</Value>
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
<Value>ACTUAL</Value>
</Values>
</AdditionalAttribute>
<AdditionalAttribute>
<Name>TIRS_SSM_POSITION_STATUS</Name>
<Values>
<Value>NOMINAL</Value>
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
<URL>https://data.lpdaac.earthdatacloud.nasa.gov/lp-prod-protected/HLSL30.020/HLS.L30.T37QGC.2013182T074521.v2.0/HLS.L30.T37QGC.2013182T074521.v2.0.B10.tif</URL>
<URLDescription>Download HLS.L30.T37QGC.2013182T074521.v2.0.B10.tif</URLDescription>
</OnlineAccessURL>
<OnlineAccessURL>
<URL>s3://lp-prod-protected/HLSL30.020/HLS.L30.T37QGC.2013182T074521.v2.0/HLS.L30.T37QGC.2013182T074521.v2.0.B10.tif</URL>
<URLDescription>This link provides direct download access via S3 to the granule</URLDescription>
</OnlineAccessURL>
<OnlineAccessURL>
<URL>https://data.lpdaac.earthdatacloud.nasa.gov/lp-prod-protected/HLSL30.020/HLS.L30.T37QGC.2013182T074521.v2.0/HLS.L30.T37QGC.2013182T074521.v2.0.B11.tif</URL>
<URLDescription>Download HLS.L30.T37QGC.2013182T074521.v2.0.B11.tif</URLDescription>
</OnlineAccessURL>
<OnlineAccessURL>
<URL>s3://lp-prod-protected/HLSL30.020/HLS.L30.T37QGC.2013182T074521.v2.0/HLS.L30.T37QGC.2013182T074521.v2.0.B11.tif</URL>
<URLDescription>This link provides direct download access via S3 to the granule</URLDescription>
</OnlineAccessURL>
<OnlineAccessURL>
<URL>https://data.lpdaac.earthdatacloud.nasa.gov/lp-prod-protected/HLSL30.020/HLS.L30.T37QGC.2013182T074521.v2.0/HLS.L30.T37QGC.2013182T074521.v2.0.B05.tif</URL>
<URLDescription>Download HLS.L30.T37QGC.2013182T074521.v2.0.B05.tif</URLDescription>
</OnlineAccessURL>
<OnlineAccessURL>
<URL>s3://lp-prod-protected/HLSL30.020/HLS.L30.T37QGC.2013182T074521.v2.0/HLS.L30.T37QGC.2013182T074521.v2.0.B05.tif</URL>
<URLDescription>This link provides direct download access via S3 to the granule</URLDescription>
</OnlineAccessURL>
<OnlineAccessURL>
<URL>https://data.lpdaac.earthdatacloud.nasa.gov/lp-prod-protected/HLSL30.020/HLS.L30.T37QGC.2013182T074521.v2.0/HLS.L30.T37QGC.2013182T074521.v2.0.VAA.tif</URL>
<URLDescription>Download HLS.L30.T37QGC.2013182T074521.v2.0.VAA.tif</URLDescription>
</OnlineAccessURL>
<OnlineAccessURL>
<URL>s3://lp-prod-protected/HLSL30.020/HLS.L30.T37QGC.2013182T074521.v2.0/HLS.L30.T37QGC.2013182T074521.v2.0.VAA.tif</URL>
<URLDescription>This link provides direct download access via S3 to the granule</URLDescription>
</OnlineAccessURL>
<OnlineAccessURL>
<URL>https://data.lpdaac.earthdatacloud.nasa.gov/lp-prod-protected/HLSL30.020/HLS.L30.T37QGC.2013182T074521.v2.0/HLS.L30.T37QGC.2013182T074521.v2.0.B07.tif</URL>
<URLDescription>Download HLS.L30.T37QGC.2013182T074521.v2.0.B07.tif</URLDescription>
</OnlineAccessURL>
<OnlineAccessURL>
<URL>s3://lp-prod-protected/HLSL30.020/HLS.L30.T37QGC.2013182T074521.v2.0/HLS.L30.T37QGC.2013182T074521.v2.0.B07.tif</URL>
<URLDescription>This link provides direct download access via S3 to the granule</URLDescription>
</OnlineAccessURL>
<OnlineAccessURL>
<URL>https://data.lpdaac.earthdatacloud.nasa.gov/lp-prod-protected/HLSL30.020/HLS.L30.T37QGC.2013182T074521.v2.0/HLS.L30.T37QGC.2013182T074521.v2.0.Fmask.tif</URL>
<URLDescription>Download HLS.L30.T37QGC.2013182T074521.v2.0.Fmask.tif</URLDescription>
</OnlineAccessURL>
<OnlineAccessURL>
<URL>s3://lp-prod-protected/HLSL30.020/HLS.L30.T37QGC.2013182T074521.v2.0/HLS.L30.T37QGC.2013182T074521.v2.0.Fmask.tif</URL>
<URLDescription>This link provides direct download access via S3 to the granule</URLDescription>
</OnlineAccessURL>
<OnlineAccessURL>
<URL>https://data.lpdaac.earthdatacloud.nasa.gov/lp-prod-protected/HLSL30.020/HLS.L30.T37QGC.2013182T074521.v2.0/HLS.L30.T37QGC.2013182T074521.v2.0.SZA.tif</URL>
<URLDescription>Download HLS.L30.T37QGC.2013182T074521.v2.0.SZA.tif</URLDescription>
</OnlineAccessURL>
<OnlineAccessURL>
<URL>s3://lp-prod-protected/HLSL30.020/HLS.L30.T37QGC.2013182T074521.v2.0/HLS.L30.T37QGC.2013182T074521.v2.0.SZA.tif</URL>
<URLDescription>This link provides direct download access via S3 to the granule</URLDescription>
</OnlineAccessURL>
<OnlineAccessURL>
<URL>https://data.lpdaac.earthdatacloud.nasa.gov/lp-prod-protected/HLSL30.020/HLS.L30.T37QGC.2013182T074521.v2.0/HLS.L30.T37QGC.2013182T074521.v2.0.B06.tif</URL>
<URLDescription>Download HLS.L30.T37QGC.2013182T074521.v2.0.B06.tif</URLDescription>
</OnlineAccessURL>
<OnlineAccessURL>
<URL>s3://lp-prod-protected/HLSL30.020/HLS.L30.T37QGC.2013182T074521.v2.0/HLS.L30.T37QGC.2013182T074521.v2.0.B06.tif</URL>
<URLDescription>This link provides direct download access via S3 to the granule</URLDescription>
</OnlineAccessURL>
<OnlineAccessURL>
<URL>https://data.lpdaac.earthdatacloud.nasa.gov/lp-prod-protected/HLSL30.020/HLS.L30.T37QGC.2013182T074521.v2.0/HLS.L30.T37QGC.2013182T074521.v2.0.B02.tif</URL>
<URLDescription>Download HLS.L30.T37QGC.2013182T074521.v2.0.B02.tif</URLDescription>
</OnlineAccessURL>
<OnlineAccessURL>
<URL>s3://lp-prod-protected/HLSL30.020/HLS.L30.T37QGC.2013182T074521.v2.0/HLS.L30.T37QGC.2013182T074521.v2.0.B02.tif</URL>
<URLDescription>This link provides direct download access via S3 to the granule</URLDescription>
</OnlineAccessURL>
<OnlineAccessURL>
<URL>https://data.lpdaac.earthdatacloud.nasa.gov/lp-prod-protected/HLSL30.020/HLS.L30.T37QGC.2013182T074521.v2.0/HLS.L30.T37QGC.2013182T074521.v2.0.B01.tif</URL>
<URLDescription>Download HLS.L30.T37QGC.2013182T074521.v2.0.B01.tif</URLDescription>
</OnlineAccessURL>
<OnlineAccessURL>
<URL>s3://lp-prod-protected/HLSL30.020/HLS.L30.T37QGC.2013182T074521.v2.0/HLS.L30.T37QGC.2013182T074521.v2.0.B01.tif</URL>
<URLDescription>This link provides direct download access via S3 to the granule</URLDescription>
</OnlineAccessURL>
<OnlineAccessURL>
<URL>https://data.lpdaac.earthdatacloud.nasa.gov/lp-prod-protected/HLSL30.020/HLS.L30.T37QGC.2013182T074521.v2.0/HLS.L30.T37QGC.2013182T074521.v2.0.B03.tif</URL>
<URLDescription>Download HLS.L30.T37QGC.2013182T074521.v2.0.B03.tif</URLDescription>
</OnlineAccessURL>
<OnlineAccessURL>
<URL>s3://lp-prod-protected/HLSL30.020/HLS.L30.T37QGC.2013182T074521.v2.0/HLS.L30.T37QGC.2013182T074521.v2.0.B03.tif</URL>
<URLDescription>This link provides direct download access via S3 to the granule</URLDescription>
</OnlineAccessURL>
<OnlineAccessURL>
<URL>https://data.lpdaac.earthdatacloud.nasa.gov/lp-prod-protected/HLSL30.020/HLS.L30.T37QGC.2013182T074521.v2.0/HLS.L30.T37QGC.2013182T074521.v2.0.B04.tif</URL>
<URLDescription>Download HLS.L30.T37QGC.2013182T074521.v2.0.B04.tif</URLDescription>
</OnlineAccessURL>
<OnlineAccessURL>
<URL>s3://lp-prod-protected/HLSL30.020/HLS.L30.T37QGC.2013182T074521.v2.0/HLS.L30.T37QGC.2013182T074521.v2.0.B04.tif</URL>
<URLDescription>This link provides direct download access via S3 to the granule</URLDescription>
</OnlineAccessURL>
<OnlineAccessURL>
<URL>https://data.lpdaac.earthdatacloud.nasa.gov/lp-prod-protected/HLSL30.020/HLS.L30.T37QGC.2013182T074521.v2.0/HLS.L30.T37QGC.2013182T074521.v2.0.SAA.tif</URL>
<URLDescription>Download HLS.L30.T37QGC.2013182T074521.v2.0.SAA.tif</URLDescription>
</OnlineAccessURL>
<OnlineAccessURL>
<URL>s3://lp-prod-protected/HLSL30.020/HLS.L30.T37QGC.2013182T074521.v2.0/HLS.L30.T37QGC.2013182T074521.v2.0.SAA.tif</URL>
<URLDescription>This link provides direct download access via S3 to the granule</URLDescription>
</OnlineAccessURL>
<OnlineAccessURL>
<URL>https://data.lpdaac.earthdatacloud.nasa.gov/lp-prod-protected/HLSL30.020/HLS.L30.T37QGC.2013182T074521.v2.0/HLS.L30.T37QGC.2013182T074521.v2.0.B09.tif</URL>
<URLDescription>Download HLS.L30.T37QGC.2013182T074521.v2.0.B09.tif</URLDescription>
</OnlineAccessURL>
<OnlineAccessURL>
<URL>s3://lp-prod-protected/HLSL30.020/HLS.L30.T37QGC.2013182T074521.v2.0/HLS.L30.T37QGC.2013182T074521.v2.0.B09.tif</URL>
<URLDescription>This link provides direct download access via S3 to the granule</URLDescription>
</OnlineAccessURL>
<OnlineAccessURL>
<URL>https://data.lpdaac.earthdatacloud.nasa.gov/lp-prod-protected/HLSL30.020/HLS.L30.T37QGC.2013182T074521.v2.0/HLS.L30.T37QGC.2013182T074521.v2.0.VZA.tif</URL>
<URLDescription>Download HLS.L30.T37QGC.2013182T074521.v2.0.VZA.tif</URLDescription>
</OnlineAccessURL>
<OnlineAccessURL>
<URL>s3://lp-prod-protected/HLSL30.020/HLS.L30.T37QGC.2013182T074521.v2.0/HLS.L30.T37QGC.2013182T074521.v2.0.VZA.tif</URL>
<URLDescription>This link provides direct download access via S3 to the granule</URLDescription>
</OnlineAccessURL>
</OnlineAccessURLs>
<OnlineResources>
<OnlineResource>
<URL>https://data.lpdaac.earthdatacloud.nasa.gov/lp-prod-public/HLSL30.020/HLS.L30.T37QGC.2013182T074521.v2.0/HLS.L30.T37QGC.2013182T074521.v2.0_stac.json</URL>
<Description>Download HLS.L30.T37QGC.2013182T074521.v2.0_stac.json</Description>
<Type>EXTENDED METADATA</Type>
</OnlineResource>
<OnlineResource>
<URL>s3://lp-prod-public/HLSL30.020/HLS.L30.T37QGC.2013182T074521.v2.0/HLS.L30.T37QGC.2013182T074521.v2.0_stac.json</URL>
<Description>This link provides direct download access via S3 to the granule</Description>
<Type>EXTENDED METADATA</Type>
</OnlineResource>
<OnlineResource>
<URL>https://data.lpdaac.earthdatacloud.nasa.gov/lp-prod-protected/HLSL30.020/HLS.L30.T37QGC.2013182T074521.v2.0/HLS.L30.T37QGC.2013182T074521.v2.0.cmr.xml</URL>
<Description>Download HLS.L30.T37QGC.2013182T074521.v2.0.cmr.xml</Description>
<Type>EXTENDED METADATA</Type>
</OnlineResource>
<OnlineResource>
<URL>s3://lp-prod-protected/HLSL30.020/HLS.L30.T37QGC.2013182T074521.v2.0/HLS.L30.T37QGC.2013182T074521.v2.0.cmr.xml</URL>
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
<URL>https://data.lpdaac.earthdatacloud.nasa.gov/lp-prod-public/HLSL30.020/HLS.L30.T37QGC.2013182T074521.v2.0/HLS.L30.T37QGC.2013182T074521.v2.0.jpg</URL>
<Description>Download HLS.L30.T37QGC.2013182T074521.v2.0.jpg</Description>
</ProviderBrowseUrl>
<ProviderBrowseUrl>
<URL>s3://lp-prod-public/HLSL30.020/HLS.L30.T37QGC.2013182T074521.v2.0/HLS.L30.T37QGC.2013182T074521.v2.0.jpg</URL>
<Description>This link provides direct download access via S3 to the granule</Description>
</ProviderBrowseUrl>
</AssociatedBrowseImageUrls>
</Granule>"""  # Replace this with your XML data
root = ET.fromstring(xml_data)


# Extract relevant information from XML
def get_metadata(root):
    # Parse metadata
    spatial = root.find("Spatial/HorizontalSpatialDomain/Geometry/GPolygon/Boundary")
    points = spatial.findall("Point")

    # Get UTM coordinates of the upper-left corner
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

    # Image dimensions and spatial resolution
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

    # Bounding box coordinates (in UTM)
    ul_lon = float(points[0].find("PointLongitude").text)
    ul_lat = float(points[0].find("PointLatitude").text)

    return ulx, uly, ncols, nrows, spatial_resolution, ul_lon, ul_lat


# Convert geographic coordinates to UTM coordinates
def convert_to_utm(lon, lat, proj):
    return proj(lon, lat)


# Calculate pixel coordinates
def get_pixel_coordinates(lon, lat, ulx, uly, ncols, nrows, spatial_resolution, proj):
    x_utm, y_utm = convert_to_utm(lon, lat, proj)

    pixel_x = (x_utm - ulx) / spatial_resolution
    pixel_y = (uly - y_utm) / spatial_resolution

    return int(pixel_x), int(pixel_y)


# Main function
def main():
    # Create UTM projection (use EPSG code if available)
    proj = Proj(proj="utm", zone=37, ellps="WGS84")

    # Get metadata
    ulx, uly, ncols, nrows, spatial_resolution, ul_lon, ul_lat = get_metadata(root)

    # Example geographic coordinate (longitude, latitude)
    lon = 40.915
    lat = 20.0

    # Get pixel coordinates
    pixel_x, pixel_y = get_pixel_coordinates(
        lon, lat, ulx, uly, ncols, nrows, spatial_resolution, proj
    )

    print(f"Pixel coordinates: x={pixel_x}, y={pixel_y}")


if __name__ == "__main__":
    main()

# Parse XML
tree = ET.ElementTree(ET.fromstring(xml_data))
root = tree.getroot()


# Extract UTM information
def extract_utm_info(root):
    # UTM coordinates and pixel size in the XML are given in the AdditionalAttributes section
    attributes = {
        attr.find("Name").text: attr.find("Values/Value").text
        for attr in root.findall(".//AdditionalAttribute")
    }
    ulx = float(attributes.get("ULX", "0"))
    uly = float(attributes.get("ULY", "0"))
    pixel_size = float(attributes.get("SPATIAL_RESOLUTION", "30.0"))
    return ulx, uly, pixel_size


# Extract the UTM coordinates and pixel size
ulx, uly, pixel_size = extract_utm_info(root)

# Define the UTM projection
utm_zone = "37"  # UTM zone extracted from the AdditionalAttributes
proj_utm = Proj(proj="utm", zone=utm_zone, ellps="WGS84")
proj_latlong = Proj(proj="latlong", datum="WGS84")
transformer = Transformer.from_proj(proj_utm, proj_latlong)


def pixel_to_latlon(x, y, ulx, uly, pixel_size):
    # Convert pixel coordinates to UTM coordinates
    utm_x = ulx + x * pixel_size
    utm_y = uly - y * pixel_size
    # Convert UTM coordinates to latitude and longitude
    lon, lat = transformer.transform(utm_x, utm_y)
    return lon, lat


# Example pixel coordinates
pixel_x = 12
pixel_y = 2913

# Convert pixel coordinates to geographic coordinates
longitude, latitude = pixel_to_latlon(pixel_x, pixel_y, ulx, uly, pixel_size)
print(f"Longitude: {longitude}, Latitude: {latitude}")

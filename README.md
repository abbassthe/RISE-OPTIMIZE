## Setup and Installation

### Prerequisites

- Python 3.7 or higher
- Node.js
- PostgreSQL
- Django
- React.js

### Installation Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/flutterforecast.git
   cd flutterforecast
   ```

2. **Backend Setup**

   - Install GDAL (https://gdal.org/)
   - Setup and Install PostgreSQL (https://www.postgresql.org/)
   - Directly install PostGIS extension (https://postgis.net/documentation/getting_started/)
   - Install the required Python packages:
     ```bash
     pip install -r requirements.txt
     ```
   - Navigate to the Project directory, then Project folder
   - Include the PostgreSQL authentication info in the "settings.py" inside the Project app
   - Open "settings.py" and write the library path for GDAL and GEOS
   - Setup PostgreSQL Information in "settings.py"
   - Write query "CREATE EXTENSION postgis;" in the PostgreSQL database
   - Change the gmail credentials to yours if you wish for reset password feature (Note: password is the AppPassword of the gmail account)
   - Open terminal at that path and run migrations:
     python manage.py migrate
   - Run the django backend server at port 8000 by:
     python manage.py runserver

3. **Frontend Setup**

   - Navigate to the Project directory inside RISE-OPTIMIZE folder
   - Enter RISE folder, open a terminal at that path
   - Install the dependencies:
     ```bash
     npm i
     ```
   - After it finishes, run the React server by:
     ```bash
     npm run dev
     ```
   - The react server will run at port 5173

4. **Access the Application**
   - Open your browser and go to `http://localhost:5173` for the frontend.
   - Backend APIs are accessible at `http://localhost:8000`.

## Running Insect2vec

Note: After running the server, please upload data to the insect2vec model only in .pkl type,
and in the following name format to avoid errors: maps_XXXX_YY.pkl
where XXXX is the specific year of the file data (ex: 2024)
and YY is the specific month of the file data (ex: 05, referring to May)

## Final pre-trained model

Unfortunately, uploading large files is not supported by GitHub, we've uploaded the
final pre-trained model on the following link: https://drive.google.com/file/d/1-JdBkBZhfofZOBO5ojhyctfc3sVGfDFK/view?usp=sharing

<img width="1383" alt="image" src="https://github.com/user-attachments/assets/32e55bdc-7657-440f-9c4f-4ea72d172b1a">

## Map population (optional)

The map will be empty when you start at first to populate it you can just run python manage.py test and it will start testing the points app in the process it will populate the map with points from a granule that we have ran infrence on (by defualt it will be at the year 2030)

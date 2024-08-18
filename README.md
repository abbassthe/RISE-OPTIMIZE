# RISE-OPTIMIZE


# FlutterForecast

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
and YY is the specific month of the file  data (ex: 05, referring to May)

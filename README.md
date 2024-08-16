# RISE-OPTIMIZE


# FlutterForecast

## Project Overview

**FlutterForecast** is a cutting-edge platform developed to predict locust movements and breeding grounds, with the primary aim of safeguarding agriculture in the MENA (Middle East and North Africa) region. By leveraging machine learning algorithms and geospatial data analysis, the platform provides real-time, highly accurate predictions that are crucial for mitigating the impact of locust invasions, a persistent threat to food security in the region.

## Problem Statement

The MENA region has historically suffered from catastrophic agricultural disasters due to locust invasions, with the most severe event recorded in 1914. These invasions continue to pose a significant threat, exacerbated by modern climate change and environmental shifts. FlutterForecast addresses this ongoing challenge by offering advanced predictive tools to help farmers, NGOs, and government agencies protect crops and livelihoods.

## Motivation

The motivation behind FlutterForecast is to contribute to food security and agricultural sustainability in the MENA region. By providing stakeholders with the tools they need to predict and manage locust invasions, the platform aims to prevent crop losses and support the region's economic and social stability.

## Features

- **User Authentication**: Secure token-based authentication ensures only authorized users can access the platform.
- **Real-time Locust Predictions**: Predicts locust breeding grounds and swarm movements weeks in advance using machine learning models.
- **Biodiversity Mapping**: Utilizes satellite imagery and remotely sensed data to map biodiversity and predict insect migrations.
- **Insect Embeddings**: Creates unique embeddings for different insect species to uncover correlations in pest management.
- **Interactive Map**: A user-friendly interface that displays locust movement predictions and biodiversity data.

## Technologies Used

### Backend
- **Python**: Chosen for its versatility and powerful libraries.
- **Django**: A high-level Python web framework managing backend operations, data flow, and user authentication.

### Frontend
- **React.js**: Used for building a dynamic and responsive user interface.
- **Mapbox GL JS**: Powers the interactive maps central to the platform's functionality.
- **Chart.js**: Creates visualizations of data trends and model predictions.

### AI/ML
- **PyTorch**: Used for developing and training the machine learning models.
- **Terratorch**: An extension of PyTorch for handling geospatial data, crucial for locust prediction models.

### Database
- **PostgreSQL**: Manages the project’s data, with spatial data handled through PostGIS.

## System Architecture

FlutterForecast’s architecture is designed to be scalable and secure, handling complex data flows and real-time processing required for accurate locust predictions. The platform includes:

- **Data Ingestion**: Collection from various sources, preprocessed and stored in a PostgreSQL database.
- **Machine Learning Pipeline**: Data is processed through PyTorch-based models, with Terratorch managing geospatial analysis.
- **Backend Services**: Managed by Django, handling API requests, user authentication, and data processing.
- **Frontend Interface**: Built with React.js, it communicates with the backend and displays data on an interactive map.

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
   - Create a virtual environment and activate it:
     ```bash
     python3 -m venv env
     source env/bin/activate
     ```
   - Install the required Python packages:
     ```bash
     pip install -r requirements.txt
     ```
   - Set up the PostgreSQL database:
     ```bash
     createdb flutterforecast
     ```
   - Run migrations:
     ```bash
     python manage.py migrate
     ```
   - Start the Django server:
     ```bash
     python manage.py runserver
     ```

3. **Frontend Setup**
   - Navigate to the frontend directory:
     ```bash
     cd frontend
     ```
   - Install the Node.js dependencies:
     ```bash
     npm install
     ```
   - Start the React server:
     ```bash
     npm start
     ```

4. **Access the Application**
   - Open your browser and go to `http://localhost:3000` for the frontend.
   - Backend APIs are accessible at `http://localhost:8000`.

## Future Work

- **Integration with IoT Devices**: For more granular data on locust movements and environmental conditions.
- **Expansion to Other Regions**: Adapting the platform for other parts of the world facing similar challenges.
- **Mobile Application**: Developing a mobile app for greater accessibility.

## Team Contributions

- **Abbas Naim**: UI/UX design, backend development, Preprocessing for Prithvi, Fine-tuning Prithvi, Logistic regression model
- **Nadine Mcheik**: Data collection, Preprocessing for Prithvi, and Fine-tuning Prithvi.
- **Mohammad Awwad**: responsiveness, and market research.
- **Najla Sadek**: Development of Insect2vect feature and insect species analysis:
     - *Data Generation*: Created synthetic data for 16 insect species in a specific region.
     - *Matrix Generation*: Developed an algorithm to capture relationships between insect species.
     - *Model Training*: Used PyTorch to train a model that learns vector representations (embeddings) for each insect species.
     - *Inference and Analysis*: Analyzed the trained model to find similarities between species, with potential applications in biodiversity research and conservation.
- **Mohammad Raslan**: Authentication system, Backend development and API creation.

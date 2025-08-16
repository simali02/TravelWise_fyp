# TravelWise: A Smart Personalized Travel Companion 

TravelWise is a web-based application designed to simplify travel planning in Pakistan by providing **personalized recommendations** for hotels and attractions in **Karachi, Lahore, and Islamabad**. It leverages **AI, ML, and NLP** to deliver tailored suggestions and enhance user experience.

##  Features
-  Search hotels & attractions by city  
-  Personalized recommendations (Content-based & Collaborative Filtering using ALS)  
-  Intelligent chatbot (Botpress + ChatGroq API)  
-  Real-time weather updates (Weather API)  
-  Favorites list to save preferred places  
-  Multilingual support (Urdu, Punjabi, Sindhi, Pashto, English)  
-  Sentiment analysis on reviews (Random Forest)  

##  Tech Stack
- **Frontend**: React.js (Redux for state management)  
- **Backend**: Django REST Framework  
- **Database**: SQLite  
- **ML Models**: Content-based filtering (TF-IDF + cosine similarity), Collaborative filtering (ALS), Sentiment analysis (Random Forest)  
- **APIs**: ChatGroq, Weather API, Google Translate  

##  System Architecture
- Frontend (React SPA) → REST APIs (Django) → Database (SQLite)  
- Integrated ML models for recommendations + sentiment analysis  

##  Future Work
- Expand to more cities in Pakistan  
- Add restaurant recommendations  
- Improve chatbot conversational abilities with advanced NLP  
- Hybrid recommendation model for better accuracy  

---



# TravelWise: A Smart Personalized Travel Companion 🌍✨

TravelWise is a web-based application designed to simplify travel planning in Pakistan by providing **personalized recommendations** for hotels and attractions in **Karachi, Lahore, and Islamabad**. It leverages **AI, ML, and NLP** to deliver tailored suggestions and enhance user experience.

## 🚀 Features
- 🔍 Search hotels & attractions by city  
- 🎯 Personalized recommendations (Content-based & Collaborative Filtering using ALS)  
- 💬 Intelligent chatbot (Botpress + ChatGroq API)  
- 🌦 Real-time weather updates (Weather API)  
- ❤️ Favorites list to save preferred places  
- 🌐 Multilingual support (Urdu, Punjabi, Sindhi, Pashto, English)  
- ⭐ Sentiment analysis on reviews (Random Forest)  

## 🛠 Tech Stack
- **Frontend**: React.js (Redux for state management)  
- **Backend**: Django REST Framework  
- **Database**: SQLite  
- **ML Models**: Content-based filtering (TF-IDF + cosine similarity), Collaborative filtering (ALS), Sentiment analysis (Random Forest)  
- **APIs**: ChatGroq, Weather API, Google Translate  

## 📌 System Architecture
- Frontend (React SPA) → REST APIs (Django) → Database (SQLite)  
- Integrated ML models for recommendations + sentiment analysis  

## 🚀 Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/simali02/TravelWise_fyp.git
cd travelwise
```

### 2️⃣ Backend Setup (Django)
```bash
cd backend
python -m venv venv
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
venv\Scripts\activate
pip install -r requirements.txt
python manage.py runserver
```

### 3️⃣ Frontend Setup (React)
```bash
cd frontend
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
npm install -g yarn
yarn install
yarn start
```

## 📸 Screenshots
<img width="861" height="417" alt="image" src="https://github.com/user-attachments/assets/2da5e78e-4ae1-416d-bf70-6662ec64fef0" />
<img width="864" height="438" alt="image" src="https://github.com/user-attachments/assets/9c4386dc-612c-4be3-9c80-ec70f2606be4" />
<img width="869" height="414" alt="image" src="https://github.com/user-attachments/assets/dd767550-81bb-4088-8324-1daaa2ae60ac" />
<img width="869" height="357" alt="image" src="https://github.com/user-attachments/assets/e99d035f-51ae-489e-a456-71a07a7b8fce" />
<img width="867" height="433" alt="image" src="https://github.com/user-attachments/assets/46c1e3d6-d44b-4414-9a12-16506c9aa01b" />
<img width="879" height="451" alt="image" src="https://github.com/user-attachments/assets/5ddfa5d8-2ba0-4ca3-aced-e4e47aaf6131" />
<img width="868" height="455" alt="image" src="https://github.com/user-attachments/assets/cb3456df-6155-4167-b4e5-eb86f56dcb75" />
<img width="873" height="462" alt="image" src="https://github.com/user-attachments/assets/98dfac14-70fc-45bb-927e-97b9bbe41e99" />
<img width="869" height="432" alt="image" src="https://github.com/user-attachments/assets/b0f9261c-29d1-4165-9d68-1029ca94e9a6" />

## 🔮 Future Work
- Expand to more cities in Pakistan  
- Add restaurant recommendations  
- Improve chatbot conversational abilities with advanced NLP  
- Hybrid recommendation model for better accuracy  

---

# 🎬 MovieMood

A full-stack **AI-powered movie recommendation platform** that provides personalized movie suggestions based on user preferences, interactions, and review sentiment.

The system combines **Angular**, **Spring Boot**, **Python/FastAPI**, and **Machine Learning** with an event-driven architecture using **Apache Kafka** and **Redis** caching.

---

## ✨ Key Features

* 🎯 **Personalized Recommendations**

  * Generates movie recommendations based on user preferences and interaction history.
  * Uses a **K-Nearest Neighbors (KNN)** machine learning model.

* 💬 **Sentiment Analysis**

  * Analyzes user reviews.
  * Classifies reviews as **positive or negative**.
  * Uses review sentiment as an additional signal for recommendations.

* ⚡ **Event-Driven Architecture**

  * Uses **Apache Kafka** to asynchronously process user interactions.
  * Decouples the main backend from the recommendation engine.

* 🚀 **Redis Caching**

  * Stores frequently accessed user preference data.
  * Reduces database access and improves recommendation response times.

* 🔐 **JWT Authentication**

  * Secures API endpoints using JSON Web Tokens.
  * Supports authenticated user interactions.

* 🌐 **Full-Stack Architecture**

  * Angular-based user interface.
  * Spring Boot REST API.
  * Dedicated Python/FastAPI recommendation service.

---

## 🏗️ System Architecture

The application is composed of three main services:

```text
                        ┌─────────────────────┐
                        │    Angular Client   │
                        │      Frontend       │
                        └──────────┬──────────┘
                                   │
                                   │ REST API
                                   ▼
                        ┌─────────────────────┐
                        │    Spring Boot      │
                        │      Backend        │
                        │                     │
                        │ • Authentication    │
                        │ • REST APIs         │
                        │ • Business Logic    │
                        └───────┬─────┬───────┘
                                │     │
                    Events      │     │ Database
                                │     ▼
                                │  ┌─────────┐
                                │  │  MySQL  │
                                │  └─────────┘
                                │
                                ▼
                        ┌─────────────────────┐
                        │   Apache Kafka      │
                        │   Event Streaming   │
                        └──────────┬──────────┘
                                   │
                                   │ Events
                                   ▼
                        ┌─────────────────────┐
                        │ Python / FastAPI    │
                        │ Recommendation      │
                        │ Engine              │
                        │                     │
                        │ • KNN Model         │
                        │ • Sentiment Analysis│
                        │ • Preference Update │
                        └──────────┬──────────┘
                                   │
                                   ▼
                        ┌─────────────────────┐
                        │       Redis         │
                        │   User Preferences  │
                        │       Cache         │
                        └─────────────────────┘
```

### Components

#### 1. Angular Frontend

The Angular application provides the user interface for:

* Browsing movies
* Rating and liking movies
* Writing reviews
* Viewing personalized recommendations
* Managing user interactions

#### 2. Spring Boot Backend

The Spring Boot service acts as the main backend and API layer.

Responsibilities include:

* User authentication and authorization
* JWT token management
* Movie and user APIs
* Managing user interactions
* Persisting application data
* Publishing events to Kafka
* Communication with the recommendation service

#### 3. Python / FastAPI Recommendation Engine

The recommendation service is responsible for the machine learning workload.

It handles:

* Consuming user interaction events
* Updating user preference data
* Running the KNN recommendation model
* Generating personalized recommendations
* Performing sentiment analysis on reviews

#### 4. Apache Kafka

Kafka provides communication between the Spring Boot backend and the recommendation engine.

Instead of synchronously processing every user interaction, the backend publishes events such as:

```text
USER_LIKED_MOVIE
USER_RATED_MOVIE
USER_REVIEWED_MOVIE
```

The recommendation service consumes these events asynchronously.

#### 5. Redis

Redis is used as a high-performance cache for user preference data.

Example:

```text
User
 │
 ├── Favorite Genres
 ├── Rated Movies
 ├── Liked Movies
 └── Preference Scores
```

This allows the recommendation engine to access frequently used preference data without repeatedly querying MySQL.

#### 6. MySQL

MySQL is used as the primary persistent database for application data, including:

* Users
* Movies
* Ratings
* Reviews
* User interactions
* Application-related data

---

## 🔄 How It Works

### 1. User Interaction

A user interacts with the application by:

* Rating a movie
* Liking a movie
* Writing a review
* Browsing movies

### 2. Backend Processing

The Angular frontend sends the interaction to the Spring Boot API.

```text
Angular
   │
   ▼
Spring Boot API
```

The backend validates the request and persists the required information.

### 3. Event Publishing

The backend publishes an event to Kafka.

```text
Spring Boot
     │
     ▼
Apache Kafka
     │
     ▼
User Interaction Event
```

### 4. Preference Processing

The Python recommendation service consumes the event and updates the user's preference profile in Redis.

```text
Kafka
  │
  ▼
FastAPI
  │
  ▼
Redis
```

### 5. Recommendation Generation

The recommendation engine uses the user's preference profile and the **KNN model** to identify movies that are similar to the user's interests.

```text
User Preferences
       │
       ▼
   KNN Model
       │
       ▼
Recommended Movies
```

### 6. Sentiment Analysis

When a user submits a review, the system analyzes its sentiment.

```text
Movie Review
     │
     ▼
Sentiment Analysis
     │
     ├── Positive
     │
     └── Negative
```

The resulting sentiment can be used as an additional signal when building the user's preference profile.

---

## 🤖 Machine Learning

### KNN Recommendation Model

The recommendation engine uses a **K-Nearest Neighbors (KNN)** model to identify movies that are similar to the user's preferences.

The model can leverage information such as:

* Movie genres
* User ratings
* User likes
* Interaction history
* Preference scores

Conceptually:

```text
User Profile
     │
     ▼
Feature Representation
     │
     ▼
KNN Similarity Search
     │
     ▼
Nearest Movies
     │
     ▼
Personalized Recommendations
```

### Sentiment Analysis

The platform also processes textual movie reviews using a machine learning-based sentiment classifier.

For example:

```text
"This movie was amazing!"
          ↓
       Positive
```

```text
"The story was boring."
          ↓
       Negative
```

This information can complement explicit ratings when determining user preferences.

---

## 🛠️ Technology Stack

| Layer                    | Technology                          |
| ------------------------ | ----------------------------------- |
| Frontend                 | Angular                             |
| Backend                  | Java / Spring Boot                  |
| Recommendation Engine    | Python / FastAPI                    |
| Recommendation Algorithm | K-Nearest Neighbors (KNN)           |
| Sentiment Analysis       | Machine Learning                    |
| Event Streaming          | Apache Kafka                        |
| Cache                    | Redis                               |
| Database                 | MySQL                               |
| Authentication           | JWT                                 |
| API                      | REST                                |
| Architecture             | Event-Driven / Distributed Services |

---

## 🔐 Authentication

The application uses **JWT-based authentication**.

The authentication flow is:

```text
User
 │
 ▼
Login
 │
 ▼
Spring Boot
 │
 ▼
JWT Token
 │
 ▼
Angular
 │
 ▼
Authenticated API Requests
```

Protected endpoints require a valid JWT token.

---

## ⚡ Performance

Several architectural decisions are used to improve application performance:

### Redis

Frequently accessed user preference data is cached in Redis to reduce repeated database queries.

### Kafka

User interactions are processed asynchronously through Kafka, reducing coupling between the main backend and recommendation engine.

### Dedicated Recommendation Service

Machine learning workloads are isolated from the main Spring Boot application, allowing the recommendation engine to evolve independently.

---

## 🔌 Example Event Flow

When a user rates a movie:

```text
┌──────────────┐
│    Angular   │
└──────┬───────┘
       │
       │ POST /ratings
       ▼
┌──────────────┐
│ Spring Boot  │
└──────┬───────┘
       │
       │ Publish Event
       ▼
┌──────────────┐
│    Kafka     │
└──────┬───────┘
       │
       │ Consume Event
       ▼
┌──────────────┐
│   FastAPI    │
└──────┬───────┘
       │
       │ Update Preferences
       ▼
┌──────────────┐
│    Redis     │
└──────┬───────┘
       │
       │ Generate Recommendation
       ▼
┌──────────────┐
│   KNN Model  │
└──────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

* Java
* Maven
* Node.js
* Angular CLI
* Python 3.x
* MySQL
* Redis
* Apache Kafka

Optional:

* Docker
* Docker Compose

### Clone the Repository

```bash
git clone <repository-url>

cd movie-recommendation-system
```

### Start Infrastructure

If Docker Compose is configured:

```bash
docker compose up -d
```

This can be used to start the required infrastructure services such as:

* MySQL
* Redis
* Kafka

### Start the Backend

```bash
cd backend

./mvnw spring-boot:run
```

### Start the Recommendation Engine

```bash
cd recommendation-engine

python -m venv venv

source venv/bin/activate

pip install -r requirements.txt

uvicorn main:app --reload
```

For Windows:

```bash
venv\Scripts\activate
```

### Start the Angular Application

```bash
cd frontend

npm install

ng serve
```

The application should then be available at:

```text
http://localhost:4200
```

---

## 📡 API Architecture

The application follows a REST-based API architecture.

Example endpoints:

```text
POST   /api/auth/login
POST   /api/auth/register

GET    /api/movies
GET    /api/movies/{id}

POST   /api/movies/{id}/rate
POST   /api/movies/{id}/like
POST   /api/movies/{id}/reviews

GET    /api/recommendations
```

> The exact endpoints may vary depending on the current implementation.

---

## 📈 Future Improvements

Potential improvements include:

* [ ] Collaborative filtering
* [ ] Hybrid recommendation algorithms
* [ ] Improved NLP-based sentiment analysis
* [ ] More advanced LLM-based movie analysis
* [ ] Real-time recommendation updates
* [ ] Recommendation explanations
* [ ] Model monitoring and evaluation
* [ ] A/B testing for recommendation strategies
* [ ] Containerized deployment
* [ ] Kubernetes deployment
* [ ] Automated CI/CD pipeline
* [ ] Recommendation analytics dashboard

---

## 💡 What This Project Demonstrates

This project demonstrates practical experience with:

* Full-stack application development
* REST API design
* Microservice-style service separation
* Event-driven architecture
* Apache Kafka
* Redis caching
* Machine Learning integration
* Recommendation systems
* Sentiment analysis
* JWT authentication
* Python/FastAPI
* Java/Spring Boot
* Angular
* MySQL

It also demonstrates how **AI/ML components can be integrated into a production-oriented backend architecture rather than being developed as an isolated machine learning experiment.**

---

## 🤝 Contributing

Contributions are welcome!

To contribute:

1. Fork the repository.
2. Create a feature branch.

```bash
git checkout -b feature/my-feature
```

3. Commit your changes.

```bash
git commit -m "feat: add my feature"
```

4. Push the branch.

```bash
git push origin feature/my-feature
```

5. Open a Pull Request.

---

## 👨‍💻 Author

**Mohamed EL AFIA**

Software Engineer | AI/ML | Backend | Cloud-Native

---

⭐ If you find this project useful, consider giving the repository a star!
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

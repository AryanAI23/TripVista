# 🌍 TripVista — Smart Travel Planner

> **Your Journey Starts Here. ✈️**

TripVista is a modern and responsive **travel planning website** that helps users create personalized travel plans based on their destination, dates, travel group, budget, accommodation, transportation, and preferred experiences.

This project is built using **HTML, CSS, and JavaScript** and currently works as a front-end MVP with a rule-based itinerary and budget calculation system.

---

## ✨ Features

* 🌍 Destination selection
* 📅 Travel date and duration calculation
* 👨‍👩‍👧 Family travel planning
* ❤️ Couple travel planning
* 👯 Friends travel planning
* 🎒 Solo travel planning
* 💰 Budget estimation
* 🏨 Accommodation selection
* 🚆 Transportation selection
* 🧗 Experience selection
* ❤️ Romantic activity options for couples
* 📊 Estimated trip cost
* 👤 Per-person cost calculation
* 📆 Daily travel itinerary
* 💾 Save trip using LocalStorage
* 📤 Share trip
* 📥 Download travel plan
* 🌙 Light/Dark theme
* 📱 Responsive mobile design
* 🍞 Toast notifications
* 📩 Contact form
* 📱 Mobile navigation menu

---

## 🛠️ Technologies Used

| Technology            | Purpose                             |
| --------------------- | ----------------------------------- |
| HTML5                 | Website structure                   |
| CSS3                  | Styling and responsive design       |
| JavaScript            | Interactivity and trip calculations |
| LocalStorage          | Saving trip plans                   |
| Unsplash              | Destination images                  |
| Browser Web Share API | Sharing trip plans                  |

---

## 📂 Project Structure

```text
TripVista/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

### `index.html`

Contains the complete website structure, including:

* Navigation bar
* Hero section
* Trip planner
* Destination cards
* Experience section
* About section
* Contact form
* Footer

### `style.css`

Contains:

* Website layout
* Colors
* Typography
* Cards
* Buttons
* Forms
* Animations
* Responsive design
* Dark/light theme styling

### `script.js`

Contains the website functionality:

* Multi-step trip planner
* Date calculation
* Travel type selection
* Experience selection
* Budget calculation
* Itinerary generation
* Save trip
* Share trip
* Download plan
* Theme switching
* Mobile menu
* Contact form handling

---

## 🚀 How to Run

### 1. Clone the repository

```bash
git clone https://github.com/your-username/tripvista.git
```

### 2. Open the project

```bash
cd tripvista
```

### 3. Run the website

Open:

```text
index.html
```

in your browser.

No backend or installation is currently required.

---

## 🧭 How Trip Planning Works

The planner uses a simple multi-step process:

```text
Destination
     ↓
Travel Dates
     ↓
Travel Type
     ↓
Stay & Transport
     ↓
Experiences
     ↓
Generate Trip
     ↓
Itinerary + Budget
```

The user provides their preferences and TripVista generates a demo itinerary and estimated travel cost.

---

## 💰 Budget Calculation

The current MVP estimates the trip cost using:

```text
Accommodation
+
Food
+
Transportation
+
Activities
+
Sightseeing
+
8% Buffer
=
Estimated Total
```

The website also displays:

* Total estimated cost
* Cost per person
* Cost per day
* Accommodation cost
* Transportation cost
* Activity cost
* Budget status

---

## 🗺️ Destinations

The current website includes destination inspiration such as:

* 🇮🇳 Goa
* 🇮🇳 Kerala
* 🇮🇳 Manali
* 🇮🇳 Jaipur
* 🇲🇻 Maldives
* 🇮🇩 Bali

Users can also enter their own destination in the planner.

---

## 🎯 Future Improvements

TripVista can be expanded into a complete AI-powered travel platform.

### 🤖 AI Travel Assistant

Integrate an AI API to generate more personalized itineraries based on:

* Travel preferences
* Interests
* Budget
* Weather
* Trip duration
* Traveler type

### 🗺️ Real Maps

Integrate a maps API for:

* Routes
* Distance calculation
* Nearby attractions
* Restaurants
* Hotels
* Navigation

### 🏨 Hotel Integration

Add real-time hotel search with:

* Hotel availability
* Prices
* Ratings
* Reviews
* Booking links

### ✈️ Flight & Train Search

Add real-time transportation information and pricing.

### 🌦️ Weather Integration

Show destination weather forecasts during trip planning.

### 👤 User Accounts

Add authentication so users can:

* Create accounts
* Save multiple trips
* Edit trips
* View previous trips

### 🗄️ Backend

A backend can be added using technologies such as:

```text
Python
FastAPI / Flask
Database
REST API
```

---

## 📱 Responsive Design

TripVista is designed to work across:

* 💻 Desktop
* 💻 Laptop
* 📱 Mobile
* 📲 Tablet

The layout automatically adapts to different screen sizes.

---

## 🎨 UI Design

TripVista uses a modern travel-focused interface with:

* Glassmorphism cards
* Gradient buttons
* Dark theme
* Light theme
* Smooth scrolling
* Animated elements
* Responsive layouts

---

## 🔐 Current Project Status

**Status:** 🚧 Front-End MVP

The current version uses a **rule-based recommendation system** and demo cost calculations.

It does not yet connect to real:

* Hotel APIs
* Flight APIs
* Maps APIs
* Weather APIs
* AI APIs
* Booking systems
* Backend databases

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch

```bash
git checkout -b feature/new-feature
```

3. Make your changes
4. Commit your changes

```bash
git commit -m "Add new feature"
```

5. Push the branch

```bash
git push origin feature/new-feature
```

6. Open a Pull Request

---

## 📄 License

This project is created for **educational and portfolio purposes**.

---

## 👨‍💻 Developer

**Aryan Mujawar**

B.Tech — Artificial Intelligence & Machine Learning

---

## ⭐ Support

If you like this project, consider giving the repository a ⭐ on GitHub!

---

### 🌍 TripVista

**Plan the journey. Live the moment. ✈️**

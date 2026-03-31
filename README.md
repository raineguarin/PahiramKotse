# Car Rental Website

**PahiramKotse** is a web application that allows customers to easily rent a car online, and company administrators to manage reservations more conveniently.

## Project Information

**Course:** GDAPDEV: Web Application Development  
**Academic Year:** 2025-2026, Term 2  
**Institution:** De La Salle University  
**Current Status:** Deployed via Vercel

## Team Members

- **CHING, Ashton Jude**
- **GUARIN, Raine Louise**
- **GUTIERREZ, Michael Luis**
- **VILLAMOR, Allysa Luise**
  
## Project Overview
**PahiramKotse** is a web application designed for easy car rentals. Keeping track of large amounts of data such as car information and user information can be quite tasking. This application aims to address this issue for customers through the easy-to-understand user interface, where information they need is easily accessible and navigable. Administrators can also easily manipulate data through its features.

## Features
- User Account (Registration, Log-in, Log-out, Delete)
- User Profile (Edit)
- Vehicle Profile (View, Edit)
- Customer Actions (Reservation, View, Search, Edit)
- Admin Actions (Reservation, View, Search, Edit, Cancellation)
- License verification

## Technology Stack
**Frontend**: HTML, CSS, Javascript

**Backend**: Handlebars

**Database**: MongoDB

**Architecture**: Model-View-Controller design

**Deployment**: Deployed via Vercel

## Current Status
The website is fully deployed.

### Getting Started

## Prerequisite Downloads
- Node.js
- Packages: Express Handlebars, Express Session, Multer, Bcrypt, Dotenv
- MongoDB

## Local Setup Instructions
1. Clone the repository

   ```
   git clone "https://github.com/raineguarin/GDAPDEV-MCO"
   
   cd GDAPDEV-MCO
   ```
2. Set up the database
   - Via MongoDB Compass IDE:
       1. Create a new connection
       2. Paste this URI:
       ```mongodb+srv://PahiramKoAdmin:Group4Apdev@pahiramkotse.g6rovco.mongodb.net/pahiramKotseDB?retryWrites=true&w=majority```
       3. Press **Save and Connect**
    
   - Via MongoDB Atlas:
       - MongoDB Admin Credentials
         - User: PahiramKoAdmin
         - Password: Group4Apdev

3. Install Handlebars, Session, and Multer via Node.js in the terminal (make sure it is in the repository)

   ```
   npm install express express-handlebars
   npm install express-session
   npm install multer
   npm install bcrypt
   npm install dotenv
   ```
5. Start the server using the following command

   ```node app.js```

## Deployment Instructions
Prerequisites:
  - MongoDB Atlas cluster is active
  - MongoDB Atlas IP 0.0.0.0/0 is whitelisted
  - Node.js version is 22.22.2

Setup on Vercel:
  1. Add a new Project on Vercel
  2. Connect to Github and search for the "PahiramKotse" repository
  3. Configure the framework to "Express" and the root directory to "./"
  4. Configure the Environment Variables by uploading the .env file in the repository

## Current Repository Structure

```GDAPDEV-MCO/
├── assets/                               # Static files (CSS & Media)
│   ├── images/                           # Asset images
│   │   ├── ford.avif
│   │   ├── logo.png
│   │   ├── profilepicture.png
│   │   ├── sedan.png
│   │   └── suv.png
│   ├── cars.css
│   ├── contact-us.css
│   ├── friends.css
│   ├── global.css
│   ├── homepage.css
│   ├── manage-reservations.css
│   ├── manage-users.css
│   ├── manage-vehicles.css
│   ├── profile.css
│   ├── register.css
│   ├── reservations.css
│   └── search.css
├── js/                                   # Client-side logic
│   ├── cars.js
│   ├── friends.js
│   ├── manage-reservations.js
│   ├── manage-users.js
│   ├── profile.js
│   ├── register.js
│   └── reserve-cars.js
├── model/                                # Mongoose Schemas
│   ├── reservation.js
│   ├── user.js
│   └── vehicle.js
├── routes/                               # Express Router logic
│   ├── customer.js
│   ├── index.js
│   ├── reservation.js
│   ├── user.js
│   └── vehicle.js
├── views/                                # Handlebars templates
│   ├── admin-homepage.hbs
│   ├── admin-profile.hbs
│   ├── cars.hbs
│   ├── contact-us.hbs
│   ├── friends.hbs
│   ├── homepage.hbs
│   ├── login.hbs
│   ├── manage-reservations.hbs
│   ├── manage-users.hbs
│   ├── manage-vehicles.hbs
│   ├── profile.hbs
│   ├── register.hbs
│   ├── reservations.hbs
│   ├── reserve-car.hbs
│   └── search.hbs
├── .env                                  # Environment Variables
├── .gitignore                            
├── app.js                                # Main entry point
├── LICENSE                               
├── package.json                          
├── package-lock.json
├── README.md                             # Project documentation                  
└── vercel.json
```



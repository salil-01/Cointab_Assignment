# Bulk Data Management App

It is a full-stack web application built with React Js, Chakra UI, Node.js, Express, and MySQL.
The app fetches data from a REST API, processes it, and stores it in a MySQL database.
It provides functionality to delete all stored data and display stored data in a tabular format with filtering based on the country.

## Table of Contents

- [Video Walkthrough](#video-walkthrough)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [APIs Used](#apis-used)
- [API Endpoints](#api-endpoints)

## Video Walkthrough
https://github.com/salil-01/Cointab_Assignment/assets/115460357/aaad4f38-a3f7-40dc-b489-4797b6159be2

## Features

- Fetches data from a REST API in bulk and stores it in a MySQL database.
- Deletes all stored data from the database in a single click.
- Displays stored data in a tabular format with filtering based on the country.

## Technologies Used

- Frontend:
  - React Js
  - Chakra UI

- Backend:
  - Node.js
  - Express
  - MySQL

## Getting Started

### Prerequisites
- Node.js and npm (Node Package Manager) installed on your machine.
- MySQL database set up.

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/salil-01/Cointab_Assignment
   cd Cointab_Assignment
   ```

2. Install frontend dependencies:
   ```sh
   cd frontend
   npm install
   ```

3. Install backend dependencies:
   ```sh
   cd backend
   npm install
   ```

## Configuration

1. Configure MySQL database connection in the `backend/config/db.js` file.

## Usage
1. Start the backend server:
   ```sh
   cd backend
   npm start
   ```

2. Start the frontend development server:
   ```sh
   cd frontend
   npm start
   ```

3. Open the app in your browser at [http://127.0.0.1:5173/](http://127.0.0.1:5173/)

4. Click the "Fetch Data" button to fetch data from the REST API and store it in the database.

5. Click the "Delete Data" button to delete all stored data from the database.

6. Click the "Show User Details" button to see all stored data in a table format.

7. Use the country filter to narrow down the displayed data.

## APIs Used
- [https://randomuser.me/api/?results=50](https://randomuser.me/api) is used to fetch data in bulk.

## API Endpoints
GET /api/user - retrieve all users stored in database
POST /api/user - to store bulk data in database
DELETE /api/user - to delete all users stored in database


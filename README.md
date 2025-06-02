Bus Booking System

A production-grade backend API for a bus booking system built with Node.js, Express, PostgreSQL, and Razorpay for payment integration. Features include user authentication, seat booking with gender-based constraints, payment processing with seat blocking, and an admin panel for managing bus operators.

Features





User Authentication: Sign up and sign in with JWT-based authentication.



Seat Booking: Book seats with a constraint preventing opposite genders from booking adjacent seats for different users.



Payment Processing: Seats are blocked for 6 minutes during payment; successful payments confirm bookings, failed payments unblock seats.



Admin Panel: Manage bus operators and support roles (admin, support, operator).



Logging: Winston-based logging to the terminal for debugging.

Tech Stack





Node.js with Express



PostgreSQL with Sequelize



Razorpay for payments



JWT for authentication



Winston for terminal logging
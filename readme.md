# Application name

Natours

# Application description

Natours is a MERN stack application meant to act as a tour booking platform. It is based off two projects developed by Jonas Schmedtmann for his courses: Advanced CSS and Sass: Flexbox, Grid, Animations, and More!, and Node.js, Express, MongoDB & More: The Complete Bootcamp 2020. Both projects were combined and expanded upon to create Natours. Changing from pure Node.js server side rendering, I modified the project to instead utilize React and Redux for client side rendering, updating the amount of client features available. These include adding an email form on the landing page, adding a form to add reviews on each individual tour page, adding pages for admin only priveleges such as modifying both users and reviews, as well as an extensive form to add tours with a variable number of dates, locations, and tour guides.

# Application features

1. JSON Web Token based authentication

- Users can register accounts and log in to use the site's functionality
- Inputs require authentication of criteria such as emails being unique
- Users can request an email to reset their password if they've forgotten
- Users can update their account and their passwords
- Users can update their profile photo (feature not available in production as uploaded photos are only generated on the development machine, and not stored in any database)
- Passwords undergo encryption when stored in the database by utilizing bcryptjs

2. Write and edit reviews

- On each individual tour page, users can write a review with a rating for that specific tour

3. Mapbox integration

- Each tour page has a map to display locations visited throughout the tour

4. Process payments

- Utilizing Stripe Webhooks, users can book individual tours
- Booked tours can be deleted

5. Admin functionality

- Users who have the admin role associated with their back end document have expanded features on the client side
- New pages are available to delete users, delete reviews, and create new tours (feature not available in production as uploaded photos are only generated on the development machine, and not stored in any database)

# Built with

- Sass - Style sheet language used for responsive layout
- React - Client side framework used
- Redux - Client side state management
- Node.js - Back end runtime environment used
- Express - Back end framework used to build RESTful API
- MongoDB - Database used
- Mongoose - Object data modeling library for MongoDB

# Authors

Victoria Kastanenka

# Acknowledgments

Jonas Schmedtmann

- Project concept and features

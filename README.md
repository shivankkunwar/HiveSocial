# HiveSocial -  Social Media Web App

This project is a small Social Media Web App functional UI  developed using React JS, TypeScript, and Ant Design libraries. The key features of this application include user authentication, post creation/viewing, liking and bookmarking posts, commenting on posts, editing/deleting self-posts and self-comments, and updating profile details.

## Features

### Authentication Login/ Sign up page

- UI of Both Login and Signup form - Complete form validation.
-A dummy sign Account is available as a backend mimicking Mock data 
- `Email: test@test.com`
- `Password: password`
- A Modal pops up for success and failure of the Signin and Buttons - Design Principle
  
  

### Home page
- Users can see posts they created and others on the timeline.
- Users can create new posts with textual content.
- Posts created by the user can be viewed on the 'My Posts' page.
- Users can like and bookmark any post.
- Users can edit or delete their own posts.

### Likes and Bookmarks pages
- user is able to see the posts they have liked. 
- user is able to see the posts they have bookmarked.

### My posts
- User is able to see all the posts created by the user
- Each post is a row in a table, The row have an expandable option to show the comments for that post.
  
### Comments

- Users can comment on any post.
- Users can edit or delete their own comments.

### User Profile

- Users can view and edit their profile details on the 'My Profile' page.

## Tech Stack

- React v17+
- TypeScript
- Ant Design v5+
- Ant Design Pro v5+
- Ant Pro Table!
- Capacitor.js

## CI/CD
[Check my github actions](https://github.com/shivankkunwar/HiveSocial/actions/)
- GitHub Actions were used for CI/CD operations.
- JS Linting was done using eslint.
- CSS Linting was done using stylelint.



## Testing

- Jest  tests have been written to ensure robustness and reliability.
- 
-![](https://github.com/shivankkunwar/HiveSocial/assets/66783424/3fc1b89e-ba4d-4bf8-a73a-b9e53011a8be)
-

## How to run the project

1. Clone the repository: `git clone https://github.com/shivankkunwar/HiveSocial.git`
2. Navigate to the project directory: `cd HiveSocial`
3. Install the dependencies: `npm install`
4. Start the app: `npm run dev`



## Deployment

The application is deployed on [Hive Social online](https://hive-social.vercel.app/).




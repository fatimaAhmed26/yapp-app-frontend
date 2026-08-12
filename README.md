Yapp — Frontend
The React client for the Yapp social media app.
￼![alt text](yapp-img.png)
Getting Started
* Deployed App: 
* Backend Repo: https://github.com/fatimaAhmed26/yapp-app-backend.git 
* Planning Materials / Trello Board: https://trello.com/b/Q4O9XAwW/social-media-app 
Description
Yapp lets users sign up, build a profile, and share posts with text, images, or videos. Users can follow other members, like and comment on posts, and manage their own content — all wrapped in a fully responsive UI with light and dark mode support.
Features
* Authentication — sign up, sign in, and sign out
* Feed — browse all posts with owner info, media, and like counts
* Posts — create, edit, and delete your own posts with optional image/video upload
* Likes — like/unlike posts with a live count
* Comments — add and delete comments on a post, with author attribution
* Follow system — follow/unfollow users, view followers/following lists
* Profiles — view any user's profile and posts; edit your own profile or delete your account
* Authorization guards — edit/delete actions are hidden and blocked for non-owners
* Dark mode — app-wide theme toggle using CSS custom properties
Technologies Used
* React
* React Router
* Heroicons
* CSS (custom properties for theming/dark mode)
* Vite
Pages & Components
* App.jsx — holds shared state (posts, user, dark mode) and routing
* Nav.jsx — sticky sidebar navigation
* Landing / SignUpForm / SignInForm — auth pages
* Dashboard — signed-in home page
* PostList.jsx — main feed
* PostDetails.jsx — single post view with comments
* PostForm.jsx — create/edit post form
* Profile.jsx — user profile page with their posts
* EditProfile.jsx — edit/delete account
* UserList.jsx — followers/following list
* CommentForm.jsx / CommentList.jsx — comment creation and display
Environment Variables
Create a .env file in the root with:
VITE_BACK_END_SERVER_URL=http://localhost:3000
Installation
npm install
npm run dev
Next Steps
* Add pagination/infinite scroll to the feed
* Add notifications for likes, comments, and new followers
* Add reply threads for comments
* Add image cropping/preview before upload
* Improve accessibility (ARIA labels, keyboard navigation)
Attributions
* Heroicons for UI icons

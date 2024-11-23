
# Magic Pages


![Logo](https://i.ibb.co/XyRxQW9/magic-pages-logo.png")


Dive into the world of AI-powered storytelling!

This Next.js application offers a fun and interactive experience for kids, where they can generate creative stories with the help of AI.

### Key Features

1. Intuitive Interface: 
User-friendly design for easy navigation.

2. AI-Powered Story Generation:
AI-Powered Story Generation:

3. Interactive Elements: 
Enhance the storytelling experience with engaging features.

4. TypeScript:
Strong typing for robust and maintainable code.


## Installation
Create a new .env.local file and add your keys in the following manner:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_DATABASE_URL=""
NEXT_PUBLIC_GEMINI_API_KEY=
NEXT_PUBLIC_CREATE_STORY_PROMPT=create kids story (in Hebrew language) on description for {ageGroup} kids, {storyType} story, and all images in {imageStyle} style: {storySubject}, give me 5 chapters, with detailed image text prompt for each of chapter and image prompt for story cover book with story name, all in JSON field format
REPLICATE_API_KEY=
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_PAYPAL_CLIENT_ID=

```

1. Clone the Repository


2. Install Dependencies:

```
cd magic-pages
npm install
```

3. Start the Development Server:

```
npm run dev
```

## Screenshots

![App Screenshot](https://i.ibb.co/XZdMJtf/HomePage.png)

![App Screenshot](https://i.ibb.co/vwHHHwX/Create-Story.png)

![App Screenshot](https://i.ibb.co/jTFHD6V/Explore.png)

![App Screenshot](https://i.ibb.co/TPqtyrc/Story-Example.png)


## Author

- [@MaorAtar](https://github.com/MaorAtar)
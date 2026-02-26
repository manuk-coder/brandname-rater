# Brand Name Rater

A mobile-first web application designed for users to quickly rate brand names based on sequential image assets. Data is stored directly to Firebase Firestore, and the list of available assets is read using a Vercel Serverless Function.

**Live Deployment:** [https://brandname-psi.vercel.app/](https://brandname-psi.vercel.app/)

## Prerequisites
- Node.js installed locally.
- A Firebase Project (for the Firestore database).
- A Vercel account (optional, for deployment).

## Setup Instructions

### 1. Firebase Preparation
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Create or select a project.
3. Click "Build -> Firestore Database" and create a database (Start in "production mode" or "test mode").
4. Go to the "Rules" tab for Firestore and replace them with this to allow public writes but keep it relatively secure if you don't require Authentication:
   ```json
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /name_ratings/{nameId} {
         allow read: if true;
         allow write: if true; 
       }
     }
   }
   ```
5. Click the Gear icon ⚙️ -> Project Settings -> General.
6. Scroll down to "Your apps". If you haven't added a Web App, click the `</>` icon to add one.
7. Note the `firebaseConfig` object presented to you.

### 2. Local Environment
1. Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Paste the `firebaseConfig` properties you just acquired into `.env`.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the local development server:
   ```bash
   npm run dev
   ```
5. The local app runs at `http://localhost:3000`. 
6. Type exactly **`start`** to run normally, or **`admin0`** to view aggregate ratings and skip controls.
7. **Asset Management:** For detailed instructions on how to structure and name the brand images in the `assets/` folder and the intro video in `intro_video/intro.mp4`, please refer to `instructions.md`.

### 3. Deployment to Vercel
1. Initialise git:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```
2. Push your code to a new repository on GitHub.
3. Go to [Vercel](https://vercel.com/) and click "Add New... -> Project".
4. Import your GitHub repository.
5. In the **Environment Variables** section of the Vercel deployment wizard, add EVERY variable listed in your `.env` file (e.g. `FIREBASE_API_KEY`, etc.).
6. Click Deploy.

## File Structure
- `index.html`: The monolithic front-end, styling, and Firebase logic.
- `assets/`: Folder holding the `.png` files. Review `instructions.md` for naming conventions.
- `intro_video/`: Folder containing `intro.mp4`. Review `instructions.md`.
- `api/`: Vercel Serverless Functions (`images.js` and `config.js`).
- `dev-server.js`: Development server mimicking Vercel for local testing.

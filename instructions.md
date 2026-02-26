# Asset Management Instructions

This document explains how to update the images and the introduction video for the Brand Rater application.

## 1. Updating the Introduction Video
The application features a cinematic introduction video on the "Let's set the stage" screen. 

To replace this video:
1. Locate the `intro_video` folder in the root directory.
2. Replace the existing file with your new video.
3. **CRITICAL:** Your new video file **must** be named exactly `intro.mp4`.
4. The application strictly looks for `intro_video/intro.mp4`. If the filename or extension differs, the video will not load.

## 2. Updating the Brand Images
The application dynamically reads all images placed inside the `assets/` directory to create the rating flow. 

To add or change the brands being rated:
1. Place your transparent PNG image files into the `assets/` folder.
2. **Naming Convention:** Every image filename **MUST** start with the exact string `name`. 
3. After `name`, append a **3-character unique identifier** for that specific brand.
4. The file extension must be `.png`.

**Examples of valid filenames:**
- `nameABC.png` (Database will track this as ID: `ABC`)
- `nameXYZ.png` (Database will track this as ID: `XYZ`)
- `name001.png` (Database will track this as ID: `001`)

**How it works inside the database:**
When a user submits a rating for `nameABC.png`, the application strips away the `name` prefix and the `.png` extension. It then saves the rating to the Firebase Firestore database under the document ID `ABC`.

If you do not follow this naming convention, the application will not be able to correctly associate the image with its corresponding database record.

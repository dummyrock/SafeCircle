# SafeCircle
SafeCircle – Personal Safety App

SafeCircle is a personal safety application designed to give users instant access to help in emergency situations. The app combines location tracking, real-time alerts, and ambient noise detection to provide an enhanced safety network for its users.

This README explains in detail how each feature works, the user workflow, the technical setup, and potential future enhancements.

Features
1. Help Button

Description: The core feature of the app is the Help button. When a user feels unsafe or encounters an emergency, pressing this button immediately triggers an alert.

How it works:

Frontend: When the button is pressed, the app sends a POST request to the backend API with the user's current location, user ID, and a timestamp.

Backend: Receives the request, logs it, and pushes notifications to predefined contacts (like friends, family, or local authorities).

User Experience:

Pressing the button gives instant visual feedback (“Help request sent”).

Users can optionally cancel the request within a few seconds to prevent accidental alerts.

2. Map Location Selector

Description: SafeCircle integrates a map view allowing users to confirm or manually select their exact location.

How it works:

The map is rendered using a mapping library (like Google Maps or Leaflet).

When opening the Help button workflow, the app retrieves the device’s geolocation.

Users can drag a pin or tap on the map to fine-tune their location, ensuring accurate positioning.

Technical Details:

The frontend captures latitude and longitude coordinates.

Coordinates are sent along with the Help request to the backend.

Backend stores this data for alert notifications and historical tracking.

3. Noise Detection

Description: In addition to location, SafeCircle captures ambient noise if the user is in distress.

How it works:

When Help is triggered, the app begins recording short audio clips in the background.

These audio clips are sent to the backend as part of the alert payload.

Backend can process or store the audio for verification of real emergencies.

User Experience:

Recording starts automatically with the Help button press.

Users are notified that noise detection is active.

Recording stops once the alert is completed or canceled.

4. Backend Integration

SafeCircle Backend manages:

Storing user data and emergency logs.

Pushing real-time alerts to contacts via SMS, email, or push notifications.

Processing audio data to flag possible emergencies.

Logging geolocation and timestamps for each Help event.

API Endpoints:

POST /help – Trigger a Help request.

GET /locations/:userId – Fetch historical alerts.

POST /audio – Upload noise recordings during emergencies.

5. Frontend Integration

Components:

HelpButton – triggers help and audio recording.

MapSelector – displays the map and captures location.

AudioCapture – records ambient sounds during emergencies.

NotificationFeedback – shows alerts, confirmations, and status updates to users.

Flow:

User presses Help button.

App retrieves current location and opens map for optional adjustment.

Ambient noise recording begins.

App sends location + audio + user ID to backend.

Backend sends notifications to emergency contacts.

User receives confirmation that help is on the way.

Step-by-Step User Tutorial

Open the SafeCircle app.

Locate the Help button on the main screen.

Tap Help if you feel unsafe.

Confirm your current location on the map. Drag the pin if necessary.

The app will start ambient audio recording automatically.

The app sends your location, timestamp, and audio clip to the backend.

Emergency contacts receive an alert with your exact location and optional audio.

A confirmation message appears on your screen: “Help request sent successfully.”

The app logs your alert for future reference.

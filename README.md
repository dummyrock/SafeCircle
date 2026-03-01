## SafeCircle: Personal Safety Application

> **Overview:** SafeCircle is a comprehensive personal safety application designed to provide instant access to help during emergencies. By seamlessly combining precise location tracking, real-time alerting, and ambient noise detection, SafeCircle creates a robust and reliable safety network for its users.

This document outlines the core features, technical integration, and user workflow of the SafeCircle platform.

---

### Core Features

**1. Emergency Help Button**
The core functionality of SafeCircle allows users to instantly signal for help when they feel unsafe or encounter an emergency.

* **Frontend:** Dispatches a request containing the user ID, timestamp, and location coordinates.
* **Backend:** Logs the event and instantly pushes notifications (via SMS, email, or push) to predefined emergency contacts or authorities.
* **User Experience (UX):** Displays a clear "Help request sent" visual confirmation and offers a brief cancellation window to prevent accidental alerts.

**2. Interactive Map Selector**
SafeCircle utilizes modern mapping libraries (such as Google Maps or Leaflet) to ensure pinpoint accuracy during an emergency.

* **Location Retrieval:** Automatically fetches the device’s geolocation the moment the Help workflow is activated.
* **Manual Adjustment:** Users can drag a pin or tap the map to visually confirm and fine-tune their exact position.
* **Data Handling:** Captures precise latitude and longitude coordinates to share with responders and store in historical logs.

**3. Ambient Noise Detection**
To provide critical context to emergency contacts, the application securely captures surrounding audio during a distress event.

* **Activation:** Background audio recording begins automatically as soon as the Help button is pressed.
* **Transmission:** Short audio clips are bundled into the alert payload and transmitted to the backend for verification.
* **User Experience (UX):** Users are transparently notified that noise detection is active. Recording ceases automatically once the alert is completed or canceled.

---

### Technical Architecture

**Frontend Components**

* **HelpButton:** Initiates the emergency sequence and triggers background audio recording.
* **MapSelector:** Renders the map interface and captures accurate geospatial data.
* **AudioCapture:** Manages background microphone access and securely packages sound clips.
* **NotificationFeedback:** Delivers real-time system statuses, confirmations, and alerts to the UI.

**Backend API Endpoints**
The SafeCircle backend is responsible for storing user data, logging events, processing audio, and routing emergency communications.

| Endpoint | Method | Description |
| --- | --- | --- |
| `/help` | `POST` | Triggers a new Help request and initiates the emergency alert workflow. |
| `/locations/:userId` | `GET` | Fetches a historical log of previous emergency alerts and location data. |
| `/audio` | `POST` | Receives and safely stores ambient noise recordings linked to an active alert. |

---

### User Workflow: Step-by-Step

1. Open the SafeCircle application and locate the **Help** button on the main screen.
2. Tap **Help** immediately if you feel unsafe or experience an emergency.
3. Review your auto-detected location on the map interface and drag the pin to adjust it if necessary.
4. Allow the app to automatically begin recording ambient noise in the background.
5. The system silently transmits your location, timestamp, and audio clip to the backend servers.
6. Predefined emergency contacts instantly receive an actionable alert containing your precise details.
7. Receive a final on-screen confirmation reading: *"Help request sent successfully,"* while the app logs the event for future reference.

---

Would you like me to format this inside a code block so you can copy the raw Markdown syntax directly?

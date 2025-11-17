# STOMP WebSocket Viewer

This example demonstrates how to connect a **React web application** directly to a **STOMP broker** using **WebSockets** and display incoming messages in a scrolling view.

---

## Features

- Connects to a STOMP broker via WebSocket.
- Subscribes to a topic using credentials from a `.env` file.
- Displays messages in a **two-column layout**: `topic` and `payload`.
- Auto-scrolls as new messages arrive.
- Handles reconnects automatically if the connection drops.

---

## Prerequisites

- Node.js >= 18
- NPM >= 9
- A running **STOMP broker** (e.g., ActiveMQ) with WebSocket enabled.
- Broker credentials (`username` / `password`) and topic.

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/felipecarrillo100/web-stomp-viewer.git
cd web-stomp-viewer
```

2. Install dependencies:
```bash
npm install
```

## Environment Variables

Create a .env file in the root of the project:
```dotenv
VITE_STOMP_URL=ws://localhost:61614
VITE_STOMP_USER=admin
VITE_STOMP_PASS=admin
VITE_STOMP_TOPIC=/topic/producers.cars.data.>
```

Make sure the .env file is in the root folder next to package.json, as Vite automatically loads variables prefixed with VITE_.

## Run the Application

Start the development server:
```bash
npm run dev
```

Open the app in your browser (default http://localhost:5173) and watch the messages appear in the scrolling view.

## Project Structure
```lua
src/
  ├─ App.tsx
  ├─ StompViewer.tsx
  └─ StompViewer.css
.env
package.json
vite.config.ts
```

Where:
* StompViewer.tsx: Main component that connects to the STOMP broker and renders messages.
* .env: Contains broker URL, credentials, and topic.

## Notes

* The topic must start with /topic/ (Since this is STOMP protocol).
* Topic separator (`.` or `/`) depend of the configuration of the broker, ActiveMQ by default uses `.`
* Topic wildcards (`>` or `*`) depend of the configuration of the broker, ActiveMQ by default uses `>`
* Auto-reconnect is enabled with a 5-second delay.

Messages are appended to a scrollable container for live monitoring.

## Example:

Topic, topic `.` separator with wildcard `>`: /topic/producers.cars.data.>


## Catalog Explorer format

Catalog Explorer proprietary message format for live tracks uses the structure:

```json
{
  "action": "PUT",                        // Operation type: "PUT", "PATCH", "DELETE".
  "id": "unique-feature-id-12345",        // Unique identifier for the feature
  "geometry": {
    "type": "Point",                       // GeoJSON Geometry type (Point, LineString, Polygon, etc.)
    "coordinates": [102.0, 0.5]           // [longitude, latitude] or [longitude, latitude, height] in decimal degrees and height in meters
  },
  "properties": {
    "name": "Vessel A",                    // Example property 1
    "speed": 12.5,                         // Example property 2
    "heading": 45,                         // Heading in degrees
    "customProperty1": "any value",        // Users can define any additional properties
    "customProperty2": 42,
    "metadata": {                          // Optional nested metadata
      "source": "AIS stream",
      "blockId": "block-01"
    }
  }
}
```

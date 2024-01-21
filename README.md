# Vaahana: Peer-to-Peer Motorbike Sharing

## Overview

Welcome to **Vaahana**, the Airbnb for motorbikes. Whether you want to list your idle bike to earn money or need a ride and wish to rent one, Vaahana is your platform.

## Authors

- [Shreedhar Hegde](https://www.linkedin.com/in/shreedhar-hegde/)
- [Shreekar Hegde](https://www.linkedin.com/in/shreekar-hegde/)
- [Sudhanva Narayana](https://linkedin.com/in/nsudhanva/)

## How It Works

### For Bike Owners (Hosts)

- **List Your Bike**
- **Receive Requests**
- **Earn Money**

### For Riders (Guests)

- **Find a Bike**
- **Book It**
- **Ride and Return**

## Tech Stack

- **MERN**: MongoDB, Express.js, React with TypeScript, and Node.js.
- **MongoDB**: For data storage.
- **Express.js and Node.js**: For server functionality.

## Open Source

Vaahana is open source. Contribute by fixing bugs, adding features, or offering suggestions. See our [contributing guidelines](CONTRIBUTING.md).

## Usage

1. **Docker**: Install Docker Desktop or Docker Engine.
2. **Text Editor**: Use any editor like VSCode or Sublime Text.

## Getting Started

1. **Clone Your Repository**: Clone your Git repository or ensure you have the project files.
2. **Navigate to Your Project**: Go to the root directory with `docker-compose.yml`.

## Understanding Docker Compose File

The `docker-compose.yml` defines these services:

- **Traefik**: A reverse proxy on ports 80 and 8080.
- **Server**: The Node.js/Express backend.
- **Client**: The React frontend, depending on the Server service.

## Building and Running with Docker Compose

1. **Build the Services**: Execute `docker-compose build`.
2. **Run the Services**: Use `docker-compose up`. Use `-d` for detached mode.
3. **Check the Containers**: Use `docker ps`.

## Accessing the Application in the Browser

1. **Client**: Access at `http://client.vaahana.localhost`. Update `hosts` file for this URL.
2. **Server**: Access at `http://server.vaahana.localhost`. Update `hosts` file accordingly.

## Service Configuration Details

- **Traefik**: Configured for Docker and web interface entrypoints.
- **Server**: Updated environment variables and volume mappings.
- **Client**: Dependency on the server and updated environment variable.

## Monitoring and Logs

- **View Logs**: Use `docker-compose logs [service_name]`.
- **Stopping Services**: Use `docker-compose down`.

## Hot Reloading

Supports hot reloading for client and server code updates.

## Troubleshooting

- **Container Crashes**: Check logs for errors.
- **Network Issues**: Check for port or URL conflicts.
- **Docker Daemon**: Ensure it's active.

# Running locally

- Create .env file under client
- Add VITE_GOOGLE_MAPS_API_KEY to it
- Create .env file under server
- Add MONGO_URL, APP_SECRET to it
- cd into client and run npm install
- npm run dev
- cd into server and run npm install
- npm run dev

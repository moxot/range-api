## Overview

The core functionality of this api is to transform vehicle event data into a structured sequence of intervals, suitable for frontend timeline visualization.

## Routes

- **POST /api/ranges**: expects json body 
```text
{
  "startDate": ISO-8601 string,
  "endDate": ISO-8601 string,
  "vehicleId": string
}
```
And outputs JSON Array: Each element represents a time interval during which the vehicle was in a specific status.

Publicly accessible at: 
```ec2-34-207-186-53.compute-1.amazonaws.com/api/ranges```

## Installation and Setup

### Installing

```bash
npm install
```

### Setup

- Create .env file:
```bash
cp .env.example .env
```
- Populate .env file with specific values

## Run the application
```bash
npm run build && npm start
```

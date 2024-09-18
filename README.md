# MoviePortal Expo

MoviePortal Expo is a React Native mobile application built with Expo that allows users to browse popular movies, search for movies, and view movie details. The app uses The Movie Database (TMDb) API to fetch movie information.

## Features

- Browse popular movies
- View top-rated movies
- Search for movies
- View detailed information about each movie
- Responsive design for various screen sizes

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or later)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- A TMDb API key (sign up at https://www.themoviedb.org/documentation/api)

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/movieportal-expo.git
   cd movieportal-expo
   ```

2. Install dependencies:

   ```
   npm install
   ```

   or

   ```
   yarn install
   ```

3. Create a `.env` file in the root directory and add your TMDb API key:
   ```
   EXPO_PUBLIC_TMDB_API_KEY=your_api_key_here
   EXPO_PUBLIC_BASE_URL=https://api.themoviedb.org/3
   ```

## Running the App

To start the development server:

```
npx expo start
```

This will open the Expo DevTools in your browser. You can then run the app on:

- iOS Simulator
- Android Emulator
- Your physical device using the Expo Go app
- Web browser (using Expo's web build)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

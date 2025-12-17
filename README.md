# Travel Agency Frontend

A React-based frontend application for a travel agency, featuring public-facing package listings and an authenticated admin panel for managing packages and inquiries.

## Features

### Public-Facing Features
*   **Home Page:** Introduction to the travel agency, featured packages, testimonials, and "Why Choose Us" section.
*   **Package Listing:** Browse available travel packages, with filtering capabilities (implied, but not explicitly seen in `packages.js` beyond `getPackages`).
*   **Package Detail:** View detailed information for individual travel packages.
*   **Inquiry Form:** Submit inquiries for specific packages.

### Admin Panel Features (Authenticated)
*   **Admin Login:** Secure login page for administrators.
*   **Dashboard:** Overview of administrative tasks.
*   **Manage Inquiries:** View and manage customer inquiries (currently mocked data).
*   **Manage Packages:** Add, view, and delete travel packages.
    *   **Add Package:** Form to create new travel packages.

## How it Works

### Project Structure
The application is built with React and uses `react-router-dom` for navigation. State management is handled component-locally or via context (e.g., `PackagesContext.jsx`). Internationalization is provided by `i18next`. Styling is done with Tailwind CSS.

### Routing
*   **Public Routes:** Handled by `<TravelAgencyApp />`, including home, package listings, package details, and inquiry forms.
*   **Admin Routes:** Protected by a `<PrivateRoute />` component which checks for authentication status using `authService`. If a user is not authenticated, they are redirected to the `/admin/login` page.

### Authentication
The admin panel uses a simple token-based authentication mechanism.
*   **Login:** Admin users log in with credentials (currently hardcoded to `admin`/`password` for demonstration). A "fake-jwt-token" is stored in `localStorage`.
*   **Authorization:** The presence of this token in `localStorage` determines if a user is authenticated. API requests to protected endpoints (e.g., `addPackage`, `deletePackage`) include this token in the `Authorization` header.

### Data Flow
*   **Packages:**
    *   **Public:** Fetches packages using `getPackages()`. This function supports two modes:
        *   **Static Mode (`REACT_APP_SITE_MODE=static`):** Packages are loaded from a local `public/packages.json` file.
        *   **Dynamic Mode (default):** Packages are fetched from a backend API endpoint (`/packages`).
    *   **Admin:** `addPackage()` and `deletePackage()` functions interact with the backend API to modify package data. These operations require administrator authentication.
*   **Inquiries:**
    *   **Public:** (Implicit) Submission of inquiries is likely handled by a form in `InquiryPage.jsx` which would typically send data to a backend API (not yet implemented in `src/api/inquiries.js`).
    *   **Admin:** `getInquiries()` retrieves a list of inquiries. Currently, this function returns mocked data.

## Getting Started

### Prerequisites
*   Node.js (LTS version recommended)
*   npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd travel-agency-frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

### Running the Application

*   **Development Mode:**
    To run the application in development mode:
    ```bash
    npm start
    # or
    yarn start
    ```
    This runs the app on [http://localhost:3000](http://localhost:3000). The page will reload if you make edits.

*   **Building for Production:**
    To build the application for production:
    ```bash
    npm run build
    # or
    yarn build
    ```
    This command builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

### Environment Variables

*   `REACT_APP_SITE_MODE`: Set to `static` to load package data from `public/packages.json`. Otherwise, it defaults to fetching data from the backend API.
*   A backend API is expected to be running at `http://localhost:8082` (configured via `proxy` in `package.json`).

## Key Technologies Used

*   React 19
*   React Router DOM 7
*   i18next / React i18next
*   Tailwind CSS
*   Framer Motion (for animations)
*   Lucide React (for icons)
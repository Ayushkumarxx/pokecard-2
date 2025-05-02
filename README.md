# Internship Assignment 2: Pokémon Web Application

This project is a **Pokémon Web Application** built as part of my internship assignment. The application allows users to explore and interact with Pokémon through a clean, optimized, and modular React interface. Key features include search, pagination, detailed stats, comparison, and favorites.

---

## Features

### 1. Paginated Pokémon Listing
- Users can choose how many Pokémon to view per page.
- Options include **10**, **20**, and **50** Pokémon per page.

### 2. Pokémon Search
- Users can search for Pokémon by name to view specific results.

### 3. Pokémon Detail Page
- Clicking on a Pokémon opens its detailed view.
- Details include:
  - **Stats**
  - **Abilities**
  - **Moves**
  - **Evolution Chain**

### 4. Pokémon Comparison
- Users can select two Pokémon and compare their stats side by side.

### 5. Random Pokémon
- A "Random" button fetches a Pokémon by random ID.

### 6. Favorite Pokémon
- Users can like Pokémon.
- Liked Pokémon are stored in **localStorage** and shared across components using **React Context API**.

---

## Technologies Used

- **React.js** - Frontend library
- **React Router** - Routing and navigation
- **React Context API** - Global state management
- **Tailwind CSS** - Utility-first CSS framework
- **localStorage** - Persistent liked Pokémon
- **useMemo** - Memoizes expensive calculations
- **useCallback** - Memoizes functions to optimize re-renders
- **Custom Hooks** - Reusable logic across features

---
Each feature (e.g., ListView, Favorites) is organized within its own directory containing:

- **pages/**: Main view components
- **components/**: Subcomponents
- **hooks/**, **helpers/**, or **context/**: As necessary

The **shared/** directory contains:

- Reusable UI components
- Shared constants
- Shared custom hooks
- Shared context providers


## Optimizations

- **useMemo**: Utilized to prevent unnecessary recalculations during component re-renders.
- **useCallback**: Employed to avoid redundant creation of functions.
- **Custom Hooks**: Implemented for clean and reusable logic management.

## What I Learned

- Utilizing **React Context API** for managing global state.
- Applying **useCallback** and **useMemo** for performance enhancements.
- Structuring the project with a feature-based folder layout.
- Developing custom hooks to promote logic reuse.
- Handling **localStorage** for data persistence.
- Strengthening foundational React skills.
- Adapting to work under strict deadlines.
- Leveraging AI tools and chatbots for project brainstorming and completion.
- Enhancing time management and problem-solving abilities.

## Challenges

- Limited time led to some compromises in code quality and best practices.
- Planning a code refactor post-internship for improved maintainability and performance.

## Conclusion

This Pokémon web app showcases:

- Proficiency with contemporary React tools and methodologies.
- Capability to construct modular and scalable applications.
- Adaptability and efficiency in high-pressure scenarios.

## Author
Ayush Kumar

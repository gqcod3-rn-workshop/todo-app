# Todo App

## Overview

Todo App is a sample application built with Expo and React Native that demonstrates a Domain-Driven Design (DDD) approach applied to a small mobile app. It allows creating, listing, updating status, and deleting tasks (todos). Data is persisted using SQLite, and there is an in-memory repository implementation useful for tests and rapid development. The project uses `expo-router` for file-based routing and is written in TypeScript.

## Main technologies

Key technologies and versions used in this project:

- Expo — 54.0.20 (SDK)
- React — 19.1.0
- React Native — 0.81.5
- expo-router — ~6.0.13 (file-based routing)
- TypeScript — ~5.9.2
- SQLite (expo-sqlite) — ~16.0.8 (local persistence)
- nativewind — ^4.2.1 (Tailwind-like styling for RN)
- tailwindcss — ^3.4.18
- react-native-reanimated — ~4.1.1
- @expo/vector-icons — ^15.0.2

There are additional utilities and libraries for navigation, haptics, images, and more — check `package.json` for the full list.

## Features

- Create tasks (title, category)
- List all tasks
- Update task status (completed / pending)
- Delete tasks
- Local persistence with SQLite
- Repository implementations: in-memory and SQLite (useful for testing)

## Folder structure (summary)

Relevant project structure:

- app/ — entry points and file-based routing (Expo Router)
   - (tabs)/ — tab routes and layout
   - todo/ — screens related to tasks
- src/
   - app/ — global layouts and styles
   - core/ — shared types and utilities
      - types/
   - features/
      - task-management/
         - application/ — services and use cases
         - domain/ — entities, repository interfaces, value objects
         - infrastructure/
            - database/ — sqlite client and schemas
            - repositories/ — repository implementations (in-memory, sqlite)
            - utils/ — utilities such as UUID generator
         - presentation/ — UI components, context providers, hooks and screens
   - shared/ — shared constants and resources

Key files:

- `src/features/task-management/domain/entities/todo-entity.ts`
- `src/features/task-management/application/usecases/*` (add, delete, fetch, update)
- `src/features/task-management/infrastructure/database/sqlite-client.ts`
- `app/(tabs)/index.tsx`, `app/todo/add.tsx` — example screens

## Architecture and data flow (DDD)

This project follows a Domain-Driven Design (DDD) approach combined with a layered structure that separates responsibilities clearly.

Core ideas applied here:

- Domain (core): Contains the domain model (entities and value objects), domain services (if needed), and repository interfaces. The domain expresses business rules and invariants and should not depend on infrastructure.
- Application: Coordinates application use cases (orchestrating domain operations) and provides an API for the presentation layer. Use cases depend on domain interfaces (e.g., repository interfaces) but not on infrastructure details.
- Infrastructure: Concrete implementations of repository interfaces, database access (SQLite), and other technical concerns. This layer translates between the domain model and persistence schemas.
- Presentation: UI components, screens, and context/providers that interact with application use cases to present data to and collect input from the user.

DDD-related notes:

- Entities and Value Objects live in `domain/` and encapsulate business rules.
- Repositories are defined as interfaces in the domain and implemented in `infrastructure/repositories/` (in-memory and sqlite implementations exist).
- This design supports testing by allowing tests to inject the in-memory repository while keeping domain logic isolated.

Typical flow when creating a task:

1. The user fills and submits the form in the presentation layer (screen or component).
2. The presentation layer calls an application use case (e.g., AddTodoUseCase).
3. The use case uses a repository interface (from the domain) to persist the new entity.
4. The infrastructure repository (SQLite implementation) maps the domain entity to the persistence schema and performs the DB operation.

This separation makes the domain model the primary source of business rules and reduces coupling to technical details.

## Commands (setup and usage)

Install dependencies:

```bash
npm install
```

Start the Expo development server:

```bash
npx expo start
```

Useful scripts (from `package.json`):

```bash
npm run start      # expo start
npm run android    # open on Android (emulator/device)
npm run ios        # open on iOS (simulator) — macOS + Xcode required
npm run web        # open in the web browser
npm run reset-project  # move starter code to app-example and create blank app
npm run lint       # run eslint
```

Execution notes:

- For iOS you need macOS with Xcode installed to run the simulator.
- `npx expo start` will show options for Expo Go, emulators, or connecting a physical device.

## Database

`expo-sqlite` is used for local persistence. The database client and schemas are under:

- `src/features/task-management/infrastructure/database/`

There is also an in-memory repository implementation at `src/features/task-management/infrastructure/repositories/todo-in-memory-repository-impl.ts` suitable for tests and fast iteration.

## Important files

- `package.json` — scripts and dependencies
- `app/` — entry points and routes
- `src/features/task-management/` — all logic related to tasks

## Contributing

If you want to contribute:

1. Create a branch named `feature/*` or `bugfix/*` from `main`.
2. Add tests where relevant (use cases are good places to add unit tests).
3. Open a pull request describing the changes and why they are needed.

---

If you want me to add usage examples (for unit tests or snippets), troubleshooting tips, or an English + Spanish README pair, tell me which one and I'll add it.

# PRODUCT APP (Version 1.0.0)

A Product viewer Application, Using Angukar 19 Standalomne. Typescript . Jasmine . Karma . Eslint

The Product App is built using Angular 19 and follows a scalable, maintainable architecture with optimized performance and reusable components.

## Table of Contents

- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Folder Structure](#folder-structure)
- [Development Features](#development-features)
  - [Unit Test](#unit-test)
  - [Code Coverage](#code-coverage)
  - [Lint & Format](#lint-format)
  - [UI UX](#ui-ux)

## Getting Started

#### Key Architecture Decisions and Best Practices

    1. Standalone Components:
        Adopted Angular's standalone component architecture for better encapsulation and lazy loading.
    2. OnPush Change Detection:
        Improved rendering performance by using ChangeDetectionStrategy.OnPush to minimize DOM updates.
    3. Reusable Pipes and Directives
        Improved rendering performance by using ChangeDetectionStrategy.OnPush to minimize DOM updates.
    4. Reusable Components
        Built reusable components like ProductCard and ProductThumbnail for consistent and maintainable UI.
    5. Unit Testing
        Achieved high code coverage with Jasmine and Karma unit tests.
    6. Code Quality and Formatting
        Ensured code quality with ESLint and formatting consistency with Prettier

#### Benefits

    1.Performance
        OnPush strategy and optimized infinite scroll reduce unnecessary change detection and API calls.
        Debounce feature minimizes user interface latency.
    2.Scalability
        Modular architecture allows for easy extension with new features.
        Reusable components, directives, and pipes promote maintainability.
    3.Maintainability
        Standalone components simplify project configuration.
        Global SCSS variables ensure consistent styling across the application.
    4.Code Quality
        ESLint and Prettier maintain clean, readable code.
        Unit testing ensures robustness and early bug detection.

### Installation

#### Clone the repository:

Open your terminal or command prompt, go to the desired directory, and use the following command to clone the angular project:

```
git clone https://github.com/maheshpeechamkoli/product-app.git
cd product-app
```

#### Running the Application

Downlaod Node and Install

```
https://nodejs.org/en
```

```
npm install
```

```
ng serve
```

## Folder Structure

```
    product-app/src/app/
    ├── core/                  # Global application-level services and interceptors
    ├── features/product/      # Product-related components, models, and services
    │   ├── components/        # UI components (e.g., product list, card, filter)
    │   ├── models/            # Data models and interfaces
    │   ├── services/          # http api service
    │   └── product.routes.ts  # Feature routing configuration
    ├── shared/                # Shared reusable components, pipes, and directives
    │   ├── components/        # Reusable UI components like navbar
    │   ├── directives/        # Custom directives for reusable behaviors
    │   ├── pipes/             # Custom pipes for data transformation
    │   └── services/          # Shared application services
    └── styles/                # Global SCSS styles and variables
```

## Development Features

### Unit Test

    ```
    ng test
    ```

![Unit Test](screenshot/test.png)

### Code Coverage

    ```
    ng test --code-coverage
    ```

    Run the coverage report and identify which parts of your code are not covered. Use  the following command to generate the coverage report:

    ```
    ng test --no-watch --code-coverage
    ```

![Code Coverage](screenshot/code-coverage.png)

### Lint & Format

    "validate": "npm run lint && npm run format:check"

    ```
    npm run validate
    ```

### Product List

![UI UX](screenshot/product-list.png)

### Prodcut Card

![UI UX](screenshot/prodcut-card.png)

### THANK YOU SO MUCH

# IMPHNEN Frontend Service

<p align="center">
  <img src="docs/logo.svg" alt="IMPHNEN">
</p>

This repository is a **monorepo** for all frontend services of IMPHNEN. The monorepo includes three main applications:

1. **Gacha** - Application for <a href="https://gacha.imphnen.dev/" target="_blank">Gacha Website</a>.
2. **Backoffice** - Application for <a href="https://gacha.imphnen.dev/" target="_blank">Internal Management Website</a>.
3. **Dimentorin** - Application for <a href="https://dimentorin.imphnen.dev/" target="_blank">Mentoring Service</a>.
4. **Landing Page** - Application for <a href="https://imphnen.dev/" target="_blank">Landing Page</a>.

## How to install

1. Clone this repository:
   ```sh
   git clone https://github.com/IMPHNEN/imphnen-frontend-service.git
   cd imphnen-frontend-service
   ```
2. Install all dependencies:
   ```sh
   npm install
   ```

## How to run

### Setup Environment Variables

Before running the applications, you need to set up the environment variables. You can do this by copying the `.env.example` file to `.env` and modifying the values according to your needs.

```sh
cd apps/{appname}
cp .env.example .env
```

### Development

Use the following commands to run in development mode:

- **Gacha**:
  ```sh
  npm run gacha:dev
  ```
- **Backoffice**:
  ```sh
  npm run backoffice:dev
  ```
- **Dimentorin**:
  ```sh
  npm run dimentorin:dev
  ```
- **Landing Page**:
  ```sh
  npm run landing:dev
  ```

### Build

Use the following commands to build the applications:

- **Gacha**:
  ```sh
  npm run gacha:build
  ```
- **Backoffice**:
  ```sh
  npm run backoffice:build
  ```
- **Dimentorin**:
  ```sh
  npm run dimentorin:build
  ```
- **Landing Page**:
  ```sh
  npm run landing:build
  ```

### Production

Use the following commands to run the applications in production mode:

- **Gacha**:
  ```sh
  npm run gacha:prod
  ```
- **Backoffice**:
  ```sh
  npm run backoffice:prod
  ```
- **Dimentorin**:
  ```sh
  npm run dimentorin:prod
  ```
- **Landing Page**:
  ```sh
  npm run landing:prod
  ```

### Storybook

This repository uses Storybook to develop, test, and document UI components in an isolated and interactive environment. Below are the commands to work with Storybook:

- **Run Storybook**

  This command starts Storybook in development mode, allowing you to view and test UI components interactively.

  ```sh
  npm run ui:storybook
  ```

- **Run Unit Test**

  This command runs unit tests for the UI components to ensure they function as expected.

  ```sh
  npm run ui:test
  ```

- **Build Components**

  This command generates a static build of Storybook, which can be deployed for sharing and documentation purposes.

  ```sh
  npm run ui:build
  ```

## How to contribute

1. Fork the repository and clone it locally.
2. Create a new branch for a new feature or fix:
   ```sh
   git checkout -b feat/feature-name
   ```
3. Make changes, commit, and push to your forked repository.
4. Create a pull request to this repository `develop` branch.

If you encounter any issues or problems, feel free to create a new Issue.

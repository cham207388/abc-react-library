# React Notes

## Instructions

### 1. Set Up Your React Component Library
- Initialize a new project directory
- Set up a package.json file
- Install necessary dependencies (React, TypeScript if needed, etc.)
```bash
npm create vite@latest my-react-library --template react
cd my-react-library
npm install
rm -rf src/assets src/App.jsx src/index.css
```

project structure

```text
my-react-library/
│── src/
│   ├── components/
│   │   ├── SignInForm.jsx
│   ├── main.jsx
│   ├── index.js
│── package.json
│── vite.config.js
```

index.js
```js
export { default as SignInForm } from "./components/SignInForm";
```

### 2. Develop Your Components
- Create a src/ folder to store components
- Write reusable React components
- Add PropTypes or TypeScript types for better usability
- Write stories if using Storybook for documentation
- Ensure proper default exports for compatibility

### 3. Add Build & Bundling Configuration
- Choose a bundler like Vite, Rollup, or Webpack
- Configure it to output CommonJS and ESM formats
- Minify and optimize your package
- Ensure dependencies are marked as peerDependencies

### 4. Test Your Components
- Write unit tests using Jest & React Testing Library
- Set up linting and formatting (ESLint, Prettier)
- Check for accessibility and best practices

### 5. Set Up npm Publishing
- Create an .npmignore file to exclude unnecessary files
- Ensure your package.json has a proper main and module field
- Authenticate with npm (npm login)
- Publish the package (npm publish)

### 6. Use the Package in Your Project
- Install the published package in another project (npm install your-package-name)
- Import and use your components in your application

### 7. Automate and Maintain
- Set up a CI/CD pipeline (GitHub Actions, Travis CI)
- Automate tests and versioning (e.g., using semantic-release)
- Maintain documentation and update components as needed

| Command | What It Does |
|---------|--------------|
| `npm run build` | Bundles the library for production |
| `npm whoami` | check login user |
| `npm login` | login to npm |
| `npm link abc-react-library` | Links the package inside an app |
| `npm unlink abc-react-library` | Removes the local link from the app |
| `npm unlink` | Removes the global link from your system |
| `npm run dev` | Starts the app to test the linked component |

## Publish

| Command | What It Does |
|---------|--------------|
| `rm -rf node_modules package-lock.json` <hr> `npm install` | clean up |
| `npm version patch` <hr> requires clean git | publish to npm |
| `npm install` | install |
| `npm run build` | build |
| `npm publish --access public` | publish to npm |
| `npm view abc-react-library` | search for abc-react-library |
| `npm install abc-react-library` | install to use |

**package.json**
```json
{
  "name": "abc-react-library",
  "private": false,
  "version": "0.0.1",
  "main": "dist/index.cjs.js",  
  "module": "dist/index.esm.js",  
  "types": "dist/index.d.ts",  
  "exports": {
    "import": "./dist/index.esm.js",
    "require": "./dist/index.cjs.js"
  },
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "@mui/material": "^5.0.0"
  },
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "vite": "^6.2.1",
    "rollup-plugin-peer-deps-external": "^2.2.4",
    "@vitejs/plugin-react": "^5.0.0",
    "prop-types": "^15.8.0"
  }
}
```

**vite.config.js**
```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import path from "path";

export default defineConfig({
  plugins: [react(), peerDepsExternal()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.js"),
      name: "abc-react-library",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format === "es" ? "esm" : "cjs"}.js`
    },
    rollupOptions: {
      external: ["react", "react-dom", "@mui/material", "prop-types"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "prop-types": "PropTypes"
        }
      }
    }
  }
});
```

## CI / CD

### What You Should Do Instead

All you need to do is:
- create npm access token
  - setting -> access token
- Write conventional commits like:
  - feat: add new InputField
	- fix: handle button click issue
- Push to main:
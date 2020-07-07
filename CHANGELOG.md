## 1.5.0
* updated README
* updated dependencies

## 1.4.1
* changed config for `tsconfig.json`
* replaced `ESNext` with `ES2019`

## 1.4.0
* refactored events with almost 100% backward compatibility:
* * `RegionRegisteredEvent`
* * `RegionUnregisteredEvent`
* attributes of these events are not publicly accessible
* new methods: `getType()` and `getRegion()`

## 1.3.1
* changed license to **GPLv3**
* moved `react` and `react-dom` from dependencies to peerDependencies

## 1.3.0
* updated dependencies (minor versions)
* allow to listen for all events when RegExp is passed as argument to `listen()` method

## 1.2.0
* prevent circular reference for regions

## 1.1.1
* updated dependencies (`@typescript-eslint/eslint-plugin` and `@typescript-eslint/parser`)
* written documentation in `README.md` file

## 1.1.0
* removed builtin support for `<React.Suspense />` and `React.lazy`

## 1.0.2
* fixed CI for building and publishing package

## 1.0.1
* valid `package.json` (migration from GitLab to GitHub)

## 1.0.0
* initial commit
* package `react-regions` allows to create regions and load component into these regions
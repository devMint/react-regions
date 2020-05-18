<div align="center">
    <img src="logo.png" alt="React Regions" />
</div>

<div align="center">
    <strong>Small Javascript package for managing regions on template using "regions" or "blocks". Idea is copied from template engines like Twig or Handlebars.</strong>
    <br />
    <br />
</div>

## Installation

Before you start installing package you need to authorize to GitHub's npm. To learn more read _[Configuring npm for use with GitHub Packages](https://help.github.com/en/packages/using-github-packages-with-your-projects-ecosystem/configuring-npm-for-use-with-github-packages)_.

Install from the command line:

```bash
npm install @devmint/react-regions
```

Install via `package.json`:

```json
"@devmint/react-regions": "1.1.0"
```

## Usage

Example of full scenario where we:
* create new instance of `RegionRegistry` which we will be use across our application
* register a new component into region `example`
* create component `<App />` which contains context provider and single `<Region />` named `example`

```jsx
import React from 'react'
import { Region, RegionProvider, RegionRegistry } from '@devmint/react-regions'

const registry = new RegionRegistry()
registry.register('example', () => (
  <p>Component placed in region 'example'</p>
))

const App = () => (
  <RegionProvider registry={registry}>
    <Region region={'example'} />
  </RegionProvider>
)
```

Instead of `<Region region={'example'} />` there'll be rendered component registered earlier.

### Registering and unregistering

Every moment in lifecycle of our application we can register component into some region:

```jsx
registry.register('example', /** our component */)
```

And the same we can unregister component from this region:

```jsx
registry.unregister('example')
```

Using these both methods we can replace existing component with another one.

### Dynamic components

It's possible to register dynamic components using builtin methods of React, e.g. using `React.lazy` and `<React.Suspense />`:

```jsx
import React, { Suspense, lazy } from 'react'

const LazyComponent = React.lazy(() => import('../path/to/our/component'))
const AsyncComponent = () => (
  <Suspense fallback={<p>Loading...</p>}>
    <LazyComponent />
  </Suspense>
)

registry.register('example', AsyncComponent)
```

### Listening for changes

Registry offers method `listen` to knows what happens with specific region:

```jsx
const unlisten = registry.listen('example', (event) => {
  // each time when some component is registered or unregistered from region
  // event is sent
})

// when we want to stop listening for region
unlisten()
```

It's especially helpful to know what regions are registered in our layout without asking registry each time.
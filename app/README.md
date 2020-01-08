# UI

The Isomorphic React application

Please read the [FAQ](#faq)!

## Local development in Node

We recommend that developers build and test using the [Docker](https://github.com/telus/telus-isomorphic-starter-kit/blob/master/DOCKER.md) environment. This ensures that your environment is set up the same as other developers and production environments. "Works for me" should mean "works for everyone". Developing with local Node is possible, but your environment may differ from other people.

If you want to develop locally, to enable advanced features such as Node debugging and Nodemon hot-reloading, you can install Node manually, and work with the project as a standard JS app. At this time we recommend installing Node v8, to match the Docker container. Node can be installed with `brew` on OSX and `apt-get` on Linux.

To test locally you'll have to run:
```
npm install
npm run dev
```

This will also host on `http://localhost:3000/en/bc/hello-world`, but outside of a Docker container, using Node directly on your OS. Any changes made in your file system will be automatically hot-swapped in to the running application, so changes are reflected immediately on the next reload.

## FAQ

### Immutable.js
#### Q: Do I really need immutablejs?
A: If you are asking this question, very likely you don't need it. Immutablejs really shines when your app needs to manipulate large, complex data sets. If you are building static site, please avoid using immutablejs package as the footprint is quite big (~45kb after gzip).

#### Q: Immutable.js is part of the isomorphic starter kit, how do I remove it?
A: Easy, in client.js update the following code
```js
// from this
import { configureStore, immutifyState } from '@telus/isomorphic-core';
...
const initialState = window.__INITIAL_STATE__ ? immutifyState(window.__INITIAL_STATE__, []) : {};
...
const store = configureStore(rootReducer, initialState, [fetchMiddleware()]);

// to this
import { configurePlainStore } from '@telus/isomorphic-core';
...
const initialState = window.__INITIAL_STATE__ || {};
...
const store = configurePlainStore(rootReducer, initialState, [fetchMiddleware()]);
```

#### Q: What's best practice of using Immutable.js?
A:
1. Never use immutable.js in your 'dumb' components. Instead, wrap your 'dumb' components with the `mapImmutablePropsToPlainProps()` HOC from the `isomorphic-core` package to transfrom immutable.js props to plain js props.
2. Never use `toJS()` in `mapStateToProps` when you are connecting your component to store.


### React
#### Q: Should I write class-based react component or stateless functional components?
A: Always use stateless functional components. Facebook is making performance optimizations specific to functional components in react v.16. Also stateless functional components are much easier to test.

#### Q: What if I need to use component life cycles?
A: You can wrap your stateless components with the `withLifeCycle()` HOC from `isomorphic-core` to add life cycles or state management to your components.
#### Q: How do I improve the performance of rendering?
A:
1. Use the `shouldComponentUpdate()` life cycle to avoid expensive re-renders. If your are using `immutalbejs`, you can simply check nextProps.myData === this.props.myData as this compares the object reference and `immutablejs` always returns a new object after mutation.
2. Defer expensive, processing heavy, render blocking logic into `componentDidMount()` life cycle so that the application is not blocked from initial rendering.

#### Q: What is the recommended folder structure when creating a new component?
A:
Assuming you are create a new component named `Card`
```
Card
│─── __tests__
    │─── Card.jsx // unit tests
│─── Card.jsx // Presentational(dumb) component.
│─── CardContainer.js // Container(smart) component that composes HOCs and wraps Card.jsx.
│─── index.js // imports CardContainer and exports it as default.
│─── Styles.js // or card.scss if project is not yet on styled-components
```
The benefit of this structure is that it makes unit tests much easier as you can test your presentational component and container component individually.

### Redux
#### Q: How should I design my redux state tree?
A: Because the store represents the core of your application, you should define your state shape in terms of your domain data and app state, not your UI component tree. Also redux prefers normalized(flat) state tree.
```js
// Avoid this
state = {
  users: [{
    id: 'xxx',
    name: 'Bo',
    articles: [
      {
        id: '123',
        title: 'xxx',
        content: 'xxx'
      }...
    ]
  }...]
}

// Do this
state = {
  users: [{ id: 'xxx', name: 'Bo', articleIds: ['123']}],
  articles: [{id: '123', title: 'xxx', content: 'xxx'}]
}
```

### React + Redux development

#### Q: How do I fetch data when the app is rendered on the server side?
A: On your page level component (components registered on routes.jsx), you can attach an array of actions by adding a `.load` static attribute to your component.
ex:
```js
MyComponent.load = [myAction1, myAction2];
export default MyComponent;
```
The render flow is the following:
1. React router returns an array of components that needs to be rendered based on requested url
2. Actions of each components are pulled out and dispatched. If an action returns object with `promise` attribute, a promise is returned.
3. All actions have been dispatched and all promises are resolved.
4. Redux store is updated.
5. Components are rendered with update data from store.

#### Q: How do I pass parameters to my actions on server side?
A: When actions are dispatched, your action creators will be called with routerParameters.

#### Q: How do I dispatch another action within an action?
A: When actions are dispatched, your action creators will be called with an argument - `store.dispatch`. Therefore you can dispatch another action within your current action.

#### Q: What chrome extensions/plugins should I use in development?
A:
1. [React devTool](https://www.google.ca/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0ahUKEwi2mfCUkozUAhXljVQKHYx-C6EQFggmMAA&url=https%3A%2F%2Fchrome.google.com%2Fwebstore%2Fdetail%2Freact-developer-tools%2Ffmkadmapgofadopljbjfkapdkoienihi%3Fhl%3Den&usg=AFQjCNEv0udXgBoaukzJa59I_vufhScUbQ)
2. [Redux devTool](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
3. [Immutablejs Formatter](https://chrome.google.com/webstore/detail/immutablejs-object-format/hgldghadipiblonfkkicmgcbbijnpeog)


### CMS
#### Q: How do I use Contentful?
A: Please use this [package](https://github.com/telus/redux-contentful)

#### Q: How do I use Liger?
A: Please use this [package](https://github.com/telus/liger.js)

### Webpack
#### Q: How are environment variables set in client side code?
A: In our webpack config file, we are using the definePlugin to set process.env.APP_ENV={currentEnv} and process.env.BROWSER=true. You can define more env variables in the config based on your need.

#### Q: What's the difference when I run webpack locally and on production/staging box?
A:

When you are developing locally (npm run dev), no css file is being loaded into your app. After HTML is rendered into browser, browser will load the freshly compiled javascript, which contains the style of your application. This js file will then attach styles as inline style to the head of html document. This is why on local development server, you will see your app appear unstyled briefly. Webpack will continuously watch your file changes.

When your app is running on non-development env (npm run start), your source code will be compiled into the following 4 files before the server is started:
- vendor_[hash].css
- vender_[hash].js
- bundle_[hash].js
- bundle_[hash].css

### Debugging in VSCode
#### Q: Can I use the VSCode build debugger to debug my UI?
A: Yes.
1. Install this [extension](https://github.com/Microsoft/vscode-chrome-debug)
2. Add the block below to your `launch.json` and put it inside the `.vscode` folder in your app's root directory.
```
{
  "version": "0.2.0",
  "configurations": [

    {
    "name": "Chrome",
    "type": "chrome",
    "request": "launch",
    "url": "http://local.telus.com:3000/my-telus/spacejam",
    "webRoot": "${workspaceRoot}/ui",
    "userDataDir": "${workspaceRoot}/.vscode/chrome",
    "sourceMaps": true
    }
  ]
}
```
3. Start the app in terminal by running `npm run dev`
4. In VSCode, go to debug panel and select the newly created configuration `Chrome` and click run button
5. Now you can insert breakpoints in your code directly in the editor and inspect variables and call stack
6. Enjoy

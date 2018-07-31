# Personal BoilerPlate

> Boilerplate of AntDesign & Redux-Saga & React & Redux & PLOP

<a href="#"><img width="728" src="https://raw.githubusercontent.com/kenjishiromajp/personal_boilerplate/master/imgs/background_image.png" alt="Personal Boilerplate - AntDesign & Redux-Saga & React & Redux & PLOP" /></a>


# How to run the example application?

- First up jsonserver to use as mock server
```
npm run jsonserver
```
- Then start the application:

```
npm start
```

### File structure
```
app
├── assets
│   └── fonts
├── components // Where you put shared components
│   └── LoadingFullPage
├── containers // Where you put your containers, you must use suffix 'Page' when this container is a Page
│   ├── App
│   ├── LoginPage
│   └── PostPage
│       ├── components // When you create components that belongs exclusively to the container, create the folder components inside of container
│       │   ├── PostCreateButton
│       │   ├── PostEditButton
│       │   ├── PostForm
│       │   └── PostList
│       ├─── actions.js
│       ├─── constants.js
│       ├─── index.js
│       ├─── loadable.js
│       ├─── normalizr.js
│       ├─── reducer.js
│       └─── selectors.js
├── layouts // It is a abstraction of Route, to create Wrapper with common componts among the Pages (Sidebar as example)
│   ├── DefaultLayout
│   │   └── components
│   │       ├── MyHeader
│   │       ├── MyMenuItem
│   │       └── MySidebar
│   └── PrivateDefaultLayout
├── reducers // Where createReducer function is located
├── store // Where is the function to configure the store
└── utils // Where you put shareable functions or classes
configs // Where all configs of webpack are located
generators // Where is the scripts and handlebars files to generate new components, containers and even the CRUD!
├── component
└── container
    ├── components
    │   ├── EntityCreateButton
    │   ├── EntityEditButton
    │   ├── EntityForm
    │   └── EntityList
    ├── crud
    ├── empty
    └── withListOnly
server
└── middlewares
```

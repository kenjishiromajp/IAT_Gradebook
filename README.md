# IAT - Dev Challenge

> Gradebook Manager

<a href="#"><img width="728" src="imgs/background_image.png" alt="IAT - Dev Challenge" /></a>

---
LINK to test application:
https://ancient-waters-70708.herokuapp.com/

# Getting Started

This application is divided on FrontEnd Application (ClientSide - SPA) with React
and Backend (ServerSide - REST WebService) with PHP, so following instructions are to up both services.

**For Both installation, clone the project**
`git clone https://github.com/kenjishiromajp/IAT_Gradebook.git`.

### BACK-END - WEBSERVICE

1.  **Setup Initial Requirement of Server**

    1.  Must have **PHP 7.2.0^** installed on machine
    2.  Must have **composer** for installation of dependencies
    3.  **MySQL** or **MariaDB** for database

2. **Go inside of folder backend**
    
    `cd backend`

3.  **Install Dependencies**

    `composer install`

4.  **Create `gradebook` Database**

    You can use the file `gradebook_dump.sql` to generate database.
    If you wanna change database connection configuration, you can go to `config/db.php` file and change the credentials

5.  **Run the Back End application**

    `php yii serve --port=3001`

After that the webservice is available on link `http://localhost:3001`

---

### FRONT-END - SPA

1.  **Setup Initial Requirement of Server**

    1.  Must have **Node 9.8.0^** installed on machine, we recommend **yarn** for installation of dependencies

2. **Go inside of folder frontend**
    
    `cd frontend`

3.  **Install Dependencies**

    `npm install` or `yarn`

4.  **Run the Front End application**

    `npm start` ou `yarn start`

    This command will run build in `dev` environment and init the web server, and will open the `bundle split configuration page` of application, and `Hot Reload` is implemented for this environment. You can access the application using the link: `http://localhost:3000`.

    By Default this application is sending the requests to `http://localhost:3001`, you must change the variable `API_URL` to change the requests to another server.

If you want to make a `build` just execute the command `npm run build` or `yarn build` and folder `build` will be generated, where you can find the files to send to your web server.

## Credentials to Test the application

If you used the dump there are following users to test the application

| Email                   | Password  |
|-------------------------|-----------|
| admin@admin.com         | admin     |
| principal@principal.com | principal |
| teacher@teacher.com     | teacher   |
| student@student.com     | student   |

## Back End Structure

```code
├── assets                      // Folder with assets
├── config                      // Configuration files folder
│   ├── db.php                  // Database Configuration file 
│   ├── web.php                 // Application Configuration file
│   └── params.php              // Pamaters to get in any part of application, here is the email credentials to Mailer
├── controllers                 // Controller Files Folder
│   └── GradeController.php     
├── dump                        // Folder with dump
├── models                      // Model Files folder
│   └── Student.php            
├── vendor                      // Folder with the vendors installed with composer
├── web                         // Root for the WebService
│   └── index.php               // Entry point of application
├── yii                         // File that we use to up the application
└── composer.json               // File that describes dependencies of application
```

---

## Front End Structure

```code
├── app                         // Folder with the application content
│   ├── ant-theme-vars.less     // Variables to change the colors of Ant Design Framework
│   ├── assets                  // Assets  with images, fonts,  or manifest.json
│   │   ├── antd-style
│   │   │   └── ...
│   │   ├── fonts
│   │   │   └── ...
│   │   ├── img
│   │   │   └── ...
│   │   └── manifest.json
│   ├── components              // Compoonents without connection with some reducer
│   │   ├── Dashboard
│   │   │   └── index.js
│   │   ├── DashboardCardRealTime
│   │   │   ├── index.js
│   │   │   └── style.less
│   │   ├── DateRangePicker
│   │   │   ├── constants.js
│   │   │   ├── index.js
│   │   │   └── utils.js
│   ├── containers              // Complex Components (Pages or connected with Reducer)
│   │   ├── App                 // Component that initialize the application
│   │   │   ├── fileLoads.js
│   │   │   ├── index.js
│   │   │   ├── reducer.js
│   │   │   ├── selectors.js
│   │   │   └── style.less
│   │   ├── DashboardContainer  // Component with Container in the end is connected with reducer.
│   │   │   ├── actions.js
│   │   │   ├── constants.js
│   │   │   ├── index.js
│   │   │   ├── reducer.js
│   │   │   ├── saga.js
│   │   │   └── selectors.js
│   │   ├── Pages       // Folder with pages of application
│   │   │   └── LoginPage      
│   │   │       └── index.js
│   ├── index.html              // Html that initialize the application
│   ├── index.js                // EntryPoint of application
│   ├── layouts                 // Components used as layout
│   │   ├── AdminDefaultLayout
│   │   │   └── ...
│   │   ├── DefaultLayout
│   │   │   └── ...
│   │   └── PrivateDefaultLayout
│   │       └── ...
│   ├── reducers                // function to Inject Reducer
│   │   └── index.js
│   ├── store                   // Export store
│   │   └── index.js
│   └── utils                   // Folder with common function
│       ├── antd-notification.js
│       ├── constants.js
│       ├── formatNumber.js
│       ├── withLoginUser.js
│       └── ...
├── configs                     // webpack configuration
│   ├── _webpack.base.config.js // Common configuration between dev and prod
│   ├── webpack.dev.config.js   // Specific Configuration for dev environment
│   └── webpack.prod.config.js  // Specific Configuration for production environment
├── generators                  // Code Generators
├── package.json
└── server                      // Files of dev server configuration
```

---
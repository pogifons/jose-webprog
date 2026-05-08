# jose-webprog

Sample design pattern: component-based project structure.

```text
jose-webprog/
├── README.md
├── project.drawio
└── jose-client/
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── vite.config.js
    ├── public/
    │   └── vite.svg
    └── src/
        ├── App.jsx
        ├── main.jsx
        ├── assets/
        │   ├── article-content.js
        │   ├── hero.png
        │   ├── react.svg
        │   ├── vite.svg
        │   └── styles/
        │       └── index.css
        ├── components/
        │   ├── ArticleList.jsx
        │   ├── Button.jsx
        │   ├── Footer.jsx
        │   └── NavBar.jsx
        ├── layouts/
        │   ├── AuthLayout.jsx
        │   ├── DashLayout.jsx
        │   └── Layout.jsx
        └── pages/
            ├── NotFoundPage.jsx
            ├── AuthPages/
            │   ├── SignInPage.jsx
            │   └── SignUpPage.jsx
            ├── DashboardPages/
            │   ├── DashboardPage.jsx
            │   ├── ReportsPage.jsx
            │   └── UsersPage.jsx
            └── LandingPages/
                ├── AboutPage.jsx
                ├── ArticleListPage.jsx
                ├── ArticlePage.jsx
                └── HomePage.jsx
```

import './App.css';
import Layout from './assets/components/Layout';
import AboutPage from './assets/pages/AboutPage';
import ArticleListPage from './assets/pages/ArticleListPage';
import ArticlePage from './assets/pages/ArticlePage';
import HomePage from './assets/pages/HomePage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFoundPage from './assets/pages/NotFoundPage';

const routes = [{
  path: '/',
  element: <Layout />,
  // Error element
  errorElement: <NotFoundPage />,
  children: [{
    // Path declaration
    path: '/',
    element: <HomePage />
  },
  {
    path: '/about',
    element: <AboutPage />
  },
  {
    path: '/articles',
    element: <ArticleListPage />
  },
  {
    path: '/articles/:name', // -->articles/learn-react
    element: <ArticlePage />
  }
]
}]

const router = createBrowserRouter(routes);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
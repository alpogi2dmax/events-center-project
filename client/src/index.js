import React from "react";
import App from "./components/App";
import "./index.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);

// const router = createBrowserRouter([
//     {
//       path: '/',
//       element: <App />,
//       errorElement: <ErrorPage />, 
//       children: [
//         {
//           path: '/',
//           element: <EventList />
//         }
//       ]
//     }
//   ])
  
//   const root = ReactDOM.createRoot(document.getElementById('root'));
//   root.render(<RouterProvider router={router} />);

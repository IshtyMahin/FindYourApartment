import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Homepage from './Pages/Homepage/Homepage.jsx';
import MainSection from './Components/MainSection/MainSection.jsx';
import RegisterForm from './Components/RegistrationForm/RegistrationForm.jsx';
import LoginForm from './Components/LoginForm/LoginForm.jsx';
import OwnerPage from './Pages/OwnerPage/OwnerPage.jsx';
import ApartmentForm from './Components/ApartmentForm/ApartmentForm.jsx';
import OwnerCard from './Components/OwnerCard/OwnerCard.jsx';
import SectionFilter from './Components/SectionFilter/SectionFilter.jsx';
import ApartmentDetails from './Components/ApartmentDetails/ApatmentDetails.jsx';
import ProfileCard from './Components/ProfileCard/ProfileCard.jsx';
import ApartmentUpdateForm from './Components/ApartmentUpdateForm/ApartmentUpdateForm.jsx';
import UpdateProfile from './Components/UpdateProfile/UpdateProfile.jsx';
import EmailForRequest from './Components/ResetPassword/EmailForRequest.jsx';
import SetNewPass from './Components/ResetPassword/SetNewPass.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Homepage />,
        children: [
          {
            path: "/",
            element: <MainSection />,
          },
          {
            path: "/filter/:filter",
            element: <SectionFilter />
          },
          
        ]
      },
      {
        path: '/apartmentDetails/:id',
        element: <ApartmentDetails />,
      },
      {
        path: '/apartmentDetails/update/:id',
        element: <ApartmentUpdateForm />,
      },
      {
        path: "/register",
        element: <RegisterForm />
      },
      {
        path: "/login",
        element: <LoginForm />
      },
      {
        path: '/request-reset-Password',
        element: <EmailForRequest/>
      },
      {
        path: '/reset_password/:uid64/:token',
        element: <SetNewPass/>
      },
      {
        path: '/profile',
        element:  <ProfileCard/>
      },

      {
        path: '/profile/update',
        element: <UpdateProfile />
      },
      {
        path: '/dashboard',
        element: <OwnerPage />,
        children: [
          {
            path: '',
            element: <ApartmentForm />
          }, {
            path: 'yourApartment',
            element: <OwnerCard/>
         }
        ]
      }
    ]
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <RouterProvider router={router} />

  </React.StrictMode>,
)

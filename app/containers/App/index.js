/* eslint-disable no-alert */
/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// import SimpleCrypto from 'simple-crypto-js';

import HomePage from 'containers/HomePage/Loadable';
import EmailPage from 'containers/EmailPage/Loadable';
import PasswordResetPage from 'containers/PasswordResetPage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import RegisterPage from 'containers/RegisterPage/Loadable';
import RegisterMerchantPage from 'containers/RegisterMerchantPage/Loadable';
import ServicesPage from 'containers/ServicesPage/Loadable';
import ServicesCategory from 'containers/ServicesCategory/Loadable';
import DirectoryPage from 'containers/DirectoryPage/Loadable';
import ProfessionalsPage from 'containers/ProfessionalsPage/Loadable';
import BlogPost from 'containers/BlogPost/Loadable';
import BlogPage from 'containers/BlogPage/Loadable';
import GalleryPage from 'containers/GalleryPage/Loadable';
import GalleryDetailPage from 'containers/GalleryDetailPage/Loadable';
import DashboardPage from 'containers/DashboardPage/Loadable';
import ChatPage from 'containers/ChatPage/Loadable';
import ProjectsCreatePage from 'containers/ProjectsCreatePage/Loadable';
import ProjectsSelect from 'containers/ProjectsSelectPage/Loadable';
import ProjectsListPage from 'containers/ProjectsListPage/Loadable';
import ContactPage from 'containers/ContactPage/Loadable';
import BusinessProfilePage from 'containers/BusinessProfilePage/Loadable';
import HomeMatchPage from 'containers/HomeMatchPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import PrivacyPolicyPage from 'containers/PrivacyPolicyPage/Loadable';
import TermsOfUsePage from 'containers/TermsOfUsePage/Loadable';

import './app.css';
import AuthRoute from '../AuthRoute';
import VoucherPage from '../VoucherPage/VoucherPage';
import VoucherDetailPage from '../VoucherDetailPage/VoucherDetailPage';

export default function App() {
  return (
    <div>
      <Switch>
        <AuthRoute exact path="/" render={props => <HomePage {...props} />} />
        <AuthRoute
          exact
          path="/privacy-policy"
          render={props => <PrivacyPolicyPage {...props} />}
        />
        <AuthRoute
          exact
          path="/terms-of-use"
          render={props => <TermsOfUsePage {...props} />}
        />
        <AuthRoute path="/emails" render={props => <EmailPage {...props} />} />
        <AuthRoute
          path="/contact"
          render={props => <ContactPage {...props} />}
        />
        <AuthRoute
          path="/business-profile"
          render={props => <BusinessProfilePage {...props} />}
        />
        <AuthRoute
          path="/homematch"
          render={props => <HomeMatchPage {...props} />}
        />
        <AuthRoute
          path="/password_reset"
          render={props => <PasswordResetPage {...props} />}
        />
        <AuthRoute path="/login" render={props => <LoginPage {...props} />} />
        <AuthRoute path="/logout" />
        <AuthRoute
          path="/register"
          render={props => <RegisterPage {...props} />}
        />
        <AuthRoute
          path="/register-merchant"
          render={props => <RegisterMerchantPage {...props} />}
        />
        <AuthRoute
          path="/services/:slug"
          // eslint-disable-next-line react/prop-types
          render={props => <ServicesCategory key={props.location.pathname} {...props} />}
        />
        <AuthRoute
          path="/services"
          render={props => <ServicesPage {...props} />}
        />
        <AuthRoute
          path="/directory"
          render={props => <DirectoryPage {...props} />}
        />
        <AuthRoute
          path="/professionals"
          render={props => <ProfessionalsPage {...props} />}
        />
        <AuthRoute
          path="/articles/:slug"
          render={props => <BlogPost {...props} />}
        />
        <AuthRoute path="/articles" render={props => <BlogPage {...props} />} />

        <AuthRoute
          path="/gallery/:slug"
          render={props => <GalleryDetailPage {...props} />}
        />
        <AuthRoute
          path="/gallery"
          render={props => <GalleryPage {...props} />}
        />
        <AuthRoute
          path="/voucher/:slug"
          render={props => <VoucherDetailPage {...props} />}
        />
        <AuthRoute
          path="/voucher"
          render={props => <VoucherPage {...props} />}
        />
        <AuthRoute
          mustLogIn
          path="/dashboard/account"
          render={props => <DashboardPage currentTab="account" {...props} />}
        />
        <AuthRoute
          mustLogIn
          path="/dashboard/listings"
          render={props => <DashboardPage currentTab="listings" {...props} />}
        />
        <AuthRoute
          mustLogIn
          path="/dashboard/notifications"
          render={props => (
            <DashboardPage currentTab="notifications" {...props} />
          )}
        />
        <AuthRoute
          mustLogIn
          path="/dashboard/favourites"
          render={props => <DashboardPage currentTab="favourites" {...props} />}
        />
        <AuthRoute
          mustLogIn
          path="/dashboard/deals"
          render={props => <DashboardPage currentTab="deals" {...props} />}
        />
        <AuthRoute
          mustLogIn
          path="/dashboard/chat"
          render={props => <ChatPage {...props} />}
        />
        <AuthRoute
          mustLogIn
          path="/dashboard/projects/create"
          render={props => <ProjectsCreatePage {...props} />}
        />
        <AuthRoute
          mustLogIn
          path="/dashboard/projects/select"
          render={props => <ProjectsSelect {...props} />}
        />
        <AuthRoute
          mustLogIn
          path="/dashboard/projects"
          render={props => <ProjectsListPage {...props} />}
        />
        <Redirect from="/dashboard" to="/dashboard/account" />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}

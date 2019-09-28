/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import TemplatePage from '../Common/PageWrapper';
import injectReducer from '../../utils/injectReducer';
import { USERS } from '../../actions/restApi';
import { DAEMON } from '../../utils/constants';
import injectSaga from '../../utils/injectSaga';
import reducer from '../../reducers/user';
import saga from '../../sagas/user';

import './styles.css';
import Subsection from '../../components/Section/Subsection';

const mapDispatchToProps = dispatch => ({
  goTo: payload => {
    dispatch(push(payload.path));
  },
});

const mapStateToProps = state => ({
  users: state.get(USERS.MODEL).toJS(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: USERS.MODEL, reducer });
const withSaga = injectSaga({
  key: USERS.MODEL,
  saga,
  mode: DAEMON,
});

/* eslint-disable react/prefer-stateless-function */
class PrivacyPolicyPage extends React.PureComponent {
  static propTypes = {
    users: PropTypes.object,
    location: PropTypes.object,
    goTo: PropTypes.func,
  };
  state = {};
  render() {
    return (
      <TemplatePage {...this.props}>
        <Subsection
          style={{ marginTop: '40px', textAlign: 'left', width: '80%' }}
        >
          <h1>Privacy Policy</h1>
          <div>
            <p className="innerText">
              This privacy policy has been compiled to better serve those who
              are concerned with how their 'Personally Identifiable Information'
              (PII) is being used online. PII, as described in US privacy law
              and information security, is information that can be used on its
              own or with other information to identify, contact, or locate a
              single person, or to identify an individual in context. Please
              read our privacy policy carefully to get a clear understanding of
              how we collect, use, protect or otherwise handle your Personally
              Identifiable Information in accordance with our website.
            </p>
            <h2 className="innerText">
              <strong>
                What personal information do we collect from the people that
                visit our blog, website or app?
              </strong>
            </h2>
            <p className="innerText">
              When ordering or registering on our site, as appropriate, you may
              be asked to enter your name, email address, phone number or other
              details to help you with your experience.
            </p>
            <p className="grayText">
              <strong>When do we collect information?</strong>
            </p>
            <p className="innerText">
              We collect information from you when you register on our site,
              subscribe to a newsletter, fill out a form, Open a Support Ticket
              or enter information on our site.
            </p>
            <p className="grayText">
              <strong>How do we use your information? </strong>
            </p>
            <p>
              We may use the information we collect from you when you register,
              make a purchase, sign up for our newsletter, respond to a survey
              or marketing communication, surf the website, or use certain other
              site features in the following ways:
            </p>
            <p className="innerText">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>&bull;</strong>To
              personalize your experience and to allow us to deliver the type of
              content and product offerings in which you are most interested.
            </p>
            <p className="innerText">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>&bull;</strong>To improve
              our website in order to better serve you.
            </p>
            <p className="innerText">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>&bull;</strong>To allow us
              to better service you in responding to your customer service
              requests.
            </p>
            <p className="innerText">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>&bull;</strong>To ask for
              ratings and reviews of services or products
            </p>
            <p className="innerText">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>&bull;</strong>To follow up
              with them after correspondence (live chat, email or phone
              inquiries)
            </p>
            <p>&nbsp;</p>
            <p className="grayText">
              <strong>How do we protect your information?</strong>
            </p>
            <p>
              Our website is scanned on a regular basis for security holes and
              known vulnerabilities in order to make your visit to our site as
              safe as possible.
            </p>
            <p>We do not use Malware Scanning.</p>
            <p className="innerText">
              Your personal information is contained behind secured networks and
              is only accessible by a limited number of persons who have special
              access rights to such systems, and are required to keep the
              information confidential. In addition, all sensitive/credit
              information you supply is encrypted via Secure Socket Layer (SSL)
              technology.
            </p>
            <p className="innerText">
              We implement a variety of security measures when a user enters,
              submits, or accesses their information to maintain the safety of
              your personal information.
            </p>
            <p className="innerText">
              All transactions are processed through a gateway provider and are
              not stored or processed on our servers.
            </p>
            <p className="grayText">
              <strong>Do we use 'cookies'?</strong>
            </p>
            <p className="innerText">
              Yes. Cookies are small files that a site or its service provider
              transfers to your computer's hard drive through your Web browser
              (if you allow) that enables the site's or service provider's
              systems to recognize your browser and capture and remember certain
              information. For instance, we use cookies to help us remember and
              process the items in your shopping cart. They are also used to
              help us understand your preferences based on previous or current
              site activity, which enables us to provide you with improved
              services. We also use cookies to help us compile aggregate data
              about site traffic and site interaction so that we can offer
              better site experiences and tools in the future.
            </p>
            <p className="innerText">
              <strong>We use cookies to:</strong>
            </p>
            <p className="innerText">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>&bull;</strong>Help
              remember and process the items in the shopping cart.
            </p>
            <p className="innerText">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>&bull;</strong>Understand
              and save user's preferences for future visits.
            </p>
            <p className="innerText">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>&bull;</strong>Keep track
              of advertisements.
            </p>
            <p className="innerText">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>&bull;</strong>Compile
              aggregate data about site traffic and site interactions in order
              to offer better site experiences and tools in the future. We may
              also use trusted third-party services that track this information
              on our behalf.
            </p>
            <p className="innerText">
              You can choose to have your computer warn you each time a cookie
              is being sent, or you can choose to turn off all cookies. You do
              this through your browser settings. Since browser is a little
              different, look at your browser's Help Menu to learn the correct
              way to modify your cookies.
            </p>
            <p className="innerText">
              If you turn cookies off, Some of the features that make your site
              experience more efficient may not function properly.It won't
              affect the user's experience that make your site experience more
              efficient and may not function properly.
            </p>
            <p className="grayText">
              <strong>Third-party disclosure</strong>
            </p>
            <p>
              We do not sell, trade, or otherwise transfer to outside parties
              your Personally Identifiable Information unless we provide users
              with advance notice. This does not include website hosting
              partners and other parties who assist us in operating our website,
              conducting our business, or serving our users, so long as those
              parties agree to keep this information confidential. We may also
              release information when it's release is appropriate to comply
              with the law, enforce our site policies, or protect ours or
              others' rights, property or safety.
            </p>
            <p>
              However, non-personally identifiable visitor information may be
              provided to other parties for marketing, advertising, or other
              uses.
            </p>
            <p>&nbsp;</p>
            <p className="grayText">
              <strong>Third-party links</strong>
            </p>
            <p className="innerText">
              Occasionally, at our discretion, we may include or offer
              third-party products or services on our website. These third-party
              sites have separate and independent privacy policies. We therefore
              have no responsibility or liability for the content and activities
              of these linked sites. Nonetheless, we seek to protect the
              integrity of our site and welcome any feedback about these sites.
            </p>
            <p className="blueText">
              <strong>Google</strong>
            </p>
            <p>
              Google's advertising requirements can be summed up by Google's
              Advertising Principles. They are put in place to provide a
              positive experience for users.
              https://support.google.com/adwordspolicy/answer/1316548?hl=en
            </p>
            <p className="innerText">
              We use Google AdSense Advertising on our website.
            </p>
            <p className="innerText">
              Google, as a third-party vendor, uses cookies to serve ads on our
              site. Google's use of the DART cookie enables it to serve ads to
              our users based on previous visits to our site and other sites on
              the Internet. Users may opt-out of the use of the DART cookie by
              visiting the Google Ad and Content Network privacy policy.
            </p>
            <p className="innerText">
              <strong>We have implemented the following:</strong>
            </p>
            <p className="innerText">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>&bull;</strong>Google
              Display Network Impression Reporting
            </p>
            <p className="innerText">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>&bull;</strong>Demographics
              and Interests Reporting
            </p>
            <p className="innerText">
              We, along with third-party vendors such as Google use first-party
              cookies (such as the Google Analytics cookies) and third-party
              cookies (such as the DoubleClick cookie) or other third-party
              identifiers together to compile data regarding user interactions
              with ad impressions and other ad service functions as they relate
              to our website.
            </p>
            <p className="innerText">
              <strong>Opting out:</strong>
              <br />Users can set preferences for how Google advertises to you
              using the Google Ad Settings page. Alternatively, you can opt out
              by visiting the Network Advertising Initiative Opt Out page or by
              using the Google Analytics Opt Out Browser add on.
            </p>
            <p className="blueText">
              <strong>California Online Privacy Protection Act</strong>
            </p>
            <p className="innerText">
              CalOPPA is the first state law in the nation to require commercial
              websites and online services to post a privacy policy. The law's
              reach stretches well beyond California to require any person or
              company in the United States (and conceivably the world) that
              operates websites collecting Personally Identifiable Information
              from California consumers to post a conspicuous privacy policy on
              its website stating exactly the information being collected and
              those individuals or companies with whom it is being shared. - See
              more at:
              http://consumercal.org/california-online-privacy-protection-act-caloppa/#sthash.0FdRbT51.dpuf
            </p>
            <p className="innerText">
              <strong>According to CalOPPA, we agree to the following:</strong>
            </p>
            <p className="innerText">Users can visit our site anonymously.</p>
            <p className="innerText">
              Once this privacy policy is created, we will add a link to it on
              our home page or as a minimum, on the first significant page after
              entering our website.
            </p>
            <p className="innerText">
              Our Privacy Policy link includes the word 'Privacy' and can easily
              be found on the page specified above.
            </p>
            <p className="innerText">
              You will be notified of any Privacy Policy changes:
            </p>
            <p className="innerText">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>&bull;</strong>On our
              Privacy Policy Page
            </p>
            <p className="innerText">Can change your personal information:</p>
            <p className="innerText">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>&bull;</strong>By emailing
              us
            </p>
            <p className="innerText">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>&bull;</strong>By calling
              us
            </p>
            <p className="innerText">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>&bull;</strong>By logging
              in to your account
            </p>
            <p className="innerText">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>&bull;</strong>By chatting
              with us or by sending us a support ticket
            </p>
            <p className="innerText">
              <strong>How does our site handle Do Not Track signals?</strong>
            </p>
            <p className="innerText">
              We honor Do Not Track signals and Do Not Track, plant cookies, or
              use advertising when a Do Not Track (DNT) browser mechanism is in
              place.
            </p>
            <p className="innerText">
              <strong>
                Does our site allow third-party behavioral tracking?
              </strong>
            </p>
            <p className="innerText">
              It's also important to note that we allow third-party behavioral
              tracking
            </p>
            <p>&nbsp;</p>
            <p className="blueText">
              <strong>COPPA (Children Online Privacy Protection Act)</strong>
            </p>
            <p>
              When it comes to the collection of personal information from
              children under the age of 13 years old, the Children's Online
              Privacy Protection Act (COPPA) puts parents in control. The
              Federal Trade Commission, United States' consumer protection
              agency, enforces the COPPA Rule, which spells out what operators
              of websites and online services must do to protect children's
              privacy and safety online.
            </p>
            <p className="innerText">
              We do not specifically market to children under the age of 13
              years old.
            </p>
            <p className="innerText">
              Do we let third-parties, including ad networks or plug-ins collect
              PII from children under 13?
            </p>
            <p className="blueText">
              <strong>Fair Information Practices</strong>
            </p>
            <p>
              The Fair Information Practices Principles form the backbone of
              privacy law in the United States and the concepts they include
              have played a significant role in the development of data
              protection laws around the globe. Understanding the Fair
              Information Practice Principles and how they should be implemented
              is critical to comply with the various privacy laws that protect
              personal information.
            </p>
            <p className="innerText">
              <strong>
                In order to be in line with Fair Information Practices we will
                take the following responsive action, should a data breach
                occur:
              </strong>
            </p>
            <p className="innerText">We will notify you via email</p>
            <p className="innerText">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>&bull;</strong>Within 7
              business days
            </p>
            <p className="innerText">
              We also agree to the Individual Redress Principle which requires
              that individuals have the right to legally pursue enforceable
              rights against data collectors and processors who fail to adhere
              to the law. This principle requires not only that individuals have
              enforceable rights against data users, but also that individuals
              have recourse to courts or government agencies to investigate
              and/or prosecute non-compliance by data processors.
            </p>
            <p className="blueText">
              <strong>CAN SPAM Act</strong>
            </p>
            <p>
              The CAN-SPAM Act is a law that sets the rules for commercial
              email, establishes requirements for commercial messages, gives
              recipients the right to have emails stopped from being sent to
              them, and spells out tough penalties for violations.
            </p>
            <p className="innerText">
              <strong>We collect your email address in order to:</strong>
            </p>
            <p className="innerText">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>&bull;</strong>Send
              information, respond to inquiries, and/or other requests or
              questions
            </p>
            <p className="innerText">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>&bull;</strong>Market to
              our mailing list or continue to send emails to our clients after
              the original transaction has occurred.
            </p>
            <p className="innerText">
              <strong>
                To be in accordance with CANSPAM, we agree to the following:
              </strong>
            </p>
            <p className="innerText">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>&bull;</strong>Not use
              false or misleading subjects or email addresses.
            </p>
            <p className="innerText">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>&bull;</strong>Identify the
              message as an advertisement in some reasonable way.
            </p>
            <p className="innerText">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>&bull;</strong>Include the
              physical address of our business or site headquarters.
            </p>
            <p className="innerText">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>&bull;</strong>Monitor
              third-party email marketing services for compliance, if one is
              used.
            </p>
            <p className="innerText">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>&bull;</strong>Honor
              opt-out/unsubscribe requests quickly.
            </p>
            <p className="innerText">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>&bull;</strong>Allow users
              to unsubscribe by using the link at the bottom of each email.
            </p>
            <p className="innerText">
              <strong>
                <br />If at any time you would like to unsubscribe from
                receiving future emails, you can email us at
              </strong>
            </p>
            <p>
              support@sghomeneeds.com and we will promptly remove you from{' '}
              <strong>ALL</strong>correspondence.
            </p>
          </div>
          <p className="blueText">
            <strong>Contacting Us</strong>
          </p>
          <p>
            If there are any questions regarding this privacy policy, you may
            contact us using the information below.
          </p>
          <blockquote className="wp-embedded-content" data-secret="ktaJf7NJk1">
            <p>
              <a href="https://sghomeneeds.com/">SGHomeNeeds</a>
            </p>
          </blockquote>
          <p className="innerText">51 Goldhill Plaza, #08-02</p>
          <p>Singapore, Singapore 308900</p>
          <p className="innerText">Singapore</p>
          <p className="innerText">support@sghomeneeds.com</p>
          <p className="innerText">Last Edited on 2017-11-10</p>
        </Subsection>
      </TemplatePage>
    );
  }
}

export default compose(
  // Put `withReducer` before `withConnect`
  withReducer,
  withSaga,
  withConnect,
)(PrivacyPolicyPage);

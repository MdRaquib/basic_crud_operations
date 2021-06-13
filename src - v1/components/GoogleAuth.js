import React from 'react';

class GoogleAuth extends React.Component {
   state = {isSignedIn: null};

   componentDidMount() {
      window.gapi.load('client:auth2', () => {
         window.gapi.client.init({
            clientId: '425493511238-vanvjmq772a4knd1gp34vvsk0c882t9t.apps.googleusercontent.com',
            scope: 'email'
         }).then(() => {
            this.auth = window.gapi.auth2.getAuthInstance();
            this.setState({isSignedIn: this.auth.isSignedIn.get()});
            this.auth.isSignedIn.listen(this.onAuthChanged);
         });
      });
   }

   onAuthChanged = () => {
      this.setState({isSignedIn: this.auth.isSignedIn.get()});
   };

   onSignInClick = () => {
      this.auth.signIn();
   };

   onSignOutClick = () => {
      this.auth.signOut();
   };

   renderAuthButton() {
      if (this.state.isSignedIn === null) {
         return null;
      } else if (this.state.isSignedIn) {
         return (
            <button onClick={this.onSignInClick} className="ui red google button">
               <i className="google icon"></i>
               Sign Out
            </button>
         )
      } else {
         return(
            <button onClick={this.onSignOutClick} className="ui red google button">
               <i className="google icon" />
               Sign In with google
            </button>
         );
      }
   }

   render () {
      return (
         <div>
            {this.renderAuthButton()}
         </div>
      );
   }   
}

export default GoogleAuth;
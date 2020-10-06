import * as Msal from 'msal';

export default class AccessToken {
  private static instance: AccessToken;

  static accessToken: string;
  static scopes: string[];
  static expiresOn: Date;

  private constructor(
    accessToken: string,
    scopes: string[],
    expiresOn: Date,
  ) {
    AccessToken.accessToken = accessToken;
    AccessToken.scopes = scopes;
    AccessToken.expiresOn = expiresOn;
  }

  static getInstance(
    accessToken: string,
    scopes: string[],
    expiresOn: Date,
  ): AccessToken {
    if (!AccessToken.instance) {
      AccessToken.instance = new AccessToken(accessToken, scopes, expiresOn);
    }

    return AccessToken.instance;
  }
}

/**
 * Method to get the access_token
 * The library MSAL is used for getting the access token that is reused in Tock application
 */
export function getAccessToken(): void {
  const msalConfig = {
    auth: {
      clientId: '2b6cda05-d3eb-43a9-a6c3-3a8e349ab772',
    },
  };

  const loginRequest = {
    scopes: ['user.read', 'mail.send', 'Calendars.ReadWrite'], // optional Array<string>
  };

  const msalInstance = new Msal.UserAgentApplication(msalConfig);

  // if the user is already logged in acquire a token
  if (msalInstance.getAccount()) {
    msalInstance
      .acquireTokenSilent(loginRequest)
      .then((response) => {
        AccessToken.getInstance(
          response.accessToken,
          response.scopes,
          response.expiresOn,
        );
      })
      .catch((err) => {
        // could also check if err instance of InteractionRequiredAuthError if you can import the class.
        if (err.name === 'InteractionRequiredAuthError') {
          return msalInstance
            .acquireTokenPopup(loginRequest)
            .then((response) => {
              AccessToken.getInstance(
                response.accessToken,
                response.scopes,
                response.expiresOn,
              );
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          return console.log(err);
        }
      });
  } else {
    // if the user is not logged set the scopes and open a popup
    msalInstance
      .loginPopup(loginRequest)
      .then(() => { 
        if (msalInstance.getAccount()) {
          msalInstance
            .acquireTokenSilent(loginRequest)
            .then((response) => {
              AccessToken.getInstance(
                response.accessToken,
                response.scopes,
                response.expiresOn,
              );
            })
        }
      })
  }
}

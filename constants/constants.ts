export type authActionType = {
  type: string;
  payload?: string | {};
};

export type newsBlogObj = { banner: string; description: string; id: string; title: string };

export type newsBlogIndex = {
  newsData: newsBlogObj[];
};
export type newsBlogId = {
  newsData: newsBlogObj;
};

export interface intrfcUser {
  uid: string;
  displayName: string;
  email: string;
  emailVerified: boolean;
  photoURL: string;
  creationTime: string;
  lastSignInTime: string;
  isAdmin: boolean;
  isActive: boolean;
  // isAnonymous: boolean,
  // metadata: {},
  // providerData: Array<{}>,
  // refreshToken: string,
  // tenantId: any,
  // delete: any,
  // getIdToken:any,
  // getIdTokenResult:any,
  // reload: any,
  // toJSON: any,
  // phoneNumber:any,
  // providerId:any
}

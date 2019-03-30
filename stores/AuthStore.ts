import autobind from 'autobind-decorator';

import { action, observable, computed } from 'mobx';
import { googleAuth } from '../lib/auth';
import { createContext } from 'react';

class AuthStoreType {
  @observable private userInfo: firebase.UserInfo | null = null;

  constructor() {
    googleAuth.googleAuth.onAuthStateChanged(this.setUser);
  }

  get IsAdmin() {
    return this.userInfo && this.userInfo.email === '0901sj@gmail.com';
  }

  @computed
  get UserInfo() {
    return this.userInfo;
  }

  @autobind
  @action
  setUser(user: firebase.User | null) {
    if (!process.browser || user === null) {
      return;
    }

    this.userInfo = {
      displayName: user.displayName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      photoURL: user.photoURL,
      providerId: user.providerId,
      uid: user.uid,
    };

    console.log(this.userInfo);
  }

  @autobind
  @action
  async signIn() {
    const result = await googleAuth.signIn();

    console.log(result);

    if (result === null) {
      return false;
    }

    this.userInfo = result.user && {
      displayName: result.user.displayName,
      email: result.user.email,
      phoneNumber: result.user.phoneNumber,
      photoURL: result.user.photoURL,
      providerId: result.user.providerId,
      uid: result.user.uid,
    };

    return true;
  }

  @autobind
  @action
  async signOut() {
    const result = await googleAuth.signOut();
    this.userInfo = null;

    return result;
  }
}

export const AuthStore = createContext(new AuthStoreType());

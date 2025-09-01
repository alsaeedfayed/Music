import {
  computed,
  effect,
  inject,
  Injectable,
  signal,
  WritableSignal,
} from '@angular/core';
import { BaseStore } from '../store.base';
import { User_Session } from '@app/core/models/core.models';
import { USER_KEY } from '@app/core/config/keys';
import { ReactiveStorage } from '../../storage/reactive-storage';

@Injectable({
  providedIn: 'root',
})
export class UserState extends BaseStore<User_Session> {
  protected storage = inject(ReactiveStorage);
  //get user session
  protected _session = signal<User_Session | null>(this.loadFromStorage());
  readonly session = computed(() => this._session());
  readonly isAuthenticated = computed(() => !!this._session()?.token);
  readonly userEmail = computed(() => this._session()?.emailId ?? '');

  constructor() {
    super();
    //keep storage in sync with state
    effect(() => {
      const session = this._session();
      if (session) {
        this.storage.set(USER_KEY, JSON.stringify(session));
      } else {
        this.storage.remove(USER_KEY);
      }
    });

    //  this.storage.watch(USER_KEY , this.session()).subscribe((raw) => {
    //    if (!raw) {
    //      this._session.set(null);
    //    } else {
    //      try {
    //        const parsed = JSON.parse(raw) as User_Session;
    //        if (parsed?.token !== this._session()?.token) {
    //          this._session.set(parsed);
    //        }
    //      } catch {
    //        this._session.set(null);
    //      }
    //    }
    //  });
  }

  loadFromStorage(): User_Session | null {
    try {
      const raw = this.storage.get(USER_KEY, null);
      return raw ? (JSON.parse(raw) as User_Session) : null;
    } catch {
      return null;
    }
  }
}

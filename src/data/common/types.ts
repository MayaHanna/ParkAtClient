type Action<T, P> = {
  type: T;
  payload: P;
};

export type ActionCreator<T, P> = (payload: P) => Action<T, P>;
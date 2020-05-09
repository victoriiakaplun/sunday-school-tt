import { PROFILE_REQUESTED, PROFILE_SUCCEED, PROFILE_ERROR } from '../actions/profileActions';

export function getInitialState() {
  return {
    profileData: {},
    loading: false,
    error: false,
  };
}

function profileReducer(prevState, recAction) {
  const handlerMap = {
    [PROFILE_REQUESTED]: (state, action) => ({
      ...state,
      error: false,
      loading: true,
    }),
    [PROFILE_SUCCEED]: (state, action) => ({
      profileData: action.payload,
      error: false,
      loading: false,
    }),
    [PROFILE_ERROR]: (state, action) => ({
      profileData: {},
      error: action.payload,
      loading: false,
    }),
  };
  const handler = handlerMap[recAction.type];
  return handler ? handler(prevState, recAction) : getInitialState();
}

export default profileReducer;

import { AppDispatch } from "../..";
import UserService from "../../../api/UserService";
import { IUser } from "../../../models/IUser";
import { AuthActionsEnum, SetAuthAction, SetErrorAction, SetIsLoadingAction, SetUserAction } from "./types";

export const AuthActionCreators = {
  setUser: (user: IUser): SetUserAction => ({ type: AuthActionsEnum.SET_USER, payload: user }),
  setError: (error: string): SetErrorAction => ({ type: AuthActionsEnum.SET_ERROR, payload: error }),
  setIsAuth: (payload: boolean): SetAuthAction => ({ type: AuthActionsEnum.SET_AUTH, payload: payload }),
  setIsLoading: (payload: boolean): SetIsLoadingAction => ({ type: AuthActionsEnum.SET_LOADING, payload: payload }),
  login: (username: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(AuthActionCreators.setIsLoading(true))
      setTimeout(async () => {
        const response = await UserService.getUsers()
        const mockUser = response.data.find(user => user.username === username && user.password === password)
        if (mockUser) {
          localStorage.setItem('auth', "true")
          localStorage.setItem('username', mockUser.username)
          dispatch(AuthActionCreators.setUser(mockUser))
          dispatch(AuthActionCreators.setIsAuth(true))
        } else {
          dispatch(AuthActionCreators.setError('username or password incorrect'))
        }
        dispatch(AuthActionCreators.setIsLoading(false))
      }, 1000);
    } catch (error) {
      dispatch(AuthActionCreators.setError('error'))
    }
  },
  logout: () => async (dispatch: AppDispatch) => {
    localStorage.removeItem('auth')
    localStorage.removeItem('username')
    dispatch(AuthActionCreators.setUser({} as IUser))
    dispatch(AuthActionCreators.setIsAuth(false))
  }

}
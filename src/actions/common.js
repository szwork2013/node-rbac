/**
 * Created by sun on 16/7/12.
 */
export const Types = {
  COMMON_LOADING: 'LOGIN_LOADING',
  // 左侧菜单合并标识
  COMMON_MENU_COLLAPSE: 'COMMON_MENU_COLLAPSE',
  //标题栏
  COMMON_TITLE: 'COMMON_TITLE',

  COMMON_USER_NAME_SET: 'COMMON_USER_NAME_SET',
  COMMON_USER_INFO_GET: 'COMMON_USER_INFO_GET',
  COMMON_USER_INFO_GET_SUCCESS: 'COMMON_USER_INFO_GET_SUCCESS',
  COMMON_USER_INFO_SAVE: 'COMMON_USER_INFO_SAVE'

};

export const Actions = {
  setLoading(isLoading){
    return {
      type: Types.COMMON_LOADING,
      isLoading: isLoading
    }
  },
  // 合并/展开左侧菜单
  toggleCollapse() {
    return {
      type: Types.COMMON_MENU_COLLAPSE
    }
  },
  // 设置当前页标题
  setPageTitle(title) {
    return {
      type: Types.COMMON_TITLE,
      title
    }
  },
  setUserName(userName) {
    return {
      type: Types.COMMON_USER_NAME_SET,
      userName
    }
  },
  getUserInfo() {
    return {
      type: Types.COMMON_USER_INFO_GET,
    }
  },
  getUserInfoSuccess(data) {
    return {
      type: Types.COMMON_USER_INFO_GET_SUCCESS,
      data
    }
  },
  saveUserInfo(model) {
    return {
      type: Types.COMMON_USER_INFO_SAVE,
      model
    }
  },
};

import fetch from '@/config/fetch'

/**
 * 登陆
 */
export const login = data => fetch('/user/manager/webLogin', data, 'POST');

/**
 * 退出
 */
export const signout = () => fetch('/admin/singout');

/**
 * 获取用户信息
 */
export const getAdminInfo = () => fetch('/admin/info');

/**
 * 获取卡列表
 */
export const getCardList = data => fetch('/credit/card/product/getCardList', data, 'GET');

/**
 * 复核卡片
 */
export const reviewCard = data => fetch('/credit/card/product/examine', data, 'GET');

/**
 * 删除卡片
 */
export const deleteCard = data => fetch('/credit/card/product/delete', data, 'GET');


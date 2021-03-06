// let api = process.env.API_PATH

export default {
    USER_LOGIN: `user/login`, //用户登录

    USER_LIST: `user/userList`, //获取用户列表

    USER_ADD: `user/add`, //添加用户列表

    USER_GET_BY_ID: `user/getUserById`, //根据id获取用户信息

    USER_MODIFY: `user/modify`, //修改用户信息

    USER_DELETE: `user/delete`, //删除用户信息

    GET_ALL_MENUS: `permission/getAllMenus`, //菜单列表

    GET_ALL_PERMISSIONS: `permission/getAllPermissions`, //获取所有的权限列表

    GET_ALL_ROLES: `role/getAllRoles`, //获取所有的角色列表

    ROLE_ADD: `role/add`, //添加角色

    ROLE_MODIFY: `role/modify`, //修改角色信息

    ROLE_DELETE_BY_ID: `role/deleteById`, //删除角色
}

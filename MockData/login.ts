import { resultData } from '../types/common';

interface UserInfo {
    username: string
    password: string
}

// export const interface_login :UserInfo = {
//     username: '用户名|string',
//     password:'用户名|string'
// }

export const Login: Array<{
    query: UserInfo,
    data: resultData
}> = [{
    query: {
        username: '1',
        password: '001'
    },
    data: {
        statusCode: '200',
        data: 'succuess1',
        isException: false,
    }
},{
    query: {
        username: '2',
        password: '002'
    },
    data: {
        statusCode: '200',
        data: 'succuess2',
        isException: false,
    }
},{
    query: {
        username: '3',
        password: '004'
    },
    data: {
        statusCode: '500',
        data: '',
        isException: true,
    }
},]
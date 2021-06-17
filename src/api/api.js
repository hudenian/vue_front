import url from './url'
import { post, get} from './http'
import { reviseParam } from '../util/util'

export function login(data) {
    return post({
        url: url.USER_LOGIN,
        method: 'post',
        data: data
    })
}

export function getAllMenus(data) {
    return post({
        url: url.GET_ALL_MENUS,
        method: 'get',
        data: data
    })
}

export function getUserList(data) {
    const params = reviseParam(data)
    return get({
        url: `${url.USER_LIST}/${params.str}`,
        method: 'get'
    })
}



// //get blockChain overview
// export function getTbBlcokChainInfo() {
//     return post({
//         url: url.GET_TBBLOCK_CHAIN_INFO,
//         method: 'post',
//         data: {}
//     })
// }
// //The amount of transaction information to obtain the current group for a certain period of time
// export function getTxnByLastFourteenDay(data, list) {
//     return post({
//         url: url.GET_TXNBY_LASTFOURTEENDAY,
//         method: 'post',
//         data: data
//     })
// }
//
// /**
//  * 获取区块列表
//  * @param {*} data
//  * @param {*} list
//  */
// export function getTbBlockInfo(data, list) {
//     return post({
//         url: url.GET_TBBLOCK_INFO,
//         method: 'post',
//         data: data
//     })
// }
//
//
// /*
//  * 节点状态统计列表
//  *
//  * */
// export function getNodeStatusStatic() {
//     return post({
//         url: url.GET_NODE_STATUS_STATIC,
//         method: 'post'
//     })
// }
//
// /*
//  * 分页获取交易信息
//  *
//  * */
// //Get a list of transaction information under the current group
// export function getTbTransactionInfo(data) {
//     return post({
//         url: url.GET_TBTRASACTION_INFO,
//         method: 'post',
//         data: data
//     })
// }
//
// //获取所有节点信息
// export function getTbNodeInfo(data, list) {
//     return post({
//         url: url.GET_TBNODE_COMNECTION,
//         method: 'post',
//         data: data
//     })
// }
//
// //根据区块号获取区块信息
// export function getTbBlockByBlockNumber(data, list) {
//     const params = reviseParam(data, list)
//
//     return post({
//         url: `${url.GET_TBBLOCK_BYBLOCKNUMBER}/${params.str}`,
//         method: 'post',
//         data: {}
//     })
// }
//
// export function initGenes(data) {
//     // 初始化创世区块
//     return post({
//         url: url.INIT_GENES,
//         method: 'post',
//         data: data
//     })
// }
//
// export function initNode(data) {
//     // 初始化节点
//     return post({
//         url: url.INIT_NODE,
//         method: 'post',
//         data: data
//     })
// }
// export function addNode(data) {
//     // 添加节点
//     return post({
//         url: url.ADD_NODE,
//         method: 'post',
//         data: data
//     })
// }
//
// export function clearNode(data) {
//     // 清除节点
//     return post({
//         url: url.CLEAR_NODE,
//         method: 'post',
//         data: data
//     })
// }
//
// ////////////////////////////////////////////
//
// /*
//  * 合约列表
//  * /contracts/getContractsInfoByPage
//  * */
// export function getContractsInfoByPage(data) {
//     return post({
//         url: url.GET_CONTRACTS_INFO,
//         method: 'post',
//         data: data
//     })
// }
// /*
//  * 合约详情
//  * /contracts/getAddressInfo
//  * */
// export function getAddressInfo(data) {
//     return post({
//         url: url.GET_ADDRESS_INFO,
//         method: 'post',
//         data: data
//     })
// }
// /*
//  * 合约GET_CONTRACTS_NUMBER
//  * /contracts/getContractsNumber
//  * */
// export function getContractsNumber() {
//     return post({
//         url: url.GET_CONTRACTS_NUMBER,
//         method: 'get'
//     })
// }
// export function getBackendTime() {
//     return post({
//         url: url.GET_BACKEND_TIME,
//         method: 'get'
//     })
// }
//
// //Obtain transaction information based on transaction hash
// export function getTbTransactionByPkHash(data, list) {
//     const params = reviseParam(data, list)
//     return get({
//         url: `${url.GET_TBTRASACTION_BY_PKHASH}/${params.str}`,
//         data,
//         method: 'post'
//     })
// }
//
// // Obtain transaction list in block
// export function getBlockTransactionByNumber(data, list) {
// 	const params = reviseParam(data, list)
// 	return get({
// 		url: `${url.GET_BLOCKTRANSACTION_BY_BLOCKNUMBER}/${params.str}`,
// 		data,
// 		method: 'post'
// 	})
// }
// //Obtain transaction receipt information based on transaction hash
// export function getTbTransactionReceiptByPkHash(data, list) {
//     const params = reviseParam(data, list)
//     return get({
//         url: `${url.GET_TBTRASACTION__RECEIPT_BYPKHASH}/${params.str}`,
//         method: 'get'
//     })
// }
// // add a node
// export function addNodeConfigRow(data) {
//     return post({
//         url: url.ADD_NODECONFIG_ROW,
//         method: 'post',
//         data: data
//     })
// }
// //edit a node
// export function editNodeConfigRow(data) {
//     return put({
//         url: url.EDIT_NODECONFIG_ROW,
//         method: 'put',
//         data: data
//     })
// }
// //delete node
// export function deleteNodeConfigRow(data, list) {
//     const params = reviseParam(data, list)
//     return deleted({
//         url: `${url.DELETE_NODECONFIG_ROW}/${params.str}`,
//         method: 'delete'
//             // data: data
//     })
// }
// export function getTbBlockByBlockHash(data, list) {
//     const params = reviseParam(data, list)
//
//     return post({
//         url: `${url.GET_TBBLOCK_BYBLOCKHASH}/${params.str}`,
//         method: 'post',
//         data: {}
//     })
// }
//
// export function addContract(data) {
//     // add new contract
//     return post({
//         url: url.ADD_CONTRACT,
//         method: 'post',
//         data: data
//     })
// }
//
// export function getContractList(data, list) {
//     //get a list of contracts
//     const params = reviseParam(data, list)
//     return get({
//         url: `${url.GET_CONTRACT_LIST}/${params.str}`,
//         method: 'get'
//     })
// }
//
// export function deleteContract(data, list) {
//     //delete a contract
//     const params = reviseParam(data, list)
//     return deleted({
//         url: `${url.DELETE_CONTRACT}/${params.str}`,
//         method: 'delete'
//     })
// }
//
// export function updateContract(data) {
//     //update a contract
//     return put({
//         url: url.UPDATE_CONTRACT,
//         method: 'put',
//         data: data
//     })
// }
//
// // add a group
// export function addGroup(data) {
//     return post({
//         url: url.ADD_GROUP,
//         method: 'post',
//         data: data
//     })
// }
// //get groups
// export function getGroupList(data) {
//     return get({
//         url: `${url.GET_GROUP_LIST}`,
//         method: 'get'
//     })
// }
// //delete a group
// export function deleteGroup(data) {
//     return deleted({
//         url: `${url.DELETE_GROUP}/${data}`,
//         method: 'delete'
//     })
// }
// //Get contract binary code
// export function getBytecode(data) {
//     return get({
//         url: url.GET_BYTECODE,
//         method: 'post',
//         data: data
//     })
// }
//
// //Get the data needed for transaction parsing based on the transaction hash call
// export function getAnalyzeData(data) {
//     return get({
//         url: url.GET_TRANSACTION_ANALYZEDATA,
//         method: 'post',
//         data: data
//     })
// }
//
// export function getPendingTransactionData(data) {
//     // 获取待处理交易信息
//     return get({
//         url: url.GET_PENDINGTRANSACTION_DATA,
//         method: 'post',
//         data: data
//     })
// }
//
// export function getHeaderSearchData(data) {
//     // 获取header搜索内容
//     return get({
//         url: url.GET_HeaderSearch_DATA,
//         method: 'post',
//         data: data
//     })
// }
//
// export function getBlockInfoByNumber(number) {
//     return post({
//         url: url.GET_TBBLOCK_NUMBER + '/' + number,
//         method: 'post'
//     })
// }

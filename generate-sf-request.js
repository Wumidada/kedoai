// 生成顺丰物流查询请求报文
import CryptoJS from 'crypto-js';
import crypto from 'node:crypto';

// 顺丰物流查询API配置
const SF_CONFIG = {
  // 顾客编码
  clientCode: 'YLQFEHKU',
  // 生产校验码
  checkWord: 'gl4VPZ6KMB3fyRMW9KA9mjBwCTWHDLL0',
  // 服务名
  serviceCode: 'EXP_RECE_SEARCH_ROUTES'
};

/**
 * 生成UUID
 * @returns 随机UUID字符串
 */
const generateUUID = () => {
  return crypto.randomUUID ? crypto.randomUUID() : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

/**
 * 生成13位毫秒级时间戳
 * @returns 13位时间戳字符串
 */
const getTimestamp = () => {
  return Date.now().toString();
};

/**
 * 生成标准JSON报文
 * @param trackingNumber 运单号
 * @returns 标准JSON报文字符串
 */
const generateJSON = (trackingNumber) => {
  return JSON.stringify({
    language: "zh-CN",
    trackingType: "1",
    trackingNumber: [trackingNumber],
    methodType: "1"
  });
};

/**
 * 生成签名（顺丰官方文档标准）
 * @param msgData 业务数据报文
 * @param timestamp 13位时间戳
 * @param checkWord 校验码
 * @returns 签名字符串
 */
const generateSFSignature = (msgData, timestamp, checkWord) => {
  // 构建完整密钥串：msgData + timestamp + checkWord（严格按照官方文档顺序）
  const fullKey = msgData + timestamp + checkWord;
  
  // 步骤1：UTF-8编码
  const wordArray = CryptoJS.enc.Utf8.parse(fullKey);
  
  // 步骤2：MD5加密
  const md5Binary = CryptoJS.MD5(wordArray);
  
  // 步骤3：标准Base64编码
  const base64Result = CryptoJS.enc.Base64.stringify(md5Binary);
  
  return base64Result;
};

// 生成请求报文
const trackingNumber = 'SF5108692139876'; // 示例运单号
const msgData = generateJSON(trackingNumber);
const timestamp = getTimestamp();
const requestID = generateUUID();
const msgDigest = generateSFSignature(msgData, timestamp, SF_CONFIG.checkWord);

// 构建完整的请求参数
const requestParams = {
  partnerID: SF_CONFIG.clientCode,
  requestID: requestID,
  serviceCode: SF_CONFIG.serviceCode,
  timestamp: timestamp,
  msgDigest: msgDigest,
  msgData: msgData
};

console.log('=== 顺丰物流查询请求报文 ===');
console.log('请将以下参数复制到顺丰官方鉴权工具中测试：');
console.log(JSON.stringify(requestParams, null, 2));

// 输出单独的字段，方便复制
console.log('\n=== 单独字段 ===');
console.log('partnerID:', SF_CONFIG.clientCode);
console.log('requestID:', requestID);
console.log('serviceCode:', SF_CONFIG.serviceCode);
console.log('timestamp:', timestamp);
console.log('msgDigest:', msgDigest);
console.log('msgData:', msgData);

// 输出签名计算所需的信息
console.log('\n=== 签名计算信息 ===');
console.log('签名拼接顺序: msgData + timestamp + checkWord');
console.log('msgData:', msgData);
console.log('timestamp:', timestamp);
console.log('checkWord:', SF_CONFIG.checkWord);
console.log('完整密钥串:', msgData + timestamp + SF_CONFIG.checkWord);
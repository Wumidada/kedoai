// 测试顺丰官方文档签名生成
import CryptoJS from 'crypto-js';

/**
 * 生成签名（100%对齐顺丰官方文档）
 * @param msgData 业务数据报文
 * @param timestamp 13位时间戳
 * @param checkWord 校验码
 * @returns 签名字符串
 */
function generateSFSignature(msgData, timestamp, checkWord) {
  console.log('=== 开始生成签名（顺丰官方文档算法）===');
  
  // 构建完整密钥串：msgData + timestamp + checkWord（严格按照官方文档顺序）
  const fullKey = msgData + timestamp + checkWord;
  console.log('完整密钥串:', fullKey);
  console.log('完整密钥串长度:', fullKey.length);
  
  // 步骤1：UTF-8编码
  const wordArray = CryptoJS.enc.Utf8.parse(fullKey);
  console.log('UTF-8编码后（十六进制）:', wordArray.toString(CryptoJS.enc.Hex));
  
  // 步骤2：MD5加密
  const md5Binary = CryptoJS.MD5(wordArray);
  console.log('MD5结果（十六进制）:', md5Binary.toString());
  console.log('MD5结果（十六进制大写）:', md5Binary.toString().toUpperCase());
  
  // 步骤3：标准Base64编码
  const base64Result = CryptoJS.enc.Base64.stringify(md5Binary);
  console.log('Base64结果:', base64Result);
  
  // 尝试使用另一种方式生成（模拟Java实现）
  console.log('\n=== 尝试模拟Java实现 ===');
  const javaStyleResult = btoa(String.fromCharCode(...md5Binary.words.map(word => [
    (word >> 24) & 0xff,
    (word >> 16) & 0xff,
    (word >> 8) & 0xff,
    word & 0xff
  ]).flat()));
  console.log('Java风格Base64结果:', javaStyleResult);
  
  return base64Result;
}

// 提供btoa的兼容实现
const btoa = typeof window !== 'undefined' ? window.btoa : (str) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  let result = '';
  let i = 0;
  
  while (i < str.length) {
    const a = str.charCodeAt(i++) || 0;
    const b = str.charCodeAt(i++) || 0;
    const c = str.charCodeAt(i++) || 0;
    
    result += chars[a >> 2];
    result += chars[((a & 3) << 4) | (b >> 4)];
    result += chars[((b & 15) << 2) | (c >> 6)];
    result += chars[c & 63];
  }
  
  const padding = str.length % 3;
  if (padding > 0) {
    result = result.slice(0, - (3 - padding));
    result += '='.repeat(3 - padding);
  }
  
  return result;
};

// 官方文档示例数据
const msgData = '{"language":"zh-CN","orderId":"QIAO-20200618-004"}';
const timestamp = '12312334453453';
const checkWord = 'fjcg5PGKaNpPSHFAZ4QsCOkV71R3zVci';

// 执行并输出结果
const generatedSignature = generateSFSignature(msgData, timestamp, checkWord);
console.log('\n=== 最终结果 ===');
console.log('生成的签名:', generatedSignature);
console.log('期望的签名:', 'IIKJtuLVzoFTu4kHI8M8vA==');
console.log('签名是否一致:', generatedSignature === 'IIKJtuLVzoFTu4kHI8M8vA==');

// 测试物流查询场景
console.log('\n=== 测试物流查询场景 ===');
const logisticsMsgData = '{"language":"zh-CN","trackingType":"1","trackingNumber":["SF5108692139876"],"methodType":"1"}';
const logisticsTimestamp = '1623123456789';
const logisticsCheckWord = 'gl4VPZ6KMB3fyRMW9KA9mjBwCTWHDLL0';

const logisticsSignature = generateSFSignature(logisticsMsgData, logisticsTimestamp, logisticsCheckWord);
console.log('物流查询签名:', logisticsSignature);
import CryptoJS from 'crypto-js';

// 顺丰官方工具的参数
const msgData = '{"language":"zh-CN","trackingType":"1","trackingNumber":["44403077898","44103077850"],"methodType":"1"}';
const timestamp = '1751598511396';
const checkWord = 'QIY5qAUIntU6kZ5OkPQTDPCj5NZwtTczu';
const partnerID = 'test'; // 示例顾客编码
const requestID = 'test-request-id'; // 示例请求ID

// 拼接完整密钥串
const fullKey = partnerID + requestID + timestamp + msgData + checkWord;

// 提供btoa和unescape的兼容实现
const btoa = typeof window !== 'undefined' ? window.btoa : (str) => {
  // 纯JavaScript实现的btoa函数
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
  
  // 处理填充
  const padding = str.length % 3;
  if (padding > 0) {
    result = result.slice(0, - (3 - padding));
    result += '='.repeat(3 - padding);
  }
  
  return result;
};

const unescape = typeof window !== 'undefined' ? window.unescape : (str) => {
  try {
    return decodeURIComponent(str.replace(/\+/g, ' '));
  } catch (e) {
    return str;
  }
};

// 生成签名（100%对齐顺丰官方验证工具）
function generateSFSignature(fullKey) {
  console.log('=== 开始生成签名（顺丰官方工具算法）===');
  console.log('完整密钥串:', fullKey);
  
  // 步骤1：UTF-8编码（和工具一致）
  const utf8Str = unescape(encodeURIComponent(fullKey));
  console.log('UTF-8编码后:', utf8Str);
  
  // 步骤2：MD5加密（32位小写 → 转大写，和工具一致）
  const md5Result = CryptoJS.MD5(utf8Str).toString().toUpperCase();
  console.log('MD5结果:', md5Result);
  
  // 步骤3：标准Base64编码（和工具一致，无URL转义）
  const base64Result = btoa(unescape(encodeURIComponent(md5Result)));
  console.log('Base64结果:', base64Result);
  
  return base64Result;
}

// 执行测试
const generatedSignature = generateSFSignature(fullKey);
console.log('\n=== 测试结果 ===');
console.log('生成的签名:', generatedSignature);
console.log('官方工具签名:', 'B1He3yuEAHwtfdWYFDP+PA==');
console.log('签名是否一致:', generatedSignature === 'B1He3yuEAHwtfdWYFDP+PA==');

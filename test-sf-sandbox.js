// 测试顺丰沙箱环境签名生成
import CryptoJS from 'crypto-js';

// 官方沙箱测试数据
const msgData = '{"language":"zh-CN","trackingType":"1","trackingNumber":["SF5108692139876"],"methodType":"1"}';
const timestamp = '1773904016284';
const checkWord = 'x6Iu18AfM34PJOGuQW1RJADGbg5ilM2x'; // 沙箱校验码
const expectedSignature = '7SLYGFzfSTEVvPsz+lmhbA==';
const expectedMD5 = 'ed22d8185cdf493115bcfb33fa59a16c';

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
  console.log('完整密钥串:', fullKey);
  
  // 步骤1：UTF-8编码
  const wordArray = CryptoJS.enc.Utf8.parse(fullKey);
  
  // 步骤2：MD5加密
  const md5Binary = CryptoJS.MD5(wordArray);
  const md5Hex = md5Binary.toString();
  console.log('MD5结果（十六进制）:', md5Hex);
  
  // 步骤3：标准Base64编码
  const base64Result = CryptoJS.enc.Base64.stringify(md5Binary);
  console.log('Base64结果:', base64Result);
  
  return { signature: base64Result, md5: md5Hex };
};

// 执行签名生成
const result = generateSFSignature(msgData, timestamp, checkWord);

// 验证结果
console.log('\n=== 验证结果 ===');
console.log('期望的MD5:', expectedMD5);
console.log('实际的MD5:', result.md5);
console.log('MD5是否一致:', result.md5 === expectedMD5);
console.log('期望的签名:', expectedSignature);
console.log('实际的签名:', result.signature);
console.log('签名是否一致:', result.signature === expectedSignature);

// 输出签名计算所需的信息
console.log('\n=== 签名计算信息 ===');
console.log('签名拼接顺序: msgData + timestamp + checkWord');
console.log('msgData:', msgData);
console.log('timestamp:', timestamp);
console.log('checkWord:', checkWord);
console.log('完整密钥串:', msgData + timestamp + checkWord);
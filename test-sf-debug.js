// 详细调试顺丰签名生成
import CryptoJS from 'crypto-js';
import crypto from 'node:crypto';

// 官方文档示例数据
const msgData = '{"language":"zh-CN","orderId":"QIAO-20200618-004"}';
const timestamp = '12312334453453';
const checkWord = 'fjcg5PGKaNpPSHFAZ4QsCOkV71R3zVci';
const expectedSignature = 'IIKJtuLVzoFTu4kHI8M8vA==';

// 构建完整密钥串
const fullKey = msgData + timestamp + checkWord;
console.log('完整密钥串:', fullKey);
console.log('完整密钥串长度:', fullKey.length);

// 1. 使用CryptoJS生成MD5
console.log('\n=== 使用CryptoJS生成MD5 ===');
const wordArray = CryptoJS.enc.Utf8.parse(fullKey);
const md5CryptoJS = CryptoJS.MD5(wordArray);
console.log('MD5 (CryptoJS - 十六进制):', md5CryptoJS.toString());
console.log('MD5 (CryptoJS - Base64):', CryptoJS.enc.Base64.stringify(md5CryptoJS));

// 2. 使用Node.js内置crypto生成MD5
console.log('\n=== 使用Node.js内置crypto生成MD5 ===');
const md5Hash = crypto.createHash('md5');
md5Hash.update(fullKey, 'utf8');
const md5Buffer = md5Hash.digest();
console.log('MD5 (Node.js - 十六进制):', md5Buffer.toString('hex'));
console.log('MD5 (Node.js - Base64):', md5Buffer.toString('base64'));

// 3. 验证官方文档示例
console.log('\n=== 验证官方文档示例 ===');
console.log('官方示例签名:', expectedSignature);

// 4. 尝试不同的拼接方式
console.log('\n=== 尝试不同的拼接方式 ===');
const testCases = [
  { name: '标准顺序', value: msgData + timestamp + checkWord },
  { name: '无空格顺序', value: msgData.replace(/\s/g, '') + timestamp + checkWord.replace(/\s/g, '') },
  { name: '去掉引号', value: msgData.replace(/"/g, '') + timestamp + checkWord.replace(/"/g, '') },
];

testCases.forEach(testCase => {
  console.log(`\n${testCase.name}:`);
  console.log('  密钥串:', testCase.value);
  console.log('  长度:', testCase.value.length);
  
  const md5Hash = crypto.createHash('md5');
  md5Hash.update(testCase.value, 'utf8');
  const md5Buffer = md5Hash.digest();
  console.log('  MD5 (十六进制):', md5Buffer.toString('hex'));
  console.log('  MD5 (Base64):', md5Buffer.toString('base64'));
  console.log('  与官方示例一致:', md5Buffer.toString('base64') === expectedSignature);
});

// 5. 手动计算官方示例的MD5
console.log('\n=== 手动计算官方示例的MD5 ===');
// 官方示例中的完整密钥串
const officialFullKey = '{"language":"zh-CN","orderId":"QIAO-20200618-004"}12312334453453fjcg5PGKaNpPSHFAZ4QsCOkV71R3zVci';
console.log('官方示例密钥串:', officialFullKey);
console.log('长度:', officialFullKey.length);

const md5Hash2 = crypto.createHash('md5');
md5Hash2.update(officialFullKey, 'utf8');
const md5Buffer2 = md5Hash2.digest();
console.log('MD5 (十六进制):', md5Buffer2.toString('hex'));
console.log('MD5 (Base64):', md5Buffer2.toString('base64'));
console.log('与官方示例一致:', md5Buffer2.toString('base64') === expectedSignature);
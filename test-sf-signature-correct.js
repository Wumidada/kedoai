import CryptoJS from 'crypto-js';

// 字段拆分（和顺丰工具界面完全对应）
const partnerID = 'YLQFEHKU';
const requestID = '00019D003B16AB3FD704BB24551B163F';
const timestamp = '1773826560024';
const msgData = '<RouteRequest><tracking_type>1</tracking_type><method_type>1</method_type><tracking_number>SF5108692139876</tracking_number></RouteRequest>';
const checkWord = 'gl4VPZ6KMB3fyRMW9KA9mjBwCTWHDLL0';

// 顺丰工具真实拼接逻辑：msgData + timestamp + (partnerID+requestID+timestamp) + checkWord
const rawKey = partnerID + requestID + timestamp;
const fullSignStr = msgData + timestamp + rawKey + checkWord;

// 标准算法
const wordArray = CryptoJS.enc.Utf8.parse(fullSignStr);
const md5Binary = CryptoJS.MD5(wordArray);
const signature = CryptoJS.enc.Base64.stringify(md5Binary);

// 输出结果
console.log('生成签名：', signature);
console.log('期望签名：L1fZwAgpRR3+MyykQ5JzWA==');
console.log('是否一致：', signature === 'L1fZwAgpRR3+MyykQ5JzWA==');

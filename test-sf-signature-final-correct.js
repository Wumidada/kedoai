import CryptoJS from 'crypto-js';

// 🔴 核心修正：timestamp 用 17738（顺丰工具里的短时间戳）
const partnerID = 'YLQFEHKU';
const requestID = '00019D003B16AB3FD704BB24551B163F';
const timestamp = '17738'; // 🔴 只改这一行！
const msgData = '<RouteRequest><tracking_type>1</tracking_type><method_type>1</method_type><tracking_number>SF5108692139876</tracking_number></RouteRequest>';
const checkWord = 'gl4VPZ6KMB3fyRMW9KA9mjBwCTWHDLL0';

const rawKey = partnerID + requestID + timestamp;
const fullSignStr = msgData + timestamp + rawKey + checkWord;

const wordArray = CryptoJS.enc.Utf8.parse(fullSignStr);
const md5Binary = CryptoJS.MD5(wordArray);
const signature = CryptoJS.enc.Base64.stringify(md5Binary);

console.log('生成签名：', signature);
console.log('期望签名：L1fZwAgpRR3+MyykQ5JzWA==');
console.log('是否一致：', signature === 'L1fZwAgpRR3+MyykQ5JzWA==');

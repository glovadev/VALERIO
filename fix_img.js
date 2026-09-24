const fs = require('fs');
let c = fs.readFileSync('src/components/ProductCard.jsx', 'utf8');

// Replace the image style block - use simple string markers
const startMark = '          style={{\r\n            width: product.volume === "10 ML" ? "160%"';
const endMark = 'onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}}\r\n        />';

const newStyle = `          style={{\r\n            position: "absolute",\r\n            inset: 0,\r\n            width: "100%",\r\n            height: "100%",\r\n            objectFit: product.volume === "10 ML" ? "cover" : "contain",\r\n            objectPosition: "center center",\r\n            display: "block",\r\n            transform: product.volume === "10 ML" ? "scale(1.5)" : "scale(1)",\r\n            transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)"\r\n          }}\r\n          onMouseEnter={(e) => (e.currentTarget.style.transform = product.volume === "10 ML" ? "scale(1.53)" : "scale(1.03)")}\r\n          onMouseLeave={(e) => (e.currentTarget.style.transform = product.volume === "10 ML" ? "scale(1.5)" : "scale(1)")}\r\n        />`;

const startIdx = c.indexOf(startMark);
const endIdx = c.indexOf(endMark) + endMark.length;

if (startIdx === -1) { console.log('Start not found'); process.exit(1); }
if (endIdx === endMark.length - 1) { console.log('End not found'); process.exit(1); }

c = c.slice(0, startIdx) + newStyle + c.slice(endIdx);
fs.writeFileSync('src/components/ProductCard.jsx', c, 'utf8');
console.log('SUCCESS');

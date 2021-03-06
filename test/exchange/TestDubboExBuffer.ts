/*************************基本操作****************************/
import ExBuffer from "../../src/socket/ExBuffer";

//构造一个ExBuffer，采用4个字节（uint32无符号整型）表示包长，而且是little endian 字节序
// var exBuffer = new ExBuffer().uint32Head().littleEndian();
//或者构造一个ExBuffer，采用2个字节（ushort型）表示包长，而且是big endian 字节序 (默认)
// var exBuffer = new ExBuffer().ushortHead().bigEndian();

//只要收到满足的包就会触发事件
// exBuffer.on('data',function(buffer){
//     console.log('>> receive data,length:'+buffer.length);
//     //console.log(buffer);
// });


//传入一个9字节长的数据，分多次put （对应于TCP中的分包的情况）
// exBuffer.put(new Buffer([0,9]));
// exBuffer.put(new Buffer([1,2,3,4,5,6,7]));
// exBuffer.put(new Buffer([8,9]));

//传入一个3个字节的数据和一个6个字节的数据，一次put（对应于TCP中的粘包的情况）
// exBuffer.put(new Buffer([0,3,1,2,3,0,6,1,2,3,4,5,6]));


//大数据处理测试 (20MB)
const exBuffer = new ExBuffer(16,12);
exBuffer.on('data', function (buffer) {
    console.log('>> receive data,length:' + buffer.length);
    console.log(buffer);
});
let dLen = 50;
const headBuf = Buffer.from([0xda, 0xbb, 0xc2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
headBuf.writeUInt32BE(dLen, 12);//写入包长
exBuffer.put(Buffer.concat([headBuf, Buffer.alloc(dLen)], 16 + dLen));


/*************************在socket中的应用****************************/

// console.log('-----------------------use in socket------------------------');


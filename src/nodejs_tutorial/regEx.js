function testGroup()
{
    const str = 'root@locahost:9090/test';
    const regEx = /([^@]+)@([^:]+):(\d+)\/(.*)/;
    const rs = str.match(regEx);
    console.log(rs);
}

testGroup();
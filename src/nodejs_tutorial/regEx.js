function testGroup(str)
{
    const regEx = /([^@]+)@([^:]+):(\d+)\/(.*)/;
    const rs = str.match(regEx);
   
    console.log(rs);
    if (rs && rs.length >= 5) {
        console.log( );
        return rs.slice(1,5);
    }
    return [];
}

let [user, host, port, database] = testGroup('root@locahost:9090/test');
console.log(`${user}@${host}:${port}/${database}`);

[user, host, port, database] = testGroup('root@locahost:9090');
console.log(`${user}@${host}:${port}/${database}`);

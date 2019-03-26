async function f1()
{
    console.log('this is f1');
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            console.log('timeout function')
            resolve('hello');
        }, 1000);
    })
}

async function f2()
{
    console.log('enter f2');
    await f1();
    console.log('exit f2');
}

f2();
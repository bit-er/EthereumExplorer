

var network = 'mainnet'
var provider = new ethers.getDefaultProvider(network)
window.addEventListener('load', function() {
    load();
})
const ChangeFunction = async()=>{
    var selectBox = document.getElementById("select");
    network = selectBox.options[selectBox.selectedIndex].value;
    provider = new ethers.getDefaultProvider(network)
    load()
}
const Search = async()=>{
   
const input = document.getElementById('search').value
if(input.length==66){
    //txs
    getTransaction(input)
}
else if(input.length==42){
    //account
    getAccount(input)
}
else if(isNumber(input)){
    //block
    getblock(parseInt(input))
}
else{
    //ENS Account
    try{
    getAccount(await provider.resolveName(input));
    }
    catch(err){

    }
}

}
const load = async()=>{
    try{
        Clear();
        let header = document.createElement('h1')
        header.innerHTML = 'Last 5 block'
        document.getElementById('content').appendChild(header)
        const lastblock = await provider.getBlockNumber();
        let blocks = [];
        for(let i=lastblock;i>lastblock-5;i--){
            blocks.push(await provider.getBlock(i))
            
            }
        for(let block of blocks){
            NumberAndHash(block.number,block.hash)
            }
    }
    catch{

    }

}
const getAccount= async(address)=>{
    try{
        Clear()
    let content = document.getElementById('content');
    let a = document.createElement('h3')
    a.style.cssText= 'color:#555;margin-bottom: 30px;'
    a.textContent = "Account "+address

    let i = document.createElement('div')
    i.style.cssText="width: 90% ;background-color: #999;border-radius: 10px;margin-bottom:50px"
    i.appendChild(helper("Balance",ethers.utils.formatEther(await provider.getBalance(address))))
    i.appendChild(helper("Number of Transaction", await provider.getTransactionCount(address)))
    
    content.appendChild(a)
    content.appendChild(i)
    }
    catch(err){
        console.log(err)
    }
}
const getTransaction = async(address)=>{
    try{
    const tx = await provider.getTransaction(address)
    if(!tx)throw "err"
    Clear()
    let content = document.getElementById('content');
    let b = document.createElement('h3')
    b.style.cssText= 'color:#555;margin-bottom: 30px;'
    b.textContent = "Block #"+Number

    let i = document.createElement('div')
    i.style.cssText="width: 90% ;background-color: #999;border-radius: 10px;"
    i.appendChild(helper("Transaction Hash",tx.hash))
    i.appendChild(helper("TimeStamp",123))
    i.appendChild(helper("from",tx.from))
    i.appendChild(helper("to",tx.to))
    i.appendChild(helper("value",ethers.utils.formatEther(tx.value)))
    i.appendChild(helper("Gaz Price",ethers.utils.formatEther(tx.gasPrice)))
    i.appendChild(helper("Nonce",tx.nonce))
    i.appendChild(helper("Data",tx.data))
    

    content.appendChild(i)
    }
    catch(err){

    }
}
const getblock = async(Number)=>{
    try{
    const block = await provider.getBlock(Number)
    if(!block)throw 'err'
    Clear()
    let content = document.getElementById('content');
    let i = document.createElement('div')
    i.style.cssText="width: 90% ;background-color: #999;border-radius: 10px;margin-bottom:30px"
    let b = document.createElement('h3')
    b.style.cssText= 'color:#555;margin-bottom: 30px;'
    b.textContent = "Block #"+Number

    i.appendChild(helper("BlockNumber",block.number))
    i.appendChild(helper("TimeStamp",block.timestamp))
    i.appendChild(helper("Hash",block.hash))
    i.appendChild(helper("Previous Hash",block.parentHash))
    i.appendChild(helper2(block.transactions))
    i.appendChild(helper("Nonce",block.nonce))
    i.appendChild(helper("Difficulty",block.difficulty))
    i.appendChild(helper("gas Used",ethers.utils.formatEther(block.gasUsed)+" ETH"))
    i.appendChild(helper("gas limit",ethers.utils.formatEther(block.gasLimit)+" ETH"))
    i.appendChild(helper("Miner",block.miner))
    
    content.appendChild(b)

    content.appendChild(i)
    }
    catch(err){
        console.log(err)
    }

}
const gettransactions = async(txs)=>{
    try{
    let content = document.getElementById('content');
    let t = document.createElement('h3')
    t.style.cssText= 'color:#555;margin-bottom: 30px;color:black;font-size:40px'
    t.textContent = "Just first 10 txs"


    let style='display: flex; justify-content: space-around;align-items: center;background-color: #777;padding: 20px;border-radius: 10px;'
    let header= document.createElement('div')
    header.style.cssText=style

    let txhash=document.createElement('span')
    txhash.style.width='20%'
    txhash.textContent='tx Hash'
    let block=document.createElement('span')
    block.style.width='10%'
    block.textContent='block Number'
    let time=document.createElement('span')
    time.style.width='10%'
    time.textContent='TimeStamp'
    let from=document.createElement('span')
    from.style.width='20%'
    from.textContent='from:'
    let to=document.createElement('span')
    to.style.width='20%'
    to.textContent='to:'
    let value=document.createElement('span')
    value.style.width='10%'
    value.textContent='value:'
    header.appendChild(txhash)
    header.appendChild(block)
    header.appendChild(time)
    header.appendChild(from)
    header.appendChild(to)
    header.appendChild(value)



    let body =document.createElement('div')
    let result=[]
    for( let i=0;i<10;i++){
        result.push(await provider.getTransaction(txs[i])) 
    }
    for( let tx of result){
        body.appendChild(helper3(tx))
    }
        
 
    content.appendChild(t)
    content.appendChild(header)
    content.appendChild(body)
    }
    catch(err){
        console.log(err)
    }

}
const helper = (Name,data)=>{
    let style1='display: flex;justify-content: space-around;align-items: center;'
    let style2='width: 30%;padding: 10px;color: black;font-weight: bold; margin: 5px;'
    let style3='width: 70%;padding: 10px;'

    let result = document.createElement('div')
    result.style.cssText = style1
    let title = document.createElement('span')
    title.style.cssText = style2
    title.innerText=Name + ':'
    let info = document.createElement('span')
    info.style .cssText= style3
    info.innerText = data
    result.appendChild(title)
    result.appendChild(info)
    return result
 
}
const helper2 = (txs)=>{
  

    
    let style1='display: flex;justify-content: space-around;align-items: center;'
    let style2='width: 30%;padding: 10px;color: black;font-weight: bold; margin: 5px;'
    let style3='background-color:#999;border: none; width: 70%;padding: 10px;color: blue;text-decoration: underline;cursor: pointer;'

    let result = document.createElement('div')
    result.style.cssText = style1
    let title = document.createElement('span')
    title.style.cssText = style2
    title.innerText=  'Transactions:'
    let info = document.createElement('p')
    info.href="#"
    info.style .cssText= style3
    info.addEventListener("click", function(e) {
        Clear()
        gettransactions(txs)
    }, false);
    info.innerText = 'Transactions (WAIT)'
    
    result.appendChild(title)
    result.appendChild(info)
    return result

}
const helper3 = (tx)=>{

    let style1='display: flex; justify-content: space-around;align-items: center;margin: 20px;'
    let style2='white-space: nowrap; overflow: hidden;text-overflow: ellipsis;'

    let result=document.createElement('div')
    result.style.cssText=style1;

    let txhash=document.createElement('span')
    txhash.style.cssText=style2
    txhash.style.width='20%'
    txhash.textContent=tx.hash
    let block=document.createElement('span')
    block.style.cssText=style2
    block.style.width='10%'
    block.textContent=tx.blockNumber
    let time=document.createElement('span')
    time.style.cssText=style2
    time.style.width='10%'
    time.textContent=123
    let from=document.createElement('span')
    from.style.cssText=style2
    from.style.width='20%'
    from.textContent=tx.from
    let to=document.createElement('span')
    to.style.cssText=style2
    to.style.width='20%'
    to.textContent=tx.to
    let value=document.createElement('span')
    value.style.cssText=style2
    value.style.width='10%'
    value.textContent=tx.value
    result.appendChild(txhash)
    result.appendChild(block)
    result.appendChild(time)
    result.appendChild(from)
    result.appendChild(to)
    result.appendChild(value)
    return result;

}
const NumberAndHash= (number,hash)=>{

    let content = document.getElementById('content');
    let block = document.createElement('div');
    block.id='block'
    block.style.cssText = 'border-radius: 10px; margin: 10px auto; width:80%;height:50px; background-color: #bbb;display: flex;flex-direction: row;justify-content: space-around;align-items: center;'
    let blockNumber = document.createElement('blockNumber')
    blockNumber.id = 'blockNumber'
    let Number = document.createElement('p')
    Number.style.color='blue'
    Number.style.cursor= 'pointer';
    Number.href=""
    Number.textContent=number
    Number.addEventListener('click', function() {
        Clear()
        getblock(parseInt(Number.textContent))
    })
    blockNumber.appendChild(Number)
    blockNumber.style.cssText = 'width: 33%;height: 80%;  display: flex;justify-content: space-around;align-items: center;'
    let blockHash = document.createElement('blockHash')
    blockHash.id = 'blockHash';
    let Hash = document.createElement('div')
    Hash.href=""
    Hash.textContent= hash
    blockHash.appendChild(Hash)
    blockHash.style.cssText = 'width: 66%;height: 80%;   display: flex;justify-content: space-around;align-items: center;white-space: nowrap; overflow: hidden;text-overflow: ellipsis;'
    block.appendChild(blockNumber);
    block.appendChild(blockHash)
    content.appendChild(block)

}
const Clear= ()=>{
    document.getElementById('content').innerHTML='';
}

function isNumber(num){
   for(let i=0; i<num.length; i++){
    let c = num.charCodeAt(i);
    if(c>57 || c<48)return false;
   }

    return true;
}
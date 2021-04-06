const SHA256  = require('crypto-js/sha256');

class Block{
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index,
        this.timestamp = timestamp, 
        this.data = data, 
        this.previousHash = previousHash,
        this.hash = this.calculateHash()

    }

    //idenitfy block on the blockchain
    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

//string that contains hash before this

class Blockchain{
    constructor(){
        this.chain = [this.createGensisBlock()];
    }

    createGensisBlock(){
        return new Block(0, '01//01/2021', 'Gensis Block', '0');
    }

    getLatestBlock(){
        return this.chain[this.chain.length -1 ]
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();//recalculating hash
        this.chain.push(newBlock);
    }

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[ i ];
            const previousBlock = this.chain[ i - 1 ];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                return false
            }
        }
        return true;
        }
    }


//to test

let aliciaCoin = new Blockchain();
aliciaCoin.addBlock(new Block(1, '13/04/2021', {amount: 4}));
aliciaCoin.addBlock(new Block(2, '07/04/2021', {amount: 10}));



//console.log(JSON.stringify(aliciaCoin, null, 4))

aliciaCoin.chain[1].data={amount: 100};

console.log('is blockchain valid? ' + aliciaCoin.isChainValid())
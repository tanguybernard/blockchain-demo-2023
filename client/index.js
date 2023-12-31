const Web3 = require('web3');
const MyContract = require('../server/build/contracts/DocRegistry.json');
const ganache = "http://127.0.0.1:8545"
const main = async () => {

  const hashToSave = "0x644bcc7e564373040999aac89e7622f3ca71fba1d972fd94a31c3bfbf24e3938";

  const web3 = new Web3.Web3(ganache)


  const id = await web3.eth.net.getId();
  console.log(id)
  const deployedNetwork = MyContract.networks[id];

  let contract = new web3.eth.Contract(
    MyContract.abi,
    deployedNetwork.address
  );

  const accounts = await web3.eth.getAccounts();
  const address = accounts[0]
  console.log(accounts)
  try {
    const receipt = await contract.methods.storeHash(hashToSave).send({
      from: address,
      gas: 3000000,
    });

    console.log(receipt);




  } catch (error) {

    console.log(error)
    next(error)

  }
}

main().catch(e => console.log(e));


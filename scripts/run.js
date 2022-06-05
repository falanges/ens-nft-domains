const main = async () => {
  const [owner, superCoder] = await hre.ethers.getSigners();
  const domainContractFactory = await hre.ethers.getContractFactory("Domains");
  const domainContract = await domainContractFactory.deploy("falanges");
  await domainContract.deployed();
  // console.log("Contract deployed to:", domainContract.address);
  console.log("Contract owner:", owner.address);

  //let txn = await domainContract.register("loveyou", {
  //  value: hre.ethers.utils.parseEther("0.1"),
  //});
  let txn = await domainContract.register("a16z", {
    value: hre.ethers.utils.parseEther("1234"),
  });
  await txn.wait();

  //const address = await domainContract.getAddress("loveyou");
  //console.log("Owner of domain loveyou:", address);

  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance: ", hre.ethers.utils.formatEther(balance));
  try {
    txn = await domainContract.connect(superCoder).withdraw();
    await txn.wait();
  } catch (error) {
    console.log("Could not rob contract");
  }
  let ownerBalance = await hre.ethers.provider.getBalance(owner.address);
  console.log(
    "Balance of owner before withdrawal:",
    hre.ethers.utils.formatEther(ownerBalance)
  );

  // Oops, looks like the owner is saving their money!
  txn = await domainContract.connect(owner).withdraw();
  await txn.wait();

  // Fetch balance of contract & owner
  const contractBalance = await hre.ethers.provider.getBalance(
    domainContract.address
  );
  ownerBalance = await hre.ethers.provider.getBalance(owner.address);

  console.log(
    "Contract balance after withdrawal:",
    hre.ethers.utils.formatEther(contractBalance)
  );
  console.log(
    "Balance of owner after withdrawal:",
    hre.ethers.utils.formatEther(ownerBalance)
  );
};
//txn = await domainContract.connect(randomPerson).setRecord("loveyou", "Haha my domain now!");
//await txn.wait();

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();

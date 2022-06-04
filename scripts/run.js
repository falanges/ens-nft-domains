const main = async () => {
  //  const [owner, randomPerson] = await hre.ethers.getSigners();
  const domainContractFactory = await hre.ethers.getContractFactory("Domains");
  const domainContract = await domainContractFactory.deploy("falanges");
  await domainContract.deployed();
  console.log("Contract deployed to:", domainContract.address);
  //  console.log("Contract deployed by:", owner.address);

  let txn = await domainContract.register("loveyou", {
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await txn.wait();

  const address = await domainContract.getAddress("loveyou");
  console.log("Owner of domain loveyou:", address);

  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance: ", hre.ethers.utils.formatEther(balance));
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

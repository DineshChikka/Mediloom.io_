const fs = require("fs");
const path = require("path");

async function main() {
  const MediloomFileStorage = await ethers.getContractFactory("MediloomFileStorage");
  const contract = await MediloomFileStorage.deploy();
  await contract.waitForDeployment();

  const address = await contract.getAddress();
  const abi = JSON.parse(MediloomFileStorage.interface.formatJson());

  console.log("✅ Contract deployed to:", address);

  // Save to deployments folder
  const deploymentsDir = path.join(__dirname, "..", "deployments");
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir);
  }

  const deploymentInfo = {
    address,
    abi,
    deployedAt: new Date().toISOString(),
    network: "localhost"
  };

  const outputPath = path.join(deploymentsDir, "MediloomFileStorage.json");
  fs.writeFileSync(outputPath, JSON.stringify(deploymentInfo, null, 2));

  console.log("📄 Deployment info saved to:", outputPath);

}
main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});

import { ethers } from "hardhat";

const main = async () => {
  // WavePortalコントラクトがコンパイルされる
  // getContractFactory関数は、デプロイをサポートするライブラリのアドレスとWavePortalコントラクトの連携を行っている
  const waveContractFactory = await ethers.getContractFactory("WavePortal");

  // HardhatがローカルのEthereumネットワークを、コントラクトのためだけに作成
  // コントラクトを実行するたびに、毎回ローカルサーバーを更新するかのようにブロックチェーンが新しくなる
  const waveContract = await waveContractFactory.deploy();

  // WavePortalコントラクトが、ローカルのブロックチェーンにデプロイされるまで待つ処理を行っている
  const wavePortal = await waveContract.deployed();

  console.log("WavePortal address: ", wavePortal.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();

import { ethers } from "hardhat";

const main = async () => {
  // Hardhatが提供する任意のアドレスを返す関数
  const [owner, randomPerson] = await ethers.getSigners();

  // WavePortalコントラクトがコンパイルされる
  // getContractFactory関数は、デプロイをサポートするライブラリのアドレスとWavePortalコントラクトの連携を行っている
  const waveContractFactory = await ethers.getContractFactory("WavePortal");

  // HardhatがローカルのEthereumネットワークを、コントラクトのためだけに作成
  // コントラクトを実行するたびに、毎回ローカルサーバーを更新するかのようにブロックチェーンが新しくなる
  const waveContract = await waveContractFactory.deploy();

  // WavePortalコントラクトが、ローカルのブロックチェーンにデプロイされるまで待つ処理を行っている
  const wavePortal = await waveContract.deployed();

  console.log("WavePortal deployed to: ", wavePortal.address);
  console.log("WavePortal deployed by: ", owner.address);

  let waveCount = await waveContract.getTotalWaves();
  let waveTxn = await waveContract.wave();
  await waveTxn.wait();

  waveCount = await waveContract.getTotalWaves();

  // ほかのユーザーがあなたに「👋（wave）」を送った状態をシミュレーションしている
  waveTxn = await waveContract.connect(randomPerson).wave();
  await waveTxn.wait();

  waveCount = await waveContract.getTotalWaves();
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

// SPDXライセンス識別子: ソフトウェア・ライセンスの種類が一目でわかるようにするための識別子
// WavePortal.sol
// SPDX-Licence-Identifier: MIT

pragma solidity ^0.8.17;

import "hardhat/console.sol";

// contract ≒ class
contract WavePortal {
  // 状態変数
  // WavePortalコントラクトのストレージに永続的に保存される
  uint256 totalWaves;

  constructor() {
    console.log("Here is my first smart contract");
  }

  // public
  // それらが定義されているコントラクト、そのコントラクトが継承された別のコントラクト、それらコントラクトの外部と、基本的にどこからでも呼び出すことができる
  function wave() public {
    totalWaves += 1;
    // msg.sender: 関数を呼び出した人（＝あなたに「👋（wave）」を送った人）のウォレットアドレス
    console.log("%s has waved!", msg.sender);
  }

  // Solidity開発では関数修飾子を意識しておかないとデータを記録する際のコスト（＝ガス代）が跳ね上がってしまうので注意
  // view: 読み取り専用の関数であり、呼び出した後に関数の中で定義された状態変数が変更されない
  function getTotalWaves() public view returns (uint256) {
    console.log("We have %d total waves!", totalWaves);
    return totalWaves;
  }
}

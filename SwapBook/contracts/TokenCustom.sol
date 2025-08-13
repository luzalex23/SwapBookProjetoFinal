// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC20.sol";

contract TokenCustom is ERC20 {
    constructor(string memory name_, string memory symbol_) ERC20(name_, symbol_) {
        // Mint inicial opcional (pode ser feito no deploy via Ignition)
    }

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}

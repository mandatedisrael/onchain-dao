// contracts/GovernanceToken.sol
// SPDX-Licence-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

contract GovernanceToken is ERC20Votes {
    uint256 public maxSupply = 1000000000000000000000000;

    constructor() ERC20("GovernanceToken", "GT") ERC20Permit("GovernanceToken") {
        _mint(msg.sender, maxSupply);
    }

    // overiding some functions required by solidity

    function _afterTokenTransfer(
        address from,
        address to,
        uint256 amount) internal override(ERC20Votes) {
            super._afterTokenTransfer(from, to, amount);
        }

        function _mint(
            address account, uint256 amount
            ) internal override(ERC20Votes) {
            super._mint(account, amount);
        }

        function _burn(
            address account, uint256 amount
            ) internal override(ERC20Votes) {
            super._burn(account, amount);
        }
}


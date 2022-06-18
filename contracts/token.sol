// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";

interface validator{
    function addValidator(address _address) external;
    function removeValidator(address _address) external;
}

contract Proton is ERC20, ERC20Burnable, Ownable, ERC20Permit {
    constructor() ERC20("Proton", "PTON") ERC20Permit("Proton") {}
    address public validatorContract;

    function setValAddress(address _address) public onlyOwner {
        validatorContract = _address;
    }

    function mint(address to, uint256 amount) public onlyOwner {

        bool isAlreadyVal;

        if(balanceOf(to) >= 25) {
            isAlreadyVal = true;
        } else {
            isAlreadyVal = false;
        }

        _mint(to, amount);

        if(balanceOf(to) >= 25 && !isAlreadyVal){
            validator(validatorContract).addValidator(to);
        } else if(balanceOf(to) < 25 && isAlreadyVal){
            validator(validatorContract).removeValidator(to);
        }
    }

    // Disable Transfer
    function transfer(address to, uint256 amount) public virtual override returns (bool) {

        require(msg.sender == address(0),"Cannot transfer Proton(PTON) Tokens");

        // address owner = _msgSender();

        // bool isAlreadyVal;

        // if(balanceOf(to) >= 25) {
        //     isAlreadyVal = true;
        // } else {
        //     isAlreadyVal = false;
        // }

        // _transfer(owner, to, amount);

        // if(balanceOf(to) >= 25 && !isAlreadyVal){
        //     validator(validatorContract).addValidator(to);
        // } else if(balanceOf(to) < 25 && isAlreadyVal){
        //     validator(validatorContract).removeValidator(to);
        // }

        return false;
    }
}

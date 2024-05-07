// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

interface IERC20 {
    function balanceOf(address account) external view returns (uint256);

    function transfer(address recipient, uint256 amount) external returns (bool);
    
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    
    function allowance(address owner, address spender) external view returns (uint256);

    function approve(address spender, uint256 amount) external returns (bool);
}


contract Buildings {
    address public owner;
    address public usdtToken;

    mapping(address => uint256) public userBuildings;
    
    constructor(address _usdtToken){
        owner = msg.sender;
        usdtToken = _usdtToken;
    }
    
    function buyBuilding() public {
        uint256 buildingPrice = 100000000;
        require(userBuildings[msg.sender] <= 2, "You can purchase a maximum of 3 buildings !");
        require(IERC20(usdtToken).balanceOf(msg.sender) >= buildingPrice, "Insufficient USDT balance!");
        IERC20(usdtToken).transferFrom(msg.sender, address(this), buildingPrice);
        userBuildings[msg.sender]++;
    }
    
    function getContractTokenBalance() public view returns(uint){
        return IERC20(usdtToken).balanceOf(address(this)) ; 
    }
    
    function getWalletTokenBalance(address _account) public view returns(uint){
        return IERC20(usdtToken).balanceOf(_account) ; 
    }
    
    function withdrawAllTokens() public {
        require(msg.sender == owner, "Only owner can withdraw !");
        IERC20(usdtToken).transfer(msg.sender, getContractTokenBalance());
    }
}
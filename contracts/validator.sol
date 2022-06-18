// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.7;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol";

contract validator {

    using SafeMath for uint256;
    uint256 public valCount;
    address public ownerAddress;
    address public protonAddress;
    mapping(string => site) public sitelist;
    mapping(address => bool) private validatorList; 
    ERC20 protonToken;

    struct site {
        address nominee;
        string comment;   
        string ipfsScreenshot; 
        uint256 yesVotes;
        uint256 noVotes;
        mapping(address => bool) votedYes;
        mapping(address => bool) votedNo;
    }

    event siteAdded(address indexed _nominee, string _url, string _comment, string _screenshot);
    event voted(address indexed _validator, bool _isScam);

    constructor(address _protonAddress) {
        ownerAddress = msg.sender;
        protonAddress = _protonAddress;
        protonToken = ERC20(_protonAddress);
    } 

    function addSite(string memory _url, string memory _comment, string memory _screenshot) public {

        site storage s = sitelist[_url];

        require(bytes(s.comment).length == 0,"Site Already Added");
        require(protonToken.balanceOf(msg.sender) >= 1, "Token Balance too low. Required minimum of 1 Proton");

        s.nominee = msg.sender;
        s.comment = _comment;
        s.ipfsScreenshot = _screenshot;

        emit siteAdded(msg.sender, _url, _comment, _screenshot);

    }

    function castVote(string memory _url, bool _isScam) public onlyValidator { 

        site storage s = sitelist[_url];

        require(!s.votedYes[msg.sender] && !s.votedNo[msg.sender], "Already Voted");

        if(_isScam){
            s.yesVotes += 1;
            s.votedYes[msg.sender] = true;
        } else {
            s.noVotes += 1;
            s.votedNo[msg.sender] = true;
        }

        emit voted(msg.sender, _isScam);

    }

    function getVoteStatus(string memory _url) public view returns (uint, string memory) {

        site storage s = sitelist[_url];

        require(s.nominee != address(0),"Site not Added");
		
		if(s.yesVotes > 0 || s.noVotes > 0) {
			//uint256 totalVotes = s.yesVotes.add(s.noVotes);
			uint256 votePercent = s.yesVotes.mul(10 ** 2).div(valCount);   
			//uint256 votePercent = SafeMath.mul(SafeMath.div(s.yesVotes, SafeMath.add(s.yesVotes, s.noVotes)), 100);
			string memory voteStatus;

			if(votePercent > 50){
				voteStatus = "TRUE";
			}else{
				voteStatus = "FALSE";
			}
			return (votePercent, voteStatus);
		} else {
			return(0, "Voting in Progress");
		}
			
    }

    function getSiteInfo(address _address, string memory _url) public view returns(address, string memory, string memory, uint256, uint256, string memory) {
        site storage s = sitelist[_url];
        string memory voteStatus;
        if(s.votedYes[_address]){
            voteStatus = "YES";
        }else if(s.votedNo[_address]) { 
            voteStatus = "NO";
        } else {
            voteStatus = "Voting in Progress";
        }
        return (s.nominee, s.comment, s.ipfsScreenshot, s.yesVotes, s.noVotes, voteStatus);
    } 

    function addValidator(address _address) external {
        valCount += 1;
        validatorList[_address] = true;
    }

    function removeValidator(address _address) external {           
        valCount -= 1;
        validatorList[_address] = false;
    }

    // function validatorCount() public view returns(uint256) {
    //     return valCount;
    // }

    // function executePenalise() public {

    // }

    // function executeReward() public {

    // }

    modifier onlyValidator {
        require(protonToken.balanceOf(msg.sender) >= 25, "Token Balance too low. Required minimum of 25 Protons");
        _;
    }

    modifier onlyOwner {
        require(msg.sender == ownerAddress, "Unauthorized Owner Address");
        _;
    }

    modifier onlyProton {
        require(msg.sender == protonAddress, "Access Denied");
        _;
    }

}
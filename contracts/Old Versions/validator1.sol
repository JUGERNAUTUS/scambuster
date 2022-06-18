// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract validator {

    using SafeMath for uint256;

    ERC20 protonToken = ERC20(0x29794fCC95837D24b89906EB202F3408C39826bC);

    struct site {
        address nominee;
        string comment;
        uint256 yesVotes;
        uint256 noVotes;
        mapping(address => bool) votedYes;
        mapping(address => bool) votedNo;
    }

    mapping(string => site) public sitelist;

    event siteAdded(address indexed _nominee, string indexed _url, string indexed _comment);
    event voted(address indexed _validator, bool indexed _isScam);

    function addSite(string memory _url, string memory _comment) public {

        site storage s = sitelist[_url];

        require(bytes(s.comment).length == 0,"Site Already Added");
        require(protonToken.balanceOf(msg.sender) >= 1, "Token Balance too low. Required minimum of 1 Proton");

        s.nominee = msg.sender;
        s.comment = _comment;

        emit siteAdded(msg.sender, _url, _comment);

    }

    function castVote(string memory _url, bool _isScam) public onlyValidator { 

        site storage s = sitelist[_url];

        require(!s.votedYes[msg.sender] && !s.votedNo[msg.sender], "Already Voted");

        if(_isScam){
            s.yesVotes += protonToken.balanceOf(msg.sender);
            s.votedYes[msg.sender] = true;
        } else {
            s.noVotes += protonToken.balanceOf(msg.sender);
            s.votedNo[msg.sender] = true;
        }

        emit voted(msg.sender, _isScam);

    }

    function getVoteStatus(string memory _url) public view returns (uint, bool) {

        site storage s = sitelist[_url];

        require(s.yesVotes > 0 || s.noVotes > 0, "No Votes Registered Yet");

        uint256 totalVotes = s.yesVotes.add(s.noVotes);
        uint256 votePercent = s.yesVotes.mul(10 ** 2).div(totalVotes);
        //uint256 votePercent = SafeMath.mul(SafeMath.div(s.yesVotes, SafeMath.add(s.yesVotes, s.noVotes)), 100);
        bool voteStatus;

        if(votePercent > 50){
            voteStatus = true;
        }else{
            voteStatus = false;
        }
        return (votePercent, voteStatus);
    }

    // function executePenalise() public {

    // }

    // function executeReward() public {

    // }

    modifier onlyValidator {
        require(protonToken.balanceOf(msg.sender) >= 25, "Token Balance too low. Required minimum of 25 Protons");
        _;
    }

}
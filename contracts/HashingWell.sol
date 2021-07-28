// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract HashingWell {

   event WishMade(bytes32 wish); 
   event DrainWishes();

   function hashWish(bytes32 _wish) public {
     emit WishMade(_wish);
   }

   function drainWishes() public {
      emit DrainWishes();
   }

  }

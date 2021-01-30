/* prompt: A palindromic number reads the same both ways. The largest palindrome 
made from the product of two 2-digit numbers is 9009 = 91 × 99. Find the largest 
palindrome made from the product of two 3-digit numbers.*/ 

// need to be able to test if a given number is a palindrome
// then we can simply iterate over the possible pairs of 3-digit numbers
// brute-force would have us test every possible 3 digit number against 100
// and then iterate to 101 and test every possible 3 digit number against that
// but this duplicates work because we'd be testing 100 * 101 AND 101 * 100
// so instead iterate from 100 to 999 and test it against every number greater or equal
// test for palindrome status by comparing first/last, then second/second-to-last, etc.
// when we get to the middle we'll either have a single digit, which needs no test
// or we'll find ourselves with two numbers, which do need a test
// we can account for these by simply determining if there are even or odd # of digits

//
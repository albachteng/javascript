# Hash Tables: 

A hash table is an array organized such that we use a hash function to turn keys into index numbers. 

## Properties: 
- must be *deterministic* H(x) = y and must always be the same
— if H(x) = H(y) then x and y might be the same value, but we can’t be sure. 
— if H(x) != H(y) then x and y are definitely not be the same value 

(if we have already computed hash values, we can use the hash equivalences to determine which keys we should check and avoid unnecessary work - works for entire files too although the hash functions are much more sophisticated)

We try very hard to make *uniform* hash functions to minimize the number of *collisions*. 

Keys you use must be *immutable* - they cannot be changed. 

## Hash collisions: 

### Separate Chaining: 
using a separate, auxiliary data structure like a linked list (most common) or a binary tree, etc. Hybrid approaches exist that switch from a linked list to a balanced binary search tree after the linked list gets too long for a single hash value.

Once there are too many elements, best practice is to create a new HT with a larger capacity and re-hash them into the new larger table

## Open Addressing: 
when you reach a collision, use a separate function (*“probing function”*) to find an open slot instead. This can be another hash (*“double hashing”*), a linear function (*“linear probing”*), a quadratic function (*“quadratic probing”*) or something along the lines of an *RNG*. 

The important thing is to avoid *cycles* with your probing function [P(x)] that are smaller than the current max-length of the hash table. It’s best, in fact, if the cycle is *exactly* as large as the table. How do you do that? It depends on the method…

## Linear: 
P(x) = ax

The *load factor* is generally represented by *alpha* (a here) and refers to the ratio: (# of items in the table / current max size of the table).

Q: for which values of the constant *a* will this function produce a full cycle modulo N? 
A: when a and N are *relatively prime*, meaning their *greatest common denominator is 1.* 

## Quadratic: 

Three methods. 

	1) P(x) = x^2, keep the *table size a prime number* > 3 and *keep alpha less than or equal to 50%*;
	2) P(x) = (x^2 + x) / 2 and *keep the table size a power of two*; (seems like the most straightforward to implement) 
	3) P(x) = (-1)^x * x^2 and keep the table size a prime N where N is congruent to 3 mod 4 (?)

## Double Hashing:

Double hashing reduces to linear probing except that the constant is unknown until computed at runtime. 

    P(k, x) = x * H2(k) [where H2(k) is a second hash function]

H2(k) must hash the same type of keys as H1(k), the initial hash function. 

B/c it reduces to linear probing at runtime, we may end up with cycles in the same way we did in linear probing. To avoid cycling, *the table size must be a prime number* and compute the value of *delta* as follows: 

    Delta = H2(k) mod N [where N is the current size of the Hash Table]

If delta = 0, set it to 1 instead, since a delta of 0 guarantees a cycle. 

Since N is a prime number, delta will be between 1 and N (not inclusive of N) meaning the greatest common factor will always be 1, preventing cycles. 

When doubling the size of the table, you must find the next prime number to maintain this property. 
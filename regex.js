let regex1 = new RegExp('abc');
let regex2 = /abc/;
let eighteenPlus = /eighteen\+/;

console.log(regex2.test('abcde')); // expect true;
console.log(regex2.test('abxde')); // expect false;

console.log(/[0-9]/.test('in 1994')); // expect true;
console.log(/[0123456789]/.test('in 1994')); // also true, the same test as above;
// note that range is determined for all characters by unicode number;

let regex3 = /\d/; // any digit - same as [0-9];
let regex4 = /\w/; // any alphanumeric character or "word character";
let regex5 = /\s/; // any whitespace (tab, newline, etc);
let regex6 = /\D/; // any non-digit character;
let regex7 = /\W/; // any non-alphanumeric character;
let regex8 = /\S/; // any non-whitespace character;
let regex9 = /./; // any character at all except for newline;

// note that . and other special characters (+) lose their more specific meaning when
// placed between square brackets and instead only represent that character
// so /[\d.]/ represents any digit followed by a period

let dateTime = /\d\d-\d\d-\d\d\d\d \d\d:\d\d/; 
console.log(dateTime.test("01-30-2003 15:20")); // expect true
console.log(dateTime.test("30-jan-2003 15:20")); // expect false

// inversion with ^ after opening brackets;
let nonBinary = /[^01]/;
console.log(nonBinary.test('01101100010011')); // expect false;
console.log(nonBinary.test('01101011011020')); // expect true;

// + sign allows for repeating characters
// '*' does the same and also allows for zero matches
console.log(/'\d+'/.test("'123'")); // true
console.log(/'\d+'/.test("''")); // false
console.log(/'\d*'/.test("'123'")); // true
console.log(/'\d*'/.test("''")); // true

// '?' allows for optional components;
console.log(/neighbou?r/.test('neighbour', 'neighbor')); // both true;

// braces indicate a pattern should occur a precise number of times {};
// {4} indicates the character must appear 4 times;
// {2, 4} indicates the character must appear 2 times at least, 4 times at most
// {2, } indicates the character must appear at least 2 times

let improvedDateTime = /\d{1,2}-\d{1,2}-\d{4} \d{1,2}:\d{2}/;
console.log(improvedDateTime.test("1-30-2003 8:45")); // expect true;

// grouping happens with parentheses - expressions within parentheses are 
// considered a single element as far as the operators following it are concerned
// the i at the end of the expression makes it case insensitive

let cartoonCrying = /boo+(hoo+)+/i;
console.log(cartoonCrying.test('BoooooHoohoohoooo')); // expect true;

// 'exec' function returns some more useful information about the match;
let match = /\d+/.exec('one two 100');
console.log(match); // an object with '100' as the first element
console.log(match.index); // 8 - the string index where the match starts
console.log(typeof match); // object (an array of strings)

// note that strings have a built-in 'match' method that behaves similarly to exec
console.log('one two 100'.match(/\d+/)); // expect the same object as match above

let quotedText = /'([^']*)'/;
console.log(quotedText.exec("she said 'hello'")); // "'hello'", "hello"
// first item will be the entire portion that matched the regex
// subsequent items will represent the portions that matched the subgroupings
// subgroupings are defined by the parentheses

console.log(/bad(ly)?/.exec('bad')); // ['bad', undefined...]
console.log(/(\d)+/.exec('123')); // ['123', '3'...]

// the above behavior is because (ly)? does not have any matches, and is optional
// so the place where a match would be is replaced by undefined;
// '123' matches (\d) numerous times; so it returns the LAST position to match;

// Date object

let today = new Date();
console.log(today); // returns the current date object;
console.log(new Date(2021, 0, 20)); //  months start at zero - days start at 1;
console.log(today.getFullYear());
console.log(today.getMonth());
console.log(today.getDate());
console.log(today.getHours());
console.log(today.getMinutes());
console.log(today.getSeconds());
console.log(today.getYear()); // mostly useless: year - 1900;

function getDate(string) {
    let [_, month, day, year,] = /(\d{1,2})-(\d{1,2})-(\d{4})/.exec(string);
    return new Date(year, month - 1, day);
}
console.log(getDate('1-30-2010')); // date object '2010-01-30...'

// unfortunately: 
console.log(getDate('100-1-30000')); // date object '2999-12-01...' meaningless

// can improve with ^ and $ which can bound a regex to the whole string
console.log(/cat/.test('concatenate')); // expect true;
console.log(/^cat$/.test('concatenate')); // expect false
console.log(/\bcat\b/.test('concatenate')); // expect false 
console.log(/\bcat\b/.test('con cat enate')); // expect true 
// \b indicates that there should be a word-boundary

// choice operator
let animalCount = /\b\d+ (pig|chicken|cow)s?\b/;
// pipe operator | indicates choices
// so above represents one or more numbers that start at a word boundary
// followed by a space followed by one of pig or chicken or cow
// followed by an optional s, followed by a word boundary
console.log(animalCount.test('15 pigs')); // expect true;
console.log(animalCount.test('15 pigchickens')); // expect false;

// replace string method
console.log('papa'.replace('p', 'm')); // mapa (only the first letter);
console.log('Borobudor'.replace(/[ou]/, 'a')); // Barobudor (again, only first letter)
console.log('Borobudor'.replace(/[ou]/g, 'a')); // Barabadar (with g 'global' flag)

console.log('Liskov, Barbara\nMcCarthy, John\nWadler, Philip'.replace(
    /(\w+), (\w+)/g, '$2 $1'
));
// returns Barbara Liskov, John McCarthy, Philip Wadler
// finds the patter 'some number of word-characters followed by a comma and space
// and then another number of word characters (crucially ends at whitespace \n here)
// returns the second group and then the first group in that order with a space between

// replace can be called with a function as the second argument
let s = 'the cia and fbi';
console.log(s.replace(/\b(fbi|cia)\b/g, str => str.toUpperCase()));
let stock = '1 lemon, 2 cabbages, and 101 eggs';
function minusOne(match, amount, unit) {
    amount = Number(amount) - 1;
    if (amount === 1) {
        unit = unit.slice(0, unit.length - 1);
    } else if (amount === 0) {
        amount = 'no';
    } 
    return amount + ' ' + unit;
}
console.log(stock.replace(/(\d+) (\w+)/g, minusOne)); 
// 'no lemon, 1 cabbage, 100 eggs'

function stripComments(code) {
    return code.replace(/\/\/.*|\/\*[^]*\*\//g, "");
}
console.log(stripComments('1 + /* 2 */3')); // '1 + 3'
console.log(stripComments('x = 10; // ten!')); // 'x = 10;'
console.log(stripComments('1 /* a */+/* b */ 1')); // expect '1 + 1' - HOWEVER
// ACTUALLY returns '1  1' 

// why? [^]* matches any number of any kind of character
// it will first try to match as much as it can, and then backtrack until it matches
// this causes it to skip over the + element as it attempts to make the larger match work
// the following symbols are called 'greedy' for this reason:
// ^ + * ? {}
// you can reverse this behavior by following these symbols with a question mark
// as: ^? +? *? ?? {}?
// they become 'non-greedy' and will match as little as possible first

function correctedStripComments(code) {
    return code.replace(/\/\/.*|\/\*[^]*?\*\//g, '');
}
console.log(correctedStripComments('1 /* a */+/* b */ 1')); // '1 + 1'

// dynamically generated regex
let name = 'harry';
let text = 'Harry is a suspicious character';
let regexp = new RegExp("\\b(" + name + ")\\b", "gi");
console.log(text.replace(regexp, "_$1_")); // "_Harry_ is a suspicious character"
// "gi" == global, case-insensitive
let anotherName = "dea+hl[]rd";
let moreText = 'this dea+hl[]rd guy is super annoying';
let escaped = anotherName.replace(/[\\[.+*?(){|^$]/g, '\\$&');
let newRegexp = new RegExp("\\b" + escaped + "\\b", 'gi');
console.log(moreText.replace(newRegexp, "_$&_"));

// 'search' string method; similar to indexOf, it takes a regex instead of a string
console.log('  word'.search(/\S/)); // 2 skipping over whitespace
console.log('    '.search(/\S/)); // -1 because no index was found

// global v sticky and lastIndex
let pattern = /y/g;
pattern.lastIndex = 3; 
let matched = pattern.exec('xyzzy');
console.log(matched.index); // 4 (the index where a match was last found)
console.log(pattern.lastIndex); // 5 (the next point it would look for a match)

let global = /abc/g;
console.log(global.exec('xyz abc')); // ['abc'];
let sticky = /abc/y;
console.log(global.exec('xyz abc')); // null
// sticky flag demands that it start from lastIndex to match
// global will simply search ahead until it finds a match or reaches the end
// multiple calls to exec for a single regex can cause problems due to lastIndex updating
let digit = /\d/g;
console.log(digit.exec("here it is: 1")); // ["1"]
console.log(digit.exec("and now: 1")); // null (b/c it starts at lastIndex)

// looping through the matches:
let input = "a string with 3 numbers in it... 42 and 88";
let number = /\b\d+\b/g;
let matching;
while (matching = number.exec(input)) {
    console.log('found', matching[0], 'at', matching.index);
} 
// found 3 at 14 
// found 42 at 33 
// found 88 at 40

function parseINI(string) {
    let result = {};
    let section = result;
    string.split(/\r?\n/).forEach(line => {
        let match;
        if (match = line.match(/^(\w+)=(.*)$/)) {
            section[match[1]] = match[2];
        } else if (match = line.match(/^\[(.*)\]$/)) {
            section = result[match[1]] = {};
        } else if (!/^\s*(;.*)?$/.test(line)) {
            throw new Error(`Line ${line} is not valid`);
        }
    });
    return result;
}

console.log(parseINI(`
name=Vasilis
[address]
city=Tessaloniki`));


// Q1
let arr = [1, 2, 3, 5, 6, 7];
var ans = 0
for( let i = 0; i < 6; i++ ) {
    ans += arr[i] + arr[i-1]
    ans += arr[i+1] + arr[i]
}
console.log(ans)


// Q2
var a = 1;  
var b = 0;  
while (a <= 3)  
{  
  a++;  
  b += a * 2;  
  print(b);
}


// Q3
let s = 'abcd';
s[2] = '2'
console.log(s)


// Q4
function dog() {
  print("I am a dog.");
}
dog.sound = "Bark";
console.log(dog['sound'])


// Q5
const obj1 = {first: 20, second: 30, first: 50};
console.log(obj1);
# Async JS

- [ ] Why async js?

- [ ] What the hell is event loop?

API


Callbacks

```js
myDiv.addEventListener("click", function(){
  // do something!
})
```

A callback function is a function passed into another function as an argument, which is then invoked inside the outer function to complete some kind of routine or action.


Promises

```js
const myData = getData() // if this is refactored to return a Promise...

myData.then(function(data){ // .then() tells it to wait until the promise is resolved
  const pieceOfData = data['whatever'] // and THEN run the function inside
})
```


Async Await

```js
 const yourAsyncFunction = async () => {
    // do something asynchronously and return a promise
    return result;
  }
```

```js
async function getPersonsInfo(name) {
  try {
    const people = await server.getPeople();
    const person = people.find(person => { return person.name === name });
    return person;
  } catch (error) {
    // Handle the error any way you'd like
  }
}
```

```js
async function addAsync(x) {
  const a = await doubleAfter2Seconds(10);
  const b = await doubleAfter2Seconds(20);
  const c = await doubleAfter2Seconds(30);
  return x + a + b + c;
}
```

# Nodejs

What is backend?

What are frameworks?

How to install nodejs?


# Express


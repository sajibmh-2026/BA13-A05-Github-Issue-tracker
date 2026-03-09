# GitHub Issues Tracker

## Live Link
[যদি deploy করো তাহলে link দাও]


## Technologies Used
- HTML5
- Tailwind CSS + DaisyUI
- JavaScript (ES6+)
- Fetch API

---

## Questions & Answers

### 1️⃣ What is the difference between var, let, and const?

ANS: scope: var function scope puro function sob jaygay use kora jay .
     `let` and `const` → block scope sudu {} er vitor acces kora jay .
     var and let er man porivortin kora jay ;
     const er man poriborton kora jayna.
     var eki name e abar declare kora jay.
     let and const kora jayna .


### 2️⃣ What is the spread operator (...)?
ANS: spread operator holo javascripter ekti syntax.
 jeita array copy er ketre kaje lage onek .
                const fruits = ['apple', 'banana', 'orange'];
                const moreFruits = [...fruits]; notun array 
 array merge korte o use hoy onek 
                const arr1 = [1, 2, 3];
          const arr2 = [4, 5, 6];
          const combined = [...arr1, ...arr2]; // [1, 2, 3, 4, 5, 6]   

          ```javascript
         const numbers = [5, 10, 15];
         Math.max(...numbers); // 15
         ``` 
         function e o amra use kori ..              




### 3️⃣ What is the difference between map(), filter(), and forEach()?
    forEach() loop calay sudu kunu kicu return korena;
     original array change korena sudu kunu kaj korar jonno use hoy.
     const numbers = [1, 2, 3, 4];
numbers.forEach(num => {
    console.log(num * 2); // 2, 4, 6, 8
}); 

  map(): array er protita element e kicu kore ekta new array toiri kore .
  original array poriborton korena .
  notun array return kore.
  const numbers = [1, 2, 3, 4];
const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8]

filter() filter hocce kunu array ba object er protita element ke dore sorto sapekke 
kicu ekta kore ei gulu rake sorto sate match na korle rakena bad dey 
new array return kore
const numbers = [1, 2, 3, 4, 5, 6];
const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log(evenNumbers); // [2, 4, 6] 




### 4️⃣ What is an arrow function?
  arrow function hocce Es6 er ekta feature 

   arrow function => eita diye leka hoy 

  normal Function:
     javascript
      function add(a, b) {
    return a + b;
    }

  Arrow function :
    const add = (a, b) => {
    return a + b;
};
  aro cuto kore 
  const add = (a, b) => a + b;

### 5️⃣ What are template literals?

ANS: template literals holo javascript e string likar ekti adonik rup
 single quaote and double quate er poribore amra back tik diye  string liki ``
 const name = "John";
 const age = 25;
  const message = "My name is " + name + " and I am " + age + " years old.";
```

**Template Literals:**
```javascript
const name = "John";
const age = 25;
const message = `My name is ${name} and I am ${age} years old.`;
```
subida ${} value acces kora jay 

multi line o lika jay 
```javascript
const address = `House: 123
Road: 5
City: Dhaka`;


---

## How to Run
1. Open `login.html` in browser
2. Login with: username: `admin`, password: `admin123`
3. Browse and search GitHub issues

## Author
MH SOJIB
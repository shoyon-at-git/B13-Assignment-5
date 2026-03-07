1. What is the difference between var, let, and const?
answer -> var, let and const these are way of declaring variables or constants in Javascript.the var is function scoped but the let and const are block scoped.var can be redeclared whereas let and const can't be redeclared.const doesn't allows reassigning,but the others do.in modern days,,var is avoided,const is most used,and let is used when there is a need to change in the value.

2. What is the spread operator (...)?
answer -> spread operator basically spreads the elements or properties an array or object.
for example -> if we have an array and console it,it gives us an array,but if we use spread operator we get the elements spreaded.
const arr = [1,2];
clg(...arr) --> returns 1 2
it is used in copying and merging arrays,,but it doesn't create any new array.

3. What is the difference between map(), filter(), and forEach()?
answer ->
map() : goes through each item, transforms it, and returns a new array with the transformed items.no change in original array.
filter() : goes through each item and returns a new array with only the items that pass a certain condition.no change in original array.
forEach() : goes through each item and to do something.doesn’t return anything.

4. What is an arrow function?
answer -> shorthand for writing functions.it's syntax
(parameters) =>{}
example: const add = (a,b) =>{
    return a+b;
}
very effective for writing callback functions.

5. What are template literals?
answer -> it is the way of manipulating strings dynamically by using `` backticks.by using ${} inside it,the variables can be dynamically controlled.it is way flexible than "".
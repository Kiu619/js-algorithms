// 1.1. Write a program that takes two numbers as inputs and displays their sum.

const sum = (a, b) => a + b

// 1.2. Write a program that takes a string as input and displays the length of the string.

const length = (str) => str.length

// 1.3. Write a program that takes a number as input and displays its square

const square = (num) => num * num

// 1.4. Write a program that takes a list of numbers as input and displays the largest number in the list.

const largest = (arr) => Math.max(...arr)

// 1.5. Write a program that takes a list of strings as input and displays the shortest string in the list.

const shortest = (arr) => arr.reduce((shortest, current) => current.length < shortest.length ? current : shortest, arr[0])

// 1.6. Write a program that takes a list of numbers as input and sorts the list in ascending order.

const sortAscending = (arr) => arr.sort((a, b) => a - b)

// 1.7. Write a program that takes a list of strings as input and sorts the list in alphabetical order.

const sortAlphabetical = (arr) => arr.sort()
  
// 1.8. Write a program that takes a list of numbers as input and returns the median of the numbers.( Tìm số trung vị ( số trung vị không phải số trung bình cộng ))

const median = (arr) => {
  const sorted = arr.sort((a, b) => a - b)
  const middle = Math.floor(sorted.length / 2)
  return sorted.length % 2 !== 0 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2
}

// 1.9. Write a program that takes a string as input and returns the number of words in the string. ( tìm số từ trong một chuỗi, VD: “Hello world' => 2 )

const countWords = (str) => str.split(' ').filter(Boolean).length

// 1.10. Write a program that takes a list of strings as input and returns the number of strings that contain the letter 'a'.

const countA = (arr) => arr.filter((str) => str.includes('a')).length

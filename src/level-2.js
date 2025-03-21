// 2.1 Write a program that takes a list of numbers as input and returns the second largest number in the list.

const secondLargest = (arr) => {
  if (arr.length < 2) return undefined;
  
  let max = -Infinity;
  let secondMax = -Infinity;
  
  for (const num of arr) {
    if (num > max) {
      secondMax = max;
      max = num;
    } else if (num > secondMax && num < max) {
      secondMax = num;
    }
  }
  
  return secondMax === -Infinity ? undefined : secondMax;
}

// 2.2 Write a program that takes a list of strings as input and returns the longest word in the list.

const longestWord = (arr) => {
  return arr.reduce((longest, current) => current.length > longest.length ? current : longest, arr[0]);
}

// 2. 3 Write a program that takes two strings as input and returns the longest common subsequence of the two strings.

const longestCommonSubsequence = (str1, str2) => {
  const m = str1.length;
  const n = str2.length;
  
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  
  return dp[m][n];
} 

// 2.4 Write a program that takes a list of numbers as input and returns the sum of the numbers that are divisible by both 3 and 5.

const sumDivisibleBy3And5 = (arr) => {
  return arr.reduce((sum, num) => num % 3 === 0 && num % 5 === 0 ? sum + num : sum, 0);
}

// 2.5 Write a program that takes a list of integers as input and returns the maximum sum of any contiguous subarray within the list.

const maxSubarraySum = (arr) => {
  let maxEndingHere = arr[0];
  let maxSoFar = arr[0];
  
  for (let i = 1; i < arr.length; i++) {
    maxEndingHere = Math.max(arr[i], maxEndingHere + arr[i]);
    maxSoFar = Math.max(maxSoFar, maxEndingHere);
  }
  
  return maxSoFar;
}










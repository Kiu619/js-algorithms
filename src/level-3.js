// 3.1 Write a program that takes a list of numbers as input and returns the second smallest number in the list.

const secondSmallest = (arr) => {
  if (arr.length < 2) return undefined;
  
  let min = Infinity;
  let secondMin = Infinity;
  
  for (const num of arr) {
    if (num < min) {
      secondMin = min;
      min = num;
    } else if (num < secondMin && num > min) {
      secondMin = num;
    }
  }
  
  return secondMin === Infinity ? undefined : secondMin;
}


// 3.2 Write a program that takes a list of integers as input and returns the maximum difference between any two elements in the list.

const maxDifference = (arr) => {
  if (arr.length < 2) return undefined;
  
  let maxDiff = arr[1] - arr[0];
  let min = arr[0];
  
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < min) {
      min = arr[i];
    } else if (arr[i] - min > maxDiff) {
      maxDiff = arr[i] - min;
    }
  }
  
  return maxDiff;
}


// 3.3 Write a program that takes a list of integers as input and returns the longest increasing subsequence of the numbers. ( Tìm độ dài của chuỗi con tịnh tiến dài nhất )

const longestIncreasingSubsequence = (arr) => {
  if (arr.length === 0) return 0;
  
  // tails[i] lưu giá trị nhỏ nhất có thể kết thúc một LIS độ dài i+1
  const tails = [arr[0]];
  
  for (let i = 1; i < arr.length; i++) {
    // Nếu phần tử hiện tại lớn hơn đuôi của tất cả các subsequence
    if (arr[i] > tails[tails.length - 1]) {
      tails.push(arr[i]);
    } else {
      // Tìm vị trí để thay thế bằng binary search
      let left = 0;
      let right = tails.length - 1;
      
      while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (tails[mid] < arr[i]) {
          left = mid + 1;
        } else {
          right = mid;
        }
      }
      
      tails[left] = arr[i];
    }
  }
  
  return tails.length;
}


// 3.4 Write a program that takes a list of strings as input and returns the two strings with the largest overlap of characters.

const countOverlap = (str1, str2) => {
  // Sử dụng bit mask để đánh dấu sự xuất hiện của các ký tự
  let mask1 = 0;
  let mask2 = 0;
  
  // Set bit cho mỗi ký tự
  for (const char of str1) {
    mask1 |= 1 << (char.charCodeAt(0) - 'a'.charCodeAt(0));
  }
  
  for (const char of str2) {
    mask2 |= 1 << (char.charCodeAt(0) - 'a'.charCodeAt(0));
  }
  
  // Đếm số bit 1 trong phép AND của hai mask
  const overlap = mask1 & mask2;
  return overlap.toString(2).replace(/0/g, '').length;
}

const largestOverlap = (arr) => {
  if (arr.length < 2) return undefined;
  
  let maxOverlap = 0;
  let resultPair = [undefined, undefined];
  
  // Tạo mảng masks trước để tránh tính lại
  const masks = arr.map(str => {
    let mask = 0;
    for (const char of str.toLowerCase()) {
      if (char >= 'a' && char <= 'z') {
        mask |= 1 << (char.charCodeAt(0) - 'a'.charCodeAt(0));
      }
    }
    return mask;
  });
  
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      const overlap = (masks[i] & masks[j]).toString(2).replace(/0/g, '').length;
      if (overlap > maxOverlap) {
        maxOverlap = overlap;
        resultPair = [arr[i], arr[j]];
      }
    }
  }
  
  return resultPair;
}


// 3.5 Write a program that takes a list of numbers as input and returns the smallest positive integer that cannot be represented as the sum of any subset of the list.

const smallestPositiveInteger = (arr) => {
  const sortedArr = arr.sort((a, b) => a - b)
  let smallest = 1;
  
  for (const num of sortedArr) {
    if (num > smallest) {
      break;
    }
    smallest += num;
  }
  
  return smallest;
}

// 3.6 Write a program that takes two lists of integers as input and returns the median of the combined list.

const medianOfTwoLists = (list1, list2) => {
  const mergedList = [...list1, ...list2].sort((a, b) => a - b);
  const mid = Math.floor(mergedList.length / 2);
  
  return mergedList.length % 2 === 0 ? (mergedList[mid - 1] + mergedList[mid]) / 2 : mergedList[mid];
}


// 3.7 Write a program that takes a string as input and returns the length of the longest palindrome that can be formed by rearranging the characters in the string.

const longestPalindrome = (str) => {
  const charCount = {};
  let oddCount = 0;
  let filteredStr = '';

  // Bỏ qua khoảng trắng và không phân biệt chữ hoa chữ thường
  for (const char of str.toLowerCase()) {
    if (char !== ' ') {
      filteredStr += char;
    }
  }

  // Đếm số lần xuất hiện của mỗi ký tự
  for (const char of filteredStr) {
    charCount[char] = (charCount[char] || 0) + 1;
    if (charCount[char] % 2 === 1) {
      oddCount++;
    } else {
      oddCount--;
    }
  }

  return filteredStr.length - oddCount + (oddCount > 0 ? 1 : 0);
}

// 3.8 Write a program that takes a list of numbers as input and returns the number of distinct pairs of numbers in the list that sum up to a target value.

const countPairs = (arr, target) => {
  const numCount = {};
  let count = 0;

  for (const num of arr) {
    const complement = target - num;
    if (numCount[complement]) {
      count += numCount[complement];
    }
    numCount[num] = (numCount[num] || 0) + 1;
  }
  
  return count;
}

// 3.9 Write a program that takes a list of integers as input and returns the maximum sum of any contiguous subarray within the list, with the constraint that no two adjacent elements in the subarray can be selected.

const maxSumNonAdjacent = (arr) => {
  if (arr.length === 0) return 0;
  
  let prevMax = 0;
  let currMax = 0;
  
  for (const num of arr) {
    const temp = currMax;
    currMax = Math.max(prevMax + num, currMax);
    prevMax = temp;
  }
  
  return currMax;
}

// 3.10 Write a program that takes a list of strings as input and returns the list sorted by the number of distinct characters in each string, with the shortest strings appearing first.

const sortByDistinctChars = (arr) => {
  return arr.sort((a, b) => {
    const uniqueA = new Set(a).size;
    const uniqueB = new Set(b).size;

    // Sắp xếp theo số ký tự khác nhau trước
    if (uniqueA !== uniqueB) {
        return uniqueA - uniqueB;
    }
    // Nếu số ký tự khác nhau bằng nhau, sắp xếp theo độ dài chuỗi
    return a.length - b.length;
});
}




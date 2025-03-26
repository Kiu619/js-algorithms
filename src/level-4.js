// 4.1 Write a program that takes a list of integers as input and returns the minimum number of moves required to sort the list in ascending order using bubble sort.

const bubbleSortMoves = (arr) => {
  let moves = 0; // Biến đếm số lần hoán đổi
  let n = arr.length; // Độ dài của mảng
  let swapped; // Biến kiểm tra xem có hoán đổi nào xảy ra trong vòng lặp hay không

  do {
    swapped = false; // Đặt lại biến swapped trước mỗi vòng lặp
    for (let i = 0; i < n - 1; i++) {
      if (arr[i] > arr[i + 1]) { // Nếu phần tử hiện tại lớn hơn phần tử kế tiếp
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]]; // Hoán đổi hai phần tử
        moves++; // Tăng biến đếm số lần hoán đổi
        swapped = true; // Đánh dấu rằng đã có hoán đổi xảy ra
      }
    }
    n--; // Giảm độ dài của mảng cần kiểm tra sau mỗi vòng lặp
  } while (swapped); // Tiếp tục lặp lại cho đến khi không còn hoán đổi nào xảy ra

  return moves; // Trả về số lần hoán đổi
}

// 4.2 Write a program that takes a list of integers as input and returns the number of distinct subsequences of the list that sum up to a target value.

const countSubsequences = (arr, target) => {
  const memo = new Map(); // Lưu trữ kết quả đã tính toán để tránh tính lại

  const helper = (index, currentSum) => {
    // Nếu tổng hiện tại bằng target, đã tìm thấy một subsequence hợp lệ
    if (currentSum === target) return 1;
    // Nếu đã duyệt hết mảng mà không tìm thấy subsequence nào, trả về 0
    if (index === arr.length) return 0;

    // Tạo khóa để lưu trữ trong memo
    const key = `${index}-${currentSum}`;
    // Nếu đã tính toán cho khóa này, trả về kết quả đã lưu
    if (memo.has(key)) return memo.get(key);

    // Tính toán số subsequence khi bao gồm phần tử hiện tại
    const includeCurrent = helper(index + 1, currentSum + arr[index]);
    // Tính toán số subsequence khi không bao gồm phần tử hiện tại
    const excludeCurrent = helper(index + 1, currentSum);

    // Tổng số subsequence là tổng của hai trường hợp trên
    const totalSubsequences = includeCurrent + excludeCurrent;
    // Lưu kết quả vào memo
    memo.set(key, totalSubsequences);
    return totalSubsequences;
  };

  // Bắt đầu tính toán từ chỉ số 0 và tổng hiện tại là 0
  return helper(0, 0);
}

// 4.3 Write a program that takes a list of strings as input and returns the length of the longest substring that appears in every string in the list.

const longestCommonSubstring = (arr) => {
  if (arr.length === 0) return 0;

  const findCommonSubstring = (str1, str2) => {
    const m = str1.length;
    const n = str2.length;
    let maxLength = 0;

    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (str1[i - 1] === str2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + 1;
          maxLength = Math.max(maxLength, dp[i][j]);
        }
      }
    }

    return maxLength;
  };

  let commonLength = findCommonSubstring(arr[0], arr[1]);

  for (let i = 2; i < arr.length; i++) {
    commonLength = findCommonSubstring(arr[0].substring(0, commonLength), arr[i]);
    if (commonLength === 0) break;
  }

  return commonLength;
}

// 4.4 Write a program that takes a list of integers as input and returns the maximum sum of any contiguous subarray within the list, with the additional constraint that the subarray must not contain any consecutive integers.

const maxSumNonConsecutive = (arr) => {
  if (arr.length === 0) return 0;

  const dp = Array(arr.length).fill(0);
  dp[0] = arr[0];
  dp[1] = Math.max(arr[0], arr[1]);
  
  for (let i = 2; i < arr.length; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + arr[i]);
  }

  return dp[arr.length - 1];
}

// 4.5 Write a program that takes a list of strings as input and returns the length of the longest common substring of the strings.

//4.6 Write a program that takes a list of integers as input and returns the maximum product of any three distinct elements in the list.
// ví dụ [-10, -5, 0,1,2,3,4] => 200 (-10 * -5 * 4)

const maxProductOfThree = (arr) => {
  if (arr.length < 3) return 0;
  
  // Sắp xếp mảng theo thứ tự tăng dần
  arr.sort((a, b) => a - b);
  
  const n = arr.length;
  
  // So sánh 2 trường hợp:
  // 1. Ba số lớn nhất
  // 2. Hai số âm nhỏ nhất (nhân lại thành dương) nhân với số dương lớn nhất
  const product1 = arr[n-1] * arr[n-2] * arr[n-3];
  const product2 = arr[0] * arr[1] * arr[n-1];
  
  return Math.max(product1, product2);
}

// 4.7 Write a program that takes a list of strings as input and returns the list sorted by the number of distinct words in each string, with the longest strings appearing first.
// (Khuyến khích dùng forEach với javascript )
// Sắp xếp từ chuỗi dài nhất đến ngắn nhất, trong trường hợp có 2 chuỗi cùng độ dài thì sắp xếp theo thứ tự bảng chữ cái 
// Ví dụ: ['the quick brown fox', 'the lazy dog jumps over the fence', 'the cat in the hat']
// Kết quả: ['the lazy dog jumps over the fence', 'the quick brown fox', 'the cat in the hat']

const sortByWordsAndLength = (arr) => {
  // Tạo một mảng mới chứa các object với thông tin về chuỗi
  const stringsInfo = [];
  
  arr.forEach(str => {
    // Tách chuỗi thành mảng các từ và loại bỏ từ trùng lặp
    const words = str.split(' ');
    const distinctWords = [...new Set(words)];
    
    stringsInfo.push({
      original: str,
      length: str.length,
      distinctWordCount: distinctWords.length
    });
  });

  // Sắp xếp mảng theo các tiêu chí
  return stringsInfo.sort((a, b) => {
    // So sánh độ dài chuỗi
    if (a.length !== b.length) {
      return b.length - a.length;
    }
    // Nếu độ dài bằng nhau, sắp xếp theo thứ tự bảng chữ cái
    return a.original.localeCompare(b.original);
  }).map(info => info.original);
}

// 4.8 Write a program that takes a list of integers as input and returns the smallest positive integer that cannot be represented as the sum of any subset of the list, with the additional constraint that no subset can contain any consecutive integers.

const findSmallestNonRepresentable = (arr) => {
  // Sắp xếp mảng để dễ xử lý
  const sortedArr = arr.sort((a, b) => a - b);
  
  // Tạo mảng để lưu các tổng có thể tạo được
  const possibleSums = new Set();
  
  // Hàm đệ quy để tạo tất cả các tổng có thể
  const generateSums = (index, currentSum) => {
    // Thêm tổng hiện tại vào tập hợp
    possibleSums.add(currentSum);
    
    // Duyệt qua các phần tử còn lại
    for (let i = index; i < sortedArr.length; i++) {
      // Kiểm tra xem phần tử hiện tại có liên tiếp với phần tử trước đó không
      if (i > 0 && sortedArr[i] === sortedArr[i-1] + 1) {
        continue;
      }
      generateSums(i + 1, currentSum + sortedArr[i]);
    }
  };
  
  // Bắt đầu với tổng 0
  generateSums(0, 0);
  
  // Tìm số dương nhỏ nhất không có trong tập hợp tổng
  let smallest = 1;
  while (possibleSums.has(smallest)) {
    smallest++;
  }
  
  return smallest;
}

// 4.9 Write a program that takes a list of integers as input and returns the length of the longest increasing subsequence of the numbers, with the additional constraint that no two adjacent elements in the subsequence can differ by more than 1. ( Khuyến khích dùng reduce )
// 		VD: 
// 		Đầu vào: [1, 2, 3, 8, 6, 3] kết quả 3 (1, 2, 3)
// 		Đầu vào: [1, 2, 3, 8, 3, 2, 4, 5, 6, 7, 8, 9] kết quả 6 (4, 5, 6, 7, 8, 9)

const findLongestIncreasingSubsequence = (arr) => {
  if (arr.length === 0) return 0;
  
  // Sử dụng reduce để duyệt qua mảng và tìm chuỗi con tăng dần dài nhất
  const result = arr.reduce((acc, curr, index) => {
    // Nếu là phần tử đầu tiên, khởi tạo chuỗi con đầu tiên
    if (index === 0) {
      return {
        currentLength: 1,
        maxLength: 1,
        lastValue: curr
      };
    }
    
    // Kiểm tra điều kiện: phần tử hiện tại phải lớn hơn phần tử trước đó và chênh lệch không quá 1
    if (curr > acc.lastValue && curr - acc.lastValue <= 1) {
      // Nếu thỏa mãn điều kiện, tăng độ dài chuỗi con hiện tại
      acc.currentLength++;
      // Cập nhật độ dài tối đa nếu cần
      acc.maxLength = Math.max(acc.maxLength, acc.currentLength);
    } else {
      // Nếu không thỏa mãn điều kiện, bắt đầu một chuỗi con mới
      acc.currentLength = 1;
    }
    
    // Cập nhật giá trị cuối cùng
    acc.lastValue = curr;
    
    return acc;
  }, { currentLength: 0, maxLength: 0, lastValue: 0 });
  
  return result.maxLength;
}

// 4.10 Write a program that takes a list of strings as input and returns the two strings with the largest overlap of substrings, where the substrings must be at least k characters long (where k is a parameter to the function).

const findLargestOverlap = (arr, k) => {
  if (arr.length < 2 || k < 1) return null;
  
  // Hàm tìm tất cả các chuỗi con có độ dài >= k của một chuỗi
  const getAllSubstrings = (str) => {
    const substrings = new Set();
    for (let i = 0; i <= str.length - k; i++) {
      for (let j = i + k; j <= str.length; j++) {
        substrings.add(str.substring(i, j));
      }
    }
    return substrings;
  };
  
  let maxOverlap = 0;
  let result = null;
  
  // So sánh từng cặp chuỗi
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      // Lấy tất cả các chuỗi con của cả hai chuỗi
      const substrings1 = getAllSubstrings(arr[i]);
      const substrings2 = getAllSubstrings(arr[j]);
      
      // Tìm độ chồng lấn lớn nhất
      let currentMaxOverlap = 0;
      let commonSubstring = '';
      
      for (const substr of substrings1) {
        if (substrings2.has(substr)) {
          if (substr.length > currentMaxOverlap) {
            currentMaxOverlap = substr.length;
            commonSubstring = substr;
          }
        }
      }
      
      // Cập nhật kết quả nếu tìm thấy độ chồng lấn lớn hơn
      if (currentMaxOverlap > maxOverlap) {
        maxOverlap = currentMaxOverlap;
        result = {
          str1: arr[i],
          str2: arr[j],
          overlap: commonSubstring,
          length: maxOverlap
        };
      }
    }
  }
  
  return result;
}

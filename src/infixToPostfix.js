// Hàm kiểm tra độ ưu tiên của toán tử
const precedence = (operator) => {
  switch (operator) {
    case '+':
    case '-':
      return 1;
    case '*':
    case '/':
      return 2;
    case '^':
      return 3;
    default:
      return -1;
  }
}

// Hàm kiểm tra xem ký tự có phải là toán tử hay không
const isOperator = (char) => {
  return ['+', '-', '*', '/', '^'].includes(char);
}

// Hàm kiểm tra xem ký tự có phải là chữ cái hay không (cả hoa và thường)
const isAlphabet = (char) => {
  return /^[a-zA-Z]$/.test(char);
}

// Hàm chuyển đổi biểu thức trung tố sang hậu tố
const infixToPostfix = (infix) => {
  const stack = [];
  let postfix = '';
  
  // Duyệt từng ký tự trong biểu thức trung tố
  for (let char of infix) {
    // Nếu là toán hạng (chữ cái hoa hoặc thường) thì thêm vào kết quả
    if (isAlphabet(char)) {
      postfix += char;
    }
    // Nếu là dấu mở ngoặc thì đẩy vào stack
    else if (char === '(') {
      stack.push(char);
    }
    // Nếu là dấu đóng ngoặc
    else if (char === ')') {
      // Pop và thêm vào kết quả cho đến khi gặp dấu mở ngoặc
      while (stack.length > 0 && stack[stack.length - 1] !== '(') {
        postfix += stack.pop();
      }
      // Loại bỏ dấu mở ngoặc
      if (stack.length > 0) {
        stack.pop();
      }
    }
    // Nếu là toán tử
    else if (isOperator(char)) {
      // Pop các toán tử có độ ưu tiên >= toán tử hiện tại
      while (
        stack.length > 0 &&
        stack[stack.length - 1] !== '(' &&
        precedence(stack[stack.length - 1]) >= precedence(char)
      ) {
        postfix += stack.pop();
      }
      // Đẩy toán tử hiện tại vào stack
      stack.push(char);
    }
  }
  
  // Pop tất cả các toán tử còn lại trong stack
  while (stack.length > 0) {
    postfix += stack.pop();
  }
  
  return postfix;
}

// Ví dụ sử dụng
console.log(infixToPostfix('a+b*c')); // abc*+
console.log(infixToPostfix('(A+B)*C')); // AB+C*
console.log(infixToPostfix('a+B*c-D/e')); // aBc*+De/-

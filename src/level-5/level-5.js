// 5.1 reverses: Cho đầu vào là 1 mảng, Viết một function để đảo ngược thứ tự phần tử trong mảng , yêu cầu không dùng hàm Reverses có sẵn của javascript ( dùng forEach hoặc reduce )

const reverseArray = (arr) => {
  return arr.reduce((acc, curr) => [curr, ...acc], []);
}

// 5.2 chunk: Cho một mảng đàu vào viết một function để chia đều mảng theo số phần chỉ định

const chunkArray = (arr, size) => {
  return arr.reduce((acc, curr) => {
    const last = acc[acc.length - 1];
    if (!last || last.length === size) {
      acc.push([curr]);
    } else {
      last.push(curr);
    }
    return acc;
  }, []);
}

// Cách khác
const chunkArrayAlternative = (arr, size) => {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}


// 5.3 unique: cho một mảng đầu vào, viết một function để loại bỏ các phần tử bị lặp trong mảng

const uniqueArray = (arr) => {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}

// Cách khác
const uniqueArrayAlternative = (arr) => {
  return [...new Set(arr)];
}

// 5.4 uniq ArrayObject: giống unip nhưng mở rộng cho 1 collection
// Ví dụ:
// [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'y': 2, 'x': 1 }] 
// 👉 [{ ‘x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }]

const uniqArrayObject = (arr) => {
  return arr.filter((item, index) => arr.findIndex(t => t.x === item.x && t.y === item.y) === index);
}

// 5.5 Group by: Cho đầu vào là 1 collection ( array of object ), Viết một function để trả ra 1 OBJECT mới chứa dữ liệu được group theo trường chỉ định. 
// Ví dụ : 
// const collect = [{a: 1, b: 2}, {a: 1, b: 3}, {a: 2, b: 2}];
// groupBy(collect, ‘a'); 
// 👉 output {1: [{a: 1, b: 2}, {a: 1, b: 3}], 2: [{a: 2, b: 2}]}

// groupBy(collect, ‘b'); 
// 👉 output {2: [{a: 1, b: 2}, {a: 2, b: 2}], 3: [{a: 1, b: 3}]}

const groupBy = (arr, field) => {
  return arr.reduce((acc, curr) => {
    const key = curr[field];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(curr);
    return acc;
  }, {});
}

// 5.6 TrimAll: Viết function loại bỏ tất cả khoảng trắng đầu và cuối của một chuỗi bất kỳ, nếu có khoảng trắng ở giữa chuỗi đó thì chỉ giữ lại một khoảng trắng. 

const trimAll = (str) => {
  return str.trim().replace(/\s+/g, ' ');
}

// 5.7 MapKey: Cho 1 mảng các key, vào 1 mảng các object , Viết một function để trả ra một mảng các object theo thứ tự mảng các key. ( Yêu cầu dùng hàm map )
// Ví dụ
// keys = [‘b', ‘a', ‘c']
// collections = [{a: 1, b: 1, c: 2, d: 4, e: 5}, {a: 2, b:1, c: 5, d: 4, e: 5}, {d: 4, e: 5, a: 22, b:11, c: 51, }]
// 👉 [{b: 1, a: 1, c: 2}, {b: 1, a: 2, c: 5}, {b: 11, a: 22, c: 51}]

const mapKey = (keys, collections) => {
  return collections.map(item => {
    return keys.map(key => item[key]);
  });
}


// 5.8 Switch Order: Viết function để thay đổi thứ tự order của các object. 
// Ví dụ:
// arr = [{id: 10, order: 0}, {id: 12, order: 1}, {id: 9, order: 2}, {id: 11, order: 3}]
// switchOrder(9, 1)  // ( chuyển object có id bằng 9 lên vị trí order = 1, thay đổi lại giá trị của order )
// 👉 [{id: 10, order: 0}, {id: 9, order: 1}, {id: 12, order: 2}, {id: 11, order: 3}]

const switchOrder = (arr, id, newOrder) => {
  // Tìm vị trí của object cần di chuyển
  const itemIndex = arr.findIndex(item => item.id === id);
  if (itemIndex === -1) return arr;

  // Lấy object cần di chuyển
  const item = arr[itemIndex];
  const oldOrder = item.order;

  // Nếu order mới lớn hơn order cũ
  if (newOrder > oldOrder) {
    // Giảm order của các object nằm giữa oldOrder và newOrder
    arr.forEach(obj => {
      if (obj.order > oldOrder && obj.order <= newOrder) {
        obj.order--;
      }
    });
  } else {
    // Tăng order của các object nằm giữa newOrder và oldOrder
    arr.forEach(obj => {
      if (obj.order >= newOrder && obj.order < oldOrder) {
        obj.order++;
      }
    });
  }

  // Cập nhật order mới cho object được di chuyển
  item.order = newOrder;

  // Sắp xếp lại mảng theo order
  return arr.sort((a, b) => a.order - b.order);
}

// 5.9 SumAll: Viết function để tính tổng giá trị của các key của các phần tử con trong mảng bất kỳ:
// Ví dụ: 
// Arr = [{a: 2, b: 10}, {a: 12, c: 11}, {a: 8, b: 14, d: 20}, {a: '8'}]
// 👉 {a: 30, b: 24, c: 11, d: 20}
// Đầu vào là một mảng các object và các phần tử trong object không cố định.
// Gợi ý js: reducer(), Object.keys()

const sumAll = (arr) => {
  return arr.reduce((result, obj) => {
    // Lấy tất cả các key trong object hiện tại
    Object.keys(obj).forEach(key => {
      // Chuyển đổi giá trị thành số nếu là chuỗi số
      const value = Number(obj[key]);
      // Nếu là số hợp lệ thì cộng vào kết quả
      if (!isNaN(value)) {
        result[key] = (result[key] || 0) + value;
      }
    });
    return result;
  }, {});
}

//5.10 TemplateString:
// Đầu vào: một file template, và các params, nội dung file và tên các param không cố định
// Đầu ra: một file mới với nội dung là template và các params được truyền vào.
// Gợi ý js: sử dụng fs để đọc file và ghi file, dùng regex và replace để thay thế các params bằng giá trị tương ứng 
// 		VD1: 
// Đầu vào là 1 file txt có nội dung:
// Hello {{name}}, how are you ?
// Params là {name: ‘Jonny’}
// => kết quả là 1 file mới với nội dung:
// Hello Jonny, how are you ?

import fs from 'fs'

function templateString(filePath, params, outputFile) {
  let readFile = fs.readFileSync(filePath, 'utf8');

  for (let key in params) {
    let regex = new RegExp(`{{${key}}}`, 'g');
    readFile = readFile.replace(regex, params[key]);
  }
  fs.writeFileSync(outputFile, readFile, 'utf8');
  console.log(`File đã được tạo: ${outputFile}`);
}

templateString('template.txt', { name: 'Jonny' }, 'output.txt');
templateString(
  'template.html',
  {
    title: 'Search of skill',
    pageTitle: 'Home page',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, consectetur',
  },
  'output.html'
);


// VD2:
// Đầu vào là 1 file html có nội dung









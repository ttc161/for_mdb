function formatRUB(num) {
    if (Number(num) == 0) {
        return "0,00 ₽";
    }
    // Округляем до 2 знаков и разделяем тысячи пробелами
    var parts = num.toFixed(2).split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return parts.join(",") + " ₽";
}

function strToNumArray(arr) {
  if (!Array.isArray(arr)) return [];

  return arr.map(value => strToNum(value));
}

function strToNum(input) {
  if (typeof input === 'number') {
    return Number.isNaN(input) ? 0 : input;
  }
  if (typeof input !== 'string') {
    return 0;
  }

  let cleaned = input.replace(/[^0-9.,-]/g, '');
  if (!cleaned) return 0;

  let normalized = cleaned.replace(',', '.');
  let value = Number(normalized);

  return Number.isNaN(value) ? 0 : value;
}



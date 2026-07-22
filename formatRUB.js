function formatRUB(num) {
    // Округляем до 2 знаков и разделяем тысячи пробелами
    var parts = Number(num) == 0 ? 0 : num.toFixed(2).split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return parts.join(",") + " ₽";
}

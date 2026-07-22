function formatRUB(num) {
    if (Number(num) == 0) {
        return "0,00 ₽";
    }
    // Округляем до 2 знаков и разделяем тысячи пробелами
    var parts = num.toFixed(2).split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return parts.join(",") + " ₽";
}

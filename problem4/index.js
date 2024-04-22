function sum_to_n_a(n) {
    var sum = 0;
    for (var i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}
function sum_to_n_b(n) {
    return n * (n + 1) / 2;
}
function sum_to_n_c(n) {
    if (n === 0) {
        return 0;
    } else {
        return n + sum_to_n_c(n - 1);
    }
}
console.log(sum_to_n_a(5)); //sum_to_n_a = 1 + 2 + 3 + 4 + 5 = 15
console.log(sum_to_n_b(6)); //sum_to_n_b = 1 + 2 + 3 + 4 + 5 + 6 = 21
console.log(sum_to_n_c(7)); //sum_to_n_c = 1 + 2 + 3 + 4 + 5 + 6 + 7 = 28
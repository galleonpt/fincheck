export function formatCurrency(value: number) {
    return Intl.NumberFormat('pt-pt', {
        style: 'currency',
        currency: 'EUR',
    }).format(value);
}

export const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
    // 1. Računamo osnovnu cenu artikala
    state.itemsPrice = addDecimals(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );

    // 2. Izvlačimo procenat popusta (ako ne postoji, podrazumevano je 0)
    const discountPercent = state.discountPercentage || 0;

    // 3. Računamo iznos popusta u RSD
    state.discountAmount = addDecimals((state.itemsPrice * discountPercent) / 100);

    // 4. Računamo dostavu (Besplatna preko 2000 RSD ili ako je admin/menadžer sa 100% popusta)
    state.shippingPrice = addDecimals(state.itemsPrice > 2000 || discountPercent === 100 ? 0 : 300);

    // 5. Računamo porez (10% na cenu nakon odbijenog popusta)
    const priceAfterDiscount = state.itemsPrice - state.discountAmount;
    state.taxPrice = addDecimals(Number((0.1 * priceAfterDiscount).toFixed(2)));

    // 6. KONAČNA CENA
    state.totalPrice = addDecimals(
        Number(priceAfterDiscount) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
    );

    // Čuvanje kompletnog stanja korpe u localStorage
    localStorage.setItem("cart", JSON.stringify(state));

    return state;
};
function parsePriceString(priceStr) {
    if (!priceStr) return NaN;

    const cleaned = priceStr
        .toString()
        .replace(/[^0-9.]/g, '')

        .replace(/\.(?=.*\.)/g, '');
    return parseFloat(cleaned);
}

function extractProductData(productElem) {
    if (!productElem) return null;


    const nameElem =
        productElem.querySelector('.nombreart') ||
        productElem.querySelector('#nombreart') ||
        productElem.querySelector('h3') ||
        productElem.querySelector('h2') ||
        productElem.querySelector('p.nombre') ||
        null;

    const priceElem =
        productElem.querySelector('.precioart') ||
        productElem.querySelector('#precioart') ||
        productElem.querySelector('p[class*="precio"]') ||
        productElem.querySelector('span.price') ||
        null;

    const name = nameElem ? nameElem.textContent.trim() : null;
    const priceText = priceElem ? priceElem.textContent.trim() : null;
    const priceNumber = parsePriceString(priceText);

    return {
        name,
        priceText,
        priceNumber
    };
}

function saveProductToLocalStorage({ name, priceText, priceNumber }) {
    if (name) localStorage.setItem('producto_nombre', name);
    if (!isNaN(priceNumber)) {

        localStorage.setItem('producto_precio', priceNumber.toFixed(2));
    } else if (priceText) {

        localStorage.setItem('producto_precio', priceText);
    }
}

function attachBuyButtonHandlers() {

    const buyButtons = document.querySelectorAll('.Comprarahora');

    if (!buyButtons || buyButtons.length === 0) {
        console.warn('No buy buttons (.Comprarahora) found on page.');
        return;
    }

    buyButtons.forEach(btn => {
        btn.addEventListener('click', (ev) => {
            let productElem = ev.target.closest('#prodaventa') ||
                            ev.target.closest('.prodaventa') ||
                            (function findAncestorWithFields(el) {
                                let cur = el;
                                    while (cur && cur !== document.body) {
                                    if (cur.querySelector && (cur.querySelector('.precioart') || cur.querySelector('#precioart'))) {
                                    return cur;
                                    }
                                    cur = cur.parentElement;
                                }
                                return null;
                            })(ev.target);

            const data = extractProductData(productElem);

            if (!data || (!data.name && !data.priceText)) {
                console.error('Could not extract product data for clicked item.', { productElem, data });
            } else {
                saveProductToLocalStorage(data);
                console.log('Saved product to localStorage:', data);
            }
        });
    });
}


document.addEventListener('DOMContentLoaded', () => {
    attachBuyButtonHandlers();
});

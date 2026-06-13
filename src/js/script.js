document.addEventListener("DOMContentLoaded", () => {  
    const header = document.querySelector(".header");  
    const burgerField = document.getElementById("burger");  
    const nameField = document.getElementById("name");  
    const phoneField = document.getElementById("phone");  
    const prices = document.getElementsByClassName("card__price");  
    
    // Smooth scroll to products section  
    document.getElementById("home-action-button").onclick = () => {  
        document.getElementById("products").scrollIntoView({ behavior: "smooth" });  
    };  

    // Header scroll effect  
    const handleScroll = () => {  
        const scrollPosition = window.scrollY;  
        const threshold = window.innerWidth <= 320 ? 40 : 100;  
        header.classList.toggle("active", scrollPosition > threshold);  
    };  
    document.addEventListener("scroll", handleScroll);  

    // Smooth scroll for navigation links  
    document.querySelectorAll(".nav__item > a").forEach(link => {  
        link.onclick = (event) => {  
            const targetId = event.currentTarget.getAttribute("data-link");  
            document.getElementById(targetId).scrollIntoView({ behavior: "smooth" });  
        };  
    });  

    // Smooth scroll and populate form field on card button click  
    document.querySelectorAll(".card__button").forEach((button, i) => {  
        button.onclick = () => {  
            document.getElementById("order").scrollIntoView({ behavior: "smooth" });  
            burgerField.value = document.getElementsByClassName("card__title")[i].textContent;  
        };  
    });  

    // Order action with validation  
    document.getElementById("order-action").onclick = () => {  
        let hasError = false;  
        [burgerField, nameField, phoneField].forEach(item => {  
            const isEmpty = !item.value;  
            item.parentElement.style.background = isEmpty ? "red" : "";  
            hasError = hasError || isEmpty;  
        });  

        if (!hasError) {  
            [burgerField, nameField, phoneField].forEach(item => item.value = "");  
            alert("Спасибо за заказ! Мы скоро свяжемся с вами!");  
        }  
    };  

    // Change currency with corresponding price update  
    document.getElementById("change-currency").onclick = (e) => {  
        const currencyMap = {  
            "$": { symbol: "₽", coefficient: 80 },  
            "₽": { symbol: "BYN", coefficient: 3 },  
            "BYN": { symbol: "€", coefficient: 0.9 },  
            "€": { symbol: "¥", coefficient: 6.9 },  
        };  

        const currentCurrency = e.target.innerText;  
        const { symbol: newCurrency, coefficient } = currencyMap[currentCurrency] || { symbol: "$", coefficient: 1 };  

        e.target.innerText = newCurrency;  
        Array.from(prices).forEach(price => {  
            const basePrice = parseFloat(price.getAttribute("data-base-price"));  
            price.innerText = `${+((basePrice * coefficient).toFixed(1))} ${newCurrency}`;  
        });  
    };  
});
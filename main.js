
class LottoGenerator extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const container = document.createElement('div');
        container.setAttribute('class', 'lotto-container');

        const button = document.createElement('button');
        button.textContent = 'Generate Numbers';

        const numbersContainer = document.createElement('div');
        numbersContainer.setAttribute('class', 'numbers-container');

        const style = document.createElement('style');
        style.textContent = `
            .lotto-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 20px;
                padding: 20px;
                background-color: var(--card-background);
                border-radius: 10px;
                box-shadow: 0 4px 8px var(--shadow-color);
                transition: background-color 0.3s ease, box-shadow 0.3s ease;
            }

            button {
                padding: 10px 20px;
                font-size: 1.2rem;
                color: var(--white);
                background-color: var(--primary-color);
                border: none;
                border-radius: 5px;
                cursor: pointer;
                transition: background-color 0.3s, transform 0.2s;
            }

            button:hover {
                background-color: #357abd;
                transform: scale(1.05);
            }

            .numbers-container {
                display: flex;
                gap: 10px;
                flex-wrap: wrap;
                justify-content: center;
            }

            .number {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 40px;
                height: 40px;
                font-size: 1.2rem;
                font-weight: bold;
                color: var(--white);
                background-color: #f39c12;
                border-radius: 50%;
                animation: popIn 0.3s ease-out;
            }

            @keyframes popIn {
                0% { transform: scale(0); }
                100% { transform: scale(1); }
            }
        `;

        shadow.appendChild(style);
        container.appendChild(button);
        container.appendChild(numbersContainer);
        shadow.appendChild(container);

        button.addEventListener('click', () => {
            const numbers = this.generateLottoNumbers();
            this.displayNumbers(numbers, numbersContainer);
        });
    }

    generateLottoNumbers() {
        const numbers = new Set();
        while (numbers.size < 6) {
            const randomNumber = Math.floor(Math.random() * 45) + 1;
            numbers.add(randomNumber);
        }
        return Array.from(numbers).sort((a, b) => a - b);
    }

    displayNumbers(numbers, container) {
        container.innerHTML = '';
        numbers.forEach((number, index) => {
            setTimeout(() => {
                const numberElement = document.createElement('div');
                numberElement.setAttribute('class', 'number');
                numberElement.textContent = number;
                container.appendChild(numberElement);
            }, index * 100);
        });
    }
}

customElements.define('lotto-generator', LottoGenerator);

// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'light';

if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.textContent = 'Switch to Light Mode';
}

themeToggle.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        themeToggle.textContent = 'Switch to Dark Mode';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeToggle.textContent = 'Switch to Light Mode';
    }
});

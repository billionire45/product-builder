
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
                background-color: var(--white);
                border-radius: 10px;
                box-shadow: 0 4px 8px var(--shadow-color);
            }

            button {
                padding: 10px 20px;
                font-size: 1.2rem;
                color: var(--white);
                background-color: var(--primary-color);
                border: none;
                border-radius: 5px;
                cursor: pointer;
                transition: background-color 0.3s;
            }

            button:hover {
                background-color: #357abd;
            }

            .numbers-container {
                display: flex;
                gap: 10px;
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
        numbers.forEach(number => {
            const numberElement = document.createElement('div');
            numberElement.setAttribute('class', 'number');
            numberElement.textContent = number;
            container.appendChild(numberElement);
        });
    }
}

customElements.define('lotto-generator', LottoGenerator);

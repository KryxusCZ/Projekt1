document.addEventListener('DOMContentLoaded', function() {
    fetchOrdersData();
});

function fetchOrdersData() {
    fetch('http://localhost:5000/get-orders')
        .then(response => {
            if (!response.ok) {
                throw new Error('Nepodařilo se získat data');
            }
            return response.json();
        })
        .then(data => {
            if (!Array.isArray(data.documents)) {
                throw new Error('Data nejsou ve správném formátu');
            }

            data.documents.forEach((item, index) => {
                let tr = document.createElement('tr');

                // Vytvoření buňky pro číslo objednávky
                let thOrderId = document.createElement('th');
                thOrderId.scope = 'row';
                let bOrderId = document.createElement('b');
                bOrderId.textContent = index + 1; // Přidání pořadového čísla
                thOrderId.appendChild(bOrderId);

                // Vytvoření buňky pro status
                let tdStatus = document.createElement('td');
                let divStatus = document.createElement('div');
                divStatus.className = 'tm-status-circle moving';
                tdStatus.appendChild(divStatus);
                tdStatus.appendChild(document.createTextNode('Moving'));

                // Vytvoření buňky pro jméno
                let tdName = document.createElement('td');
                let bName = document.createElement('b');
                bName.textContent = `${item.firstName} ${item.lastName}`;
                tdName.appendChild(bName);

                // Vytvoření buňky pro adresu
                let tdAddress = document.createElement('td');
                let bAddress = document.createElement('b');
                bAddress.textContent = `${item.country}, ${item.address}`;
                tdAddress.appendChild(bAddress);

                // Vytvoření buňky pro datum začátku
                let tdStartDate = document.createElement('td');
                let date = new Date(item.date).toLocaleString().slice(0, 11);
                tdStartDate.textContent = date;

                let tdPrice = document.createElement('td');
                tdPrice.textContent = `${item.price} Kč`;

                // Připojení buněk k řádku
                tr.appendChild(thOrderId);
                tr.appendChild(tdStatus);
                tr.appendChild(tdName);
                tr.appendChild(tdAddress);
                tr.appendChild(tdStartDate);
                tr.appendChild(tdPrice);

                // Připojení řádku k tabulce nebo jinému kontejneru
                const tableBody = document.getElementById('orders'); // Ujistěte se, že máte element s ID 'orders' v HTML
                tableBody.appendChild(tr);
            });
        })
        .catch(error => {
            console.error('Chyba při získávání dat:', error);
        });
}
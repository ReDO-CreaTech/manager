document.getElementById('documentForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form values
    const docTitle = document.getElementById('docTitle').value;
    const docType = document.getElementById('docType').value;
    const expirationDate = document.getElementById('expirationDate').value;
    const uploadFile = document.getElementById('uploadFile').files[0];

    if (!docTitle || !docType || !expirationDate || !uploadFile) {
        alert("Please fill in all fields and select a file.");
        return;
    }

    // Add to the table dynamically
    const tableBody = document.getElementById('documentsTable').querySelector('tbody');

    const newRow = document.createElement('tr');
    const today = new Date();
    const expiryDate = new Date(expirationDate);
    const isExpired = expiryDate < today;
    const isSoonToExpire = expiryDate > today && (expiryDate - today) / (1000 * 60 * 60 * 24) <= 30;

    newRow.innerHTML = `
        <td>${docTitle}</td>
        <td>${docType}</td>
        <td class="${isExpired ? 'expired' : isSoonToExpire ? 'soon-to-expire' : ''}">
            ${expirationDate}
        </td>
        <td><a href="#" download="${uploadFile.name}">${uploadFile.name}</a></td>
        <td>
            <button class="delete-btn">Delete</button>
        </td>
    `;

    // Add event listener for delete button
    newRow.querySelector('.delete-btn').addEventListener('click', function () {
        newRow.remove();
    });

    tableBody.appendChild(newRow);

    sortTable(); // Sort by expiration date
    document.getElementById('documentForm').reset();
});

// Search functionality
document.getElementById('searchInput').addEventListener('input', function () {
    const query = this.value.toLowerCase();
    const rows = document.querySelectorAll('#documentsTable tbody tr');

    rows.forEach(row => {
        const title = row.children[0].textContent.toLowerCase();
        const type = row.children[1].textContent.toLowerCase();

        if (title.includes(query) || type.includes(query)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
});

// Sort table by expiration date
function sortTable() {
    const table = document.getElementById('documentsTable');
    const rows = Array.from(table.querySelectorAll('tbody tr'));

    rows.sort((a, b) => {
        const dateA = new Date(a.children[2].textContent);
        const dateB = new Date(b.children[2].textContent);

        return dateA - dateB; // Sort ascending
    });

    const tableBody = table.querySelector('tbody');
    tableBody.innerHTML = '';
    rows.forEach(row => tableBody.appendChild(row));
}

function clearTexts() {
    document.getElementById('text1').value = '';
    document.getElementById('text2').value = '';
    document.getElementById('differences').innerHTML = '';
    document.getElementById('result').innerHTML = '';
}

function onTextChange() {
    var text1 = document.getElementById('text1').value.trim();
    var text2 = document.getElementById('text2').value.trim();

    if (text1 !== '' && text2 !== '') {
        calculateDistance();
    }
}

function calculateDistance() {
    const text1 = document.getElementById('text1').value.trim();
    const text2 = document.getElementById('text2').value.trim();

    const distance = levenshteinDistance(text1, text2);
    const maxLength = Math.max(text1.length, text2.length);
    const similarity = ((maxLength - distance) / maxLength) * 100;

    // Levenshtein Distance: ${distance}<br>
    document.getElementById('result').innerHTML = `
      Similarity: ${similarity.toFixed(2)}%
    `;

    const diffHTML = diffTexts(text1, text2);
    document.getElementById('differences').innerHTML = `${diffHTML}`;
}

function levenshteinDistance(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    const matrix = [];

    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }

    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j] + 1,    // Deletion
                    matrix[i][j - 1] + 1,    // Insertion
                    matrix[i - 1][j - 1] + 1 // Substitution
                );
            }
        }
    }

    return matrix[b.length][a.length];
}

function diffTexts(a, b) {
    // Split texts into arrays of words and new lines
    const aParts = splitText(a);
    const bParts = splitText(b);

    const m = aParts.length;
    const n = bParts.length;

    // Create LCS table
    const lcs = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

    for (let i = m - 1; i >= 0; i--) {
        for (let j = n - 1; j >= 0; j--) {
            if (aParts[i] === bParts[j]) {
                lcs[i][j] = lcs[i + 1][j + 1] + 1;
            } else {
                lcs[i][j] = Math.max(lcs[i + 1][j], lcs[i][j + 1]);
            }
        }
    }

    // Reconstruct the diff from the LCS table
    const diffs = [];
    let i = 0;
    let j = 0;

    while (i < m && j < n) {
        if (aParts[i] === bParts[j]) {
            diffs.push(escapeHTML(aParts[i]));
            i++;
            j++;
        } else if (lcs[i + 1][j] >= lcs[i][j + 1]) {
            diffs.push(`<span class="delete">${escapeHTML(aParts[i])}</span>`);
            i++;
        } else {
            diffs.push(`<span class="insert">${escapeHTML(bParts[j])}</span>`);
            j++;
        }
    }

    // Handle remaining parts in aParts
    while (i < m) {
        diffs.push(`<span class="delete">${escapeHTML(aParts[i])}</span>`);
        i++;
    }

    // Handle remaining parts in bParts
    while (j < n) {
        diffs.push(`<span class="insert">${escapeHTML(bParts[j])}</span>`);
        j++;
    }

    return diffs.join('');
}

function splitText(text) {
    // Split text into words and keep new lines as separate elements
    const regex = /[^\s\n]+|\s+|\n/g;
    return text.match(regex) || [];
}

function escapeHTML(str) {
    return str.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\n/g, '\n');
}

function populateTextsFromURL() {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');

    if (q) {
        const decodedQ = decodeURIComponent(q);

        // Split the texts based on the separator '|||'
        const separator = '|||';
        const separatorIndex = decodedQ.indexOf(separator);

        if (separatorIndex !== -1) {
            const text1 = decodedQ.substring(0, separatorIndex).trim();
            const text2 = decodedQ.substring(separatorIndex + separator.length).trim();

            document.getElementById('text1').value = text1;
            document.getElementById('text2').value = text2;
        } else {
            document.getElementById('text1').value = decodedQ.trim();
            document.getElementById('text2').value = '';
        }

        onTextChange();
    }
}

document.addEventListener('DOMContentLoaded', function () {
    clearTexts();
    populateTextsFromURL();
});
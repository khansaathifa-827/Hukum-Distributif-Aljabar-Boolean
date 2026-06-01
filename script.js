// =======================================
// BOOLEAN ALGEBRA SOLVER
// HUKUM DISTRIBUTIF
// =======================================

// Ambil elemen riwayat
const historyList = document.getElementById("historyList");

// =======================================
// SOLVER EKSPRESI BOOLEAN
// =======================================

function solveBoolean() {

    const input =
        document
        .getElementById("expression")
        .value
        .trim()
        .replace(/\s/g,'');

    const resultDiv =
        document.getElementById("result");

    const stepsDiv =
        document.getElementById("steps");

    let result = "";
    let langkah = "";

    // ===================================
    // Bentuk A(B+C)
    // ===================================

    const bentuk1 =
        /^([A-Z])\(([A-Z])\+([A-Z])\)$/i;

    const match1 =
        input.match(bentuk1);

    if(match1){

        const a = match1[1];
        const b = match1[2];
        const c = match1[3];

        result =
            `${a}${b}+${a}${c}`;

        langkah = `
1. Bentuk awal:
   ${a}(${b}+${c})

2. Gunakan Hukum Distributif 1:
   A(B+C)=AB+AC

3. Distribusikan ${a}
   ke ${b} dan ${c}

4. Hasil:
   ${a}${b}+${a}${c}
`;

        tampilkanHasil(result,langkah);
        saveHistory(input,result);
        return;
    }

    // ===================================
    // Bentuk A+BC
    // ===================================

    const bentuk2 =
        /^([A-Z])\+([A-Z])([A-Z])$/i;

    const match2 =
        input.match(bentuk2);

    if(match2){

        const a = match2[1];
        const b = match2[2];
        const c = match2[3];

        result =
            `(${a}+${b})(${a}+${c})`;

        langkah = `
1. Bentuk awal:
   ${a}+${b}${c}

2. Gunakan Hukum Distributif 2:
   A+BC=(A+B)(A+C)

3. Substitusi variabel

4. Hasil:
   (${a}+${b})(${a}+${c})
`;

        tampilkanHasil(result,langkah);
        saveHistory(input,result);
        return;
    }

    // ===================================
    // FORMAT SALAH
    // ===================================

    resultDiv.innerHTML = `
        <h3>❌ Format Tidak Dikenali</h3>
        <p>Gunakan salah satu format berikut:</p>

        <ul>
            <li>A(B+C)</li>
            <li>C(A+B)</li>
            <li>X(Y+Z)</li>
            <li>A+BC</li>
            <li>P+QR</li>
            <li>X+YZ</li>
        </ul>
    `;

    stepsDiv.innerHTML = "";
}

// =======================================
// TAMPILKAN HASIL
// =======================================

function tampilkanHasil(result,langkah){

    document.getElementById("result")
    .innerHTML = `
        <h3>✅ Hasil Penyederhanaan</h3>
        <p><strong>${result}</strong></p>
    `;

    document.getElementById("steps")
    .innerHTML = `
        <h3>📖 Langkah Penyelesaian</h3>
        <pre>${langkah}</pre>
    `;
}

// =======================================
// EVALUASI NILAI BOOLEAN
// =======================================

function evaluateBoolean(){

    const A =
        Number(
            document.getElementById("A").value
        );

    const B =
        Number(
            document.getElementById("B").value
        );

    const C =
        Number(
            document.getElementById("C").value
        );

    const law =
        document.getElementById("law").value;

    let result;
    let detail = "";

    // ===============================
    // Hukum 1
    // A(B+C)
    // ===============================

    if(law === "1"){

        const BplusC =
            (B || C) ? 1 : 0;

        result =
            (A && BplusC) ? 1 : 0;

        detail = `
A = ${A}
B = ${B}
C = ${C}

B + C
= ${B} OR ${C}
= ${BplusC}

A(B+C)
= ${A} AND ${BplusC}
= ${result}
`;
    }

    // ===============================
    // Hukum 2
    // A+BC
    // ===============================

    else{

        const BC =
            (B && C) ? 1 : 0;

        result =
            (A || BC) ? 1 : 0;

        detail = `
A = ${A}
B = ${B}
C = ${C}

BC
= ${B} AND ${C}
= ${BC}

A + BC
= ${A} OR ${BC}
= ${result}
`;
    }

    document.getElementById(
        "evalResult"
    ).innerHTML = `
        <h3>🔢 Hasil Evaluasi</h3>

        <p>
            Nilai Akhir:
            <strong>${result}</strong>
        </p>

        <pre>${detail}</pre>
    `;
}

// =======================================
// SIMPAN RIWAYAT
// =======================================

function saveHistory(exp,result){

    let li =
        document.createElement("li");

    li.innerHTML =
        `${exp} ➜ ${result}`;

    historyList.prepend(li);

    localStorage.setItem(
        "booleanHistory",
        historyList.innerHTML
    );
}

// =======================================
// LOAD RIWAYAT
// =======================================

window.onload = function(){

    historyList.innerHTML =
        localStorage.getItem(
            "booleanHistory"
        ) || "";
};

// =======================================
// HAPUS RIWAYAT
// =======================================

function clearHistory(){

    localStorage.removeItem(
        "booleanHistory"
    );

    historyList.innerHTML = "";
}
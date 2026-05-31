async function predictCancer() {

    const features = [

        Number(document.getElementById("radius").value),
        Number(document.getElementById("texture").value),

        Number(document.getElementById("perimeter").value),
        Number(document.getElementById("area").value),

        Number(document.getElementById("smoothness").value),
        Number(document.getElementById("compactness").value),

        Number(document.getElementById("concavity").value),
        Number(document.getElementById("concave_points").value),

        Number(document.getElementById("symmetry").value),
        Number(document.getElementById("fractal").value)

    ];

    const response = await fetch(
        "http://127.0.0.1:5000/predict",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                features: features
            })
        }
    );

    const data = await response.json();

    const resultCard = document.getElementById("result-card");

    resultCard.innerHTML = `
        <h2 class="${data.prediction === 'Benign'
            ? 'benign'
            : 'malignant'}">
            ${data.prediction}
        </h2>

        <br>

        <h3>
            Confidence: ${data.confidence}%
        </h3>
    `;
}
document.getElementById("analyze-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const clientName = document.getElementById("client-name").value.trim();
  const content = document.getElementById("content").value.trim();
  const resultDiv = document.getElementById("result");
  const submitBtn = document.getElementById("submit-btn");

  submitBtn.disabled = true;
  submitBtn.textContent = "Analyzing...";
  resultDiv.classList.add("hidden");

  try {
    const response = await fetch("/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clientName, content }),
    });

    const data = await response.json();

    if (!response.ok) {
      resultDiv.innerHTML = `<p class="error">Error: ${data.error}</p>`;
    } else {
      resultDiv.innerHTML =
        `<h2>Results</h2>` +
        `<pre>${JSON.stringify(data, null, 2)}</pre>`;
    }

    resultDiv.classList.remove("hidden");
  } catch (err) {
    resultDiv.innerHTML = `<p class="error">Request failed: ${err.message}</p>`;
    resultDiv.classList.remove("hidden");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Analyze";
  }
});

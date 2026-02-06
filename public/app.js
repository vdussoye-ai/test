(function () {
  var currentStep = 1;
  var totalSteps = 4;

  var steps = document.querySelectorAll(".step");
  var indicators = document.querySelectorAll(".step-indicator");
  var btnBack = document.getElementById("btn-back");
  var btnNext = document.getElementById("btn-next");
  var btnSubmit = document.getElementById("btn-submit");
  var form = document.getElementById("wizard-form");
  var reviewContent = document.getElementById("review-content");
  var resultDiv = document.getElementById("result");
  var resultText = document.getElementById("result-text");

  var fieldLabels = {
    clientName: "Client Name",
    company: "Company",
    email: "Email",
    projectName: "Project Name",
    description: "Project Description",
    startDate: "Start Date",
    endDate: "End Date",
    milestones: "Key Milestones",
    budget: "Budget ($)",
    teamSize: "Team Size",
    skills: "Required Skills",
    notes: "Additional Notes",
  };

  function showStep(n) {
    steps.forEach(function (s, i) {
      s.classList.toggle("hidden", i !== n - 1);
    });

    indicators.forEach(function (ind, i) {
      ind.classList.remove("active", "done");
      if (i + 1 < n) ind.classList.add("done");
      else if (i + 1 === n) ind.classList.add("active");
    });

    btnBack.classList.toggle("hidden", n === 1);
    btnNext.classList.toggle("hidden", n >= totalSteps);
    btnSubmit.classList.toggle("hidden", n !== totalSteps);
  }

  function validateCurrentStep() {
    var currentFieldset = document.getElementById("step-" + currentStep);
    var inputs = currentFieldset.querySelectorAll("input, textarea");
    for (var i = 0; i < inputs.length; i++) {
      if (!inputs[i].checkValidity()) {
        inputs[i].reportValidity();
        return false;
      }
    }
    return true;
  }

  function gatherData() {
    var data = {};
    var inputs = form.querySelectorAll("input, textarea");
    inputs.forEach(function (el) {
      if (el.name) data[el.name] = el.value;
    });
    return data;
  }

  function buildReview() {
    var data = gatherData();
    var html = "<table>";
    for (var key in data) {
      if (!data[key]) continue;
      var label = fieldLabels[key] || key;
      var value = data[key]
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
      html += "<tr><th>" + label + "</th><td>" + value + "</td></tr>";
    }
    html += "</table>";
    reviewContent.innerHTML = html;
  }

  btnNext.addEventListener("click", function () {
    if (!validateCurrentStep()) return;
    if (currentStep < totalSteps) {
      currentStep++;
      if (currentStep === totalSteps) buildReview();
      showStep(currentStep);
    }
  });

  btnBack.addEventListener("click", function () {
    if (currentStep > 1) {
      currentStep--;
      showStep(currentStep);
    }
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var data = gatherData();
    btnSubmit.disabled = true;
    btnSubmit.textContent = "Submitting…";

    fetch("/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (json) {
        resultText.textContent = json.proposal;
        resultDiv.classList.remove("hidden");
      })
      .catch(function (err) {
        resultText.textContent = "Error: " + err.message;
        resultDiv.classList.remove("hidden");
      })
      .finally(function () {
        btnSubmit.disabled = false;
        btnSubmit.textContent = "Submit";
      });
  });

  showStep(currentStep);
})();

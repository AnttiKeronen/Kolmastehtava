document.addEventListener("DOMContentLoaded", async () => {
  try {
      const populationUrl = "https://statfin.stat.fi/PxWeb/sq/4e244893-7761-4c4f-8e55-7a8d41d86eff";
      const employmentUrl = "https://statfin.stat.fi/PxWeb/sq/5e288b40-f8c8-4f1e-b3b0-61b86ce5c065";

      
      const populationResponse = await fetch(populationUrl);
      const populationData = await populationResponse.json();
      console.log("Population data:", populationData); 

      
      const employmentResponse = await fetch(employmentUrl);
      const employmentData = await employmentResponse.json();
      console.log("Employment data:", employmentData); 

      
      const municipalities = populationData.dataset.dimension.Alue.category.label;
      const populations = populationData.dataset.value;
      const employmentAmounts = employmentData.dataset.value;

      
      console.log("Municipalities:", municipalities);
      console.log("Populations:", populations);
      console.log("Employment amounts:", employmentAmounts);

      
      const tbody = document.getElementById("population-data");
      tbody.innerHTML = ""; 

      
      municipalities.forEach((municipality, index) => {
          if (index >= populations.length || index >= employmentAmounts.length) {
              console.warn(`Missing data for municipality: ${municipality}`);
              return;
          }

          const population = populations[index];
          const employmentAmount = employmentAmounts[index];
          const employmentPercent = ((employmentAmount / population) * 100).toFixed(2);

          
          const row = document.createElement("tr");

          
          const cells = [
              municipality,
              population,
              employmentAmount,
              `${employmentPercent}%`
          ];

          cells.forEach(cellText => {
              const cell = document.createElement("td");
              cell.textContent = cellText;
              row.appendChild(cell);
          });

         
          if (employmentPercent > 45) {
              row.style.backgroundColor = "#abffbd";
          } else if (employmentPercent < 25) {
              row.style.backgroundColor = "#ff9e9e";
          }

          
          tbody.appendChild(row);
      });
  } catch (error) {
      console.error("Error fetching data:", error);
  }
});


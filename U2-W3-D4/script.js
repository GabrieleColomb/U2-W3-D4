const myURL = `https://api.pexels.com/v1/search?query=landscapes`

const loadImages = function () {
  fetch(myURL, {
    headers: {
      Authorization: "dPp5EaxCkWtKMddcH79nua2VcYg7nVbe37RSaBf7W7PBRTTnZI2jpuVI",
    },
  })
    .then((res) => {
      console.log(res)
      if (res.ok) {
        return res.json()
      } else {
        throw new Error("Errore")
      }
    })
    .then((landscapes) => {
      const landscapeArr = landscapes.photos
      console.log(landscapeArr)
      landscapeArr.forEach((photo, i) => {
        const imgRow = document.getElementById("img-row")
        let newCol = document.createElement("div")
        newCol.classList.add("col-md-4")
        newCol.innerHTML = `
        <div class="card mb-4 shadow-sm">
                <img src="${photo.src.medium}" alt="">
                <div class="card-body">
                  <h5 class="card-title">${photo.photographer}</h5>
                  <p class="card-text">
                    ${photo.alt}
                  </p>
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <div class="btn-group">
                      <button
                        type="button"
                        class="btn btn-sm btn-outline-secondary"
                      >
                        View
                      </button>
                      <button
                      id="hide-button"
                        type="button"
                        class="btn btn-sm btn-outline-secondary"
                      >
                        Hide
                      </button>
                    </div>
                    <small class="text-muted">ID Photo: ${photo.id}</small>
                  </div>
                </div>
              </div>
        `
        imgRow.appendChild(newCol)
        let hideButtonAll = document.querySelectorAll("#hide-button")
        let hideButton = hideButtonAll[i]
        hideButton.addEventListener("click", function () {
          hideButton.parentElement.parentElement.parentElement.parentElement.remove()
        })
      })
    })
    .catch((err) => {
      console.log(err)
    })
}

let firstLoadBtn = document.getElementById("first-load-image")
firstLoadBtn.addEventListener("click", loadImages)
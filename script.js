const menus = document.querySelectorAll(".menu");
const pages = document.querySelectorAll(".page");

menus.forEach(btn => {
  btn.onclick = () => {
    menus.forEach(x => x.classList.remove("active"));
    pages.forEach(x => x.classList.remove("active-page"));
    btn.classList.add("active");
    document.getElementById(btn.dataset.page).classList.add("active-page");
  };
});

const save = document.getElementById("save");
const reportList = document.getElementById("reportList");
const search = document.getElementById("search");
const photoFile = document.getElementById("photoFile");

const photoModal = document.getElementById("photoModal");
const modalPhoto = document.getElementById("modalPhoto");
const closePhotoModal = document.getElementById("closePhotoModal");

function getData() {
  return JSON.parse(localStorage.getItem("rb_reports")) || [];
}

function setData(data) {
  localStorage.setItem("rb_reports", JSON.stringify(data));
}

function fileToDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function openPhotoModal(src) {
  if (!src) return;
  modalPhoto.src = src;
  photoModal.classList.add("show");
}

function closeModal() {
  photoModal.classList.remove("show");
  modalPhoto.src = "";
}

closePhotoModal.onclick = closeModal;
photoModal.onclick = (e) => {
  if (e.target === photoModal) closeModal();
};

function render() {
  const data = getData();
  reportList.innerHTML = "";

  if (!data.length) {
    reportList.innerHTML = `<div class="card"><div class="card-left">No Reports</div></div>`;
    return;
  }

  data.forEach((x, i) => {
    reportList.innerHTML += `
      <div class="card">
        <div style="display:flex;gap:16px;flex:1;">
          ${x.photo ? `<img class="card-photo" src="${x.photo}" alt="photo">` : ""}
          <div class="card-left">
            <h2>${x.name || "No Title"}</h2>
            <br>
            <div>Market: ${x.market || ""}</div>
            <br>
            <div>Pair: ${x.pair || ""}</div>
            <br>
            <div>Win Rate: ${x.win || ""}</div>
            <br>
            <div>${x.note || ""}</div>
          </div>
        </div>

        <div class="card-right">
          <button class="action-btn btn-play" onclick="playVideo(${i})">▶ Play Video</button>
          <button class="action-btn btn-photo" onclick="viewPhoto(${i})">🖼 View Photo</button>
          <button class="action-btn btn-delete" onclick="deleteItem(${i})">🗑 Delete</button>
        </div>
      </div>
    `;
  });
}

save.onclick = async () => {
  const obj = {
    name: document.getElementById("name").value.trim(),
    market: document.getElementById("market").value.trim(),
    pair: document.getElementById("pair").value.trim(),
    win: document.getElementById("win").value.trim(),
    note: document.getElementById("note").value.trim(),
    video: document.getElementById("video").value.trim(),
    photo: ""
  };

  if (!obj.name) {
    alert("Setup Name Required");
    return;
  }

  if (photoFile && photoFile.files && photoFile.files[0]) {
    obj.photo = await fileToDataURL(photoFile.files[0]);
  }

  const data = getData();
  data.unshift(obj);
  setData(data);
  render();

  document.getElementById("name").value = "";
  document.getElementById("pair").value = "";
  document.getElementById("win").value = "";
  document.getElementById("note").value = "";
  document.getElementById("video").value = "";
  document.getElementById("photo").value = "";
  if (photoFile) photoFile.value = "";
};

function deleteItem(i) {
  const data = getData();
  data.splice(i, 1);
  setData(data);
  render();
}

function playVideo(i) {
  const data = getData();
  const url = data[i]?.video;
  if (url) {
    window.open(url, "_blank");
  } else {
    alert("No Video");
  }
}

function viewPhoto(i) {
  const data = getData();
  const src = data[i]?.photo;
  if (src) {
    openPhotoModal(src);
  } else {
    alert("No Photo");
  }
}

if (search) {
  search.addEventListener("input", () => {
    const text = search.value.toLowerCase();
    document.querySelectorAll(".card").forEach(c => {
      c.style.display = c.innerText.toLowerCase().includes(text) ? "flex" : "none";
    });
  });
}

const noteBtn = document.querySelector("#notes button");
if (noteBtn) {
  noteBtn.onclick = () => {
    const txt = document.getElementById("noteText").value;
    localStorage.setItem("rb_note", txt);
    alert("Note Saved");
  };
}

const clear = document.querySelector("#settings button");
if (clear) {
  clear.onclick = () => {
    if (confirm("Delete all data?")) {
      localStorage.clear();
      location.reload();
    }
  };
}

render();

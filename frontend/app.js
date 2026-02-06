const apiBaseInput = document.getElementById("apiBase");
const saveBaseButton = document.getElementById("saveBase");
const healthButton = document.getElementById("healthBtn");
const refreshButton = document.getElementById("refreshBtn");
const statusEl = document.getElementById("status");
const createForm = document.getElementById("createForm");
const createResult = document.getElementById("createResult");
const getForm = document.getElementById("getForm");
const getResult = document.getElementById("getResult");
const itemsList = document.getElementById("itemsList");

const DEFAULT_BASE = "http://localhost:8080";

function normalizeBase(url) {
  return url.replace(/\/+$/, "");
}

function setStatus(message, level = "ok") {
  statusEl.textContent = message;
  statusEl.classList.remove("error", "warn");
  if (level === "error") {
    statusEl.classList.add("error");
  }
  if (level === "warn") {
    statusEl.classList.add("warn");
  }
}

function setApiBase(url, persist = true) {
  const normalized = normalizeBase(url);
  apiBaseInput.value = normalized;
  if (persist) {
    localStorage.setItem("itemApiBase", normalized);
  }
}

function getApiBase() {
  const value = apiBaseInput.value.trim();
  if (value.length > 0) {
    return normalizeBase(value);
  }
  return DEFAULT_BASE;
}

function apiUrl(path) {
  return `${getApiBase()}${path}`;
}

async function parseResponse(response) {
  const text = await response.text();
  if (!text) {
    return null;
  }
  try {
    return JSON.parse(text);
  } catch (error) {
    return text;
  }
}

function formatJson(data) {
  if (data === null || data === undefined) {
    return "";
  }
  if (typeof data === "string") {
    return data;
  }
  return JSON.stringify(data, null, 2);
}

function buildItemCard(item) {
  return `
    <div class="item-card">
      <h3>${item.name}</h3>
      <p>${item.description || "No description"}</p>
      <p>Price: ${item.price !== null && item.price !== undefined ? item.price : "N/A"}</p>
      <span>${item.category || "Uncategorized"}</span>
    </div>
  `;
}

async function handleHealthCheck() {
  setStatus("Checking health endpoint...");
  try {
    const response = await fetch(apiUrl("/healthz"));
    const payload = await parseResponse(response);
    if (!response.ok) {
      throw new Error(formatJson(payload) || response.statusText);
    }
    setStatus(`Healthy: ${formatJson(payload)}`);
  } catch (error) {
    setStatus(`Health check failed: ${error.message}`, "error");
  }
}

async function fetchAllItems() {
  setStatus("Loading items...");
  try {
    const response = await fetch(apiUrl("/api/items"));
    const payload = await parseResponse(response);
    if (!response.ok) {
      throw new Error(formatJson(payload) || response.statusText);
    }

    if (!payload || payload.length === 0) {
      itemsList.innerHTML = '<div class="empty">No items found. Create one above.</div>';
    } else {
      itemsList.innerHTML = payload.map(buildItemCard).join("");
    }
    setStatus(`Loaded ${payload ? payload.length : 0} item(s).`);
  } catch (error) {
    setStatus(`Failed to load items: ${error.message}`, "error");
  }
}

createForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  createResult.textContent = "";

  const name = document.getElementById("name").value.trim();
  const description = document.getElementById("description").value.trim();
  const category = document.getElementById("category").value.trim();
  const priceInput = document.getElementById("price").value.trim();

  const payload = {
    name,
    description,
  };

  if (category.length > 0) {
    payload.category = category;
  }

  if (priceInput.length > 0) {
    const price = Number(priceInput);
    if (Number.isNaN(price)) {
      setStatus("Price must be a valid number.", "warn");
      return;
    }
    payload.price = price;
  }

  setStatus("Creating item...");

  try {
    const response = await fetch(apiUrl("/api/items"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await parseResponse(response);
    if (!response.ok) {
      throw new Error(formatJson(data) || response.statusText);
    }

    createResult.textContent = formatJson(data);
    createForm.reset();
    setStatus("Item created successfully.");
    fetchAllItems();
  } catch (error) {
    createResult.textContent = error.message;
    setStatus(`Create failed: ${error.message}`, "error");
  }
});

getForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  getResult.textContent = "";
  const itemId = document.getElementById("itemId").value.trim();

  if (!itemId) {
    setStatus("Enter an item id to fetch.", "warn");
    return;
  }

  setStatus(`Fetching item ${itemId}...`);

  try {
    const response = await fetch(apiUrl(`/api/items/${itemId}`));
    const data = await parseResponse(response);
    if (!response.ok) {
      throw new Error(formatJson(data) || response.statusText);
    }
    getResult.textContent = formatJson(data);
    setStatus("Item loaded.");
  } catch (error) {
    getResult.textContent = error.message;
    setStatus(`Fetch failed: ${error.message}`, "error");
  }
});

saveBaseButton.addEventListener("click", () => {
  const value = apiBaseInput.value.trim();
  if (value.length === 0) {
    setStatus("Enter the API base URL before saving.", "warn");
    return;
  }
  setApiBase(value);
  setStatus(`API base saved: ${getApiBase()}`);
});

healthButton.addEventListener("click", handleHealthCheck);
refreshButton.addEventListener("click", fetchAllItems);

const savedBase = localStorage.getItem("itemApiBase");
const params = new URLSearchParams(window.location.search);
const paramBase = params.get("api");

if (paramBase) {
  setApiBase(paramBase);
} else if (savedBase) {
  setApiBase(savedBase, false);
} else if (window.API_BASE_URL) {
  setApiBase(window.API_BASE_URL, false);
} else {
  setApiBase(DEFAULT_BASE, false);
}

setStatus("Ready. Save the API base URL if you deploy the backend.");

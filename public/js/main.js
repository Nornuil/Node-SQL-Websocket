const socket = io();

socket.on("update_products", async (data) => {
  // console.log("desde el on",data)
  showProducts(data);
});

document
  .querySelector("#form-add-product")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    await fetch("/api/productos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: document.querySelector("#form-add-product input[name=title]")
          .value,
        price: document.querySelector("#form-add-product input[name=price]")
          .value,
        thumbnail: document.querySelector(
          "#form-add-product input[name=thumbnail]"
        ).value,
      }),
    });
    // socket.emit()
  });

async function showProducts(data) {
  // console.log("mostrar ", data);
  const fetchTemplateHbs = await fetch("/templates/list_products.hbs");
  const templateHbs = await fetchTemplateHbs.text();
  const template = Handlebars.compile(templateHbs);
  const html = template({ products: data });
  document.querySelector("#list-products").innerHTML = html;
}

//CHAT
document.getElementById("formChat").addEventListener("submit", (e) => {
  e.preventDefault();
  socket.emit("new_message", {
    email: document.querySelector("input[name=email]").value,
    message: document.querySelector("input[name=message]").value,
    fecha: new Date(),
  });
  // console.log("boton apretado");
});

const render = (data) => {
  const html = data
    .map((elem) => {
      return `<div>
      <strong>${elem.email}</strong>
      <em>${elem.message}</em>
      <em class="fecha">${elem.fecha}</em>
      </div>`;
    })
    .join("");
  document.querySelector("#messages").innerHTML = html;
};

const renderhbs = (messages) => {
  const tplHtml = document.querySelector("#messages-tpl").innerHTML;
  const template = Handlebars.compile(tplHtml);
  document.querySelector("#messages").innerHTML = template({ messages });
};

socket.on("messages_received", (data) => {
  renderhbs(data);
});

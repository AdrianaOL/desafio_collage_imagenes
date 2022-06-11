
const imagenes = Array.from(document.querySelectorAll(".img"));
console.log(imagenes),
imagenes.forEach((img) =>
  img.addEventListener("click", (e) => {
    console.log(e)
    fetch("http://localhost:3000/deleteImg" + e.target.nombre, {
      method: "DELETE",
    })
  })
);
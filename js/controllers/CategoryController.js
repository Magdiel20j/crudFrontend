import {
    getCategories,
    updateCategory,
    deleteCategory,
    createCategory
} from "../controllers/services/CategoryService.js";

document.addEventListener("DOMContentLoaded", ()=>{
    const tableBody = document.querySelector("#categoriesTable tbody");
    const form = document.getElementById("categoryForm");
    const modal = new bootstrap.Modal(document.getElementById("categoryModal") );
    const lbModal = document.getElementById("categoryModalLabel");
    const btnAdd = document.getElementById("btnAddCategory");

    btnAdd.addEventListener("click", ()=>{
        form.reset();
        form.categoryId.value = "";
        lbModal.textContent = "Agregar Categoria";
        modal.show();

    });


    form.addEventListener("submit", async (e)=>{
        e.preventDefault(); // Evita que el formulario se envie
        const id = form.categoryId.value // se obtiene el ID guardado en el form
        const data = {
            nombreCategoria: form.categoryName.value.trim(),
            descripcion: form.categoryDescription.value.trim()
        };

        try{
                  if(id){
                    await updateCategory(id, data);
                  }
                  else{
                    await createCategory(data);
                  }
                  modal.hide();
                  await loadCategories();
        }
        catch(err){
            console.error("Error al guardar la categoria: ", err);

        }
    });

    async function loadCategories() {
        try{
           const categories = await getCategories();
           tableBody.innerHTML = ''; // vaciamos el tbody
           // verifica si no hay categorias registradas
           if(!categories || categories.length == 0){
            tableBody.innerHTML = 'td colspan="5">Actualmente no hay registros</td';
            return; // el codigo deja de ejecutarse
           }

           
        }
        catch(err){

        }
    }
});
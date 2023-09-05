(getPeople = ()=>{
        fetch("https://reqres.in/api/users", { method: "GET"})
        .then(res => res.json())
        .then(({data}) => {
        
           let body = document.getElementById("people");
           body.innerHTML = ""

           data.forEach((item) =>{
                body.innerHTML += `
                    <tr>
                        <td class="align-middle">${item.id}</td>
                        <td class="align-middle">${item.first_name}</td>
                        <td class="align-middle">${item.last_name}</td>
                        <td class="align-middle">${item.email}</td>
                        <td class="align-middle"><img src="${item.avatar}" width="50" height="50" /></td>
                        <td class="align-middle">
                             <button class="btn btn-primary" onclick="see(${item.id})">Ver</button>
                             <button class="btn btn-primary" onclick="preUpdate(${item.id})">Modificar</button>
                             <button class="btn btn-danger" onclick="deletePeople(${item.id})">Eliminar</button>
                        </td>
                    </tr>
                `
           })

        })
})()


const preAdd = () =>{
    console.log("add");
    $('#addPeople').modal("show")
}


const add = (event) =>{
    event.preventDefault();
    let object = {
        name: document.getElementById("nombre").value,
        job: document.getElementById("trabajo").value
    }

    Swal.fire({
        title: '¿Estas seguro de guardar los cambios?',
        showDenyButton: true,
        confirmButtonText: 'Confirmar',
        denyButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {
            fetch("https://reqres.in/api/users", {method: "POST", headers:{'Content-Type': 'application/json'}, body: JSON.stringify(object)})
            .then(res => {
                console.log(res);
                if(res.ok){
                    Swal.fire('Guardado!', '', 'success')
                    getPeople()
                    $('#addPeople').modal("hide")
                    clearRegister()
                }
            })
        } else if (result.isDenied) {
          Swal.fire('Cambios no guardados', '', 'info')
        }
      })


}

const preUpdate = async(id) =>{
    console.log(id);
    const response = await fetch(`https://reqres.in/api/users/${id}`)
    const {data} = await response.json()
    const {first_name} = data
    document.getElementById("id").value = id
    document.getElementById("nombreUpdate").value = first_name
    document.getElementById("trabajoUpdate").value = "Abogado"
    $('#updatePeople').modal("show")
}


const clearRegister = () =>{
    document.getElementById("nombre").value = ""
    document.getElementById("trabajo").value = ""
}


const update = (event) =>{
    event.preventDefault();
    let id = document.getElementById("id").value
    let object = {
        name: document.getElementById("nombreUpdate").value,
        job: document.getElementById("trabajoUpdate").value
    }

    Swal.fire({
        title: `¿Estas seguro de guardar los cambios de ${object.name}?`,
        showDenyButton: true,
        confirmButtonText: 'Confirmar',
        denyButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {
            fetch(`https://reqres.in/api/users/${id}`, {method: "PUT", headers:{'Content-Type': 'application/json'}, body: JSON.stringify(object)})
            .then(res => {
                console.log(res);
                if(res.ok){
                    Swal.fire('Modificado!', '', 'success')
                    getPeople()
                    $('#updatePeople').modal("hide")
                    clearUpdate()
                }
            })
        } else if (result.isDenied) {
          Swal.fire('Cambios no guardados', '', 'info')
        }
      })


}


const clearUpdate = () =>{
    document.getElementById("nombreUpdate").value = ""
    document.getElementById("trabajoUpdate").value = ""
}


const deletePeople = (id) =>{
    Swal.fire({
        title: `¿Estas seguro de eliminar a la persona?`,
        showDenyButton: true,
        confirmButtonText: 'Confirmar',
        denyButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {
            fetch(`https://reqres.in/api/users/${id}`, {method: "DELETE", headers:{'Content-Type': 'application/json'}})
            .then(res => {
                if(parseInt(res.status) === 204){
                    Swal.fire('Eliminado!', '', 'success')
                    getPeople()
                }
            })
        } else if (result.isDenied) {
          Swal.fire('Cambios no guardados', '', 'info')
        }
      })
} 

const see = async(id) =>{
    const response = await fetch(`https://reqres.in/api/users/${id}`)
    const {data} = await response.json()
    console.log(data);
    const {first_name, last_name, avatar, email} = data

    document.getElementById("nombreInfo").innerText = first_name;
    document.getElementById("apellidosInfo").innerText = last_name;
    document.getElementById("correoInfo").innerText = email;
    document.getElementById("avatar").src = avatar;

    $('#seePeople').modal("show")
}

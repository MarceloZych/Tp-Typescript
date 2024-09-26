function eliminarEntidad(id, entidad) {
    if (confirm(`¿Estás seguro de que deseas eliminar este ${entidad}?`)) {
        fetch(`/${entidad}/${id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            if (data.mensaje === `${entidad} eliminado`) {
                alert(`${entidad} eliminado con éxito.`);
                window.location.reload();
            } else {
                alert(data.mensaje);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert(`Error al eliminar el ${entidad}.`);
        });
    }
}

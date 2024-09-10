
routes.get('/', estrudianteController.consultar)
routes.post('/', estrudianteController.insertar)

routes.route('/:id')
        .get(estrudianteController.consultarUno)
        .put(estrudianteController.modificar)
        .delete(estrudianteController.eliminar)

module.exports = routes
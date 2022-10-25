const {
    addMhsHandler,
    getMhsByIdHandler,
    getAllMhsHandler,
    editMhsByIdHandler,
    deleteMhsByIdHandler,
} = require('./handler');

const routes = [
    {
        method: 'POST',
        path: '/mahasiswa',
        handler: addMhsHandler,
    },
    {
        method: 'GET',
        path: '/mahasiswa/{mhsId}',
        handler: getMhsByIdHandler,
    },
    {
        method: 'GET',
        path: '/mahasiswa',
        handler: getAllMhsHandler,
    },
    {
        method: 'PUT',
        path: '/mahasiswa/{mhsId}',
        handler: editMhsByIdHandler,
    },
    {
        method: 'DELETE',
        path: '/mahasiswa/{mhsId}',
        handler: deleteMhsByIdHandler,
    }
];

module.exports = routes;
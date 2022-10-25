const { nanoid } = require('nanoid');
const mhs = require('./mhs');

const addMhsHandler = (request, h) => {
    const {
        name, 
        nim, 
        major,
        graduYear,
    } = request.payload;

    if(!name){
        const response = h.response({
            "status": "fail",
            "message": "Gagal menambahkan data mahasiswa."
        });
        response.code(400);
        return response;
    }

    const id = nanoid(12);
    const insertedAt = new Date().toISOString();
    const updateAt = insertedAt;
   
    const newMhs = {
        id,
        name, 
        nim, 
        major,
        graduYear,
        insertedAt,
        updateAt,
    };

    mhs.push(newMhs);

    const isSuccess = mhs.filter((m) => m.id === id).length > 0;

    if(isSuccess){
        const response = h.response ({
            status: 'success',
            message: 'data berhasil ditambahkan',
            data: {
                mhsId: id,
            },
        });
        response.code(201);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'data gagal ditambahkan',
    });
    response.code(500);
    return response;
    
}

const getMhsByIdHandler = (request, h) => {
    const { mhsId  } = request.params;

    const mahasiswa = mhs.filter((m) => m.id === mhsId )[0];

    if ( mahasiswa !== undefined){
        return {
            status: 'success',
            data: {
                mahasiswa,
            },
        };
    }

    const response = h.response({
        status: 'fail',
        message: 'mahasiswa tidak ditemukan',
    });
    response.code(404);
    return response;
};

const getAllMhsHandler = (request, h) => {
    let bodyResponse = {
        status: 'success',
        data: {
            mahasiswa: mhs,
        },
    };
    return bodyResponse;
};

const editMhsByIdHandler = (request, h) => {
    const { mhsId } = request.params;

    const {
        name, 
        nim, 
        major,
        graduYear,
    } = request.payload;
    
    if (name === null || name === undefined || !name) {
        const response = h.response({
          status: 'fail',
          message: 'Gagal memperbarui nama. Mohon isi nama mahasiswa',
        });
        response.code(400);
        return response;
    }
        
    const updatedAt = new Date().toISOString();
    const mahasiswa = mhs.findIndex((m) => m.id === mhsId);

    if (mahasiswa !== -1) {
        mhs[mahasiswa] = {
            ...mhs[mahasiswa],
            name, 
            nim, 
            major,
            graduYear,
            updatedAt,
        };
        const response = h.response({
            status: 'success',
            message: 'mahasiswa berhasil diperbarui',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui mahasiswa. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

const deleteMhsByIdHandler = (request, h) => {
    const { mhsId } = request.params;

    const mahasiswa = mhs.findIndex((m) => m.id === mhsId);

    if (mahasiswa !== -1) {
        mhs.splice(mahasiswa, 1);
        const response = h.response({
            status: 'success',
            message: 'nama berhasil dihapus',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'nama gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

module.exports = {
    addMhsHandler,
    getMhsByIdHandler,
    getAllMhsHandler,
    editMhsByIdHandler,
    deleteMhsByIdHandler,
};
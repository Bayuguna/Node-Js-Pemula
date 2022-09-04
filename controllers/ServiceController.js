import Service from "../models/Service.js";

export const getService =  async(req, res) => {
    const service = await Service.find();

    res.json(service);
}

export const postService =  async (req, res) => {
    const service = new Service(req.body);

    try{
        const saveService = await service.save();
        res.status(200).json({status : 200, message: "Data berhasil tersimpan", data : saveService});
    }catch{
        res.status(401).json({message: "Data gagal tersimpan"})
    }
}

export const getServiceById =  async (req, res) => {
    const service = await Service.findById(req.params.id);

    if(!service) return res.status(404).json({status : 404, message :"Data tidak ditemukan"})
    res.status(200).json({status : 200, message: "Data berhasil ditemukan", data : service});
}


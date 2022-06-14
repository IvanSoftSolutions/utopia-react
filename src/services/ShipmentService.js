import http from "../http-common";

class ShipmentServices {

    getShipments() {
        return http.get("/Shipment");
    }

    postShipment(data) {
        return http.post("/Shipment/", data);
    }

    updateShipment(data) {
        return http.put(`/Shipment?id=${data.id}&date=${data.date}`)
    }
}

export default new ShipmentServices();
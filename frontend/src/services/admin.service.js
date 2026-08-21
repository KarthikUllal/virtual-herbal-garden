import api from "../utils/axios";

export const createPlant = async (formData, token) => {
    return await api.post("/admin/plants", formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        },
    });
};

export const updatePlant = async (plantId, formData, token) => {
  return await api.put(`/admin/plants/${plantId}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deletePlant = async (plantId, token) => {
    return await api.delete(`/admin/plants/${plantId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};


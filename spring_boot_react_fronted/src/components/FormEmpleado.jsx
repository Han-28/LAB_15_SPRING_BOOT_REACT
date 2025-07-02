import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const API_URL = "http://localhost:8080/api/v1/empleados";

const FormEmpleado = () => {
  const [empleado, setEmpleado] = useState({
    nombre: "",
    apellido: "",
    email: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios
        .get(`${API_URL}/${id}`)
        .then((res) => setEmpleado(res.data))
        .catch(() => alert("Error cargando empleado"));
    }
  }, [id]);

  const handleChange = (e) => {
    setEmpleado({
      ...empleado,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      axios
        .put(`${API_URL}/${id}`, empleado)
        .then(() => navigate("/"))
        .catch(() => alert("Error actualizando empleado"));
    } else {
      axios
        .post(API_URL, empleado)
        .then(() => navigate("/"))
        .catch(() => alert("Error creando empleado"));
    }
  };

  return (
    <div className="container">
      <h2>{id ? "Editar Empleado" : "Agregar Empleado"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            name="nombre"
            value={empleado.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Apellido</label>
          <input
            type="text"
            className="form-control"
            name="apellido"
            value={empleado.apellido}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={empleado.email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">
          {id ? "Actualizar" : "Guardar"}
        </button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate("/")}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default FormEmpleado;

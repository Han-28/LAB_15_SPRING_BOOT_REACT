import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const API_URL = `${import.meta.env.VITE_API_URL}/empleados`;
const ListEmpleado = () => {
  const [empleados, setEmpleados] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        setEmpleados(response.data);
      })
      .catch((error) => {
        console.error("Error fetching empleados:", error);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este empleado?")) {
      axios
        .delete(`${API_URL}/${id}`)
        .then(() => {
          setEmpleados(empleados.filter((e) => e.id !== id));
        })
        .catch((error) => {
          alert("Error eliminando empleado");
          console.error(error);
        });
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="container mt-4">
      <Link to="/add" className="btn btn-primary mb-3">
        {" "}
        Agregar
      </Link>
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map((empleado) => (
            <tr key={empleado.id}>
              <td>{empleado.id}</td>
              <td>{empleado.nombre}</td>
              <td>{empleado.apellido}</td>
              <td>{empleado.email}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => handleEdit(empleado.id)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(empleado.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListEmpleado;

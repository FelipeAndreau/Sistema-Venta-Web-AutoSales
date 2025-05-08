import { useState } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const GestionVehiculos = () => {
  const [vehiculos, setVehiculos] = useState([
    {
      id: "VH-1001",
      marca: "Toyota",
      modelo: "Corolla",
      anio: 2023,
      precio: 24500,
      estado: "Disponible",
      imagen: "/images/toyota-corolla.jpg",
      descripcion: "Un sedán confiable y eficiente, ideal para la ciudad.",
    },
    {
      id: "VH-1002",
      marca: "Honda",
      modelo: "CR-V",
      anio: 2022,
      precio: 32000,
      estado: "Reservado",
      imagen: "/images/honda-crv.jpg",
      descripcion: "SUV espacioso y cómodo, perfecto para viajes largos.",
    },
    {
      id: "VH-1003",
      marca: "Ford",
      modelo: "Explorer",
      anio: 2021,
      precio: 41000,
      estado: "Vendido",
      imagen: "/images/ford-explorer.jpg",
      descripcion: "SUV robusto y confiable para cualquier terreno.",
    },
  ]);

  const [nuevoVehiculo, setNuevoVehiculo] = useState({
    marca: "",
    modelo: "",
    anio: "",
    precio: "",
    estado: "Disponible",
    imagen: "",
    descripcion: "",
  });

  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState<{
    id: string;
    marca: string;
    modelo: string;
    anio: number;
    precio: number;
    estado: string;
    imagen: string;
    descripcion: string;
  } | null>(null);
  const [modalTipo, setModalTipo] = useState(""); // "ver", "editar"

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setNuevoVehiculo((prev) => ({ ...prev, imagen: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const agregarVehiculo = () => {
    if (
      nuevoVehiculo.marca &&
      nuevoVehiculo.modelo &&
      nuevoVehiculo.anio &&
      nuevoVehiculo.precio &&
      nuevoVehiculo.imagen &&
      nuevoVehiculo.descripcion
    ) {
      setVehiculos((prevVehiculos) => [
        ...prevVehiculos,
        {
          id: `VH-${Math.floor(Math.random() * 10000)}`,
          ...nuevoVehiculo,
          anio: Number(nuevoVehiculo.anio),
          precio: Number(nuevoVehiculo.precio),
        },
      ]);
      setNuevoVehiculo({
        marca: "",
        modelo: "",
        anio: "",
        precio: "",
        estado: "Disponible",
        imagen: "",
        descripcion: "",
      });
    } else {
      alert("Por favor, completa todos los campos antes de agregar un vehículo.");
    }
  };

  const abrirModal = (vehiculo: typeof vehiculos[0], tipo: "ver" | "editar") => {
    setVehiculoSeleccionado(vehiculo);
    setModalTipo(tipo);
  };

  const cerrarModal = () => {
    setVehiculoSeleccionado(null);
    setModalTipo("");
  };

  const guardarCambios = () => {
    if (vehiculoSeleccionado) {
      setVehiculos((prevVehiculos) =>
        prevVehiculos.map((vehiculo) =>
          vehiculo.id === vehiculoSeleccionado.id ? vehiculoSeleccionado : vehiculo
        )
      );
      cerrarModal();
    }
  };

  const eliminarVehiculo = (id: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar este vehículo?")) {
      setVehiculos((prevVehiculos) =>
        prevVehiculos.filter((vehiculo) => vehiculo.id !== id)
      );
    }
  };

  return (
    <div
      className="w-full h-full p-5 bg-cover bg-center"
      style={{ backgroundImage: "url('/GestionVehiculoBK.png')" }}
    >
      <div className="bg-white p-5 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-5">Gestión de Vehículos</h2>

        {/* Formulario para agregar vehículo */}
        <div className="mb-5">
          <h3 className="text-lg font-semibold mb-3">Agregar Nuevo Vehículo</h3>
          <div className="flex flex-wrap gap-4">
            <input
              type="text"
              placeholder="Marca"
              value={nuevoVehiculo.marca}
              onChange={(e) =>
                setNuevoVehiculo({ ...nuevoVehiculo, marca: e.target.value })
              }
              className="p-2 border border-gray-300 rounded-md flex-1"
            />
            <input
              type="text"
              placeholder="Modelo"
              value={nuevoVehiculo.modelo}
              onChange={(e) =>
                setNuevoVehiculo({ ...nuevoVehiculo, modelo: e.target.value })
              }
              className="p-2 border border-gray-300 rounded-md flex-1"
            />
            <input
              type="number"
              placeholder="Año"
              value={nuevoVehiculo.anio}
              onChange={(e) =>
                setNuevoVehiculo({ ...nuevoVehiculo, anio: e.target.value })
              }
              className="p-2 border border-gray-300 rounded-md flex-1"
            />
            <input
              type="number"
              placeholder="Precio"
              value={nuevoVehiculo.precio}
              onChange={(e) =>
                setNuevoVehiculo({ ...nuevoVehiculo, precio: e.target.value })
              }
              className="p-2 border border-gray-300 rounded-md flex-1"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="p-2 border border-gray-300 rounded-md flex-1"
            />
            <textarea
              placeholder="Descripción"
              value={nuevoVehiculo.descripcion}
              onChange={(e) =>
                setNuevoVehiculo({ ...nuevoVehiculo, descripcion: e.target.value })
              }
              className="p-2 border border-gray-300 rounded-md flex-1"
            />
            <select
              value={nuevoVehiculo.estado}
              onChange={(e) =>
                setNuevoVehiculo({ ...nuevoVehiculo, estado: e.target.value })
              }
              className="p-2 border border-gray-300 rounded-md"
            >
              <option value="Disponible">Disponible</option>
              <option value="Reservado">Reservado</option>
              <option value="Vendido">Vendido</option>
            </select>
            <button
              onClick={agregarVehiculo}
              className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Agregar Vehículo
            </button>
          </div>
        </div>

        {/* Tabla de vehículos */}
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">Imagen</th>
              <th className="border border-gray-300 p-2">Marca</th>
              <th className="border border-gray-300 p-2">Modelo</th>
              <th className="border border-gray-300 p-2">Año</th>
              <th className="border border-gray-300 p-2">Precio</th>
              <th className="border border-gray-300 p-2">Estado</th>
              <th className="border border-gray-300 p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {vehiculos.map((vehiculo) => (
              <tr key={vehiculo.id} className="text-center">
                <td className="border border-gray-300 p-2">
                  <img
                    src={vehiculo.imagen}
                    alt={vehiculo.modelo}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </td>
                <td className="border border-gray-300 p-2">{vehiculo.marca}</td>
                <td className="border border-gray-300 p-2">{vehiculo.modelo}</td>
                <td className="border border-gray-300 p-2">{vehiculo.anio}</td>
                <td className="border border-gray-300 p-2">${vehiculo.precio}</td>
                <td className="border border-gray-300 p-2">
                  <span
                    className={`px-2 py-1 rounded-full text-white text-sm ${
                      vehiculo.estado === "Disponible"
                        ? "bg-green-500"
                        : vehiculo.estado === "Reservado"
                        ? "bg-yellow-500"
                        : "bg-gray-500"
                    }`}
                  >
                    {vehiculo.estado}
                  </span>
                </td>
                <td className="border border-gray-300 p-2">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      className="p-2 bg-gray-200 rounded-md hover:bg-gray-300"
                      onClick={() => abrirModal(vehiculo, "ver")}
                    >
                      <FaEye />
                    </button>
                    <button
                      className="p-2 bg-gray-200 rounded-md hover:bg-gray-300"
                      onClick={() => abrirModal(vehiculo, "editar")}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                      onClick={() => eliminarVehiculo(vehiculo.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {vehiculoSeleccionado && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-5 rounded-lg shadow-lg w-[90%] max-w-md">
            <h3 className="text-lg font-bold mb-3">
              {modalTipo === "ver" ? "Detalles del Vehículo" : "Editar Vehículo"}
            </h3>
            <div className="mb-5">
              <label className="block text-sm font-semibold mb-1">Marca</label>
              <input
                type="text"
                value={vehiculoSeleccionado.marca}
                onChange={(e) =>
                  setVehiculoSeleccionado({
                    ...(vehiculoSeleccionado || {}),
                    marca: e.target.value,
                  })
                }
                className="p-2 border border-gray-300 rounded-md w-full"
                disabled={modalTipo === "ver"}
              />
            </div>
            <div className="mb-5">
              <label className="block text-sm font-semibold mb-1">Modelo</label>
              <input
                type="text"
                value={vehiculoSeleccionado.modelo}
                onChange={(e) =>
                  setVehiculoSeleccionado({
                    ...vehiculoSeleccionado,
                    modelo: e.target.value,
                  })
                }
                className="p-2 border border-gray-300 rounded-md w-full"
                disabled={modalTipo === "ver"}
              />
            </div>
            <div className="mb-5">
              <label className="block text-sm font-semibold mb-1">Año</label>
              <input
                type="number"
                value={vehiculoSeleccionado.anio}
                onChange={(e) =>
                  setVehiculoSeleccionado({
                    ...vehiculoSeleccionado,
                    anio: Number(e.target.value),
                  })
                }
                className="p-2 border border-gray-300 rounded-md w-full"
                disabled={modalTipo === "ver"}
              />
            </div>
            <div className="mb-5">
              <label className="block text-sm font-semibold mb-1">Precio</label>
              <input
                type="number"
                value={vehiculoSeleccionado.precio}
                onChange={(e) =>
                  setVehiculoSeleccionado({
                    ...vehiculoSeleccionado,
                    precio: Number(e.target.value),
                  })
                }
                className="p-2 border border-gray-300 rounded-md w-full"
                disabled={modalTipo === "ver"}
              />
            </div>
            <div className="mb-5">
              <label className="block text-sm font-semibold mb-1">Imagen</label>
              <input
                type="text"
                value={vehiculoSeleccionado.imagen}
                onChange={(e) =>
                  setVehiculoSeleccionado({
                    ...vehiculoSeleccionado,
                    imagen: e.target.value,
                  })
                }
                className="p-2 border border-gray-300 rounded-md w-full"
                disabled={modalTipo === "ver"}
              />
            </div>
            <div className="mb-5">
              <label className="block text-sm font-semibold mb-1">Descripción</label>
              <textarea
                value={vehiculoSeleccionado.descripcion}
                onChange={(e) =>
                  setVehiculoSeleccionado({
                    ...vehiculoSeleccionado,
                    descripcion: e.target.value,
                  })
                }
                className="p-2 border border-gray-300 rounded-md w-full"
                disabled={modalTipo === "ver"}
              />
            </div>
            <div className="mb-5">
              <label className="block text-sm font-semibold mb-1">Estado</label>
              <select
                value={vehiculoSeleccionado.estado}
                onChange={(e) =>
                  setVehiculoSeleccionado({
                    ...vehiculoSeleccionado,
                    estado: e.target.value,
                  })
                }
                className="p-2 border border-gray-300 rounded-md w-full"
                disabled={modalTipo === "ver"}
              >
                <option value="Disponible">Disponible</option>
                <option value="Reservado">Reservado</option>
                <option value="Vendido">Vendido</option>
              </select>
            </div>
            {modalTipo === "editar" && (
              <button
                onClick={guardarCambios}
                className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full"
              >
                Guardar Cambios
              </button>
            )}
            <button
              onClick={cerrarModal}
              className="p-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 w-full mt-3"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionVehiculos;
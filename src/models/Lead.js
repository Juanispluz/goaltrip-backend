class Lead {
  constructor({ id, nombre, email, telefono, paquete_id, mensaje, fecha, estado }) {
    this.id = id;
    this.nombre = nombre;
    this.email = email;
    this.telefono = telefono;
    this.paquete_id = paquete_id;
    this.mensaje = mensaje;
    this.fecha = fecha;
    this.estado = estado; // 'nuevo', 'contactado' o 'convertido'
  }
}

module.exports = Lead;
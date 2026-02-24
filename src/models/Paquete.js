class Paquete {
  constructor({ id, ciudad, pais, precio_cop, cupos, fecha_salida, incluye, descripcion, activo }) {
    this.id = id;
    this.ciudad = ciudad;
    this.pais = pais;
    this.precio_cop = precio_cop;
    this.cupos = cupos;
    this.fecha_salida = fecha_salida;
    this.incluye = incluye; 
    this.descripcion = descripcion;
    this.activo = activo; 
  }
}

module.exports = Paquete;
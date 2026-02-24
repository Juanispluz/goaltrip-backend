class Usuario {
  constructor({ id, nombre, email, password_hash, rol, created_at }) {
    this.id = id;
    this.nombre = nombre;
    this.email = email;
    this.password_hash = password_hash; 
    this.rol = rol; // 'admin' o 'user'
    this.created_at = created_at;
  }
}

module.exports = Usuario;
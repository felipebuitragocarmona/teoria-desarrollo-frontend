// Clase principal para el usuario
class User {
    constructor(id, name, username, email, address, phone, website, company) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.phone = phone;
        this.website = website;
    }

    // Método opcional para mostrar info resumida
    getSummary() {
        return `${this.name} (${this.username})`;
    }
}